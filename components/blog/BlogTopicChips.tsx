"use client";

import Link from "next/link";

import { BLOG_TOPICS } from "@/lib/blog-topics.constants";
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
              "label-caps rounded-full border px-3 py-1.5 text-[11px] tracking-wider transition-colors",
              "motion-reduce:transition-none",
              isActive
                ? "border-[#4cd7f6]/50 bg-[#4cd7f6]/10 text-[#4cd7f6]"
                : "border-border/60 text-muted-foreground hover:text-foreground bg-transparent hover:border-[#4cd7f6]/30",
            )}
          >
            {chip.label}
          </Link>
        );
      })}
    </div>
  );
}
