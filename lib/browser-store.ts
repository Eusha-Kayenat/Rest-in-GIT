"use client";

import { useSyncExternalStore } from "react";

type Store<T> = { get: () => T; set: (value: T) => void; subscribe: (listener: () => void) => () => void; key: string };

export function createStore<T>(key: string, fallback: T): Store<T> {
  const listeners = new Set<() => void>();
  let cachedRaw: string | null | undefined;
  let cachedValue = fallback;
  const read = (): T => {
    let raw: string | null = null;
    try {
      raw = window.localStorage.getItem(key);
    } catch {
      return cachedValue;
    }
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      try {
        cachedValue = raw ? (JSON.parse(raw) as T) : fallback;
      } catch {
        cachedValue = fallback;
      }
    }
    return cachedValue;
  };
  return {
    key,
    get: read,
    set(value) {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch {
        cachedRaw = undefined;
        cachedValue = value;
      }
      listeners.forEach((listener) => listener());
    },
    subscribe(listener) {
      listeners.add(listener);
      const onStorage = (event: StorageEvent) => event.key === key && listener();
      window.addEventListener("storage", onStorage);
      return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", onStorage);
      };
    },
  };
}

export function useStore<T>(store: Store<T>, serverValue: T): T {
  return useSyncExternalStore(store.subscribe, store.get, () => serverValue);
}
