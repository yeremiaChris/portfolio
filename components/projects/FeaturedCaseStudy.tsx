"use client";

import { ExternalLink } from "lucide-react";

import { ProjectBrowserFrame } from "@/components/projects/ProjectBrowserFrame";
import {
  projectSurfaceHairlineClass,
  projectSurfacePanelClass,
} from "@/components/projects/projectSurface";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  featuredProjectRole,
  getProjectToolChips,
  type Project,
} from "@/lib/projects";
import { cn } from "@/lib/utils";

type FeaturedCaseStudyProps = {
  project: Project;
  index: number;
  reverse?: boolean;
};

export function FeaturedCaseStudy({
  project,
  index,
  reverse = false,
}: FeaturedCaseStudyProps) {
  const toolChips = getProjectToolChips(project.tools, true);
  const tagline = project.tagline ?? project.summary;
  const highlights = project.highlights ?? [];
  const indexLabel = String(index + 1).padStart(2, "0");

  return (
    <article
      id={project.id}
      className={cn(
        "flex w-full min-w-0 scroll-mt-24 flex-col gap-8 md:gap-10 lg:gap-12",
        index > 0 &&
          "[contain-intrinsic-size:auto_640px] [content-visibility:auto]",
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-8 md:items-center md:gap-10 lg:gap-14",
          reverse ? "md:flex-row-reverse" : "md:flex-row",
        )}
      >
        <div className="order-1 w-full min-w-0 md:order-none md:flex-1">
          <ProjectBrowserFrame
            src={project.image}
            alt={project.imageAlt}
            tilt={reverse ? "right" : "left"}
          />
        </div>

        <div
          className={cn(
            "order-2 w-full min-w-0 md:order-none md:max-w-md md:flex-1 lg:max-w-lg",
            projectSurfacePanelClass,
            "relative flex flex-col px-6 py-7 sm:px-8 sm:py-8",
          )}
        >
          <div className={projectSurfaceHairlineClass} aria-hidden />
          <p
            className="text-brand-accent/25 font-heading mb-3 text-5xl font-bold tracking-tighter tabular-nums sm:text-6xl"
            aria-hidden
          >
            {indexLabel}
          </p>
          <div className="flex min-w-0 flex-wrap items-start justify-between gap-2">
            <h2 className="font-heading text-foreground min-w-0 text-2xl font-semibold tracking-tight text-balance sm:text-[1.65rem]">
              {project.title}
            </h2>
            {project.domain ? (
              <Badge
                variant="secondary"
                className="text-brand-accent shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium"
              >
                {project.domain}
              </Badge>
            ) : null}
          </div>
          <dl className="text-muted-foreground mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px]">
            <div className="flex items-center gap-1.5">
              <dt className="sr-only">Role</dt>
              <dd>{featuredProjectRole}</dd>
            </div>
            <span className="text-border" aria-hidden>
              ·
            </span>
            <div className="flex items-center gap-1.5">
              <dt className="sr-only">Years</dt>
              <dd className="tabular-nums">{project.year}</dd>
            </div>
          </dl>

          <p className="text-foreground mt-5 text-[15px] leading-snug font-medium">
            {tagline}
          </p>

          {highlights.length > 0 ? (
            <div className="mt-5">
              <p className="text-foreground/75 mb-2 text-xs font-medium tracking-wide uppercase">
                What I did
              </p>
              <ul className="text-muted-foreground list-none space-y-2 text-[13px] leading-snug">
                {highlights.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span
                      className="bg-brand-accent mt-1.5 size-1.5 shrink-0 rounded-full"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex min-w-0 flex-1 flex-wrap gap-1.5">
              {toolChips.map((tool) => (
                <Badge
                  key={tool}
                  variant="secondary"
                  className="max-w-full rounded-md px-2 py-0.5 text-[11px] font-medium"
                >
                  {tool}
                </Badge>
              ))}
            </div>
            {project.href && project.ctaLabel ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({
                    variant:
                      project.ctaLabel === "Webview" ? "link" : "outline",
                    size: "sm",
                  }),
                  "border-border/60 text-foreground/90 hover:border-brand-accent/45 hover:text-brand-accent h-8 shrink-0 gap-1.5",
                )}
              >
                {project.ctaLabel}
                {project.ctaLabel === "Open Site" ? (
                  <ExternalLink className="size-3.5" aria-hidden />
                ) : null}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
