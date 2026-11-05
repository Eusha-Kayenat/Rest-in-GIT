import { MODEL_RESTING_NOTE, writeEpitaph, type EpitaphStyle } from "@/lib/epitaph";
import type { RepoFacts } from "@/lib/types";

export async function AiEpitaph({ facts, style }: { facts: RepoFacts; style: EpitaphStyle }) {
  const { text, fromModel } = await writeEpitaph(facts, style);
  const [first, second] = text.split("\n");
  return (
    <>
      <p>
        {first}
        <br />
        {second}
      </p>
      {!fromModel && (
        <span className="mt-1 block font-mono text-[10px] not-italic tracking-wide text-black/50">
          {MODEL_RESTING_NOTE}
        </span>
      )}
    </>
  );
}
