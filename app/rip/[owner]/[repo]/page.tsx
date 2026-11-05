import type { Metadata } from "next";
import { Suspense, type CSSProperties, type ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AiEpitaph } from "@/components/result/AiEpitaph";
import { FactJokes } from "@/components/result/FactJokes";
import { GothicScenery } from "@/components/result/GothicScenery";
import { GraveMessage } from "@/components/result/GraveMessage";
import { LastWordsVerdict } from "@/components/result/LastWordsVerdict";
import { Rituals } from "@/components/result/Rituals";
import { RotatingMessage } from "@/components/result/RotatingMessage";
import { RememberGrave } from "@/components/result/RememberGrave";
import { ShareActions } from "@/components/result/ShareActions";
import { TombstoneCard } from "@/components/TombstoneCard";
import { daysBetween, yearOf } from "@/lib/dates";
import { toEpitaphStyle, type EpitaphStyle } from "@/lib/epitaph";
import { toGraveyardEntry } from "@/lib/graveyard-entry";
import { getCachedRepoFacts, GraveError, type GraveErrorKind } from "@/lib/github";
import { ALIVE_MESSAGE } from "@/lib/status";
import type { RepoFacts } from "@/lib/types";
import "../../../styles/result.css";

const GRAVEYARD_PHOTO =
  "https://images.unsplash.com/photo-1707051772724-d976e49c785b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1800";

const ERROR_TITLES: Record<GraveErrorKind, string> = {
  "not-found": "An empty grave",
  "rate-limited": "The gravedigger is on break",
  unknown: "Something stirs in the crypt",
};

type Params = Promise<{ owner: string; repo: string }>;
type SearchParams = Promise<{ style?: string | string[] }>;
type FactsResult = { facts: RepoFacts } | { error: GraveError };

async function loadFacts(owner: string, repo: string): Promise<FactsResult> {
  try {
    return { facts: await getCachedRepoFacts(owner, repo) };
  } catch (error) {
    return { error: error instanceof GraveError ? error : new GraveError("unknown") };
  }
}

function deathNotice(facts: RepoFacts): string {
  const days = daysBetween(new Date(facts.died), new Date()).toLocaleString("en-US");
  if (facts.status === "alive") return ALIVE_MESSAGE;
  if (facts.status === "never-lived") return "It never drew a single breath. Not one commit.";
  if (facts.status === "archived") return `Archived by its maintainers. ${days} days since its last words`;
  return `${facts.causeOfDeath}. Declared dead after ${days} days of silence`;
}

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

function siteHost(): string {
  return siteUrl().replace(/^https?:\/\//, "");
}

export async function generateMetadata({ params, searchParams }: { params: Params; searchParams: SearchParams }): Promise<Metadata> {
  const { owner, repo } = await params;
  const { style } = await searchParams;
  const styleQuery = typeof style === "string" ? `?s=${encodeURIComponent(toEpitaphStyle(style))}` : "";
  const card = {
    url: `/api/card/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}${styleQuery}`,
    width: 1200,
    height: 630,
    alt: `Tombstone card for ${owner}/${repo}`,
  };
  const title = `RIP ${repo} | Rest-in-GIT`;
  const description = `The tombstone of ${owner}/${repo}. Every repo has last words.`;
  return {
    metadataBase: new URL(siteUrl()),
    title,
    description,
    openGraph: { title, description, type: "website", images: [card] },
    twitter: { card: "summary_large_image", title, description, images: [card] },
  };
}

function Memorial({ facts, style }: { facts: RepoFacts; style: EpitaphStyle }) {
  const shareText = `RIP ${facts.repo} (${yearOf(facts.born)}-${yearOf(facts.died)}). Last words: "${facts.lastWords}"`;
  const cardUrl = `/api/card/${encodeURIComponent(facts.owner)}/${encodeURIComponent(facts.repo)}?s=${encodeURIComponent(style)}`;
  return (
    <>
      <p className="death-notice">{deathNotice(facts)}</p>
      <TombstoneCard
        facts={facts}
        epitaph={
          <Suspense key={style} fallback={<RotatingMessage />}>
            <AiEpitaph facts={facts} style={style} />
          </Suspense>
        }
        verdict={
          <Suspense fallback={null}>
            <LastWordsVerdict lastWords={facts.lastWords} />
          </Suspense>
        }
      />
      <Rituals owner={facts.owner} repo={facts.repo} style={style} />
      <>
        <RememberGrave entry={toGraveyardEntry(facts)} />
        <ShareActions repo={facts.repo} shareText={shareText} cardUrl={cardUrl} />
      </>
      <FactJokes facts={facts} />
      <p className="permalink">
        {siteHost()}/rip/{facts.owner}/{facts.repo}
      </p>
    </>
  );
}

function ResultShell({ children }: { children: ReactNode }) {
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
          {children}
        </section>
        <Footer variant="result" />
      </main>
    </div>
  );
}

export default async function RipPage({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const { owner, repo } = await params;
  const { style } = await searchParams;
  const result = await loadFacts(owner, repo);
  return (
    <ResultShell>
      {"facts" in result ? (
        <Memorial facts={result.facts} style={toEpitaphStyle(typeof style === "string" ? style : undefined)} />
      ) : (
        <GraveMessage title={ERROR_TITLES[result.error.kind]} message={result.error.message} />
      )}
    </ResultShell>
  );
}
