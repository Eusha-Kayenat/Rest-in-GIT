import { describe, expect, it } from "vitest";
import { parseRepoUrl } from "../lib/repo-url";

describe("parseRepoUrl", () => {
  it.each([
    ["https://github.com/atom/atom", "atom", "atom"],
    ["https://github.com/atom/atom/", "atom", "atom"],
    ["github.com/request/request", "request", "request"],
    ["https://github.com/adobe/brackets.git", "adobe", "brackets"],
    ["https://github.com/vercel/next.js/tree/canary/packages", "vercel", "next.js"],
    ["angular/angular.js", "angular", "angular.js"],
    ["  http://www.github.com/psf/requests-html?tab=readme#top  ", "psf", "requests-html"],
    ["git@github.com:rust-lang/rls.git", "rust-lang", "rls"],
    ["https://github.com/facebookarchive/flux/issues/1", "facebookarchive", "flux"],
  ])("parses %s", (input, owner, repo) => {
    expect(parseRepoUrl(input)).toEqual({ owner, repo });
  });

  it.each([
    "",
    "   ",
    "atom",
    "github.com/atom",
    "https://gitlab.com/gitlab-org/gitlab",
    "not a url!",
    "owner/..",
    "-bad-owner/repo",
  ])("rejects %j", (input) => {
    expect(parseRepoUrl(input)).toBeNull();
  });
});
