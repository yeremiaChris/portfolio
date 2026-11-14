import { cn } from "@/lib/utils";

export const headerBarChromeTransitionClass =
  "transition-[background-color,box-shadow] duration-500 ease-out";

export const headerBarExpandedClass = () =>
  cn(
    "pointer-events-auto grid w-full grid-cols-[1fr_auto] items-center rounded-full bg-transparent shadow-none",
    "min-[860px]:grid-cols-[1fr_auto_1fr]",
  );

export const headerBarCompactClass = () =>
  cn(
    "pointer-events-auto flex w-full max-w-full items-center justify-between rounded-full",
    "bg-[rgb(22_27_34/0.9)] py-1 pr-1 pl-3.5 backdrop-blur-[14px]",
    "shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06),0_12px_32px_-18px_rgb(0_0_0/0.45)]",
    "min-[860px]:mx-auto min-[860px]:w-max min-[860px]:max-w-full min-[860px]:justify-start min-[860px]:gap-1 min-[860px]:pr-1 min-[860px]:pl-4",
  );

export const headerNavPillClass = () =>
  cn(
    "relative flex h-8 shrink-0 items-center gap-0.5 rounded-full p-1",
    "bg-foreground/[0.08] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)] backdrop-blur-[14px]",
    "transition-[background,box-shadow] duration-[400ms] ease-out",
  );

export const headerNavEmbeddedClass = () =>
  cn(
    "bg-transparent p-0 shadow-none backdrop-blur-none",
    "transition-[background,box-shadow] duration-[400ms] ease-out",
  );

export const headerNavLinkClass = (active: boolean) =>
  cn(
    "focus-ring text-muted-foreground hover:text-foreground hover:bg-foreground/[0.08] relative inline-flex h-8 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-3.5 text-[13px] font-medium outline-none transition-[background,color] duration-300 motion-reduce:transition-none",
    active && "text-foreground font-semibold",
  );

export const headerNavIndicatorClass =
  "bg-brand-accent/20 pointer-events-none absolute top-0 left-0 h-8 rounded-full";
