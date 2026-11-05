import { yearOf } from "./dates";
import type { GraveyardEntry, RepoFacts } from "./types";

export function toGraveyardEntry(facts: RepoFacts): GraveyardEntry {
  return {
    owner: facts.owner,
    repo: facts.repo,
    description: facts.description ?? "No description was ever written.",
    born: yearOf(facts.born),
    died: yearOf(facts.died),
    language: facts.language ?? "Unknown",
    lastWords: facts.lastWords,
    cause: facts.status,
    stars: facts.stars,
  };
}

export function isBuried(entry: GraveyardEntry): boolean {
  return entry.cause === "dead" || entry.cause === "archived";
}
