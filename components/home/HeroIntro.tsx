import { ArrowRightIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function HeroIntro() {
  return (
    <div className="flex flex-col items-start">
      <Badge
        variant="secondary"
        className="border-border/60 bg-card/80 text-muted-foreground mb-6 h-auto gap-2 rounded-full border px-3 py-1.5 text-[11px] font-medium tracking-[0.04em]"
      >
        <span className="relative flex size-2">
          <span className="bg-primary absolute inline-flex size-full animate-ping rounded-full opacity-70" />
          <span className="bg-primary relative inline-flex size-2 rounded-full" />
        </span>
        {site.heroAvailability}
      </Badge>

      <h1
        id="hero-heading"
        className="font-heading text-foreground max-w-xl text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-[3.25rem] lg:leading-[1.12]"
      >
        {site.heroHeadline}
      </h1>

      <p className="text-muted-foreground mt-5 max-w-lg text-base leading-relaxed sm:text-lg sm:leading-7">
        {site.heroPositioning}
      </p>

      <a
        href={site.heroCta.href}
        className={cn(
          buttonVariants({ size: "lg" }),
          "bg-primary text-primary-foreground hover:bg-primary/90 mt-8 gap-2 rounded-full px-5 shadow-[0_0_32px_-8px_rgba(78,222,163,0.55)]",
        )}
      >
        {site.heroCta.label}
        <ArrowRightIcon className="size-4 transition-transform group-hover/button:translate-x-0.5" />
      </a>
    </div>
  );
}
