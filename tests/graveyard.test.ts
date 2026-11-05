import { describe, expect, it } from "vitest";
import famous from "../data/graveyard.json";
import { loadGraves } from "../lib/graveyard";
import type { RepoFacts } from "../lib/types";

function facts(repo: string, status: RepoFacts["status"]): RepoFacts {
  return {
    owner: "o", repo, description: null, born: "2012-01-01T00:00:00Z", died: "2020-01-01T00:00:00Z", lastWords: "bye",
    survivedBy: [], stars: 0, openIssues: 0, forks: 0, language: null, archived: status === "archived", status,
    causeOfDeath: "", lastCommitWeekday: null, lastCommitHour: null, lifespanYears: 8,
  };
}

describe("loadGraves", () => {
  it("keeps the dead, drops the living and survives failed fetches", async () => {
    const graves = await loadGraves(
      [{ owner: "o", repo: "a" }, { owner: "o", repo: "b" }, { owner: "o", repo: "c" }, { owner: "o", repo: "d" }],
      async (_owner, repo) => {
        if (repo === "b") throw new Error("boom");
        return facts(repo, repo === "c" ? "alive" : repo === "d" ? "archived" : "dead");
      },
    );
    expect(graves.map((g) => [g.repo, g.cause, g.language])).toEqual([["a", "dead", "Unknown"], ["d", "archived", "Unknown"]]);
  });

  it("lists 20 famous graves without duplicates", () => {
    expect(famous).toHaveLength(20);
    expect(new Set(famous.map((r) => `${r.owner}/${r.repo}`)).size).toBe(20);
  });
});
