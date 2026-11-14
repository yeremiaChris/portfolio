"use client";

import { useReducedMotion } from "motion/react";

import { useHeaderCompact } from "@/components/motion/HeaderCompactContext";
import {
  HEADER_AVAILABILITY_LABEL,
  headerAvailabilityBadgeDotClass,
  headerAvailabilityBadgeLabelClass,
  headerAvailabilityBadgeLabelWrapClass,
  headerAvailabilityBadgeShellClass,
  headerAvailabilityBadgeUsesAriaLabel,
} from "@/lib/header-availability-badge";

export function HeaderAvailabilityBadge() {
  const compact = useHeaderCompact();
  const reducedMotion = useReducedMotion();
  return (
    <span
      role="status"
      aria-label={
        headerAvailabilityBadgeUsesAriaLabel(compact)
          ? HEADER_AVAILABILITY_LABEL
          : undefined
      }
      className={headerAvailabilityBadgeShellClass(compact, !!reducedMotion)}
    >
      <span className={headerAvailabilityBadgeDotClass()} aria-hidden />
      <span
        className={headerAvailabilityBadgeLabelWrapClass(
          compact,
          !!reducedMotion,
        )}
        aria-hidden={compact || undefined}
      >
        <span className="min-w-0 overflow-hidden">
          <span className={headerAvailabilityBadgeLabelClass()}>
            {HEADER_AVAILABILITY_LABEL}
          </span>
        </span>
      </span>
    </span>
  );
}
