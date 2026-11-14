import { describe, expect, it } from "vitest";

import {
  buildHeaderNavIndicatorBox,
  buildHeaderNavIndicatorStyle,
  headerNavIndicatorBoxesEqual,
  hiddenHeaderNavIndicator,
} from "./header-nav-indicator";

function rect(left: number, width: number, top = 0, height = 32): DOMRect {
  return {
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
    x: left,
    y: top,
    toJSON: () => ({}),
  } as DOMRect;
}

describe("buildHeaderNavIndicatorBox", () => {
  it("rejects non-finite measurements", () => {
    expect(buildHeaderNavIndicatorBox(rect(NaN, 40), rect(10, 40))).toBeNull();
    expect(buildHeaderNavIndicatorBox(rect(0, 200), rect(NaN, 40))).toBeNull();
    expect(buildHeaderNavIndicatorBox(rect(0, 200), rect(10, 0))).toBeNull();
  });

  it("skips redundant indicator updates", () => {
    const first = buildHeaderNavIndicatorBox(rect(0, 200), rect(50, 80));
    const second = buildHeaderNavIndicatorBox(rect(0, 200), rect(50, 80));
    expect(first).not.toBeNull();
    expect(
      headerNavIndicatorBoxesEqual(first!, second ?? hiddenHeaderNavIndicator),
    ).toBe(true);
  });

  it("never writes non-finite values into indicator inline styles", () => {
    const polluted = buildHeaderNavIndicatorStyle({
      x: Number.NaN,
      width: Number.NaN,
      visible: true,
    });
    const serialized = JSON.stringify(polluted);
    expect(serialized).not.toContain("NaN");
    expect(polluted.transform).toBe("translateX(0px)");
    expect(polluted.width).toBe("0px");
  });

  it("bounds repeated measure calls to stable state updates", () => {
    let updates = 0;
    let current = hiddenHeaderNavIndicator;
    const nav = rect(0, 320);
    const link = rect(120, 64);

    for (let i = 0; i < 50; i++) {
      const next = buildHeaderNavIndicatorBox(nav, link);
      const resolved = next ?? hiddenHeaderNavIndicator;
      if (!headerNavIndicatorBoxesEqual(current, resolved)) {
        updates += 1;
        current = resolved;
      }
    }

    expect(updates).toBe(1);
  });
});
