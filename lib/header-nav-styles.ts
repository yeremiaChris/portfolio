import { cn } from "@/lib/utils";

export const headerNavPillClass = () =>
  cn(
    "w-max shrink-0 items-center gap-0.5 rounded-full bg-foreground/[0.06] p-1 backdrop-blur-[14px]",
  );

export const headerNavLinkClass = (active: boolean) =>
  cn(
    "focus-ring text-muted-foreground hover:text-foreground hover:bg-foreground/[0.08] relative inline-flex h-8 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-3.5 text-[13px] font-medium outline-none transition-colors duration-300 motion-reduce:transition-none",
    active && "text-foreground font-semibold",
  );

export const headerNavIndicatorClass =
  "bg-brand-accent/20 pointer-events-none absolute top-0 left-0 h-8 rounded-full";
