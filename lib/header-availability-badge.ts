import { cn } from "@/lib/utils";

export const HEADER_AVAILABILITY_LABEL = "Available for work";

const headerAvailabilityMorphTransition = (reducedMotion: boolean) =>
  reducedMotion
    ? "motion-reduce:transition-none"
    : "duration-[800ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] transition-[max-width,padding,gap,background-color,grid-template-columns,opacity]";

export const headerAvailabilityBadgeShellClass = (
  compact: boolean,
  reducedMotion: boolean,
) =>
  cn(
    "text-muted-foreground hidden h-8 shrink-0 items-center overflow-hidden rounded-full min-[860px]:inline-flex",
    headerAvailabilityMorphTransition(reducedMotion),
    compact
      ? "max-w-8 gap-0 bg-foreground/[0.06] px-0 py-0"
      : "max-w-[11rem] gap-1.5 bg-foreground/[0.06] px-2.5 py-0.5",
  );

export const headerAvailabilityBadgeDotClass = () =>
  "bg-status-available mx-auto size-2 shrink-0 rounded-full";

export const headerAvailabilityBadgeLabelWrapClass = (
  compact: boolean,
  reducedMotion: boolean,
) =>
  cn(
    "grid min-w-0 overflow-hidden",
    headerAvailabilityMorphTransition(reducedMotion),
    compact ? "grid-cols-[0fr] opacity-0" : "grid-cols-[1fr] opacity-100",
  );

export const headerAvailabilityBadgeLabelClass = () =>
  "block min-w-0 truncate text-[10px] font-medium tracking-[0.08em] whitespace-nowrap uppercase";

export function headerAvailabilityBadgeUsesAriaLabel(
  compact: boolean,
): boolean {
  return compact;
}
