import { FormEvent, useState } from "react"

const examples = [
  { label: "atom/atom", url: "https://github.com/atom/atom" },
  { label: "zeit/hyper", url: "https://github.com/zeit/hyper" },
  { label: "request/request", url: "https://github.com/request/request" },
]

function GithubMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 .7a11.6 11.6 0 0 0-3.67 22.6c.58.1.8-.25.8-.56v-2.02c-3.25.7-3.94-1.38-3.94-1.38-.53-1.35-1.3-1.71-1.3-1.71-1.06-.73.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.4-1.27.74-1.56-2.6-.3-5.33-1.3-5.33-5.74 0-1.27.45-2.3 1.2-3.12-.12-.3-.52-1.48.11-3.08 0 0 .98-.31 3.19 1.2A11.1 11.1 0 0 1 12 6.71c.99 0 1.97.13 2.9.39 2.22-1.51 3.2-1.2 3.2-1.2.63 1.6.23 2.78.11 3.08.75.82 1.2 1.85 1.2 3.12 0 4.46-2.74 5.44-5.34 5.73.42.36.79 1.08.79 2.18v2.73c0 .31.2.67.8.56A11.6 11.6 0 0 0 12 .7Z"
      />
    </svg>
  )
}

function Bat({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 42 18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21 16.8c-2.6-3.5-4.2-5.5-7.4-6.3-2.8-.7-4.8.3-7.2 1.7.5-2.1-.2-4.2-2-5.5C2.8 5.6 1.1 5.8 0 6.1c2.1-3.4 5.5-5.5 9.1-5 4.8.5 7.5 4.5 9.3 7.4.3-2.6 1.1-4.3 2.6-5.2 1.5.9 2.3 2.6 2.6 5.2 1.8-2.9 4.5-6.9 9.3-7.4 3.6-.5 7 1.6 9.1 5-1.1-.3-2.8-.5-4.4.6-1.8 1.3-2.5 3.4-2 5.5-2.4-1.4-4.4-2.4-7.2-1.7-3.2.8-4.8 2.8-7.4 6.3Z"
      />
    </svg>
  )
}

function MiniTombstone() {
  return (
    <svg className="mini-tombstone" viewBox="0 0 94 88" aria-hidden="true">
      <path
        className="mini-stone-shadow"
        d="M5 84 9 34l9-8 3-11L31 6l16-5 16 5 10 9 3 11 9 8 4 50Z"
      />
      <path
        className="mini-stone-face"
        d="M10 80 14 37l9-7 3-11 8-7 13-4 13 4 8 7 3 11 9 7 4 43Z"
      />
      <path
        className="mini-stone-line"
        d="M18 74 21 41l9-7 2-10 6-5 9-3 9 3 6 5 2 10 9 7 3 33ZM25 43h44M21 68h52"
      />
      <path className="mini-stone-cross" d="M47 21v17M41 27h12" />
      <path className="mini-stone-crack" d="m18 49 9 7-5 8M75 45l-8 8 5 7" />
      <path className="mini-stone-ground" d="M1 82h92" />
    </svg>
  )
}

function GraveyardScene() {
  return (
    <svg
      className="graveyard-scene"
      viewBox="0 0 1440 350"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="stone-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#302839" />
          <stop offset=".55" stopColor="#17131d" />
          <stop offset="1" stopColor="#0a080d" />
        </linearGradient>
        <linearGradient id="stone-edge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#776b7e" />
          <stop offset="1" stopColor="#211b27" />
        </linearGradient>
        <radialGradient id="pumpkin-glow">
          <stop offset="0" stopColor="#ffcf62" stopOpacity=".9" />
          <stop offset="1" stopColor="#d87228" stopOpacity="0" />
        </radialGradient>
        <filter id="soft-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      <g className="distant-cemetery">
        <path d="M0 316C98 287 169 305 250 291c92-16 169 24 259 9 105-18 189 11 280-3 97-16 173 14 272 0 142-20 233 17 379-5v58H0Z" />
        <path d="M26 306v-75h9v75m-25-53h41M182 305v-47h7v47m-18-31h29M330 305v-62h8v62m-20-41h31M516 307v-87h10v87m-27-60h44M761 306v-55h7v55m-18-34h29M948 305v-74h9v74m-25-50h40M1170 307v-58h8v58m-20-39h29M1360 306v-81h9v81m-26-54h42" />
        <path d="M79 305v-42c0-20 13-32 30-32s30 12 30 32v42M248 307v-33c0-14 10-23 23-23s23 9 23 23v33M627 307v-37c0-18 12-28 27-28s27 10 27 28v37M1037 307v-42c0-20 13-32 30-32s30 12 30 32v42M1260 307v-29c0-15 9-24 22-24s22 9 22 24v29" />
      </g>

      <g className="ornate-stone ornate-stone-left">
        <path
          className="stone-shadow"
          d="M75 324 88 139l25-18 9-30 28-25 31-11 31 11 28 25 9 30 25 18 13 185Z"
        />
        <path
          fill="url(#stone-face)"
          stroke="url(#stone-edge)"
          strokeWidth="5"
          d="M89 315 101 148l26-19 6-28 22-19 26-9 26 9 22 19 6 28 26 19 12 167Z"
        />
        <path
          className="stone-carving"
          d="M111 300 120 160l24-17 5-28 14-13 18-7 18 7 14 13 5 28 24 17 9 140ZM143 158h76M132 279h98"
        />
        <path
          className="stone-skull"
          d="M170 119c0-8 5-13 11-13s11 5 11 13c0 6-3 10-6 11v7h-10v-7c-3-1-6-5-6-11Zm5 0h4m5 0h4m-7 4v4"
        />
        <text x="181" y="218" textAnchor="middle" className="rip-carving">
          RIP
        </text>
        <path
          className="stone-flourish"
          d="M137 243c15-12 25 5 44 5s29-17 44-5M143 256c12 8 23-2 38-2s26 10 38 2"
        />
        <path
          className="stone-crack"
          d="m110 183 16 14-10 17 18 13M235 170l-14 19 9 13-12 20"
        />
      </g>

      <g className="pumpkin pumpkin-left">
        <ellipse
          className="pumpkin-aura"
          cx="181"
          cy="61"
          rx="54"
          ry="50"
          fill="url(#pumpkin-glow)"
          filter="url(#soft-glow)"
        />
        <path
          className="pumpkin-stem"
          d="M179 29c-1-16 13-19 18-24-3 11-2 18 3 25"
        />
        <path
          className="pumpkin-body"
          d="M181 30c34 0 49 18 46 43-3 26-22 40-46 40s-43-14-46-40c-3-25 12-43 46-43Z"
        />
        <path
          className="pumpkin-rib"
          d="M181 31c-15 11-18 63 0 81M181 31c15 11 18 63 0 81M155 36c-10 21-8 54 8 71M207 36c10 21 8 54-8 71"
        />
        <path
          className="pumpkin-face"
          d="m150 64 18-10-5 21Zm62 0-18-10 5 21Zm-48 22 9 4 8-9 8 9 10-4c-4 13-31 18-35 0Z"
        />
      </g>

      <g className="ornate-stone ornate-stone-right">
        <path
          className="stone-shadow"
          d="M1191 327 1204 179l20-20 8-34 23-22 29-9 29 9 23 22 8 34 20 20 13 148Z"
        />
        <path
          fill="url(#stone-face)"
          stroke="url(#stone-edge)"
          strokeWidth="4"
          d="M1205 318 1217 187l21-18 7-31 17-17 22-8 22 8 17 17 7 31 21 18 12 131Z"
        />
        <path
          className="stone-carving"
          d="m1228 300 8-102 18-15 6-29 10-11 14-6 14 6 10 11 6 29 18 15 8 102ZM1250 200h68M1242 282h84"
        />
        <path className="stone-cross" d="M1284 151v33M1272 163h24" />
        <text
          x="1284"
          y="245"
          textAnchor="middle"
          className="rip-carving small"
        >
          RIP
        </text>
      </g>

      <g className="foreground-grass">
        <path d="M0 350v-31l14 26 5-46 10 44 14-59 2 62 22-34-12 38 38-21-28 35 61-18-39 30Zm177 0 17-48 1 46 25-68-9 66 29-37-17 43 47-22-36 35 65-15-39 30Zm935 0 14-53 5 48 18-70 1 67 27-49-14 56 45-33-30 43 54-15-39 31Zm214 0 20-67-5 65 28-48-13 52 39-33-25 43 64-20-44 37Z" />
      </g>
    </svg>
  )
}

function Candle({ delay = "0s" }: { delay?: string }) {
  return (
    <span className="candle" aria-hidden="true">
      <span className="candle-glow" style={{ animationDelay: delay }} />
      <span className="candle-flame" style={{ animationDelay: delay }} />
      <span className="candle-wick" />
      <span className="candle-body">
        <span />
      </span>
      <span className="candle-pool" />
    </span>
  )
}

function App() {
  const [repoUrl, setRepoUrl] = useState("")
  const [isDigging, setIsDigging] = useState(false)
  const [message, setMessage] = useState("")

  const buryRepo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!repoUrl.trim()) {
      setMessage("The gravedigger needs a repository first.")
      return
    }

    setMessage("")
    setIsDigging(true)
    window.setTimeout(() => {
      setIsDigging(false)
      setMessage("A fitting resting place is being prepared.")
    }, 1100)
  }

  const chooseExample = (url: string) => {
    setRepoUrl(url)
    setMessage("")
    document.querySelector<HTMLInputElement>("#repo-url")?.focus()
  }

  return (
    <main className="site-shell">
      <div className="stars" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div className="branches branches-left" aria-hidden="true">
        <span className="branch-main" />
        <span className="branch branch-one" />
        <span className="branch branch-two" />
        <span className="branch branch-three" />
        <span className="twig twig-one" />
        <span className="twig twig-two" />
      </div>
      <div className="branches branches-right" aria-hidden="true">
        <span className="branch-main" />
        <span className="branch branch-one" />
        <span className="branch branch-two" />
        <span className="branch branch-three" />
        <span className="twig twig-one" />
        <span className="twig twig-two" />
      </div>
      <div className="moon" aria-hidden="true">
        <span className="moon-crater moon-crater-one" />
        <span className="moon-crater moon-crater-two" />
        <span className="moon-crater moon-crater-three" />
      </div>

      <div className="bat-swarm" aria-hidden="true">
        <Bat className="bat bat-one" />
        <Bat className="bat bat-two" />
        <Bat className="bat bat-three" />
        <Bat className="bat bat-four" />
      </div>
      <div className="fog fog-one" aria-hidden="true" />
      <div className="fog fog-two" aria-hidden="true" />
      <div className="fog fog-three" aria-hidden="true" />
      <GraveyardScene />

      <header className="site-header">
        <a className="brand" href="/" aria-label="Rest-in-GIT home">
          <span className="brand-cross" aria-hidden="true">
            ✦
          </span>
          <span>Rest-in-</span>
          <strong>GIT</strong>
        </a>
        <a
          className="github-link"
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
        >
          <GithubMark />
          <span>GitHub</span>
        </a>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="eyebrow">
          <span />
          Here lies your abandoned code
          <span />
        </div>
        <h1 id="hero-title">
          Every repo has
          <em>last words.</em>
        </h1>
        <p className="intro">
          Give forgotten code the farewell it deserves.
          <br />
          We&apos;ll read its history and carve the perfect epitaph.
        </p>

        <form className="burial-form" onSubmit={buryRepo}>
          <label className="sr-only" htmlFor="repo-url">
            GitHub repository URL
          </label>
          <div className="input-wrap">
            <span className="input-icon">
              <GithubMark />
            </span>
            <input
              id="repo-url"
              type="text"
              value={repoUrl}
              onChange={(event) => {
                setRepoUrl(event.target.value)
                setMessage("")
              }}
              placeholder="Paste a GitHub repo URL"
              autoComplete="url"
              spellCheck={false}
            />
            <button type="submit" disabled={isDigging}>
              <span className="shovel" aria-hidden="true">
                <span className="shovel-handle" />
                <span className="shovel-shaft" />
                <span className="shovel-blade" />
              </span>
              {isDigging ? "Digging…" : "Bury it"}
            </button>
          </div>
          <p className="form-message" aria-live="polite">
            {message}
          </p>
        </form>

        <div className="examples">
          <p>
            <span aria-hidden="true">✦</span>
            Or visit an old friend
            <span aria-hidden="true">✦</span>
          </p>
          <div className="example-list">
            {examples.map((example) => (
              <button
                type="button"
                key={example.label}
                aria-label={`Use example repository ${example.label}`}
                onClick={() => chooseExample(example.url)}
                className={repoUrl === example.url ? "selected" : ""}
              >
                <MiniTombstone />
                <span className="example-name" aria-hidden="true">
                  <small>{example.label.split("/")[0]}</small>
                  <strong>{example.label.split("/")[1]}</strong>
                </span>
                <span className="example-rip" aria-hidden="true">
                  RIP
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

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
    </main>
  )
}

export default App
