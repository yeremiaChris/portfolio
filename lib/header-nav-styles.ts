import { cn } from "@/lib/utils";

export const headerNavLinkClass = (active: boolean) =>
  cn(
    "focus-ring text-muted-foreground hover:text-foreground hover:bg-foreground/6 relative z-10 inline-flex h-8 items-center justify-center rounded-full px-3 text-[13px] font-medium outline-none transition-colors duration-200 motion-reduce:transition-none",
    active && "text-foreground font-semibold",
  );

export const headerNavIndicatorClass =
  "bg-brand-accent/18 ring-brand-accent/35 pointer-events-none absolute top-0 left-0 h-8 rounded-full ring-1 ring-inset";
