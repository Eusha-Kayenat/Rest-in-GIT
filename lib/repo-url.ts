export type RepoRef = { owner: string; repo: string };

const OWNER = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/;
const REPO = /^[A-Za-z0-9_.-]{1,100}$/;

function stripGithubPrefix(input: string): string {
  return input
    .replace(/^git@github\.com:/i, "")
    .replace(/^(https?:\/\/)?(www\.)?github\.com\//i, "");
}

export function parseRepoUrl(input: string): RepoRef | null {
  const path = stripGithubPrefix(input.trim()).replace(/[?#].*$/, "");
  const [owner, rawRepo] = path.split("/").filter(Boolean);
  if (!owner || !rawRepo) return null;
  const repo = rawRepo.replace(/\.git$/i, "");
  if (!OWNER.test(owner) || !REPO.test(repo) || /^\.+$/.test(repo)) return null;
  return { owner, repo };
}
