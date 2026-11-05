import { cache } from "react";
import { commitMoment, deriveStatus, lifespanYears, toLastWords } from "./status";
import type { RepoFacts } from "./types";

export { parseRepoUrl } from "./repo-url";

const API = "https://api.github.com";

export type GraveErrorKind = "not-found" | "rate-limited" | "unknown";

const GRAVE_MESSAGES: Record<GraveErrorKind, string> = {
  "not-found": "No body found. Are you sure it ever existed?",
  "rate-limited": "The gravedigger needs a rest, try again in a few minutes.",
  unknown: "The crypt door is stuck. Give it a moment and try again.",
};

export class GraveError extends Error {
  constructor(readonly kind: GraveErrorKind) {
    super(GRAVE_MESSAGES[kind]);
    this.name = "GraveError";
  }
}

type RepoPayload = {
  name: string;
  private: boolean;
  owner: { login: string };
  description: string | null;
  created_at: string;
  stargazers_count: number;
  open_issues_count: number;
  forks_count: number;
  language: string | null;
  archived: boolean;
};

type CommitPayload = { commit: { message: string; committer: { date: string } | null; author: { date: string } | null } };

type ContributorPayload = { login?: string };

function githubHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "rest-in-git",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function isRateLimited(res: Response): Promise<boolean> {
  if (res.status === 429) return true;
  if (res.status !== 403) return false;
  if (res.headers.get("x-ratelimit-remaining") === "0" || res.headers.has("retry-after")) return true;
  const body = await res.clone().text().catch(() => "");
  return /rate limit/i.test(body);
}

async function github(path: string, revalidate = 3600): Promise<Response> {
  const res = await fetch(`${API}${path}`, { headers: githubHeaders(), next: { revalidate } });
  if (await isRateLimited(res)) throw new GraveError("rate-limited");
  return res;
}

async function readRepo(res: Response): Promise<RepoPayload> {
  if (res.status === 404) throw new GraveError("not-found");
  if (!res.ok) throw new GraveError("unknown");
  const payload: RepoPayload = await res.json();
  if (payload.private) throw new GraveError("not-found");
  return payload;
}

async function readLastCommit(res: Response): Promise<CommitPayload | null> {
  if (res.status === 404 || res.status === 409) return null;
  if (!res.ok) throw new GraveError("unknown");
  const commits: CommitPayload[] = await res.json();
  return commits[0] ?? null;
}

async function readContributors(res: Response | null): Promise<string[]> {
  if (!res || res.status === 204 || !res.ok) return [];
  const contributors: ContributorPayload[] = await res.json();
  return contributors.flatMap((c) => (c.login ? [c.login] : [])).slice(0, 3);
}

export async function getRepoFacts(owner: string, repo: string, now = new Date(), revalidate = 3600): Promise<RepoFacts> {
  const base = `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
  const [repoRes, commitsRes, contributorsRes] = await Promise.all([
    github(base, revalidate),
    github(`${base}/commits?per_page=1`, revalidate),
    github(`${base}/contributors?per_page=3`, revalidate).catch(() => null),
  ]);
  const payload = await readRepo(repoRes);
  const lastCommit = await readLastCommit(commitsRes);
  const survivedBy = await readContributors(contributorsRes);

  const lastCommitDate = lastCommit?.commit.committer?.date ?? lastCommit?.commit.author?.date ?? null;
  const died = lastCommitDate ?? payload.created_at;
  const moment = commitMoment(lastCommitDate);

  return {
    owner: payload.owner.login,
    repo: payload.name,
    description: payload.description,
    born: payload.created_at,
    died,
    lastWords: toLastWords(lastCommit?.commit.message ?? null),
    survivedBy,
    stars: payload.stargazers_count,
    openIssues: payload.open_issues_count,
    forks: payload.forks_count,
    language: payload.language,
    archived: payload.archived,
    ...deriveStatus({ archived: payload.archived, lastCommit: lastCommitDate, now }),
    lastCommitWeekday: moment.weekday,
    lastCommitHour: moment.hour,
    lifespanYears: lifespanYears(payload.created_at, died),
  };
}

export const getCachedRepoFacts = cache((owner: string, repo: string) => getRepoFacts(owner, repo));

export async function searchArchivedRepos(limit = 12): Promise<{ owner: string; repo: string }[]> {
  const res = await github(`/search/repositories?q=${encodeURIComponent("archived:true stars:>5000")}&sort=stars&order=desc&per_page=${limit}`, 86400);
  if (!res.ok) throw new GraveError("unknown");
  const body: { items: { name: string; owner: { login: string } }[] } = await res.json();
  return body.items.map((item) => ({ owner: item.owner.login, repo: item.name }));
}
