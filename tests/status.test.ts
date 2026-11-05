import { describe, expect, it } from "vitest";
import { commitMoment, deriveStatus, lifespanYears, NO_LAST_WORDS, toLastWords } from "../lib/status";

const now = new Date("2026-11-05T00:00:00Z");

describe("deriveStatus", () => {
  it("archived wins over everything", () => {
    expect(deriveStatus({ archived: true, lastCommit: "2026-11-01T00:00:00Z", now })).toEqual({
      status: "archived",
      causeOfDeath: "Archived by its maintainers",
    });
  });

  it("no commits means never-lived", () => {
    expect(deriveStatus({ archived: false, lastCommit: null, now }).status).toBe("never-lived");
  });

  it("last commit over a year ago is dead, with whole years", () => {
    expect(deriveStatus({ archived: false, lastCommit: "2020-02-11T00:00:00Z", now })).toEqual({
      status: "dead",
      causeOfDeath: "Dormant for 6 years",
    });
    expect(deriveStatus({ archived: false, lastCommit: "2025-06-01T00:00:00Z", now }).causeOfDeath).toBe(
      "Dormant for 1 year",
    );
  });

  it("turns dead exactly on the calendar anniversary", () => {
    const anniversary = new Date("2026-11-05T14:00:00Z");
    expect(deriveStatus({ archived: false, lastCommit: "2025-11-05T14:00:00Z", now: anniversary }).status).toBe("dead");
    expect(deriveStatus({ archived: false, lastCommit: "2025-11-05T14:00:01Z", now: anniversary }).status).toBe("alive");
    const leapAnniversary = new Date("2025-02-28T00:00:00Z");
    expect(deriveStatus({ archived: false, lastCommit: "2024-02-28T00:00:00Z", now: leapAnniversary }).status).toBe("dead");
    expect(deriveStatus({ archived: false, lastCommit: "2024-02-29T00:00:00Z", now: leapAnniversary }).status).toBe("alive");
  });

  it("recent commit is alive", () => {
    expect(deriveStatus({ archived: false, lastCommit: "2026-06-01T00:00:00Z", now }).status).toBe("alive");
  });
});

describe("derived facts", () => {
  it("takes the first line of the last commit and truncates it", () => {
    expect(toLastWords("fix typo\n\nlong body")).toBe("fix typo");
    expect(toLastWords(null)).toBe(NO_LAST_WORDS);
    const long = toLastWords("x".repeat(120));
    expect(long).toHaveLength(80);
    expect(long.endsWith("…")).toBe(true);
  });

  it("computes lifespan and the moment of death", () => {
    expect(lifespanYears("2011-01-23T00:00:00Z", "2020-02-11T00:00:00Z")).toBe(9.1);
    expect(commitMoment("2020-02-11T14:30:00Z")).toEqual({ weekday: "Tuesday", hour: 14 });
    expect(commitMoment(null)).toEqual({ weekday: null, hour: null });
  });
});
