import famous from "@/data/graveyard.json";
import { getRepoFacts, searchArchivedRepos } from "./github";
import { isBuried, toGraveyardEntry } from "./graveyard-entry";
import type { GraveyardEntry, RepoFacts } from "./types";

type RepoRef = { owner: string; repo: string };
type FactsFetcher = (owner: string, repo: string) => Promise<RepoFacts>;

const DAY = 86400;
const fetchDaily: FactsFetcher = (owner, repo) => getRepoFacts(owner, repo, new Date(), DAY);

export async function loadGraves(refs: RepoRef[], fetchFacts: FactsFetcher = fetchDaily): Promise<GraveyardEntry[]> {
  const results = await Promise.allSettled(refs.map(({ owner, repo }) => fetchFacts(owner, repo)));
  return results.flatMap((result) => (result.status === "fulfilled" ? [toGraveyardEntry(result.value)] : [])).filter(isBuried);
}

export function loadFamousGraves(): Promise<GraveyardEntry[]> {
  return loadGraves(famous as RepoRef[]);
}

export async function loadMostMourned(): Promise<GraveyardEntry[]> {
  const refs = await searchArchivedRepos().catch(() => []);
  const graves = await loadGraves(refs);
  return graves.sort((a, b) => b.stars - a.stars);
}
