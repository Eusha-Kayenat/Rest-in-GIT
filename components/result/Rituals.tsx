"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { EPITAPH_STYLES, type EpitaphStyle } from "@/lib/ai/styles";

type Ritual = "autopsy" | "seance";
type RitualResult = { ritual: Ritual; text: string; note?: string };

const TITLES: Record<Ritual, string> = { autopsy: "Autopsy report", seance: "A voice from beyond" };
const BUTTON = "border border-pale/25 bg-night/70 px-4 py-2.5 text-pale transition hover:border-amber hover:text-amber disabled:opacity-60";

async function performRitual(owner: string, repo: string, ritual: Ritual, style: EpitaphStyle): Promise<RitualResult> {
  try {
    const res = await fetch("/api/ritual", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ owner, repo, ritual, style }),
    });
    const data: { text?: string; fromModel?: boolean; error?: string } = await res.json();
    if (!res.ok || !data.text) return { ritual, text: data.error ?? "The candles blew out. Try the ritual again." };
    return { ritual, text: data.text, note: data.fromModel ? undefined : "The model is resting, using stock words." };
  } catch {
    return { ritual, text: "The candles blew out. Try the ritual again." };
  }
}

export function Rituals({ owner, repo, style }: { owner: string; repo: string; style: EpitaphStyle }) {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, setPending] = useState<Ritual | null>(null);
  const [result, setResult] = useState<RitualResult | null>(null);

  const changeStyle = (next: string) => router.replace(`${pathname}?style=${encodeURIComponent(next)}`, { scroll: false });

  const lastRitual = useRef<Ritual | null>(null);

  const run = async (ritual: Ritual) => {
    lastRitual.current = ritual;
    setPending(ritual);
    setResult(await performRitual(owner, repo, ritual, style));
    setPending(null);
  };

  const rerun = useRef(run);
  rerun.current = run;
  useEffect(() => {
    if (lastRitual.current) void rerun.current(lastRitual.current);
  }, [style]);

  return (
    <div className="relative z-[2] mx-auto mt-7 max-w-[620px] font-mono text-xs">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <label className="flex items-center gap-2 text-stone">
          Epitaph style
          <select
            value={style}
            onChange={(e) => changeStyle(e.target.value)}
            className="border border-pale/25 bg-night/80 px-3 py-2.5 text-pale capitalize"
          >
            {EPITAPH_STYLES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <button type="button" className={BUTTON} disabled={pending !== null} onClick={() => run("autopsy")}>
          {pending === "autopsy" ? "Opening the casket…" : "Perform autopsy"}
        </button>
        <button type="button" className={BUTTON} disabled={pending !== null} onClick={() => run("seance")}>
          {pending === "seance" ? "Summoning…" : "Hold a séance"}
        </button>
      </div>
      {result && (
        <div className="mx-auto mt-4 max-w-[560px] border border-amber/40 bg-night/75 p-4 text-left" aria-live="polite">
          <p className="text-[10px] uppercase tracking-[0.2em] text-amber">{TITLES[result.ritual]}</p>
          <p className="mt-2 font-serif text-lg italic leading-snug text-pale">{result.text}</p>
          {result.note && <p className="mt-2 text-[10px] text-stone">{result.note}</p>}
        </div>
      )}
    </div>
  );
}
