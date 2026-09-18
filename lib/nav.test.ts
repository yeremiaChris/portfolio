import { describe, expect, it } from "vitest";

import { isNavActive } from "./nav";

describe("isNavActive", () => {
  it("treats hash links as inactive", () => {
    expect(isNavActive("/about", "/#contact")).toBe(false);
  });

  it("matches the home route exactly", () => {
    expect(isNavActive("/", "/")).toBe(true);
    expect(isNavActive("/about", "/")).toBe(false);
  });

  it("matches nested paths for section routes", () => {
    expect(isNavActive("/blog", "/blog")).toBe(true);
    expect(isNavActive("/blog/a-post", "/blog")).toBe(true);
    expect(isNavActive("/about", "/blog")).toBe(false);
  });
});
