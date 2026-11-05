"use client";

import { candleStore, graveKey, NO_CANDLES, toggleCandle } from "@/lib/graveyard-storage";
import { useStore } from "@/lib/browser-store";
import { CandleIcon } from "./icons";

export function CandleButton({ owner, repo }: { owner: string; repo: string }) {
  const key = graveKey({ owner, repo });
  const lit = useStore(candleStore, NO_CANDLES).includes(key);
  return (
    <button
      className={lit ? "respect-button is-lit" : "respect-button"}
      onClick={() => toggleCandle(key)}
      aria-pressed={lit}
      aria-label={`${lit ? "Blow out the candle" : "Light a candle"} for ${repo}`}
      title="Candles are kept in this browser only"
    >
      <CandleIcon lit={lit} />
      <span>{lit ? "Candle lit" : "Light a candle"}</span>
      <strong>{lit ? "1" : "0"}</strong>
    </button>
  );
}
