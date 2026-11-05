import { classifyLastWords } from "@/lib/epitaph";

export async function LastWordsVerdict({ lastWords }: { lastWords: string }) {
  const { category, joke } = await classifyLastWords(lastWords);
  return (
    <div className="mt-2 text-center">
      <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-amber">{category}</span>
      <span className="block font-serif text-sm italic text-pale/80">{joke}</span>
    </div>
  );
}
