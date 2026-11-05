"use client";

import { createStore } from "./browser-store";
import type { GraveyardEntry } from "./types";

export const NO_CANDLES: string[] = [];
export const NO_GRAVES: GraveyardEntry[] = [];
export const candleStore = createStore<string[]>("rest-in-git:candles", NO_CANDLES);
export const myGravesStore = createStore<GraveyardEntry[]>("rest-in-git:my-graveyard", NO_GRAVES);

export const graveKey = (entry: { owner: string; repo: string }) => `${entry.owner}/${entry.repo}`.toLowerCase();

export function toggleCandle(key: string): void {
  const lit = candleStore.get();
  candleStore.set(lit.includes(key) ? lit.filter((k) => k !== key) : [...lit, key]);
}

export function rememberGrave(entry: GraveyardEntry, max = 60): void {
  const key = graveKey(entry);
  myGravesStore.set([entry, ...myGravesStore.get().filter((e) => graveKey(e) !== key)].slice(0, max));
}
