import { factJokes } from "@/lib/jokes";
import type { RepoFacts } from "@/lib/types";

export function FactJokes({ facts }: { facts: RepoFacts }) {
  return (
    <dl className="relative z-[2] mx-auto mt-8 grid max-w-[640px] grid-cols-2 gap-x-6 gap-y-4 text-center font-mono sm:grid-cols-4">
      {factJokes(facts).map(({ label, value }) => (
        <div key={label}>
          <dt className="text-[10px] uppercase tracking-[0.18em] text-stone">{label}</dt>
          <dd className="mt-1 text-sm text-pale">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
