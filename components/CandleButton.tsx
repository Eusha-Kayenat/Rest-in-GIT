"use client";

import { useState } from "react";
import { CandleIcon } from "./icons";

export function CandleButton({ initialCount }: { initialCount: number }) {
  const [lit, setLit] = useState(false);
  return (
    <button
      className={lit ? "respect-button is-lit" : "respect-button"}
      onClick={() => setLit((current) => !current)}
      aria-pressed={lit}
    >
      <CandleIcon lit={lit} />
      <span>{lit ? "Candle lit" : "Light a candle"}</span>
      <strong>{(initialCount + (lit ? 1 : 0)).toLocaleString("en-US")}</strong>
    </button>
  );
}
