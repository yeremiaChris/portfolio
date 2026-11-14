import { describe, expect, it } from "vitest";

import {
  headerBarChromeTransitionClass,
  headerNavEmbeddedClass,
  headerNavExpandedClass,
  headerNavIndicatorClass,
  headerNavLinksRowClass,
} from "./header-nav-styles";

describe("headerNavLinksRowClass", () => {
  it("keeps links in a single horizontal non-wrapping row", () => {
    const row = headerNavLinksRowClass();
    expect(row).toContain("flex-row");
    expect(row).toContain("flex-nowrap");
    expect(row).toContain("whitespace-nowrap");
  });

  it("uses plain expanded chrome without a dark nav capsule", () => {
    const expanded = headerNavExpandedClass();
    expect(expanded).toContain("flex-row");
    expect(expanded).not.toContain("bg-foreground");
    expect(expanded).not.toContain("backdrop-blur");
    expect(expanded).not.toContain("shadow-[");
  });

  it("uses a subtle active indicator instead of a strong teal fill", () => {
    expect(headerNavIndicatorClass(false)).toContain("rgb(76_215_246/0.08)");
    expect(headerNavIndicatorClass(true)).toContain("bg-white/[0.06]");
  });

  it("delays bar chrome so morph leads scroll-up and scroll-down", () => {
    expect(headerBarChromeTransitionClass()).toContain("delay-[150ms]");
    expect(headerNavEmbeddedClass()).toContain("delay-[150ms]");
  });
});
