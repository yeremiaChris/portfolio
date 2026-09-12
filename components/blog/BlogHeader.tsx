import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  blogIntro,
  blogRibbonToneClass,
  type BlogRibbonMetric,
} from "@/lib/blog";
import { cn } from "@/lib/utils";

export function BlogHeader({ metrics }: { metrics: BlogRibbonMetric[] }) {
  return (
    <section className="relative flex w-full min-w-0 flex-col gap-6 pt-2 pb-8 md:pt-4 md:pb-10">
      <div
        className="pointer-events-none absolute top-0 left-1/4 -z-10 size-[28rem] rounded-full bg-primary/5 blur-[140px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-1/3 right-0 -z-10 size-[24rem] rounded-full bg-[#4cd7f6]/5 blur-[160px]"
        aria-hidden
      />

      <div className="flex w-full min-w-0 flex-wrap items-center justify-between gap-3">
        <nav
          aria-label="Breadcrumb"
          className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 rounded-md border border-border/60 bg-[#0a0e14] px-3 py-1.5 font-mono text-[11px] text-muted-foreground sm:text-[12px]"
        >
          <Link
            href="/"
            className="inline-flex min-w-0 items-center gap-1.5 text-primary transition-colors hover:text-primary/80"
          >
            <ArrowLeft className="size-3.5 shrink-0" aria-hidden />
            <span className="break-all">{blogIntro.breadcrumbRoot}</span>
          </Link>
          <span className="text-border" aria-hidden>
            /
          </span>
          <span className="min-w-0 break-all text-foreground/80">
            {blogIntro.breadcrumbLeaf}
          </span>
          <span
            className="size-2 shrink-0 animate-ping rounded-full bg-primary"
            aria-hidden
          />
        </nav>

        <Badge
          variant="secondary"
          className="gap-1.5 bg-muted px-2.5 py-1 font-mono text-[10px] tracking-wider text-primary uppercase"
        >
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
          </span>
          {blogIntro.statusBadge}
        </Badge>
      </div>

      <div className="flex min-w-0 flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="min-w-0 max-w-3xl">
          <h1 className="font-heading text-3xl font-bold tracking-tight wrap-break-word text-foreground sm:text-4xl lg:text-5xl">
            {blogIntro.title}
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            {blogIntro.description}
          </p>
        </div>

        <div
          aria-label="Blog metrics"
          className="grid w-full min-w-0 grid-cols-1 overflow-hidden rounded-xl border border-border/60 bg-[#0a0e14]/90 font-mono sm:grid-cols-3 md:w-auto md:shrink-0"
        >
          {metrics.map((metric, index) => (
            <dl
              key={metric.label}
              className={cn(
                "flex min-w-0 flex-col gap-0.5 px-4 py-2.5",
                index > 0 &&
                  "border-t border-border/60 sm:border-t-0 sm:border-l",
              )}
            >
              <dt className="text-[10px] tracking-wider text-muted-foreground uppercase">
                {metric.label}
              </dt>
              <dd
                className={cn(
                  "text-[13px] font-bold wrap-break-word",
                  blogRibbonToneClass[metric.tone],
                )}
              >
                {metric.value}
              </dd>
            </dl>
          ))}
        </div>
      </div>
    </section>
  );
}
