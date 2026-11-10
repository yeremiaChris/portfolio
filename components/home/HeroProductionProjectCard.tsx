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
  const {
    label,
    href,
    description,
    role,
    stackTags,
    monogram,
    visitUrl,
    highlights,
  } = project;

  return (
    <article className={cn(homeSignalCardClassName, "h-auto gap-3")}>
      <p className="flex items-start gap-2.5">
        <span
          className="border-brand-accent/35 bg-brand-accent/12 text-brand-accent flex size-10 shrink-0 items-center justify-center rounded-lg border font-mono text-[11px] font-semibold tracking-tight"
          aria-hidden
        >
          {monogram}
        </span>
        <span className="min-w-0 flex-1">
          <a
            href={href}
            className="text-foreground focus-ring font-heading hover:text-brand-accent text-[15px] font-semibold tracking-tight outline-none"
          >
            {label}
          </a>
          <span className="text-muted-foreground mt-0.5 block text-[12px] leading-snug">
            {role}
          </span>
        </span>
      </p>

      <ul className="flex flex-wrap gap-1.5" aria-label={`${label} stack`}>
        {stackTags.map((tag) => (
          <li key={tag}>
            <span className="border-border/60 bg-muted/40 text-muted-foreground rounded-md border px-2 py-0.5 text-[11px] font-medium">
              {tag}
            </span>
          </li>
        ))}
      </ul>

      <p className="text-muted-foreground text-sm leading-snug">
        {description}
      </p>

      {highlights && highlights.length > 0 ? (
        <ul className="text-muted-foreground list-disc space-y-1 pl-4 text-[13px] leading-snug">
          {highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-0.5">
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
