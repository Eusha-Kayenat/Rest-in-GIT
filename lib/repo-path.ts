const SEGMENT = /^[A-Za-z0-9_.-]+$/;

export type RepoPath = { owner: string; repo: string };

export function toRepoPath(input: string): RepoPath | null {
  const cleaned = input
    .trim()
    .replace(/^(https?:\/\/)?(www\.)?github\.com\//i, "")
    .replace(/[?#].*$/, "");
  const [owner, rawRepo] = cleaned.split("/").filter(Boolean);
  const repo = rawRepo?.replace(/\.git$/i, "");
  if (!owner || !repo || !SEGMENT.test(owner) || !SEGMENT.test(repo)) return null;
  return { owner, repo };
}
