import { describe, expect, it } from "vitest";

import { HEADER_FLIP_DURATION_MS } from "./header-bar-flip";
import {
  HEADER_AVAILABILITY_LABEL,
  headerAvailabilityBadgeDotClass,
  headerAvailabilityBadgeLabelWrapClass,
  headerAvailabilityBadgeShellClass,
  headerAvailabilityBadgeUsesSrOnly,
  headerLogoDomainClass,
} from "./header-availability-badge";

describe("header availability badge", () => {
  it("fully hides the badge shell in compact mode", () => {
    const compact = headerAvailabilityBadgeShellClass(true, false);
    const expanded = headerAvailabilityBadgeShellClass(false, false);

    expect(compact).toContain("max-w-0");
    expect(compact).toContain("opacity-0");
    expect(compact).toContain("pointer-events-none");
    expect(expanded).toContain("max-w-[11rem]");
    expect(compact).toContain(`duration-[${HEADER_FLIP_DURATION_MS}ms]`);
    expect(headerAvailabilityBadgeDotClass(true)).toContain("opacity-0");
  });

  it("hides label text via grid clip in compact mode", () => {
    const compact = headerAvailabilityBadgeLabelWrapClass(true, false);
    const expanded = headerAvailabilityBadgeLabelWrapClass(false, false);

    expect(compact).toContain("grid-cols-[0fr]");
    expect(compact).toContain("opacity-0");
    expect(expanded).toContain("grid-cols-[1fr]");
    expect(expanded).toContain("opacity-100");
  });

  it("exposes sr-only copy when compact hides the badge", () => {
    expect(HEADER_AVAILABILITY_LABEL).toBe("Available for work");
    expect(headerAvailabilityBadgeUsesSrOnly(true)).toBe(true);
    expect(headerAvailabilityBadgeUsesSrOnly(false)).toBe(false);
  });

  it("keeps the logo domain visible in compact mode", () => {
    const domainClass = headerLogoDomainClass();
    expect(domainClass).toContain("sm:inline-block");
    expect(domainClass).not.toContain("!hidden");
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
