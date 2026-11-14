import { describe, expect, it } from "vitest";

import { headerShellMotionStyle } from "./header-shell-style";

describe("headerShellMotionStyle", () => {
  it("keeps layout radius stable for motion scale correction", () => {
    expect(headerShellMotionStyle(false).borderRadius).toBe(9999);
    expect(headerShellMotionStyle(true).borderRadius).toBe(9999);
  });

  it("reveals shell border only in compact state", () => {
    expect(headerShellMotionStyle(false).borderWidth).toBe(0);
    expect(headerShellMotionStyle(true).borderWidth).toBe(1);
  });
});
