export function MiniTombstone() {
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
