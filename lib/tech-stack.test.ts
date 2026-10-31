import { describe, expect, it } from "vitest";

import {
  coreTools,
  secondaryTechCategories,
  techStackIntro,
} from "./tech-stack";

describe("techStackIntro", () => {
  it("uses a plain section title", () => {
    expect(techStackIntro.title).toBe("Tools I use");
    expect(techStackIntro.title).not.toMatch(/Production Engineering/i);
  });
});

describe("coreTools", () => {
  it("highlights five production stacks with real project context", () => {
    expect(coreTools).toHaveLength(5);
    expect(coreTools.map((tool) => tool.title)).toEqual([
      "React · Next.js",
      "Vue · Nuxt",
      "TypeScript",
      "Tailwind",
      "GraphQL · REST APIs",
    ]);
    expect(coreTools[0]?.context).toMatch(/PrimaKu/i);
    expect(coreTools[1]?.context).toMatch(/Mazecare/i);
    expect(coreTools[1]?.context).toMatch(/KiriminAja/i);
  });
});

describe("secondaryTechCategories", () => {
  it("groups the remaining stack without badge labels", () => {
    expect(secondaryTechCategories.map((category) => category.title)).toEqual([
      "Frontend",
      "Data & APIs",
      "Delivery",
    ]);
  });

  it("does not list PostgreSQL or duplicate core API tools", () => {
    const allItems = secondaryTechCategories.flatMap(
      (category) => category.items,
    );
    expect(allItems.join(" ")).not.toMatch(/PostgreSQL/i);
    expect(allItems).not.toContain("GraphQL");
    expect(allItems).not.toContain("REST APIs");
  });

  it("includes Vue ecosystem tools only in core cards, not as duplicate framework chips", () => {
    const allItems = secondaryTechCategories.flatMap(
      (category) => category.items,
    );
    expect(allItems.join(" ")).not.toMatch(/\bVue\b/);
    expect(allItems.join(" ")).not.toMatch(/\bNuxt\b/);
  });
});
