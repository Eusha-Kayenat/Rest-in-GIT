# Rest-in-GIT

*Every repo has last words.*

Rest-in-GIT turns any public GitHub repository into a gothic tombstone. Paste a repo URL and you get:

- **Born / Died:** the repo's creation date and the date of its last commit
- **Last words:** the final commit message, labelled by the model (Humble, Defiant, Unfinished…)
- **Survived by:** the top three contributors
- **Cause of death:** archived, dormant for more than a year, or still breathing
- **Epitaph:** two lines written by an open-weight model, in one of five styles
- **Rituals:** "Perform autopsy" and "Hold a séance" buttons
- A **1200×630 PNG card** for sharing on X, downloading or link previews
- A **graveyard** of famous dead repos, the most-starred archived repos on GitHub, and the stones you carved in your own browser

## Setup

Requires **Node 20** and, for AI epitaphs, [Ollama](https://ollama.com).

```bash
git clone https://github.com/Eusha-Kayenat/Rest-in-GIT.git
cd Rest-in-GIT
npm install
ollama pull gemma4:e4b          # optional, the app falls back to stock epitaphs without it
cp .env.example .env.local      # then fill in GITHUB_TOKEN
npm run dev
```

Open http://localhost:3000.

No Ollama? Run `npm run mock:ollama` in another terminal to start a small stand-in server on port 11434. Set `EPITAPH_MODEL=mock-gemma` to use it.

## Environment variables

| Name | Purpose |
| --- | --- |
| `GITHUB_TOKEN` | GitHub personal access token with no extra scopes (public data only). Used server-side only. Optional, but without it GitHub allows only 60 requests an hour. |
| `OLLAMA_URL` | Base URL of the Ollama server, default `http://localhost:11434`. |
| `EPITAPH_MODEL` | Ollama model used for all AI text, default `gemma4:e4b`. |
| `NEXT_PUBLIC_SITE_URL` | Public URL of the site, used for share links and Open Graph card images. |

## The open-weight model

Every AI line (epitaphs, last-words verdicts, autopsies and séances) comes from **Gemma**, Google's open-weight model, running locally through Ollama. No text is sent to a closed, hosted AI API.
- **Prompts** live in `lib/epitaph.ts` and `lib/ai/`.
- **Answers** are cached in memory, keyed by the repo's facts. A new commit gets a fresh epitaph.
- **Timeouts and fallbacks:** each call has a timeout. If the model is missing, slow or returns broken JSON, the app uses hand-written fallbacks and says so on the page.

On a host without a GPU, point `OLLAMA_URL` at a machine that runs Ollama.

## Scripts

- `npm run dev`: start the dev server
- `npm run build`: production build
- `npm start`: serve the production build
- `npm run lint`: ESLint
- `npm test`: Vitest unit and component tests
- `npm run mock:ollama`: stand-in Ollama server for local testing

## Credits

- [Next.js](https://nextjs.org), [React](https://react.dev) and [Tailwind CSS](https://tailwindcss.com)
- `next/og` (Satori) for the card images
- [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com)
- [Gemma](https://ai.google.dev/gemma) through [Ollama](https://ollama.com)
- Fonts: [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) (Christian Thalmann) and [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) (IBM), both under the SIL Open Font License. The card fonts come from [Fontsource](https://fontsource.org).
- Result page background photo by Rodion Kutsaiev on [Unsplash](https://unsplash.com)
- GitHub data from the [GitHub REST API](https://docs.github.com/rest)
