import Image from "next/image";
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
    featured,
    label,
    href,
    description,
    role,
    stackTags,
    image,
    imageAlt,
    visitUrl,
  } = project;

  return (
    <article
      className={cn(
        homeSignalCardClassName,
        "h-full gap-4",
        featured && "md:gap-5 md:p-6",
      )}
    >
      <p className="flex items-start gap-3">
        <span className="border-border/60 bg-muted/50 relative size-11 shrink-0 overflow-hidden rounded-lg border">
          <Image
            src={image}
            alt={imageAlt}
            width={44}
            height={44}
            className="size-full object-cover object-top"
          />
        </span>
        <span className="min-w-0 flex-1">
          <a
            href={href}
            className="text-foreground focus-ring font-heading hover:text-brand-accent text-base font-semibold tracking-tight outline-none sm:text-[17px]"
          >
            {label}
          </a>
          <span className="text-muted-foreground mt-0.5 block text-[13px] leading-snug">
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

      <p
        className={cn(
          "text-muted-foreground text-sm leading-relaxed",
          featured && "md:text-[15px]",
        )}
      >
        {description}
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
