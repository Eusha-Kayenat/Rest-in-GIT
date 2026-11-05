"use client";

import { useStore } from "@/lib/browser-store";
import { candleStore, NO_CANDLES } from "@/lib/graveyard-storage";

export function GraveyardStats({ buried }: { buried: number }) {
  const candles = useStore(candleStore, NO_CANDLES).length;
  return (
    <div className="graveyard-stats" aria-label="Graveyard statistics">
      <span>
        <strong>{buried.toLocaleString("en-US")}</strong> repos buried
      </span>
      <i />
      <span title="Candles are kept in this browser only">
        <strong>{candles.toLocaleString("en-US")}</strong> candles lit in this browser
      </span>
    </div>
  );
}
