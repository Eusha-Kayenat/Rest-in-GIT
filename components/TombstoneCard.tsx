import Image from "next/image";
import { formatLifespan, yearOf } from "@/lib/dates";
import type { Tombstone } from "@/lib/types";
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

export function TombstoneCard({ tombstone }: { tombstone: Tombstone }) {
  const { owner, repo, bornAt, diedAt, lastWords, epitaph, survivedBy } = tombstone;
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
            <strong title={bornAt.slice(0, 10)}>{yearOf(bornAt)}</strong>
          </div>
          <span className="date-divider" />
          <div>
            <small>Died</small>
            <strong title={diedAt.slice(0, 10)}>{yearOf(diedAt)}</strong>
          </div>
        </div>
        <p className="lifespan">{formatLifespan(new Date(bornAt), new Date(diedAt))}</p>

        <div className="last-words">
          <p>
            <span aria-hidden="true">†</span> Last words <span aria-hidden="true">†</span>
          </p>
          <blockquote>“{lastWords}”</blockquote>
        </div>

        <p className="epitaph">
          {epitaph[0]}
          <br />
          {epitaph[1]}
        </p>

        <div className="survivors">
          <p>Survived by</p>
          <div className="avatar-row">
            {survivedBy.map((person) => (
              <Image
                key={person.login}
                src={person.avatarUrl}
                alt={person.login}
                title={person.login}
                width={96}
                height={96}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="stone-base">
        <span />
      </div>
    </article>
  );
}
