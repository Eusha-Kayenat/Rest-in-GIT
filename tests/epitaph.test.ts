import { mkdtempSync } from "node:fs";
import type { AddressInfo } from "node:net";
import os from "node:os";
import path from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { EPITAPH_STYLES } from "../lib/ai/styles";
import { autopsy, classifyLastWords, cleanEpitaph, seance, writeEpitaph } from "../lib/epitaph";
import type { RepoFacts } from "../lib/types";
import { createMockOllama } from "../scripts/mock-ollama.mjs";

const facts: RepoFacts = {
  owner: "request",
  repo: "request",
  description: "Simplified HTTP request client.",
  born: "2011-01-23T00:00:00Z",
  died: "2020-02-11T00:00:00Z",
  lastWords: "README: typo in deprecation message (#3268)",
  survivedBy: ["mikeal", "simov", "nylen"],
  stars: 25000,
  openIssues: 100,
  forks: 3000,
  language: "JavaScript",
  archived: true,
  status: "archived",
  causeOfDeath: "Archived by its maintainers",
  lastCommitWeekday: "Tuesday",
  lastCommitHour: 14,
  lifespanYears: 9.1,
};

const server = createMockOllama();

beforeAll(async () => {
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  process.env.OLLAMA_URL = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});

afterAll(() => {
  server.closeAllConnections();
  server.close();
});

beforeEach(() => {
  process.env.REST_IN_GIT_CACHE_DIR = mkdtempSync(path.join(os.tmpdir(), "rest-in-git-test-"));
  process.env.EPITAPH_MODEL = "mock-gemma";
});

describe("with a healthy model", () => {
  it("writes a two-line epitaph and caches it", async () => {
    const first = await writeEpitaph(facts, "classic");
    expect(first.fromModel).toBe(true);
    expect(first.text.split("\n")).toHaveLength(2);

    process.env.EPITAPH_MODEL = "mock-broken-json";
    expect(await writeEpitaph(facts, "classic")).toEqual(first);
  });

  it("writes a fresh epitaph when the last words change", async () => {
    await writeEpitaph(facts, "classic");
    process.env.EPITAPH_MODEL = "mock-broken-json";
    const updated = await writeEpitaph({ ...facts, lastWords: "release v3" }, "classic");
    expect(updated.fromModel).toBe(false);
  });

  it("classifies last words from JSON", async () => {
    expect(await classifyLastWords(facts.lastWords)).toEqual({
      category: "Humble",
      joke: "Even in death, it fixed one more typo.",
      fromModel: true,
    });
  });

  it("writes the autopsy and seance in the chosen style", async () => {
    const classic = await autopsy(facts, "classic");
    const noir = await autopsy(facts, "noir detective");
    expect(noir.text).not.toBe(classic.text);
    expect(noir.text).toMatch(/^Speculation:.*Case closed/);
    expect((await seance(facts, "shakespearean")).text).toMatch(/Alas/);
  });

  it("labels the autopsy as speculation and holds a seance", async () => {
    expect((await autopsy(facts)).text).toMatch(/^Speculation:/);
    expect((await seance(facts)).fromModel).toBe(true);
  });
});

describe("when the model sends broken JSON", () => {
  beforeEach(() => {
    process.env.EPITAPH_MODEL = "mock-broken-json";
  });

  it("falls back to the rules", async () => {
    expect(await classifyLastWords("wip: almost there")).toMatchObject({ category: "Optimistic", fromModel: false });
    expect(await classifyLastWords("fix typo in docs")).toMatchObject({ category: "Humble", fromModel: false });
  });

  it("rejects a malformed epitaph and uses a stock one", async () => {
    const result = await writeEpitaph(facts, "noir detective");
    expect(result.fromModel).toBe(false);
    expect(result.text.split("\n")).toHaveLength(2);
  });
});

describe("when the model times out or is unreachable", () => {
  it("gives up after 5 seconds and uses a stock epitaph", async () => {
    process.env.EPITAPH_MODEL = "mock-sleepy";
    const started = Date.now();
    const result = await writeEpitaph(facts, "shakespearean");
    expect(result.fromModel).toBe(false);
    expect(Date.now() - started).toBeLessThan(5900);
  }, 10_000);

  it("falls back when nothing is listening", async () => {
    const url = process.env.OLLAMA_URL;
    process.env.OLLAMA_URL = "http://127.0.0.1:9";
    expect((await autopsy(facts)).text).toMatch(/^Speculation:/);
    expect((await seance(facts)).fromModel).toBe(false);
    process.env.OLLAMA_URL = url;
  });
});

describe("autopsy fallbacks", () => {
  it("keeps styled fallbacks to two sentences without inventing a cause", async () => {
    process.env.OLLAMA_URL = "http://127.0.0.1:9";
    for (const style of EPITAPH_STYLES) {
      for (const status of ["alive", "never-lived"] as const) {
        const { text, fromModel } = await autopsy({ ...facts, status, archived: false }, style);
        expect(fromModel).toBe(false);
        expect(text).toMatch(/^Speculation:/);
        expect(text.split(/(?<=\.)\s+/)).toHaveLength(2);
        expect(text).not.toMatch(/technical debt/);
      }
    }
  });

  it("does not declare living or unborn repos dead", async () => {
    process.env.OLLAMA_URL = "http://127.0.0.1:9";
    expect((await autopsy({ ...facts, status: "alive", archived: false })).text).toMatch(/no cause of death/);
    expect((await autopsy({ ...facts, status: "never-lived", archived: false })).text).toMatch(/not a single commit/);
  });
});

describe("cleanEpitaph", () => {
  it("keeps exactly two short lines without emojis", () => {
    expect(cleanEpitaph('"Line one,\nline two."')).toBe("Line one,\nline two.");
    expect(cleanEpitaph("one\ntwo\nthree")).toBeNull();
    expect(cleanEpitaph(`${"x".repeat(95)}\nshort`)).toBeNull();
    expect(cleanEpitaph("RIP 💀\nforever")).toBeNull();
  });
});
