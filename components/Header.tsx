import Link from "next/link";
import { GithubMark } from "./icons";

type HeaderVariant = "home" | "graveyard" | "result";

const REPO_URL = "https://github.com/Eusha-Kayenat/Rest-in-GIT";

function HomeHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Rest-in-GIT home">
        <span className="brand-cross" aria-hidden="true">✦</span>
        <span>Rest-in-</span>
        <strong>GIT</strong>
      </Link>
      <nav className="flex items-center gap-3">
        <Link className="graveyard-link" href="/graveyard">
          <span aria-hidden="true">✝</span>
          <span><span className="graveyard-the">The </span>Graveyard</span>
        </Link>
        <a className="github-link" href={REPO_URL} target="_blank" rel="noreferrer">
          <GithubMark />
          <span>GitHub</span>
        </a>
      </nav>
    </header>
  );
}

function GraveyardHeader() {
  return (
    <header>
      <Link className="brand" href="/" aria-label="Rest-in-GIT home">
        <span className="brand-mark">R/G</span>
        <span>
          Rest-in-<span className="brand-dot">GIT</span>
        </span>
      </Link>
      <nav aria-label="Main navigation">
        <Link className="nav-active" href="/graveyard" aria-current="page">
          Graveyard
        </Link>
        <a href="#about">About</a>
        <Link className="bury-button" href="/">
          <span aria-hidden="true">+</span>
          Bury a repo
        </Link>
      </nav>
    </header>
  );
}

function ResultHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Rest-in-GIT home">
        <span>Rest-in-</span>
        <i>GIT</i>
      </Link>
      <nav className="result-nav">
        <Link className="graveyard-link" href="/graveyard">
          <span aria-hidden="true">✝</span> The Graveyard
        </Link>
        <Link className="bury-link" href="/">
          <span aria-hidden="true">+</span> Bury another repo
        </Link>
      </nav>
    </header>
  );
}

export function Header({ variant }: { variant: HeaderVariant }) {
  if (variant === "graveyard") return <GraveyardHeader />;
  if (variant === "result") return <ResultHeader />;
  return <HomeHeader />;
}
