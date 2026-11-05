import { readCache, writeCache } from "./ai/cache";
import { classifyByRules, LAST_WORDS_CATEGORIES, parseVerdict, type LastWordsVerdict } from "./ai/last-words";
import { generate } from "./ai/ollama";
import { FEW_SHOT, STOCK_EPITAPHS, type EpitaphStyle } from "./ai/styles";
import type { RepoFacts } from "./types";

export { EPITAPH_STYLES, toEpitaphStyle, type EpitaphStyle } from "./ai/styles";

export type AiText = { text: string; fromModel: boolean };
export type AiVerdict = LastWordsVerdict & { fromModel: boolean };

export const MODEL_RESTING_NOTE = "The model is resting, using a stock epitaph.";

const MAX_LINE = 90;
const EMOJI = /\p{Extended_Pictographic}/u;
const RULES = "Never mock the maintainers. Never invent facts beyond the ones listed. No emojis.";

function factsBlock(f: RepoFacts): string {
  return [
    `Repository: ${f.owner}/${f.repo}`,
    `Description: ${f.description ?? "none"}`,
    `Born: ${f.born.slice(0, 10)}`,
    `Last commit: ${f.died.slice(0, 10)}`,
    `Status: ${f.status}`,
    `Cause of death: ${f.causeOfDeath}`,
    `Last words: "${f.lastWords}"`,
    `Top contributors: ${f.survivedBy.join(", ") || "none"}`,
    `Stars: ${f.stars}, forks: ${f.forks}, open issues: ${f.openIssues}`,
    `Language: ${f.language ?? "unknown"}`,
  ].join("\n");
}

function hash(value: string): number {
  return [...value].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7);
}

function factsFingerprint(f: RepoFacts): string {
  return hash(`${f.died}|${f.status}|${f.lastWords}`).toString(36);
}

export function stockEpitaph(facts: RepoFacts, style: EpitaphStyle): string {
  return STOCK_EPITAPHS[hash(`${facts.owner}/${facts.repo}/${style}`) % STOCK_EPITAPHS.length];
}

export function cleanEpitaph(raw: string): string | null {
  const lines = raw
    .split("\n")
    .map((line) => line.trim().replace(/^["“]|["”]$/g, ""))
    .filter(Boolean);
  if (lines.length !== 2 || lines.some((l) => l.length >= MAX_LINE || EMOJI.test(l))) return null;
  return lines.join("\n");
}

function epitaphPrompt(facts: RepoFacts, style: EpitaphStyle): string {
  const examples = FEW_SHOT[style].map((e) => `---\n${e}`).join("\n");
  return `TASK: epitaph
Write a tombstone epitaph for a dead GitHub repository in the "${style}" style.
Exactly two lines, each under ${MAX_LINE} characters. Output only the two lines. ${RULES}

Examples:
${examples}
---

Facts:
${factsBlock(facts)}`;
}

async function cached<T extends { fromModel: boolean }>(key: string[], run: () => Promise<T>): Promise<T> {
  const hit = await readCache<T>(key);
  if (hit) return hit;
  const result = await run();
  if (result.fromModel) await writeCache(key, result);
  return result;
}

async function tryModel<T>(run: () => Promise<T | null>): Promise<T | null> {
  try {
    return await run();
  } catch {
    return null;
  }
}

export function writeEpitaph(facts: RepoFacts, style: EpitaphStyle): Promise<AiText> {
  return cached(["epitaph", facts.owner, facts.repo, style, factsFingerprint(facts)], async () => {
    const text = await tryModel(async () => cleanEpitaph(await generate({ prompt: epitaphPrompt(facts, style) })));
    return text ? { text, fromModel: true } : { text: stockEpitaph(facts, style), fromModel: false };
  });
}

export async function classifyLastWords(message: string): Promise<AiVerdict> {
  const prompt = `TASK: classify
Classify these final commit words of a dead repository into one category: ${LAST_WORDS_CATEGORIES.join(", ")}.
Add a gentle one-sentence joke about them (under 120 characters). ${RULES}
Answer as JSON: {"category": "...", "joke": "..."}

Last words: "${message}"`;
  const verdict = await tryModel(async () => parseVerdict(await generate({ prompt, format: "json" })));
  return verdict ? { ...verdict, fromModel: true } : { ...classifyByRules(message), fromModel: false };
}

function asSpeculation(text: string): string {
  return /^speculation:/i.test(text) ? text : `Speculation: ${text}`;
}

function fallbackAutopsy(f: RepoFacts): string {
  if (f.status === "alive") {
    return `Speculation: no cause of death found, the patient committed as recently as ${f.died.slice(0, 10)}. The casket stays closed for now.`;
  }
  if (f.status === "never-lived") {
    return "Speculation: not a single commit was ever made, so there is nothing to examine. It may have been an idea that never left the drawing board.";
  }
  const quiet = f.status === "archived" ? "its maintainers chose to archive it" : "its maintainers' attention moved elsewhere";
  return `Speculation: ${quiet}, and the commits stopped after "${f.lastWords}". With ${f.openIssues} open issues left behind, nobody picked up the shovel.`;
}

const AUTOPSY_TASK: Record<RepoFacts["status"], string> = {
  dead: "guess why this repository stopped receiving commits",
  archived: "guess why this repository stopped receiving commits and was archived",
  alive: "playfully explain that this repository is still alive, so no cause of death can be found",
  "never-lived": "guess why this repository never received a single commit",
};

export function autopsy(facts: RepoFacts): Promise<AiText> {
  const prompt = `TASK: autopsy
In exactly 2 sentences, ${AUTOPSY_TASK[facts.status]}. Begin with "Speculation:". ${RULES}

Facts:
${factsBlock(facts)}`;
  return cached(["autopsy", facts.owner, facts.repo, factsFingerprint(facts)], async () => {
    const text = await tryModel(() => generate({ prompt }));
    return text ? { text: asSpeculation(text), fromModel: true } : { text: fallbackAutopsy(facts), fromModel: false };
  });
}

function fallbackSeance(f: RepoFacts): string {
  const mourners = f.stars === 1 ? "one soul still remembers" : `${f.stars.toLocaleString("en-US")} souls still remember`;
  if (f.status === "never-lived") return `I was ${f.repo}. I never said a word, yet ${mourners} me.`;
  return `I was ${f.repo}. My last words were "${f.lastWords}", and ${mourners} me.`;
}

export function seance(facts: RepoFacts): Promise<AiText> {
  const prompt = `TASK: seance
You are the ghost of this repository. Speak one short first-person message (max 3 sentences) to the living, using only these facts. ${RULES}

Facts:
${factsBlock(facts)}`;
  return cached(["seance", facts.owner, facts.repo, factsFingerprint(facts)], async () => {
    const text = await tryModel(() => generate({ prompt }));
    return text ? { text, fromModel: true } : { text: fallbackSeance(facts), fromModel: false };
  });
}
