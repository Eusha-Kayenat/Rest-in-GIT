import type { RepoFacts } from "./types";

const count = (n: number) => n.toLocaleString("en-US");

export function factJokes(f: RepoFacts): { label: string; value: string }[] {
  const jokes = [
    { label: "Mourners", value: `${count(f.stars)} stars` },
    { label: "Heirs", value: `${count(f.forks)} forks` },
    { label: "Unfinished business", value: `${count(f.openIssues)} open issues` },
  ];
  if (f.lastCommitWeekday && f.lastCommitHour !== null) {
    const hour = String(f.lastCommitHour).padStart(2, "0");
    jokes.unshift({ label: "Time of death", value: `a ${f.lastCommitWeekday}, ${hour}:00 UTC` });
  }
  return jokes;
}
