<div align="center">

```
                    _.-""""-._
                  .'  _   _   '.
                 /   (_) (_)    \
                |    R . I . P   |
                |  ____________  |
                | |  REST-IN-  | |
                | |    GIT     | |
                | |____________| |
                |                |
                |  Born:  ????   |
                |  Died:  ????   |
                |                |
         .-.    |  "fix typo"    |    .-.
        (   )   |                |   (   )
     ~~~'-'~~~~~'----------------'~~~~'-'~~~
```

# Rest-in-GIT

### *Every repo has last words.*

Paste a dead GitHub repo. Get a tombstone with its birth, its death, its survivors,
and the final commit message it ever whispered.

![Next.js](https://img.shields.io/badge/Next.js-App%20Router-1b1626?style=for-the-badge&logo=nextdotjs&logoColor=e8dff5)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-1b1626?style=for-the-badge&logo=typescript&logoColor=e8dff5)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-1b1626?style=for-the-badge&logo=tailwindcss&logoColor=e8dff5)
![Gemma](https://img.shields.io/badge/Gemma-Open%20Weights-8b5cf6?style=for-the-badge)
![Ollama](https://img.shields.io/badge/Ollama-Local%20AI-1b1626?style=for-the-badge)
![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-Open%20Source%20AI-f59e0b?style=for-the-badge)

**🕯️ Visit the Graveyard** · **⚰️ Watch the Burial (demo)** · **👻 Report a Haunting**

</div>

---

## 🌫️ What is this?

Thousands of open-source projects stop quietly. No announcement, no ceremony, just a
last commit that says `wip` and then silence.

**Rest-in-GIT** gives them a proper goodbye. Paste a GitHub repository URL and the app
reads its public history, then carves it into a shareable tombstone card:

| On the stone | Where it comes from |
| --- | --- |
| 🪦 **Name** | The repository itself |
| 🌙 **Born** | The repo's creation date |
| ☠️ **Died** | The date of the final commit |
| 👻 **Last words** | The final commit message, verbatim |
| 🕯️ **Survived by** | The top contributors |
| ⚰️ **Cause of death** | Archived, or dormant for N years |
| 🦇 **Epitaph** | Written by an open-weight model (Gemma) |

The real last words are often funnier, or sadder, than anything we could invent.
`fix typo` hits differently when it's the last thing a project ever says.

> *Behind every abandoned repo is someone who once believed in it.*

---

## 👻 Sightings

> Replace these placeholders with real screenshots after your first burial.

| The Gates (Home) | The Headstone (Result) | The Graveyard |
| --- | --- | --- |
| ![Home](docs/screenshots/home.png) | ![Result](docs/screenshots/result.png) | ![Graveyard](docs/screenshots/graveyard.png) |

---

## 🕯️ Features

- **⚰️ Instant tombstones.** Paste `owner/repo` or any GitHub URL; get a card in seconds.
- **🦇 AI epitaphs in five voices.** Classic, Shakespearean, noir detective, nature documentary, disappointed parent.
- **🕷️ Last-words classifier.** Every final commit is rated: *Optimistic*, *Humble*, *Self-aware*, *In denial*, *Tragically hopeful*, or *Legendary*.
- **🩸 Autopsy.** The model speculates (clearly labeled) about why the repo died.
- **👻 Séance.** The repo speaks one short message from beyond the grave, using only real facts.
- **🌙 Shareable cards.** Every tombstone has its own URL and a 1200×630 image, so a pasted link shows the card in your feed.
- **🪦 The Graveyard.** A grid of famous dead repos, a "Most mourned" tab, and *Your graveyard* for everything you have buried.
- **🕯️ Candles.** Light one for a repo you miss. (Candles are stored in your browser, no database needed.)
- **🧟 Zero database.** Data comes from GitHub, caching does the rest.

---

## 🧙 How it works

```
   paste URL
       │
       ▼
  ┌──────────────┐    ┌────────────────────────────┐
  │ parse + check│───▶│ GitHub REST API (server)   │
  └──────────────┘    │  · repo info               │
                      │  · latest commit           │
                      │  · top contributors        │
                      └─────────────┬──────────────┘
                                    │ facts
                                    ▼
                      ┌────────────────────────────┐
                      │ Gemma via Ollama           │
                      │  · epitaph                 │
                      │  · last-words rating       │
                      │  · autopsy / séance        │
                      └─────────────┬──────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
          🪦 Result page (React)         🌙 /api/card image (PNG)
```

A repo counts as **dead** if its last commit is over a year old, or **archived** if its
maintainers closed it. If it is still active, Rest-in-GIT politely declines:
*"This repo is alive. Rude of you to assume otherwise."*

---

## 🕷️ Tech stack

| Layer | Tool |
| --- | --- |
| Design | **Figma Make** (home, result, graveyard, tombstone card) |
| Coding | **Cursor** and **Devin** |
| Framework | **Next.js** (App Router), **TypeScript**, **Tailwind CSS** |
| Data | **GitHub REST API**, server-side only |
| AI | **Gemma**, an open-weight model, run locally with **Ollama** |
| Card images | `next/og` (`ImageResponse`) |
| Fonts | Cormorant Garamond and IBM Plex Mono |

### Why an open-weight model?

Rest-in-GIT is a project about software that was abandoned. So it would be a little
ironic to depend on a service that might disappear.

Because Gemma is open-weight:

- the app **runs offline** and costs nothing per tombstone;
- the model can be **swapped, tuned or fine-tuned**;
- nothing here is locked inside someone else's API.

---

## 🩸 Summoning it locally

### Prerequisites

- **Node.js 20+**
- **Git**
- **[Ollama](https://ollama.com)** installed and running
- A **GitHub personal access token** with *no scopes* (public data only)

### Ritual

```bash
# 1. Dig up the code
git clone https://github.com/your-username/rest-in-git.git
cd rest-in-git

# 2. Install the bones
npm install

# 3. Summon the model (pick a size that fits your machine)
ollama pull gemma4:e4b      # or gemma4:e2b on a weaker laptop

# 4. Whisper your secrets
cp .env.example .env.local
# then open .env.local and add your GitHub token

# 5. Raise the dead
npm run dev
```

Open **http://localhost:3000**, paste a repo, and bury it.

### Environment variables

| Variable | Purpose | Default |
| --- | --- | --- |
| `GITHUB_TOKEN` | Raises the GitHub API limit from 60 to 5,000 requests per hour. Server-side only. | *(none)* |
| `OLLAMA_URL` | Where Ollama is listening | `http://localhost:11434` |
| `EPITAPH_MODEL` | The Gemma model tag to use | `gemma4:e4b` |
| `NEXT_PUBLIC_SITE_URL` | Base URL used for share links and card images | `http://localhost:3000` |

> ☠️ **Never commit `.env.local`.** The token should stay on the server and never reach the browser.

### 🕸️ If the model is asleep

If Ollama is unreachable or too slow, Rest-in-GIT falls back to a hand-written stock
epitaph and shows a small note: *"The model is resting, using a stock epitaph."*
The tombstone always renders.

---

## 🕸️ Project layout

```
rest-in-git/
├── app/
│   ├── page.tsx                      # The Gates (home)
│   ├── rip/[owner]/[repo]/page.tsx   # The Headstone (result)
│   ├── graveyard/page.tsx            # The Graveyard
│   └── api/card/[owner]/[repo]/      # Shareable PNG card
├── lib/
│   ├── github.ts                     # GitHub data + URL parsing
│   ├── epitaph.ts                    # Gemma calls (epitaph, rating, autopsy, séance)
│   ├── tombstone.ts                  # Status and cause-of-death logic
│   └── types.ts                      # Tombstone type
├── data/graveyard.json               # Hand-picked famous dead repos
├── design/                           # Figma Make exports and screenshots
├── scripts/mock-ollama.mjs           # Fake model server for tests
└── .env.example
```

---

## 🌙 Deploying

The web app deploys to any Node host (Render, DigitalOcean, Vercel).

> **The catch:** a typical small web host cannot run a useful model. Choose one:
>
> 1. **Demo locally** and record a video (simplest).
> 2. Host **Ollama on a GPU machine** (for example a DigitalOcean GPU Droplet) and set `OLLAMA_URL`.
> 3. Point `OLLAMA_URL` at any provider that **serves Gemma**, and keep the endpoint protected.

---

## 🎃 Built for Hacktoberfest

Made for the **Hacktoberfest Open-Source AI Challenge**, under the *Ghost in the Machine*
and *Día de los Muertos* spirit: remembering the things that came before us.

| Tool | How it was used |
| --- | --- |
| Figma Make | Designed every screen and the tombstone card |
| Cursor / Devin | Built the app from the designs, milestone by milestone |
| Gemma (open-weight) | Epitaphs, last-words rating, autopsy and séance |

---

## ☠️ Roadmap

- [ ] A **Resurrect** button: list the most-wanted unresolved issues and the forks still alive
- [ ] **Maintainer opt-out** so any maintainer can remove their repo's card
- [ ] More tombstone styles (gothic, Día de los Muertos marigolds, pixel art)
- [ ] An embeddable **"RIP" README badge** for archived projects
- [ ] **Bulk burial:** paste a `package.json` and bury every abandoned dependency
- [ ] **Dead or alive?** A quick guessing game
- [ ] A fine-tuned epitaph model

---

## 🧟 Contributing

Dead code can still be brought back to life, and so can this repo.

1. Fork the repo
2. Create a branch: `git checkout -b feature/new-way-to-die`
3. Commit with a clear message (not just `wip`... we'll know)
4. Open a pull request

Ideas for good first issues: new epitaph styles, more famous graveyard entries, new
last-words categories, and better mobile layouts.

---

## 👻 Responsible haunting

- Only **public** GitHub data is used.
- The tone is affectionate. The goal is to **honor the work, not mock the people.**
- Epitaphs tease the code and the situation, never the maintainers.
- If you maintain a repo and want its card removed, open an issue and it will be taken down.

---

## 🦇 Credits

- Tombstones, fog and candles: designed in **Figma Make**
- Fonts: **Cormorant Garamond** and **IBM Plex Mono** (both under the SIL Open Font License)
- Data: the **GitHub REST API**
- Model: **Gemma**, served with **Ollama**
- Every maintainer whose last commit made someone smile

## 🕸️ License

Released under the [MIT License](LICENSE). *(Add a LICENSE file to your repo.)*

---

<div align="center">

### 🪦 Rest in GIT.

*Your last commit was `wip`. We remember.*

**Made with 🖤, 🕯️ and far too many open issues.**

</div>
