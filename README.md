# Rest-in-GIT

*Every repo has last words.*

Paste a GitHub repo URL and get a shareable tombstone card for it: born and died dates, the final commit message as its last words, the top contributors it leaves behind, a cause of death and an epitaph written by an open-weight model (Gemma through Ollama).

## Setup

Requires Node 20.

```bash
npm install
cp .env.example .env.local   # then fill in GITHUB_TOKEN
npm run dev
```

Open http://localhost:3000.

## Environment variables

| Name | Purpose |
| --- | --- |
| `GITHUB_TOKEN` | GitHub personal access token with no extra scopes (public data only). Server-side only. |
| `OLLAMA_URL` | Base URL of the Ollama server, default `http://localhost:11434`. |
| `EPITAPH_MODEL` | Ollama model used for epitaphs, default `gemma4:e4b`. |
| `NEXT_PUBLIC_SITE_URL` | Public URL of the site, used for share links and card images. |

## Scripts

- `npm run dev`: start the dev server
- `npm run build`: production build
- `npm run lint`: ESLint
