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
        className="border-border/60 text-muted-foreground flex w-full max-w-full min-w-0 flex-wrap items-center gap-x-2 gap-y-1 rounded-md border bg-[#0a0e14] px-3 py-1.5 font-mono text-[11px] sm:text-[12px]"
      >
        <Link
          href="/"
          className="text-primary hover:text-primary/80 inline-flex min-w-0 items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="size-3.5 shrink-0" aria-hidden />
          <span className="break-all">{projectsIntro.breadcrumbRoot}</span>
        </Link>
        <span className="text-border" aria-hidden>
          /
        </span>
        <span className="text-foreground/80 min-w-0 break-all">
          {projectsIntro.breadcrumbLeaf}
        </span>
        <span
          className="bg-primary size-2 shrink-0 animate-ping rounded-full"
          aria-hidden
        />
      </nav>

      <div className="flex min-w-0 flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-3xl min-w-0">
          <h1 className="font-heading text-foreground text-3xl font-bold tracking-tight wrap-break-word sm:text-4xl lg:text-5xl">
            {projectsIntro.title}
          </h1>
          <p className="text-muted-foreground mt-3 text-[15px] leading-relaxed sm:text-base">
            {projectsIntro.description}
          </p>
        </div>

        <div
          aria-label="Project metrics"
          className="border-border/60 grid w-full min-w-0 grid-cols-1 overflow-hidden rounded-xl border bg-[#0a0e14]/90 font-mono sm:grid-cols-3 md:w-auto md:shrink-0"
        >
          {projectsRibbon.map((metric, index) => (
            <dl
              key={metric.label}
              className={cn(
                "flex min-w-0 flex-col gap-0.5 px-4 py-2.5",
                index > 0 &&
                  "border-border/60 border-t sm:border-t-0 sm:border-l",
              )}
            >
              <dt className="text-muted-foreground text-[10px] tracking-wider uppercase">
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
            </dl>
          ))}
        </div>
      </div>
    </section>
  );
}
