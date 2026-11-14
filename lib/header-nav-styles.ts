import { cn } from "@/lib/utils";

export const headerNavPillClass = (compact: boolean) =>
  cn(
    "w-max items-center gap-0.5 rounded-full p-1",
    compact
      ? "border-border/35 bg-card/72 backdrop-blur-md border shadow-[0_8px_32px_rgb(0_0_0_/0.28)]"
      : "border-border/20 bg-muted/55 border",
  );

export const headerNavLinkClass = (active: boolean) =>
  cn(
    "focus-ring text-muted-foreground hover:text-foreground hover:bg-foreground/6 relative inline-flex h-8 items-center justify-center rounded-full px-3 text-[13px] font-medium outline-none transition-colors duration-200 motion-reduce:transition-none",
    active && "text-foreground font-semibold",
  );

export const headerNavIndicatorClass =
  "bg-brand-accent/18 ring-brand-accent/35 absolute inset-0 rounded-full ring-1 ring-inset";
