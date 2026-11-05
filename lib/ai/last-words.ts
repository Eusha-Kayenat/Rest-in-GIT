export const LAST_WORDS_CATEGORIES = [
  "Optimistic",
  "Humble",
  "Self-aware",
  "In denial",
  "Tragically hopeful",
  "Legendary",
] as const;

export type LastWordsCategory = (typeof LAST_WORDS_CATEGORIES)[number];

export type LastWordsVerdict = { category: LastWordsCategory; joke: string };

const RULES: [RegExp, LastWordsVerdict][] = [
  [/\bwip\b|work in progress|todo/i, { category: "Optimistic", joke: "It promised to finish this later. It did not." }],
  [/typo|spelling|readme/i, { category: "Humble", joke: "It spent its final breath fixing a typo." }],
  [/deprecat|archiv|goodbye|farewell|unmaintained|final/i, { category: "Self-aware", joke: "It saw the end coming and wrote it down." }],
  [/\bfix|bug|patch|hotfix/i, { category: "Tragically hopeful", joke: "One more fix, it said. Just one more." }],
  [/release|^v?\d+\.\d+|bump|version/i, { category: "Legendary", joke: "It went out on a release. Very few get that." }],
];

const DENIAL: LastWordsVerdict = { category: "In denial", joke: "It thought there would be another commit." };

export function classifyByRules(message: string): LastWordsVerdict {
  if (message === "(no last words)") return { category: "Humble", joke: "It left without saying a word." };
  return RULES.find(([pattern]) => pattern.test(message))?.[1] ?? DENIAL;
}

export function parseVerdict(raw: string): LastWordsVerdict | null {
  try {
    const data: unknown = JSON.parse(raw);
    if (typeof data !== "object" || data === null) return null;
    const { category, joke } = data as Record<string, unknown>;
    const validCategory = LAST_WORDS_CATEGORIES.find((c) => c === category);
    if (!validCategory || typeof joke !== "string" || !joke.trim() || joke.length > 160) return null;
    return { category: validCategory, joke: joke.trim() };
  } catch {
    return null;
  }
}
