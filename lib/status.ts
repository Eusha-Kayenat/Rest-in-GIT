import type { TombstoneStatus } from "./types";

const YEAR_MS = 365.25 * 86_400_000;
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MAX_LAST_WORDS = 80;

export const ALIVE_MESSAGE = "This repo is alive. Rude of you to assume otherwise.";
export const NO_LAST_WORDS = "(no last words)";

type StatusInput = { archived: boolean; lastCommit: string | null; now?: Date };

export function yearsBetween(from: string, to: Date): number {
  return (to.getTime() - new Date(from).getTime()) / YEAR_MS;
}

export function deriveStatus({ archived, lastCommit, now = new Date() }: StatusInput): {
  status: TombstoneStatus;
  causeOfDeath: string;
} {
  if (archived) return { status: "archived", causeOfDeath: "Archived by its maintainers" };
  if (!lastCommit) return { status: "never-lived", causeOfDeath: "Never drew a single breath" };
  const years = Math.floor(yearsBetween(lastCommit, now));
  if (years >= 1) return { status: "dead", causeOfDeath: `Dormant for ${years} year${years === 1 ? "" : "s"}` };
  return { status: "alive", causeOfDeath: "Still breathing" };
}

export function toLastWords(message: string | null): string {
  const firstLine = message?.split("\n")[0].trim();
  if (!firstLine) return NO_LAST_WORDS;
  return firstLine.length > MAX_LAST_WORDS ? `${firstLine.slice(0, MAX_LAST_WORDS - 1).trimEnd()}…` : firstLine;
}

export function lifespanYears(born: string, died: string): number {
  return Math.round(yearsBetween(born, new Date(died)) * 10) / 10;
}

export function commitMoment(iso: string | null): { weekday: string | null; hour: number | null } {
  if (!iso) return { weekday: null, hour: null };
  const date = new Date(iso);
  return { weekday: WEEKDAYS[date.getUTCDay()], hour: date.getUTCHours() };
}
