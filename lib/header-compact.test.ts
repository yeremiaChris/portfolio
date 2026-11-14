import { describe, expect, it } from "vitest";

import {
  HEADER_COMPACT_ENTER_PX,
  HEADER_COMPACT_EXIT_PX,
  resolveHeaderCompact,
} from "./header-compact";

describe("resolveHeaderCompact", () => {
  it("stays expanded through the enter threshold", () => {
    expect(resolveHeaderCompact(0, false)).toBe(false);
    expect(resolveHeaderCompact(HEADER_COMPACT_ENTER_PX, false)).toBe(false);
  });

  it("enters compact above the enter threshold", () => {
    expect(resolveHeaderCompact(HEADER_COMPACT_ENTER_PX + 1, false)).toBe(true);
  });

  it("holds compact between exit and enter thresholds", () => {
    expect(resolveHeaderCompact(HEADER_COMPACT_EXIT_PX, true)).toBe(true);
    expect(resolveHeaderCompact(52, true)).toBe(true);
  });

  it("exits compact below the exit threshold", () => {
    expect(resolveHeaderCompact(HEADER_COMPACT_EXIT_PX - 1, true)).toBe(false);
  });
});
