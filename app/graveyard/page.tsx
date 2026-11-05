import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { GraveyardBrowser } from "@/components/graveyard/GraveyardBrowser";
import { GraveyardStats } from "@/components/graveyard/GraveyardStats";
import { Header } from "@/components/Header";
import { loadFamousGraves, loadMostMourned } from "@/lib/graveyard";
import "../styles/graveyard.css";

export const metadata: Metadata = { title: "The Graveyard · Rest-in-GIT" };
export const dynamic = "force-dynamic";

export default async function GraveyardPage() {
  const [famous, mourned] = await Promise.all([loadFamousGraves(), loadMostMourned()]);
  return (
    <div className="page-graveyard">
      <div className="app-shell">
        <div className="sky" aria-hidden="true" />
        <Header variant="graveyard" />
        <main id="graveyard">
          <section className="hero">
            <p className="eyebrow">
              <span /> Repository memorial
            </p>
            <h1>The Graveyard</h1>
            <p className="hero-copy">
              Here lie the repositories we loved, shipped,
              <br className="desktop-break" /> and quietly forgot.
            </p>
            <GraveyardStats buried={new Set([...famous, ...mourned].map((e) => `${e.owner}/${e.repo}`)).size} />
          </section>
          <GraveyardBrowser famous={famous} mourned={mourned} />
        </main>
        <Footer variant="graveyard" />
      </div>
    </div>
  );
}
