import { useState } from "react"

const graveyardPhoto =
  "https://images.unsplash.com/photo-1707051772724-d976e49c785b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb2dneSUyMGdyYXZleWFyZCUyMG5pZ2h0JTIwbW9vbiUyMGRhcmslMjBnb3RoaWN8ZW58MXx8fHwxNzkzODc4MTA4fDA&ixlib=rb-4.1.0&q=85&w=1800"

const contributors = [
  {
    name: "sindresorhus",
    avatar: "https://github.com/sindresorhus.png?size=96",
  },
  { name: "jdalton", avatar: "https://github.com/jdalton.png?size=96" },
  {
    name: "mathiasbynens",
    avatar: "https://github.com/mathiasbynens.png?size=96",
  },
]

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v12m0 0 5-5m-5 5-5-5M5 20h14" />
    </svg>
  )
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.54.54l2-2a5 5 0 0 0-7.07-7.07l-1.15 1.15M14 11a5 5 0 0 0-7.54-.54l-2 2a5 5 0 0 0 7.07 7.07l1.14-1.14" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.39L6.48 22H3.36l7.26-8.3L2.98 2h6.4l4.42 5.84L18.9 2Zm-1.1 17.84h1.73L8.44 4.05H6.58L17.8 19.84Z" />
    </svg>
  )
}

function LeafOrnament() {
  return (
    <svg className="ornament" viewBox="0 0 160 34" aria-hidden="true">
      <path d="M4 17h48c17 0 20-12 20-12s3 12 8 12c-5 0-8 12-8 12s-3-12-20-12H4Zm152 0h-48c-17 0-20-12-20-12s-3 12-8 12c5 0 8 12 8 12s3-12 20-12h48Z" />
      <circle cx="80" cy="17" r="3" />
    </svg>
  )
}

function GothicScenery() {
  return (
    <div className="gothic-scenery" aria-hidden="true">
      <div className="blood-moon">
        <span />
      </div>
      <svg className="bats" viewBox="0 0 220 70">
        <path d="M5 32c12-12 24-9 34 1 5-11 13-17 24-18-7 7-9 15-8 23-11-6-21-5-31 2-6-6-12-8-19-8Zm82-11c10-10 20-8 29 0 4-9 11-14 20-15-6 6-8 13-7 20-9-5-18-4-26 2-5-5-10-7-16-7Zm67 26c12-12 24-9 34 1 5-11 13-17 24-18-7 7-9 15-8 23-11-6-21-5-31 2-6-6-12-8-19-8Z" />
      </svg>
      {["coffin-left", "coffin-right"].map((position) => (
        <svg
          key={position}
          className={`coffin ${position}`}
          viewBox="0 0 120 260"
        >
          <path d="M38 7h44l31 56-17 185H24L7 63 38 7Z" />
          <path d="M42 21h36l22 46-15 166H35L20 67l22-46Z" />
          <path
            className="coffin-cross"
            d="M56 73h8v38h17v8H64v49h-8v-49H39v-8h17V73Z"
          />
        </svg>
      ))}
      <div className="grave-cross cross-left">
        <i />
        <span />
      </div>
      <div className="grave-cross cross-right">
        <i />
        <span />
      </div>
      <div className="ground-fog fog-one" />
      <div className="ground-fog fog-two" />
    </div>
  )
}

export default function App() {
  const [copied, setCopied] = useState(false)

  const shareOnX = () => {
    const text =
      "RIP request — 2014–2019. Last words: “Merge pull request #314 from someday/maybe”"
    const url = `https://x.com/intent/post?text=${encodeURIComponent(`${text}\n\n${window.location.href}`)}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.prompt("Copy this link", window.location.href)
    }
  }

  const downloadPng = () => {
    const palette = {
      night: "#0d0914",
      stone: "#999991",
      amber: "#d39a47",
      pale: "#eee9df",
    }
    const canvas = document.createElement("canvas")
    canvas.width = 1200
    canvas.height = 630
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const sky = ctx.createLinearGradient(0, 0, 0, 630)
    sky.addColorStop(0, palette.night)
    sky.addColorStop(1, palette.night)
    ctx.fillStyle = sky
    ctx.fillRect(0, 0, 1200, 630)

    ctx.fillStyle = palette.pale
    ctx.globalAlpha = 0.78
    ctx.beginPath()
    ctx.arc(1000, 90, 58, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalAlpha = 1

    ctx.fillStyle = palette.stone
    ctx.beginPath()
    ctx.moveTo(316, 570)
    ctx.lineTo(316, 254)
    ctx.arc(600, 254, 284, Math.PI, 0)
    ctx.lineTo(884, 570)
    ctx.closePath()
    ctx.fill()
    ctx.strokeStyle = palette.pale
    ctx.lineWidth = 4
    ctx.stroke()

    ctx.fillStyle = palette.night
    ctx.textAlign = "center"
    ctx.font = "700 26px Georgia"
    ctx.fillText("IN LOVING MEMORY OF", 600, 190)
    ctx.font = "700 66px Georgia"
    ctx.fillText("request", 600, 262)
    ctx.font = "600 24px Georgia"
    ctx.fillText("BORN 2014  —  DIED 2019", 600, 308)
    ctx.font = "20px monospace"
    ctx.fillText("5 years, 7 months, 12 days", 600, 342)

    ctx.fillStyle = palette.night
    ctx.fillRect(385, 368, 430, 112)
    ctx.strokeStyle = palette.amber
    ctx.lineWidth = 2
    ctx.strokeRect(393, 376, 414, 96)
    ctx.fillStyle = palette.pale
    ctx.font = "700 17px monospace"
    ctx.fillText("†  LAST WORDS  †", 600, 401)
    ctx.font = "italic 24px monospace"
    ctx.fillText("“Merge pull request #314", 600, 435)
    ctx.fillText("from someday/maybe”", 600, 465)
    ctx.fillStyle = palette.night
    ctx.font = "italic 20px Georgia"
    ctx.fillText("Here lies a promise, patiently kept—", 600, 515)
    ctx.fillText("to be finished right after one final step.", 600, 543)

    const link = document.createElement("a")
    link.download = "rip-request-tombstone.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  return (
    <main
      className="page-shell"
      style={
        {
          "--graveyard-photo": `url("${graveyardPhoto}")`,
        } as React.CSSProperties
      }
    >
      <GothicScenery />
      <header className="site-header">
        <a className="brand" href="#" aria-label="RIP.git home">
          <span>RIP</span>
          <i>.git</i>
        </a>
        <a className="bury-link" href="#">
          <span aria-hidden="true">+</span> Bury another repo
        </a>
      </header>

      <section className="result" aria-labelledby="result-title">
        <div className="eyebrow">
          <span /> Repository memorial <span />
        </div>
        <h1 id="result-title">A final resting place</h1>
        <p className="death-notice">
          Declared dead after 1,642 days of silence
        </p>

        <article
          className="tombstone"
          aria-label="Tombstone memorial for request"
        >
          <div className="stone-grain" />
          <div className="stone-content">
            <div className="memorial-mark" aria-hidden="true">
              <span />
              <svg viewBox="0 0 48 48">
                <path d="M16 3h16l10 13-6 29H12L6 16 16 3Zm3 7-7 9 4 19h16l4-19-7-9H19Zm3 6h4v8h7v4h-7v9h-4v-9h-7v-4h7v-8Z" />
              </svg>
              <span />
            </div>

            <p className="in-memory">In loving memory of</p>
            <h2>request</h2>
            <p className="repo-owner">mikeal / request</p>

            <LeafOrnament />

            <div className="dates">
              <div>
                <small>Born</small>
                <strong>2014</strong>
              </div>
              <span className="date-divider" />
              <div>
                <small>Died</small>
                <strong>2019</strong>
              </div>
            </div>
            <p className="lifespan">5 years, 7 months, 12 days</p>

            <div className="last-words">
              <p>
                <span aria-hidden="true">†</span> Last words{" "}
                <span aria-hidden="true">†</span>
              </p>
              <blockquote>
                “Merge pull request #314
                <br />
                from someday/maybe”
              </blockquote>
            </div>

            <p className="epitaph">
              Here lies a promise, patiently kept—
              <br />
              to be finished right after one final step.
            </p>

            <div className="survivors">
              <p>Survived by</p>
              <div className="avatar-row">
                {contributors.map((person) => (
                  <img
                    key={person.name}
                    src={person.avatar}
                    alt={person.name}
                    title={person.name}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="stone-base">
            <span />
          </div>
        </article>

        <div className="actions" aria-label="Share this memorial">
          <button className="primary-action" onClick={shareOnX}>
            <XIcon /> Share on X
          </button>
          <button onClick={downloadPng}>
            <DownloadIcon /> Download PNG
          </button>
          <button onClick={copyLink} className={copied ? "is-copied" : ""}>
            <LinkIcon /> {copied ? "Link copied" : "Copy link"}
          </button>
        </div>
        <p className="permalink">rip.git/mikeal/request</p>
      </section>

      <p className="photo-credit">
        Graveyard photograph by{" "}
        <a
          href="https://unsplash.com/@frostroomhead"
          target="_blank"
          rel="noreferrer"
        >
          Rodion Kutsaiev
        </a>
      </p>
    </main>
  )
}
