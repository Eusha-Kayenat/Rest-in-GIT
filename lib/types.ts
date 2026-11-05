export type TombstoneStatus = "dead" | "archived" | "alive" | "never-lived";

export type Tombstone = {
  owner: string;
  repo: string;
  description: string | null;
  born: string;
  died: string;
  lastWords: string;
  survivedBy: string[];
  stars: number;
  openIssues: number;
  forks: number;
  language: string | null;
  archived: boolean;
  status: TombstoneStatus;
  causeOfDeath: string;
  epitaph: string;
  lastWordsCategory: string;
  lastWordsJoke: string;
};

export type RepoFacts = Omit<Tombstone, "epitaph" | "lastWordsCategory" | "lastWordsJoke"> & {
  lastCommitWeekday: string | null;
  lastCommitHour: number | null;
  lifespanYears: number;
};

export type GraveyardEntry = {
  owner: string;
  repo: string;
  description: string;
  born: number;
  died: number;
  language: string;
  lastWords: string;
  cause: "archived" | "dormant";
  candles: number;
};
