import { describe, expect, it } from "vitest";

import {
  HEADER_COMPACT_SCROLL_THRESHOLD_PX,
  isHeaderCompact,
} from "./header-compact";

describe("isHeaderCompact", () => {
  it("stays expanded at and below the scroll threshold", () => {
    expect(isHeaderCompact(0)).toBe(false);
    expect(isHeaderCompact(HEADER_COMPACT_SCROLL_THRESHOLD_PX)).toBe(false);
  });

  it("enters compact state above the threshold", () => {
    expect(isHeaderCompact(HEADER_COMPACT_SCROLL_THRESHOLD_PX + 1)).toBe(true);
    expect(isHeaderCompact(240)).toBe(true);
  });
});
