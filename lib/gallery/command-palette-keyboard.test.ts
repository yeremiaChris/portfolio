import { describe, expect, it } from "vitest";

import {
  nextActiveIndex,
  resolveCommandPaletteKey,
} from "@/lib/gallery/command-palette-keyboard";

describe("nextActiveIndex", () => {
  it("wraps at edges", () => {
    expect(nextActiveIndex(2, "down", 3)).toBe(0);
    expect(nextActiveIndex(0, "up", 3)).toBe(2);
  });

  it("returns -1 for empty lists", () => {
    expect(nextActiveIndex(0, "down", 0)).toBe(-1);
  });
});

describe("resolveCommandPaletteKey", () => {
  it("toggles open on mod+k", () => {
    expect(
      resolveCommandPaletteKey({
        key: "k",
        metaKey: true,
        open: false,
        activeIndex: 0,
        resultCount: 3,
      }),
    ).toEqual({ type: "open" });

    expect(
      resolveCommandPaletteKey({
        key: "k",
        ctrlKey: true,
        open: true,
        activeIndex: 0,
        resultCount: 3,
      }),
    ).toEqual({ type: "close" });
  });

  it("moves selection when open", () => {
    expect(
      resolveCommandPaletteKey({
        key: "ArrowDown",
        open: true,
        activeIndex: 0,
        resultCount: 3,
      }),
    ).toEqual({ type: "move", index: 1 });
  });

  it("ignores navigation when closed", () => {
    expect(
      resolveCommandPaletteKey({
        key: "ArrowDown",
        open: false,
        activeIndex: 0,
        resultCount: 3,
      }),
    ).toEqual({ type: "none" });
  });
});
