import { describe, expect, it } from "vitest";
import { sanitizeParam, truncate } from "../lib/card";

describe("sanitizeParam", () => {
  it("strips HTML and trims whitespace", () => {
    expect(sanitizeParam('  <b>Here</b> lies <script>alert(1)</script>a repo ')).toBe("Here lies alert(1)a repo");
  });

  it("keeps at most two lines", () => {
    expect(sanitizeParam("one\ntwo\nthree")).toBe("one\ntwo");
  });

  it("caps length at 120 characters", () => {
    const value = sanitizeParam("x".repeat(500));
    expect(value).toHaveLength(120);
    expect(value?.endsWith("…")).toBe(true);
  });

  it("returns null for empty or tag-only input", () => {
    expect(sanitizeParam(null)).toBeNull();
    expect(sanitizeParam("<img src=x onerror=alert(1)>")).toBeNull();
  });
});

describe("truncate", () => {
  it("leaves short text alone", () => {
    expect(truncate("wip", 10)).toBe("wip");
  });
});
