import Link from "next/link";
import type { CauseOfDeath, GraveyardEntry } from "@/lib/types";
import { CandleButton } from "./CandleButton";

const CAUSE_LABEL: Record<CauseOfDeath, string> = {
  archived: "Archived",
  dormant: "Dormant",
  alive: "Still breathing",
};

export function GraveCard({ entry }: { entry: GraveyardEntry }) {
  return (
    <article className="grave-card">
      <div className="stone">
        <span className="stone-cause">{CAUSE_LABEL[entry.cause]}</span>
        <div className="stone-cross" aria-hidden="true">
          <span />
        </div>
        <p className="rip">R. I. P.</p>
        <h2>
          <Link href={`/rip/${entry.owner}/${entry.repo}`}>{entry.repo}</Link>
        </h2>
        <p className="description">{entry.description}</p>
        <div className="years">
          <span>{entry.born}</span>
          <i aria-hidden="true" />
          <span>{entry.died}</span>
        </div>
        <div className="last-words">
          <span>LAST WORDS</span>
          <q>{entry.lastWords}</q>
        </div>
        <div className="stone-meta">
          <span className="language-dot" />
          {entry.language}
        </div>
      </div>
      <CandleButton initialCount={entry.candles} />
    </article>
  );
}
