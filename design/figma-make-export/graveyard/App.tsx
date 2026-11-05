import { useMemo, useState } from "react"

type Repository = {
  name: string
  description: string
  born: number
  died: number
  language: string
  lastWords: string
  candles: number
  cause: string
}

const repositories: Repository[] = [
  {
    name: "left-pad",
    description: "String padding, once holding up the world",
    born: 2014,
    died: 2021,
    language: "JavaScript",
    lastWords: "Use native String.prototype.padStart()",
    candles: 842,
    cause: "Deprecated",
  },
  {
    name: "request",
    description: "Simplified HTTP requests",
    born: 2010,
    died: 2020,
    language: "JavaScript",
    lastWords: "This project has been fully deprecated.",
    candles: 611,
    cause: "Archived",
  },
  {
    name: "atom",
    description: "A hackable text editor for the 21st century",
    born: 2011,
    died: 2022,
    language: "CoffeeScript",
    lastWords: "Prepare for archival.",
    candles: 477,
    cause: "Sunset",
  },
  {
    name: "moment",
    description: "Parse, validate and display dates",
    born: 2011,
    died: 2020,
    language: "JavaScript",
    lastWords: "We now generally consider Moment to be a legacy project.",
    candles: 389,
    cause: "Legacy",
  },
  {
    name: "angular.js",
    description: "HTML enhanced for web apps",
    born: 2010,
    died: 2022,
    language: "JavaScript",
    lastWords: "AngularJS support has officially ended.",
    candles: 354,
    cause: "End of life",
  },
  {
    name: "coffeescript-redux",
    description: "A re-imagining of CoffeeScript",
    born: 2013,
    died: 2017,
    language: "CoffeeScript",
    lastWords: "Probably not going to finish this.",
    candles: 127,
    cause: "Abandoned",
  },
  {
    name: "py2exe",
    description: "Build standalone Windows executables",
    born: 2002,
    died: 2014,
    language: "Python",
    lastWords: "Support for Python 2 will remain here.",
    candles: 203,
    cause: "Lost to time",
  },
  {
    name: "rusted-rails",
    description: "A tiny web framework experiment",
    born: 2016,
    died: 2019,
    language: "Rust",
    lastWords: "WIP: clean this up later",
    candles: 91,
    cause: "Dormant",
  },
]

const languageFilters = ["All", "JavaScript", "Python", "CoffeeScript", "Rust"]
const decadeFilters = ["All years", "2000s", "2010s", "2020s"]

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  )
}

function CandleIcon({ lit = false }: { lit?: boolean }) {
  return (
    <svg
      className={lit ? "candle-icon lit" : "candle-icon"}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        className="flame"
        d="M12 2c2.3 2.5 3.1 4.2 2.2 5.8A2.5 2.5 0 0 1 12 9.1 2.5 2.5 0 0 1 9.8 7.8C9 6.2 9.8 4.5 12 2Z"
      />
      <path d="M8.5 10.5h7v10h-7zM7 21h10" />
      <path d="M12 10.5v3" />
    </svg>
  )
}

function Tombstone({
  repo,
  lit,
  onLight,
}: {
  repo: Repository
  lit: boolean
  onLight: () => void
}) {
  return (
    <article className="grave-card">
      <div className="stone">
        <span className="stone-cause">{repo.cause}</span>
        <div className="stone-cross" aria-hidden="true">
          <span />
        </div>
        <p className="rip">R. I. P.</p>
        <h2>{repo.name}</h2>
        <p className="description">{repo.description}</p>
        <div className="years">
          <span>{repo.born}</span>
          <i aria-hidden="true" />
          <span>{repo.died}</span>
        </div>
        <div className="last-words">
          <span>LAST WORDS</span>
          <q>{repo.lastWords}</q>
        </div>
        <div className="stone-meta">
          <span className="language-dot" />
          {repo.language}
        </div>
      </div>
      <button
        className={lit ? "respect-button is-lit" : "respect-button"}
        onClick={onLight}
      >
        <CandleIcon lit={lit} />
        <span>{lit ? "Candle lit" : "Light a candle"}</span>
        <strong>{repo.candles + (lit ? 1 : 0)}</strong>
      </button>
    </article>
  )
}

export default function App() {
  const [query, setQuery] = useState("")
  const [language, setLanguage] = useState("All")
  const [decade, setDecade] = useState("All years")
  const [litCandles, setLitCandles] = useState<Set<string>>(new Set())

  const filteredRepos = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return repositories.filter((repo) => {
      const matchesSearch =
        !normalized ||
        repo.name.toLowerCase().includes(normalized) ||
        repo.description.toLowerCase().includes(normalized) ||
        repo.lastWords.toLowerCase().includes(normalized)
      const matchesLanguage = language === "All" || repo.language === language
      const matchesDecade =
        decade === "All years" ||
        Math.floor(repo.died / 10) * 10 === Number.parseInt(decade)
      return matchesSearch && matchesLanguage && matchesDecade
    })
  }, [query, language, decade])

  const lightCandle = (name: string) => {
    setLitCandles((current) => {
      const next = new Set(current)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  const clearFilters = () => {
    setQuery("")
    setLanguage("All")
    setDecade("All years")
  }

  return (
    <div className="app-shell">
      <div className="sky" aria-hidden="true" />
      <header>
        <a className="brand" href="#" aria-label="Rest-in-GIT home">
          <span className="brand-mark">R/G</span>
          <span>
            Rest-in-<span className="brand-dot">GIT</span>
          </span>
        </a>
        <nav aria-label="Main navigation">
          <a className="nav-active" href="#graveyard">
            Graveyard
          </a>
          <a href="#about">About</a>
          <button className="bury-button">
            <span aria-hidden="true">+</span>
            Bury a repo
          </button>
        </nav>
      </header>

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
              <strong>2,847</strong> repos buried
            </span>
            <i />
            <span>
              <strong>18,391</strong> candles lit
            </span>
          </div>
        </section>

        <section
          className="filters"
          aria-label="Search and filter repositories"
        >
          <div className="search-wrap">
            <SearchIcon />
            <input
              type="search"
              placeholder="Search the departed..."
              aria-label="Search repositories"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <kbd>⌘ K</kbd>
          </div>
          <div className="filter-row">
            <div className="filter-group">
              <span className="filter-label">Language</span>
              <div className="chips">
                {languageFilters.map((item) => (
                  <button
                    className={language === item ? "chip active" : "chip"}
                    key={item}
                    onClick={() => setLanguage(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-divider" />
            <div className="filter-group">
              <span className="filter-label">Buried in</span>
              <div className="chips">
                {decadeFilters.map((item) => (
                  <button
                    className={decade === item ? "chip active" : "chip"}
                    key={item}
                    onClick={() => setDecade(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="results-heading">
          <span>{filteredRepos.length} resting places</span>
          {(query || language !== "All" || decade !== "All years") && (
            <button onClick={clearFilters}>Clear filters</button>
          )}
        </div>

        {filteredRepos.length > 0 ? (
          <section className="grave-grid" aria-live="polite">
            {filteredRepos.map((repo) => (
              <Tombstone
                key={repo.name}
                repo={repo}
                lit={litCandles.has(repo.name)}
                onLight={() => lightCandle(repo.name)}
              />
            ))}
          </section>
        ) : (
          <section className="empty-state">
            <div className="empty-stone">?</div>
            <h2>No spirits found</h2>
            <p>
              Try another name or clear the filters to wander the full
              graveyard.
            </p>
            <button onClick={clearFilters}>Clear all filters</button>
          </section>
        )}
      </main>

      <footer id="about">
        <span>Every repo has last words.</span>
        <span>Built for the open source departed · 2026</span>
      </footer>
    </div>
  )
}
