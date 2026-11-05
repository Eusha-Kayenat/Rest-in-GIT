import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { GraveyardBrowser } from "@/components/graveyard/GraveyardBrowser";
import { Header } from "@/components/Header";
import { sampleGraveyard } from "@/lib/sample-data";
import "../styles/graveyard.css";

export const metadata: Metadata = { title: "The Graveyard · Rest-in-GIT" };

export default function GraveyardPage() {
  const candles = sampleGraveyard.reduce((sum, entry) => sum + entry.candles, 0);
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
            <div className="graveyard-stats" aria-label="Graveyard statistics">
              <span>
                <strong>{sampleGraveyard.length.toLocaleString("en-US")}</strong> repos buried
              </span>
              <i />
              <span>
                <strong>{candles.toLocaleString("en-US")}</strong> candles lit
              </span>
            </div>
          </section>
          <GraveyardBrowser entries={sampleGraveyard} />
        </main>
        <Footer variant="graveyard" />
      </div>
    </div>
  );
}
