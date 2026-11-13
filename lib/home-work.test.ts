import { describe, expect, it } from "vitest";

import {
  getFeaturedHomeWorkCard,
  getSecondaryHomeWorkCards,
} from "@/lib/home-work";

describe("home work bento cards", () => {
  it("maps PrimaKu to projects assets and proof links", () => {
    const featured = getFeaturedHomeWorkCard();
    expect(featured.image).toBe("/projects/featured-primaku.webp");
    expect(featured.href).toBe("/projects#primaku");
    expect(featured.visitUrl).toBe("https://primaku.com");
    expect(featured.chips.length).toBeGreaterThan(0);
  });

  it("maps secondary case studies to screenshots and anchors", () => {
    const secondary = getSecondaryHomeWorkCards();
    expect(secondary).toHaveLength(2);
    expect(secondary.map((card) => card.id)).toEqual([
      "mazecare",
      "kiriminaja",
    ]);
    for (const card of secondary) {
      expect(card.image).toMatch(/^\/projects\/featured-/);
      expect(card.href).toMatch(/^\/projects#/);
      expect(card.chips.length).toBeGreaterThan(0);
    }
  });
});
