import type { GraveyardEntry } from "./types";

// Hard-coded graveyard entries until the curated list lands in M6.

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
