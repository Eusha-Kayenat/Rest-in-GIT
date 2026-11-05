import Image from "next/image";
import type { ReactNode } from "react";
import { formatLifespan, yearOf } from "@/lib/dates";
import type { RepoFacts } from "@/lib/types";
import { LeafOrnament } from "./result/LeafOrnament";

function MemorialMark() {
  return (
    <div className="memorial-mark" aria-hidden="true">
      <span />
      <svg viewBox="0 0 48 48">
        <path d="M16 3h16l10 13-6 29H12L6 16 16 3Zm3 7-7 9 4 19h16l4-19-7-9H19Zm3 6h4v8h7v4h-7v9h-4v-9h-7v-4h7v-8Z" />
      </svg>
      <span />
    </div>
  );
}

function Survivors({ logins }: { logins: string[] }) {
  if (logins.length === 0) return <p>No known survivors</p>;
  return (
    <>
      <p>Survived by</p>
      <div className="avatar-row">
        {logins.map((login) => (
          <Image
            key={login}
            src={`https://avatars.githubusercontent.com/${login}?s=96`}
            alt={login}
            title={login}
            width={96}
            height={96}
          />
        ))}
      </div>
    </>
  );
}

export function TombstoneCard({ facts, epitaph }: { facts: RepoFacts; epitaph: ReactNode }) {
  const { owner, repo, born, died, lastWords, status, survivedBy } = facts;
  return (
    <article className="tombstone" aria-label={`Tombstone memorial for ${repo}`}>
      <div className="stone-grain" />
      <div className="stone-content">
        <MemorialMark />
        <p className="in-memory">In loving memory of</p>
        <h2>{repo}</h2>
        <p className="repo-owner">
          {owner} / {repo}
        </p>

        <LeafOrnament />

        <div className="dates">
          <div>
            <small>Born</small>
            <strong title={born.slice(0, 10)}>{yearOf(born)}</strong>
          </div>
          <span className="date-divider" />
          <div>
            <small>{status === "alive" ? "Last seen" : "Died"}</small>
            <strong title={died.slice(0, 10)}>{yearOf(died)}</strong>
          </div>
        </div>
        <p className="lifespan">{formatLifespan(new Date(born), new Date(died))}</p>

        <div className="last-words">
          <p>
            <span aria-hidden="true">†</span> Last words <span aria-hidden="true">†</span>
          </p>
          <blockquote>{status === "never-lived" ? lastWords : `“${lastWords}”`}</blockquote>
        </div>

        <div className="epitaph">{epitaph}</div>

        <div className="survivors">
          <Survivors logins={survivedBy} />
        </div>
      </div>
      <div className="stone-base">
        <span />
      </div>
    </article>
  );
}
