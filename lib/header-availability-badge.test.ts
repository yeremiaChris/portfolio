import { describe, expect, it } from "vitest";

import { HEADER_FLIP_DURATION_MS } from "./header-bar-flip";
import {
  HEADER_AVAILABILITY_LABEL,
  headerAvailabilityBadgeDotClass,
  headerAvailabilityBadgeLabelWrapClass,
  headerAvailabilityBadgeShellClass,
  headerAvailabilityBadgeUsesAriaLabel,
} from "./header-availability-badge";

describe("header availability badge", () => {
  it("collapses to a dot-sized shell in compact mode", () => {
    const compact = headerAvailabilityBadgeShellClass(true, false);
    const expanded = headerAvailabilityBadgeShellClass(false, false);

    expect(compact).toContain("max-w-8");
    expect(expanded).toContain("max-w-[11rem]");
    expect(compact).toContain("overflow-hidden");
    expect(compact).toContain(`duration-[${HEADER_FLIP_DURATION_MS}ms]`);
    expect(compact).toContain("cubic-bezier(0.16,1,0.3,1)");
  });

  it("hides label text via grid clip and opacity in compact mode", () => {
    const compact = headerAvailabilityBadgeLabelWrapClass(true, false);
    const expanded = headerAvailabilityBadgeLabelWrapClass(false, false);

    expect(compact).toContain("grid-cols-[0fr]");
    expect(compact).toContain("opacity-0");
    expect(expanded).toContain("grid-cols-[1fr]");
    expect(expanded).toContain("opacity-100");
  });

  it("exposes an aria-label only when the visual label is hidden", () => {
    expect(HEADER_AVAILABILITY_LABEL).toBe("Available for work");
    expect(headerAvailabilityBadgeUsesAriaLabel(true)).toBe(true);
    expect(headerAvailabilityBadgeUsesAriaLabel(false)).toBe(false);
    expect(headerAvailabilityBadgeDotClass()).toContain("size-2");
  });

  it("disables morph transitions under reduced motion", () => {
    expect(headerAvailabilityBadgeShellClass(true, true)).toContain(
      "motion-reduce:transition-none",
    );
    expect(headerAvailabilityBadgeLabelWrapClass(true, true)).toContain(
      "motion-reduce:transition-none",
    );
  });
});
