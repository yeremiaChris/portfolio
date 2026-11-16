"use client";

import Link from "next/link";
import { m, useReducedMotion } from "motion/react";

import { BLOG_TOPICS } from "@/lib/blog-topics.constants";
import { projectsFeaturedSpring } from "@/lib/projects-motion";
import { cn } from "@/lib/utils";

type BlogTopicChipsProps = {
  activeSlug: string | null;
  basePath?: string;
};

const chips: { slug: string | null; label: string }[] = [
  { slug: null, label: "All" },
  ...BLOG_TOPICS.map((topic) => ({ slug: topic.slug, label: topic.label })),
];

export function BlogTopicChips({
  activeSlug,
  basePath = "/blog",
}: BlogTopicChipsProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="flex min-w-0 flex-wrap gap-2"
      role="group"
      aria-label="Filter by topic"
    >
      {chips.map((chip) => {
        const isActive =
          chip.slug === activeSlug || (chip.slug === null && !activeSlug);
        const href =
          chip.slug === null ? basePath : `${basePath}/tag/${chip.slug}`;

        return (
          <Link
            key={chip.label}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "label-caps relative rounded-full border px-3 py-1.5 text-[11px] tracking-wider transition-colors",
              "motion-reduce:transition-none",
              isActive
                ? "border-brand-accent/50 text-brand-accent"
                : "border-border/60 text-muted-foreground hover:text-foreground hover:border-brand-accent/30 bg-transparent",
              isActive && reducedMotion
                ? "bg-brand-accent/10"
                : isActive
                  ? "bg-transparent"
                  : "",
            )}
          >
            {isActive && !reducedMotion ? (
              <m.span
                layoutId="blog-topic-chip-active"
                className="border-brand-accent/50 bg-brand-accent/10 pointer-events-none absolute inset-0 rounded-full border"
                transition={projectsFeaturedSpring}
                aria-hidden
              />
            ) : null}
            <span className="relative z-[1]">{chip.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
