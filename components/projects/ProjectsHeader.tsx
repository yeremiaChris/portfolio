import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import {
  projectRibbonToneClass,
  projectsIntro,
  projectsRibbon,
} from "@/lib/projects";
import { cn } from "@/lib/utils";

export function ProjectsHeader() {
  return (
    <section className="flex w-full min-w-0 flex-col gap-6 pt-2 pb-8 md:pt-4 md:pb-10">
      <nav
        aria-label="Breadcrumb"
        className="flex w-full max-w-full min-w-0 flex-wrap items-center gap-x-2 gap-y-1 rounded-md border border-border/60 bg-[#0a0e14] px-3 py-1.5 font-mono text-[11px] text-muted-foreground sm:text-[12px]"
      >
        <Link
          href="/"
          className="inline-flex min-w-0 items-center gap-1.5 text-primary transition-colors hover:text-primary/80"
        >
          <ArrowLeft className="size-3.5 shrink-0" aria-hidden />
          <span className="break-all">{projectsIntro.breadcrumbRoot}</span>
        </Link>
        <span className="text-border" aria-hidden>
          /
        </span>
        <span className="min-w-0 break-all text-foreground/80">
          {projectsIntro.breadcrumbLeaf}
        </span>
        <span
          className="size-2 shrink-0 animate-ping rounded-full bg-primary"
          aria-hidden
        />
      </nav>

      <div className="flex min-w-0 flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="min-w-0 max-w-3xl">
          <h1 className="font-heading text-3xl font-bold tracking-tight wrap-break-word text-foreground sm:text-4xl lg:text-5xl">
            {projectsIntro.title}
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            {projectsIntro.description}
          </p>
        </div>

        <dl
          aria-label="Project metrics"
          className="grid w-full min-w-0 grid-cols-1 overflow-hidden rounded-xl border border-border/60 bg-[#0a0e14]/90 font-mono sm:grid-cols-3 md:w-auto md:shrink-0"
        >
          {projectsRibbon.map((metric, index) => (
            <div
              key={metric.label}
              className={cn(
                "flex min-w-0 flex-col gap-0.5 px-4 py-2.5",
                index > 0 && "border-t border-border/60 sm:border-t-0 sm:border-l",
              )}
            >
              <dt className="text-[10px] tracking-wider text-muted-foreground uppercase">
                {metric.label}
              </dt>
              <dd
                className={cn(
                  "text-[13px] font-bold wrap-break-word",
                  projectRibbonToneClass[metric.tone],
                )}
              >
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
