import { describe, expect, it } from "vitest";

import { DEFAULT_SITE_URL, getSiteUrl } from "./site";

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
