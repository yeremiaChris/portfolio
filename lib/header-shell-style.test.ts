import { describe, expect, it } from "vitest";

import { headerShellBackdropStyle } from "./header-shell-style";

describe("headerShellBackdropStyle", () => {
  it("stays invisible when expanded", () => {
    const style = headerShellBackdropStyle(false);
    expect(style.backgroundColor).toBe("rgb(22 27 34 / 0)");
    expect(style.boxShadow).toBe("none");
  });

  it("uses a borderless translucent pill when compact", () => {
    const style = headerShellBackdropStyle(true);
    expect(style.backgroundColor).toBe("rgb(22 27 34 / 0.82)");
    expect(style.backdropFilter).toBe("blur(14px)");
    expect(style.borderRadius).toBe(9999);
  });
});
