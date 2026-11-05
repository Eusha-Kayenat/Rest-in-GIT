import type { GraveyardEntry, Survivor, Tombstone } from "./types";

// Hard-coded sample data for the M1 UI shell. Replaced by live GitHub data in M2.

const avatar = (login: string): Survivor => ({
  login,
  avatarUrl: `https://avatars.githubusercontent.com/${login}?s=96`,
});

const sampleTombstones: Tombstone[] = [
  {
    owner: "request",
    repo: "request",
    description: "Simplified HTTP request client.",
    bornAt: "2011-01-23T00:00:00Z",
    diedAt: "2020-02-11T00:00:00Z",
    lastWords: "README: typo in deprecation message (#3268)",
    survivedBy: [avatar("mikeal"), avatar("simov"), avatar("nylen")],
    cause: "dormant",
    epitaph: ["It asked the whole web for everything,", "and finally got a quiet reply."],
  },
  {
    owner: "atom",
    repo: "atom",
    description: "The hackable text editor",
    bornAt: "2012-01-20T00:00:00Z",
    diedAt: "2022-11-22T00:00:00Z",
    lastWords: "Merge pull request #25709 from atom/fix-snapshot-result-macos",
    survivedBy: [avatar("kevinsawicki"), avatar("benogle"), avatar("maxbrunsfeld")],
    cause: "archived",
    epitaph: ["Endlessly hackable, endlessly loved,", "now hacked into the stone above."],
  },
  {
    owner: "adobe",
    repo: "brackets",
    description: "An open source code editor for the web",
    bornAt: "2011-12-07T00:00:00Z",
    diedAt: "2021-03-18T00:00:00Z",
    lastWords: "Change hyperlink",
    survivedBy: [avatar("redmunds"), avatar("jasonsanjose"), avatar("peterflynn")],
    cause: "archived",
    epitaph: ["It opened every bracket we gave it,", "and finally closed its own."],
  },
];

export function getSampleTombstone(owner: string, repo: string): Tombstone {
  const match = sampleTombstones.find(
    (t) => t.owner.toLowerCase() === owner.toLowerCase() && t.repo.toLowerCase() === repo.toLowerCase(),
  );
  return match ?? { ...sampleTombstones[0], owner, repo };
}

export const sampleGraveyard: GraveyardEntry[] = [
  { owner: "request", repo: "request", description: "Simplified HTTP request client", born: 2011, died: 2020, language: "JavaScript", lastWords: "README: typo in deprecation message (#3268)", cause: "dormant", candles: 1284 },
  { owner: "atom", repo: "atom", description: "The hackable text editor", born: 2012, died: 2022, language: "JavaScript", lastWords: "Merge pull request #25709 from atom/fix-snapshot-result-macos", cause: "archived", candles: 2911 },
  { owner: "angular", repo: "angular.js", description: "HTML enhanced for web apps", born: 2010, died: 2024, language: "JavaScript", lastWords: "chore: update post LTS links (#17187)", cause: "archived", candles: 1876 },
  { owner: "adobe", repo: "brackets", description: "An open source code editor for the web", born: 2011, died: 2021, language: "JavaScript", lastWords: "Change hyperlink", cause: "archived", candles: 964 },
  { owner: "facebookarchive", repo: "flux", description: "Application architecture for building user interfaces", born: 2014, died: 2023, language: "JavaScript", lastWords: "4.0.4", cause: "archived", candles: 707 },
  { owner: "rust-lang", repo: "rls", description: "The Rust Language Server, before rust-analyzer", born: 2016, died: 2022, language: "Rust", lastWords: "Merge pull request #1784 from ehuss/deprecate-readme", cause: "archived", candles: 388 },
  { owner: "iron", repo: "iron", description: "An extensible, concurrent web framework for Rust", born: 2014, died: 2021, language: "Rust", lastWords: "Merge pull request #634 from atouchet/site", cause: "dormant", candles: 512 },
  { owner: "psf", repo: "requests-html", description: "Pythonic HTML parsing for humans", born: 2018, died: 2023, language: "Python", lastWords: "Merge pull request #539 from Skaylan/fix-typo", cause: "dormant", candles: 623 },
];
