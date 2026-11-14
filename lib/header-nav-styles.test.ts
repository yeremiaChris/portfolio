import { describe, expect, it } from "vitest";

import {
  headerNavEmbeddedClass,
  headerNavLinksRowClass,
  headerNavPillClass,
} from "./header-nav-styles";

describe("headerNavLinksRowClass", () => {
  it("keeps links in a single horizontal non-wrapping row", () => {
    const row = headerNavLinksRowClass();
    expect(row).toContain("flex-row");
    expect(row).toContain("flex-nowrap");
    expect(row).toContain("whitespace-nowrap");
  });

  it("applies the row layout to both expanded and embedded nav chrome", () => {
    expect(headerNavPillClass()).toContain("flex-row");
    expect(headerNavEmbeddedClass()).toContain("flex-row");
  });
});
