import { afterEach, describe, expect, it, vi } from "vitest";
import { getRepoFacts, GraveError } from "../lib/github";

const repoPayload = {
  name: "ghost",
  private: false,
  owner: { login: "spooky" },
  description: null,
  created_at: "2020-01-01T00:00:00Z",
  stargazers_count: 3,
  open_issues_count: 0,
  forks_count: 1,
  language: null,
  archived: false,
};

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), { status, headers });
}

function mockGithub(routes: { repo: Response; commits: Response; contributors: Response }) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => {
      if (url.includes("/commits")) return routes.commits;
      if (url.includes("/contributors")) return routes.contributors;
      return routes.repo;
    }),
  );
}

afterEach(() => vi.unstubAllGlobals());

describe("getRepoFacts", () => {
  it("treats an empty repo as never-lived", async () => {
    mockGithub({
      repo: json(repoPayload),
      commits: json({ message: "Git Repository is empty." }, 409),
      contributors: new Response(null, { status: 204 }),
    });
    const facts = await getRepoFacts("spooky", "ghost");
    expect(facts.status).toBe("never-lived");
    expect(facts.lastWords).toBe("(no last words)");
    expect(facts.survivedBy).toEqual([]);
    expect(facts.died).toBe(repoPayload.created_at);
  });

  it("throws a not-found grave error on 404", async () => {
    mockGithub({ repo: json({}, 404), commits: json({}, 404), contributors: json({}, 404) });
    await expect(getRepoFacts("spooky", "nothing")).rejects.toMatchObject({ kind: "not-found" });
  });

  it("hides private repositories", async () => {
    mockGithub({ repo: json({ ...repoPayload, private: true }), commits: json([]), contributors: json([]) });
    await expect(getRepoFacts("spooky", "secret")).rejects.toMatchObject({ kind: "not-found" });
  });

  it("treats a secondary rate limit as rate-limited", async () => {
    const limited = () => json({ message: "You have exceeded a secondary rate limit." }, 403, { "x-ratelimit-remaining": "4000" });
    mockGithub({ repo: limited(), commits: limited(), contributors: limited() });
    await expect(getRepoFacts("spooky", "ghost")).rejects.toMatchObject({ kind: "rate-limited" });
  });

  it("still buries the repo when only contributors are rate-limited", async () => {
    mockGithub({
      repo: json(repoPayload),
      commits: json([{ commit: { message: "wip", committer: { date: "2021-01-01T00:00:00Z" }, author: null } }]),
      contributors: json({}, 429),
    });
    const facts = await getRepoFacts("spooky", "ghost");
    expect(facts.survivedBy).toEqual([]);
    expect(facts.lastWords).toBe("wip");
  });

  it("throws a rate-limited grave error", async () => {
    const limited = () => json({}, 403, { "x-ratelimit-remaining": "0" });
    mockGithub({ repo: limited(), commits: limited(), contributors: limited() });
    const error = await getRepoFacts("spooky", "ghost").catch((e: unknown) => e);
    expect(error).toBeInstanceOf(GraveError);
    expect((error as GraveError).message).toBe("The gravedigger needs a rest, try again in a few minutes.");
  });
});
