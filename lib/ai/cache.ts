import { mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

function cacheDir(): string {
  return process.env.REST_IN_GIT_CACHE_DIR ?? path.join(os.tmpdir(), "rest-in-git");
}

function cacheFile(parts: string[]): string {
  const key = parts.join("__").toLowerCase().replace(/[^a-z0-9_.-]/g, "-");
  return path.join(cacheDir(), `${key}.json`);
}

export async function readCache<T>(parts: string[]): Promise<T | null> {
  try {
    return JSON.parse(await readFile(cacheFile(parts), "utf8")) as T;
  } catch {
    return null;
  }
}

export async function writeCache(parts: string[], value: unknown): Promise<void> {
  try {
    await mkdir(cacheDir(), { recursive: true });
    await writeFile(cacheFile(parts), JSON.stringify(value));
  } catch {
    // A full crypt is not worth crashing over.
  }
}
