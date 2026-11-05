"use client";

import { useMemo, useState } from "react";
import type { GraveyardEntry } from "@/lib/types";
import { GraveCard } from "../GraveCard";
import { SearchIcon } from "../icons";

const ALL_LANGUAGES = "All";
const ALL_YEARS = "All years";

function decadeOf(year: number): string {
  return `${Math.floor(year / 10) * 10}s`;
}

function uniqueSorted(values: string[]): string[] {
  return [...new Set(values)].sort();
}

function matchesQuery(entry: GraveyardEntry, query: string): boolean {
  if (!query) return true;
  return [entry.owner, entry.repo, entry.description, entry.lastWords].some((field) =>
    field.toLowerCase().includes(query),
  );
}

function ChipGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="filter-group">
      <span className="filter-label">{label}</span>
      <div className="chips">
        {options.map((item) => (
          <button
            className={value === item ? "chip active" : "chip"}
            key={item}
            onClick={() => onChange(item)}
            aria-pressed={value === item}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export function GraveyardBrowser({ entries }: { entries: GraveyardEntry[] }) {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState(ALL_LANGUAGES);
  const [decade, setDecade] = useState(ALL_YEARS);

  const languages = useMemo(() => [ALL_LANGUAGES, ...uniqueSorted(entries.map((e) => e.language))], [entries]);
  const decades = useMemo(() => [ALL_YEARS, ...uniqueSorted(entries.map((e) => decadeOf(e.died)))], [entries]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return entries.filter(
      (entry) =>
        matchesQuery(entry, normalized) &&
        (language === ALL_LANGUAGES || entry.language === language) &&
        (decade === ALL_YEARS || decadeOf(entry.died) === decade),
    );
  }, [entries, query, language, decade]);

  const isFiltered = query !== "" || language !== ALL_LANGUAGES || decade !== ALL_YEARS;
  const clearFilters = () => {
    setQuery("");
    setLanguage(ALL_LANGUAGES);
    setDecade(ALL_YEARS);
  };

  return (
    <>
      <section className="filters" aria-label="Search and filter repositories">
        <div className="search-wrap">
          <SearchIcon />
          <input
            type="search"
            placeholder="Search the departed..."
            aria-label="Search repositories"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="filter-row">
          <ChipGroup label="Language" options={languages} value={language} onChange={setLanguage} />
          <div className="filter-divider" />
          <ChipGroup label="Buried in" options={decades} value={decade} onChange={setDecade} />
        </div>
      </section>

      <div className="results-heading">
        <span>{filtered.length} resting places</span>
        {isFiltered && <button onClick={clearFilters}>Clear filters</button>}
      </div>

      {filtered.length > 0 ? (
        <section className="grave-grid" aria-live="polite">
          {filtered.map((entry) => (
            <GraveCard key={`${entry.owner}/${entry.repo}`} entry={entry} />
          ))}
        </section>
      ) : (
        <section className="empty-state">
          <div className="empty-stone">?</div>
          <h2>No spirits found</h2>
          <p>Try another name or clear the filters to wander the full graveyard.</p>
          <button onClick={clearFilters}>Clear all filters</button>
        </section>
      )}
    </>
  );
}
