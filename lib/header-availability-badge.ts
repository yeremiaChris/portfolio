import { cn } from "@/lib/utils";

export const HEADER_AVAILABILITY_LABEL = "Available for work";

const headerAvailabilityMorphTransition = (reducedMotion: boolean) =>
  reducedMotion
    ? "motion-reduce:transition-none"
    : "duration-[800ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] transition-[max-width,opacity,padding,gap,border-color,background-color]";

export const headerAvailabilityBadgeShellClass = (
  compact: boolean,
  reducedMotion: boolean,
) =>
  cn(
    "hidden h-8 shrink-0 items-center overflow-hidden rounded-full min-[860px]:inline-flex",
    headerAvailabilityMorphTransition(reducedMotion),
    compact
      ? "pointer-events-none max-w-0 min-w-0 gap-0 border-0 bg-transparent p-0 opacity-0"
      : "text-muted-foreground max-w-[11rem] gap-1.5 bg-foreground/[0.06] px-2.5 py-0.5 opacity-100",
  );

export const headerAvailabilityBadgeDotClass = (compact: boolean) =>
  cn(
    "bg-status-available size-2 shrink-0 rounded-full",
    compact && "opacity-0",
  );

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

export function headerAvailabilityBadgeUsesSrOnly(compact: boolean): boolean {
  return compact;
}

export const headerLogoDomainClass = () =>
  "font-heading text-foreground hidden h-[17px] shrink-0 leading-none font-semibold tracking-tight whitespace-nowrap sm:inline-block";
