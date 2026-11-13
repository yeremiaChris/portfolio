import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function HeroStatusPill({ className }: { className?: string }) {
  return (
    <p className={cn("mt-4 md:mt-5", className)}>
      <span className="border-border/55 bg-muted/70 text-foreground/90 inline-flex max-w-full items-center rounded-full border px-3 py-1.5 text-left text-[12px] leading-snug font-medium sm:text-[13px]">
        {site.availability}
      </span>
    </p>
  );
}
