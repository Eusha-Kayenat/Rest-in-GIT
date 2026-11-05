import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { GothicScenery } from "@/components/result/GothicScenery";
import { GraveMessage } from "@/components/result/GraveMessage";
import { ShareActions } from "@/components/result/ShareActions";
import { TombstoneCard } from "@/components/TombstoneCard";
import { daysBetween, yearOf } from "@/lib/dates";
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
  if (facts.status === "archived") return `Archived by its maintainers, ${days} days after its last words`;
  return `${facts.causeOfDeath}. Declared dead after ${days} days of silence`;
}

function placeholderEpitaph(facts: RepoFacts): [string, string] {
  if (facts.status === "alive") return ["Still committing, still awake,", "come back when it takes a break."];
  if (facts.status === "never-lived") return ["It never shipped a single line,", "and rested well, by all design."];
  return ["Here lies a repo that served us well,", "its final commit, its parting bell."];
}

function siteHost(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "rest-in-git").replace(/^https?:\/\//, "");
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { owner, repo } = await params;
  return { title: `RIP ${owner}/${repo} · Rest-in-GIT` };
}

function Memorial({ facts }: { facts: RepoFacts }) {
  const [first, second] = placeholderEpitaph(facts);
  const shareText = `RIP ${facts.repo}, ${yearOf(facts.born)}–${yearOf(facts.died)}. Last words: “${facts.lastWords}”`;
  return (
    <>
      <p className="death-notice">{deathNotice(facts)}</p>
      <TombstoneCard
        facts={facts}
        epitaph={
          <p>
            {first}
            <br />
            {second}
          </p>
        }
      />
      <ShareActions shareText={shareText} />
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

export default async function RipPage({ params }: { params: Params }) {
  const { owner, repo } = await params;
  const result = await loadFacts(owner, repo);
  return (
    <ResultShell>
      {"facts" in result ? (
        <Memorial facts={result.facts} />
      ) : (
        <GraveMessage title={ERROR_TITLES[result.error.kind]} message={result.error.message} />
      )}
    </ResultShell>
  );
}
