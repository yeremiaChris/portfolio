import { cn } from "@/lib/utils";

const headerBarChromeTransitionBase =
  "transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-out";

export const headerBarChromeTransitionClass = (compact: boolean) =>
  cn(headerBarChromeTransitionBase, compact ? "delay-[150ms]" : "delay-0");

export const headerBarExpandedClass = () =>
  cn(
    "pointer-events-auto grid h-11 min-h-11 max-h-11 w-full grid-cols-[1fr_auto] items-center rounded-full bg-transparent shadow-none",
    "min-[860px]:grid-cols-[1fr_auto_1fr]",
  );

export const headerBarCompactClass = () =>
  cn(
    "pointer-events-auto flex h-11 min-h-11 max-h-11 w-full max-w-full flex-row flex-nowrap items-center justify-between rounded-full",
    "bg-[rgb(22_27_34/0.9)] py-1 pr-1 pl-3.5 backdrop-blur-[14px]",
    "shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06),0_12px_32px_-18px_rgb(0_0_0/0.45)]",
    "min-[860px]:mx-auto min-[860px]:w-max min-[860px]:max-w-full min-[860px]:justify-start min-[860px]:gap-2 min-[860px]:pr-1 min-[860px]:pl-4",
  );

export const headerNavLinksRowClass = () =>
  cn(
    "relative flex h-8 min-h-8 max-h-8 shrink-0 flex-row flex-nowrap items-center gap-1 whitespace-nowrap",
  );

export const headerNavExpandedClass = () => cn(headerNavLinksRowClass(), "p-0");

export const headerNavEmbeddedClass = () =>
  cn(
    headerNavLinksRowClass(),
    "bg-transparent p-0 shadow-none backdrop-blur-none",
    "transition-[background,box-shadow] duration-[400ms] ease-out delay-[150ms]",
  );

export const headerNavLinkClass = (active: boolean, embedded: boolean) =>
  cn(
    "focus-ring relative inline-flex h-8 max-h-8 min-h-8 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-2.5 text-[13px] font-medium outline-none transition-[color,background-color] duration-300 motion-reduce:transition-none",
    embedded
      ? "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.08]"
      : "text-muted-foreground hover:text-foreground",
    active &&
      (embedded
        ? "text-foreground font-semibold"
        : "text-brand-accent font-medium"),
  );

export const headerNavIndicatorClass = (embedded: boolean) =>
  cn(
    "pointer-events-none absolute top-0 left-0 h-8 rounded-full",
    embedded ? "bg-white/[0.06]" : "bg-[rgb(76_215_246/0.08)]",
  );
