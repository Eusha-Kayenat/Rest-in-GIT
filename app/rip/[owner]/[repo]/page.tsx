import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { GothicScenery } from "@/components/result/GothicScenery";
import { ShareActions } from "@/components/result/ShareActions";
import { TombstoneCard } from "@/components/TombstoneCard";
import { daysBetween, yearOf } from "@/lib/dates";
import { getSampleTombstone } from "@/lib/sample-data";
import type { Tombstone } from "@/lib/types";
import "../../../styles/result.css";

const GRAVEYARD_PHOTO =
  "https://images.unsplash.com/photo-1707051772724-d976e49c785b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1800";

type Params = Promise<{ owner: string; repo: string }>;

function deathNotice(tombstone: Tombstone): string {
  const days = daysBetween(new Date(tombstone.diedAt), new Date()).toLocaleString("en-US");
  if (tombstone.cause === "alive") return `Still breathing. Last stirred ${days} days ago`;
  if (tombstone.cause === "archived") return `Laid to rest by its keepers after ${days} days of silence`;
  return `Declared dead after ${days} days of silence`;
}

function siteHost(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "rest-in-git").replace(/^https?:\/\//, "");
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { owner, repo } = await params;
  return { title: `RIP ${owner}/${repo} · Rest-in-GIT` };
}

export default async function RipPage({ params }: { params: Params }) {
  const { owner, repo } = await params;
  const tombstone = getSampleTombstone(owner, repo);
  const shareText = `RIP ${tombstone.repo}, ${yearOf(tombstone.bornAt)}–${yearOf(tombstone.diedAt)}. Last words: “${tombstone.lastWords}”`;

  return (
    <div className="page-result">
      <main className="page-shell" style={{ "--graveyard-photo": `url("${GRAVEYARD_PHOTO}")` } as CSSProperties}>
        <GothicScenery />
        <Header variant="result" />
        <section className="result" aria-labelledby="result-title">
          <div className="eyebrow">
            <span /> Repository memorial <span />
          </div>
          <h1 id="result-title">A final resting place</h1>
          <p className="death-notice">{deathNotice(tombstone)}</p>
          <TombstoneCard tombstone={tombstone} />
          <ShareActions shareText={shareText} />
          <p className="permalink">
            {siteHost()}/rip/{tombstone.owner}/{tombstone.repo}
          </p>
        </section>
        <Footer variant="result" />
      </main>
    </div>
  );
}
