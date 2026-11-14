import { describe, expect, it } from "vitest";

import {
  headerMobileMenuBottomBarMotion,
  headerMobileMenuMiddleBarMotion,
  headerMobileMenuTopBarMotion,
} from "./header-mobile-menu-motion";

describe("header-mobile-menu-motion", () => {
  it("never animates layout top on hamburger bars", () => {
    const configs = [
      headerMobileMenuTopBarMotion(false),
      headerMobileMenuTopBarMotion(true),
      headerMobileMenuMiddleBarMotion(false),
      headerMobileMenuMiddleBarMotion(true),
      headerMobileMenuBottomBarMotion(false),
      headerMobileMenuBottomBarMotion(true),
    ];

    for (const config of configs) {
      expect(Object.keys(config)).not.toContain("top");
    }
  });
});
