import { truncate } from "./card";
import { formatLifespan, yearOf } from "./dates";
import { classifyLastWords, writeEpitaph, type EpitaphStyle } from "./epitaph";
import { getRepoFacts } from "./github";
import { parseRepoUrl } from "./repo-url";
import type { TombstoneStatus } from "./types";

export type CardData = {
  owner: string;
  repo: string;
  born: number;
  died: number;
  lifespan: string;
  lastWords: string;
  epitaph: string;
  category: string;
  status: TombstoneStatus;
  survivedBy: string[];
  stars: number;
};

type CardOverrides = { epitaph: string | null; category: string | null; style: EpitaphStyle };

export async function buildCardData(owner: string, repo: string, overrides: CardOverrides): Promise<CardData | null> {
  const ref = parseRepoUrl(`${owner}/${repo}`);
  if (!ref) return null;
  const facts = await getRepoFacts(ref.owner, ref.repo).catch(() => null);
  if (!facts) return null;
  const [epitaph, category] = await Promise.all([
    overrides.epitaph ?? writeEpitaph(facts, overrides.style).then((r) => r.text),
    overrides.category ?? classifyLastWords(facts.lastWords).then((r) => r.category),
  ]);
  return {
    owner: facts.owner,
    repo: truncate(facts.repo, 28),
    born: yearOf(facts.born),
    died: yearOf(facts.died),
    lifespan: formatLifespan(new Date(facts.born), new Date(facts.died)),
    lastWords: truncate(facts.lastWords, 80),
    epitaph,
    category: truncate(category, 40),
    status: facts.status,
    survivedBy: facts.survivedBy,
    stars: facts.stars,
  };
}
