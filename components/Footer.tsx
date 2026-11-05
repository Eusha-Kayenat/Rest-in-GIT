import { Candle } from "./home/Candle";

type FooterVariant = "home" | "graveyard" | "result";

function HomeFooter() {
  return (
    <footer>
      <div className="ground" aria-hidden="true">
        <span className="grave grave-one">†</span>
        <span className="grave grave-two">†</span>
        <span className="grave grave-three">†</span>
        <span className="grass grass-one" />
        <span className="grass grass-two" />
      </div>
      <div className="remembrance">
        <Candle delay="-.4s" />
        <p>
          <span>In memory of</span>
          all the branches never merged
        </p>
        <Candle delay="-1.2s" />
      </div>
      <p className="colophon">Built for the code we loved and left behind.</p>
    </footer>
  );
}

function GraveyardFooter() {
  return (
    <footer id="about">
      <span>Every repo has last words.</span>
      <span>Built for the open source departed · {new Date().getFullYear()}</span>
    </footer>
  );
}

function ResultFooter() {
  return (
    <p className="photo-credit">
      Graveyard photograph by{" "}
      <a href="https://unsplash.com/@frostroomhead" target="_blank" rel="noreferrer">
        Rodion Kutsaiev
      </a>
    </p>
  );
}

export function Footer({ variant }: { variant: FooterVariant }) {
  if (variant === "graveyard") return <GraveyardFooter />;
  if (variant === "result") return <ResultFooter />;
  return <HomeFooter />;
}
