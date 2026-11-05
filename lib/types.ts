export type CauseOfDeath = "archived" | "dormant" | "alive";

export type Survivor = {
  login: string;
  avatarUrl: string;
};

export type Tombstone = {
  owner: string;
  repo: string;
  description: string;
  bornAt: string;
  diedAt: string;
  lastWords: string;
  survivedBy: Survivor[];
  cause: CauseOfDeath;
  epitaph: [string, string];
};

export type GraveyardEntry = {
  owner: string;
  repo: string;
  description: string;
  born: number;
  died: number;
  language: string;
  lastWords: string;
  cause: CauseOfDeath;
  candles: number;
};
