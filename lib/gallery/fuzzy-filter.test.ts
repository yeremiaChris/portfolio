import { describe, expect, it } from "vitest";

import { fuzzyFilterItems, fuzzyScore } from "@/lib/gallery/fuzzy-filter";

const ITEMS = [
  { id: "a", label: "Go to Overview", keywords: "home dashboard" },
  { id: "b", label: "Open Projects", keywords: "work" },
  { id: "c", label: "Browse Blog", keywords: "posts writing" },
] as const;

describe("fuzzyScore", () => {
  it("matches subsequence letters", () => {
    expect(fuzzyScore("ov", "Go to Overview")).not.toBeNull();
    expect(fuzzyScore("zzz", "Go to Overview")).toBeNull();
  });

  it("returns zero for empty query", () => {
    expect(fuzzyScore("", "Anything")).toBe(0);
  });
});

describe("fuzzyFilterItems", () => {
  it("returns all items for empty query", () => {
    expect(fuzzyFilterItems(ITEMS, "")).toHaveLength(ITEMS.length);
  });

  it("filters and ranks by label and keywords", () => {
    const filtered = fuzzyFilterItems(ITEMS, "blog");
    expect(filtered.map((i) => i.id)).toEqual(["c"]);

    const home = fuzzyFilterItems(ITEMS, "dash");
    expect(home[0]?.id).toBe("a");
  });
});
