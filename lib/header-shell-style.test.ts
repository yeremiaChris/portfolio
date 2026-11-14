import { describe, expect, it } from "vitest";

import { headerShellMotionStyle } from "./header-shell-style";

describe("headerShellMotionStyle", () => {
  it("removes shell chrome when expanded", () => {
    expect(headerShellMotionStyle(false).borderWidth).toBe(0);
    expect(headerShellMotionStyle(false).backdropFilter).toBe("blur(0px)");
  });

  it("applies pill chrome when compact", () => {
    const style = headerShellMotionStyle(true);
    expect(style.borderWidth).toBe(1);
    expect(style.borderRadius).toBe(9999);
    expect(style.backdropFilter).toBe("blur(12px)");
  });
});
