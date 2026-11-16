import { describe, expect, it } from "vitest";

import { servicesHeroTitleWords } from "./servicesMotion";

describe("servicesHeroTitleWords", () => {
  it("splits a headline on whitespace", () => {
    expect(
      servicesHeroTitleWords(
        "I build fast, reliable websites and web systems for businesses.",
      ),
    ).toEqual([
      "I",
      "build",
      "fast,",
      "reliable",
      "websites",
      "and",
      "web",
      "systems",
      "for",
      "businesses.",
    ]);
  });
});
