"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState, useTransition } from "react";
import { parseRepoUrl, type RepoRef } from "@/lib/repo-url";
import { GithubMark } from "../icons";
import { MiniTombstone } from "./MiniTombstone";

const EXAMPLES: RepoRef[] = [
  { owner: "atom", repo: "atom" },
  { owner: "adobe", repo: "brackets" },
  { owner: "request", repo: "request" },
];

export function RepoForm() {
  const router = useRouter();
  const [repoUrl, setRepoUrl] = useState("");
  const [message, setMessage] = useState("");
  const [isDigging, startDigging] = useTransition();

  const visit = ({ owner, repo }: RepoRef) => {
    startDigging(() => router.push(`/rip/${owner}/${repo}`));
  };

  const buryRepo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!repoUrl.trim()) {
      setMessage("The gravedigger needs a repository first.");
      return;
    }
    const path = parseRepoUrl(repoUrl);
    if (!path) {
      setMessage("That plot is unmarked. Try github.com/owner/repo.");
      return;
    }
    setMessage("");
    visit(path);
  };

  return (
    <>
      <form className="burial-form" onSubmit={buryRepo}>
        <label className="sr-only" htmlFor="repo-url">
          GitHub repository URL
        </label>
        <div className="input-wrap">
          <span className="input-icon">
            <GithubMark />
          </span>
          <input
            id="repo-url"
            type="text"
            value={repoUrl}
            onChange={(event) => {
              setRepoUrl(event.target.value);
              setMessage("");
            }}
            placeholder="Paste a GitHub repo URL"
            autoComplete="url"
            spellCheck={false}
          />
          <button type="submit" disabled={isDigging}>
            <span className="shovel" aria-hidden="true">
              <span className="shovel-handle" />
              <span className="shovel-shaft" />
              <span className="shovel-blade" />
            </span>
            {isDigging ? "Digging…" : "Bury it"}
          </button>
        </div>
        <p className="form-message" aria-live="polite">
          {message}
        </p>
      </form>

      <div className="examples">
        <p>
          <span aria-hidden="true">✦</span>
          Or visit an old friend
          <span aria-hidden="true">✦</span>
        </p>
        <div className="example-list">
          {EXAMPLES.map((example) => (
            <button
              type="button"
              key={`${example.owner}/${example.repo}`}
              aria-label={`Visit the grave of ${example.owner}/${example.repo}`}
              onClick={() => visit(example)}
            >
              <MiniTombstone />
              <span className="example-name" aria-hidden="true">
                <small>{example.owner}</small>
                <strong>{example.repo}</strong>
              </span>
              <span className="example-rip" aria-hidden="true">
                RIP
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
