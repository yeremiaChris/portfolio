import { cn } from "@/lib/utils";

export const headerNavPillClass = () =>
  cn(
    "w-max shrink-0 items-center gap-0.5 rounded-full border border-border/20 bg-muted/55 p-1 shadow-[inset_0_0_0_1px_rgb(223_226_235/0.2)] backdrop-blur-[14px]",
  );

export const headerNavLinkClass = (active: boolean) =>
  cn(
    "focus-ring text-muted-foreground hover:text-foreground hover:bg-foreground/6 relative inline-flex h-8 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-3 text-[13px] font-medium outline-none transition-colors duration-200 motion-reduce:transition-none",
    active && "text-foreground font-semibold",
  );

export const headerNavIndicatorClass =
  "bg-brand-accent/18 ring-brand-accent/35 absolute inset-0 rounded-full ring-1 ring-inset";
