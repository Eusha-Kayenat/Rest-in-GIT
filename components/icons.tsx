export function GithubMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 .7a11.6 11.6 0 0 0-3.67 22.6c.58.1.8-.25.8-.56v-2.02c-3.25.7-3.94-1.38-3.94-1.38-.53-1.35-1.3-1.71-1.3-1.71-1.06-.73.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.4-1.27.74-1.56-2.6-.3-5.33-1.3-5.33-5.74 0-1.27.45-2.3 1.2-3.12-.12-.3-.52-1.48.11-3.08 0 0 .98-.31 3.19 1.2A11.1 11.1 0 0 1 12 6.71c.99 0 1.97.13 2.9.39 2.22-1.51 3.2-1.2 3.2-1.2.63 1.6.23 2.78.11 3.08.75.82 1.2 1.85 1.2 3.12 0 4.46-2.74 5.44-5.34 5.73.42.36.79 1.08.79 2.18v2.73c0 .31.2.67.8.56A11.6 11.6 0 0 0 12 .7Z"
      />
    </svg>
  );
}

export function Bat({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 42 18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21 16.8c-2.6-3.5-4.2-5.5-7.4-6.3-2.8-.7-4.8.3-7.2 1.7.5-2.1-.2-4.2-2-5.5C2.8 5.6 1.1 5.8 0 6.1c2.1-3.4 5.5-5.5 9.1-5 4.8.5 7.5 4.5 9.3 7.4.3-2.6 1.1-4.3 2.6-5.2 1.5.9 2.3 2.6 2.6 5.2 1.8-2.9 4.5-6.9 9.3-7.4 3.6-.5 7 1.6 9.1 5-1.1-.3-2.8-.5-4.4.6-1.8 1.3-2.5 3.4-2 5.5-2.4-1.4-4.4-2.4-7.2-1.7-3.2.8-4.8 2.8-7.4 6.3Z"
      />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

export function CandleIcon({ lit = false }: { lit?: boolean }) {
  return (
    <svg className={lit ? "candle-icon lit" : "candle-icon"} viewBox="0 0 24 24" aria-hidden="true">
      <path
        className="flame"
        d="M12 2c2.3 2.5 3.1 4.2 2.2 5.8A2.5 2.5 0 0 1 12 9.1 2.5 2.5 0 0 1 9.8 7.8C9 6.2 9.8 4.5 12 2Z"
      />
      <path d="M8.5 10.5h7v10h-7zM7 21h10" />
      <path d="M12 10.5v3" />
    </svg>
  );
}

export function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.39L6.48 22H3.36l7.26-8.3L2.98 2h6.4l4.42 5.84L18.9 2Zm-1.1 17.84h1.73L8.44 4.05H6.58L17.8 19.84Z" />
    </svg>
  );
}

export function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v12m0 0 5-5m-5 5-5-5M5 20h14" />
    </svg>
  );
}

export function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.54.54l2-2a5 5 0 0 0-7.07-7.07l-1.15 1.15M14 11a5 5 0 0 0-7.54-.54l-2 2a5 5 0 0 0 7.07 7.07l1.14-1.14" />
    </svg>
  );
}
