"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useStore } from "@/lib/browser-store";
import { myGravesStore, NO_GRAVES } from "@/lib/graveyard-storage";
import type { GraveyardEntry } from "@/lib/types";
import { GraveCard } from "../GraveCard";
import { SearchIcon } from "../icons";

const ALL_LANGUAGES = "All";
const ALL_YEARS = "All years";
const TABS = [
  { id: "famous", label: "Famous" },
  { id: "mourned", label: "Most mourned" },
  { id: "mine", label: "Your graveyard" },
] as const;
type TabId = (typeof TABS)[number]["id"];

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

export function GraveyardBrowser({ famous, mourned }: { famous: GraveyardEntry[]; mourned: GraveyardEntry[] }) {
  const [tab, setTab] = useState<TabId>("famous");
  const mine = useStore(myGravesStore, NO_GRAVES);
  const entries = tab === "famous" ? famous : tab === "mourned" ? mourned : mine;
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

  const switchTab = (next: TabId) => {
    setTab(next);
    clearFilters();
  };

  return (
    <>
      <div className="graveyard-tabs" role="tablist" aria-label="Graveyard sections">
        {TABS.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={tab === item.id}
            className={tab === item.id ? "graveyard-tab active" : "graveyard-tab"}
            onClick={() => switchTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
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
        <span>
          {filtered.length} resting places{tab === "mine" ? " · kept in this browser only" : ""}
        </span>
        {isFiltered && <button onClick={clearFilters}>Clear filters</button>}
      </div>

      {filtered.length > 0 ? (
        <section className="grave-grid" aria-live="polite">
          {filtered.map((entry) => (
            <GraveCard key={`${entry.owner}/${entry.repo}`} entry={entry} />
          ))}
        </section>
      ) : tab === "mine" && entries.length === 0 ? (
        <section className="empty-state">
          <div className="empty-stone">∅</div>
          <h2>Your graveyard is empty</h2>
          <p>Tombstones you carve in this browser are kept here. Nothing leaves your machine.</p>
          <Link className="empty-link" href="/">
            Bury a repo
          </Link>
        </section>
      ) : entries.length === 0 ? (
        <section className="empty-state">
          <div className="empty-stone">?</div>
          <h2>The gravedigger is resting</h2>
          <p>GitHub did not answer. Try the other sections or come back later.</p>
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
