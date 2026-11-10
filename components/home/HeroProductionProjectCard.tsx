import { ExternalLink } from "lucide-react";

import { homeSignalCardClassName } from "@/lib/home-signal-card";
import type { HomeProductionProject } from "@/lib/home-production";
import { cn } from "@/lib/utils";

type HeroProductionProjectCardProps = {
  project: HomeProductionProject;
};

export function HeroProductionProjectCard({
  project,
}: HeroProductionProjectCardProps) {
  const { label, href, description, stackLine, visitUrl, isCurrent } = project;

  return (
    <article
      className={cn(
        homeSignalCardClassName,
        "h-full w-full gap-4 p-5 sm:gap-5 sm:p-6",
        isCurrent && "border-brand-accent/50 border-t-2",
      )}
    >
      <div className="flex min-w-0 items-baseline justify-between gap-3">
        <a
          href={href}
          className="text-foreground focus-ring font-heading hover:text-brand-accent text-base font-semibold tracking-tight outline-none"
        >
          {label}
        </a>
        {isCurrent ? (
          <span className="text-muted-foreground shrink-0 text-[10px] tracking-[0.14em] uppercase">
            Current
          </span>
        ) : null}
      </div>

      <p className="text-muted-foreground text-sm leading-snug">
        {description}
      </p>

      <p className="text-muted-foreground/80 text-[13px] leading-snug">
        {stackLine}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
        <a
          href={href}
          className="text-brand-accent focus-ring text-sm font-medium outline-none hover:underline"
        >
          Case study
        </a>
        {visitUrl ? (
          <a
            href={visitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground focus-ring hover:text-brand-accent inline-flex items-center gap-1 text-sm outline-none"
          >
            Visit
            <ExternalLink className="size-3.5" aria-hidden />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}
