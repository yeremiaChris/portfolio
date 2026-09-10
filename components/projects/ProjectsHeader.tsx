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
    <section className="flex w-full flex-col gap-6 pt-2 pb-8 md:pt-4 md:pb-10">
      <nav
        aria-label="Breadcrumb"
        className="inline-flex w-fit items-center gap-2 rounded-md border border-border/60 bg-[#0a0e14] px-3 py-1.5 font-mono text-[12px] text-muted-foreground"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-primary transition-colors hover:text-primary/80"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          <span>{projectsIntro.breadcrumbRoot}</span>
        </Link>
        <span className="text-border" aria-hidden>
          /
        </span>
        <span className="text-foreground/80">
          {projectsIntro.breadcrumbLeaf}
        </span>
        <span
          className="ml-1 size-2 animate-ping rounded-full bg-primary"
          aria-hidden
        />
      </nav>

      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-3xl">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {projectsIntro.title}
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            {projectsIntro.description}
          </p>
        </div>

        <dl
          aria-label="Project metrics"
          className="flex shrink-0 items-stretch gap-0 overflow-hidden rounded-xl border border-border/60 bg-[#0a0e14]/90 font-mono"
        >
          {projectsRibbon.map((metric, index) => (
            <div
              key={metric.label}
              className={cn(
                "flex flex-col gap-0.5 px-4 py-2.5",
                index > 0 && "border-l border-border/60",
              )}
            >
              <dt className="text-[10px] tracking-wider text-muted-foreground uppercase">
                {metric.label}
              </dt>
              <dd
                className={cn(
                  "text-[13px] font-bold",
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
