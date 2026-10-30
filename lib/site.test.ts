import { describe, expect, it } from "vitest";

import { getExperienceLabel } from "./career";
import { DEFAULT_SITE_URL, getSiteUrl, site } from "./site";

describe("site.stats", () => {
  it("lists exactly three numeric home stat cards", () => {
    expect(site.stats).toHaveLength(3);
    expect(site.stats.map((stat) => stat.label)).toEqual([
      "Experience",
      "Logistics UI",
      "Companies",
    ]);
  });

  it("uses defensible values without design-token or FHIR headline metrics", () => {
    const values = site.stats.map((stat) => stat.value);
    expect(values).toEqual([`${getExperienceLabel()} Years`, "15+", "4"]);
    expect(values).not.toContain("Tokens");
    expect(values).not.toContain("FHIR");
  });

  it("does not repeat 15+ in the logistics stat detail", () => {
    const logistics = site.stats.find((stat) => stat.label === "Logistics UI");
    expect(logistics?.detail).toBe("Couriers in live rate UI");
    expect(logistics?.detail).not.toMatch(/15\+/);
  });
});

describe("getSiteUrl", () => {
  it("falls back to the canonical origin", () => {
    expect(getSiteUrl(undefined)).toBe(DEFAULT_SITE_URL);
    expect(getSiteUrl("")).toBe(DEFAULT_SITE_URL);
    expect(getSiteUrl("   ")).toBe(DEFAULT_SITE_URL);
  });

  it("strips trailing slashes from an explicit origin", () => {
    expect(getSiteUrl("https://example.com/")).toBe("https://example.com");
    expect(getSiteUrl("https://example.com///")).toBe("https://example.com");
  });
});
