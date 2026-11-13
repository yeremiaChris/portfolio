"use client";

import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { m, useReducedMotion } from "motion/react";

import {
  projectSurfaceDividerClass,
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
import { motionDuration, motionEase } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const reducedMotion = useReducedMotion();
  const toolChips = getProjectToolChips(project.tools, project.featured);
  const tagline = project.tagline ?? project.summary;
  const highlights = project.highlights ?? [];

  return (
    <ProjectCardSurface id={project.id} reducedMotion={reducedMotion}>
      <header
        className={cn("border-b px-6 pt-6 pb-5", projectSurfaceDividerClass)}
      >
        <div className="flex min-w-0 flex-wrap items-start justify-between gap-2">
          <p className="font-heading text-foreground min-w-0 text-xl font-semibold tracking-tight wrap-break-word sm:text-[1.35rem] sm:leading-snug">
            <span className="project-card-title">{project.title}</span>
          </p>
          {project.domain ? (
            <Badge
              variant="secondary"
              className="text-brand-accent shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium"
            >
              {project.domain}
            </Badge>
          ) : null}
        </div>
        <dl className="text-muted-foreground mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px]">
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Role</dt>
            <dd>{featuredProjectRole}</dd>
          </div>
          <span className="text-border hidden sm:inline" aria-hidden>
            ·
          </span>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Years</dt>
            <dd className="tabular-nums">{project.year}</dd>
          </div>
          {project.tag === "personal" ? (
            <>
              <span className="text-border hidden sm:inline" aria-hidden>
                ·
              </span>
              <dd className="text-[11px] font-medium">Personal</dd>
            </>
          ) : null}
        </dl>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-3 px-6 py-5">
        <p className="text-foreground text-[14px] leading-snug font-medium">
          {tagline}
        </p>

        {highlights.length > 0 ? (
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
        ) : null}

        <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row sm:items-end sm:justify-between">
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
                  variant: project.ctaLabel === "Webview" ? "link" : "outline",
                  size: "sm",
                }),
                "shrink-0",
                project.ctaLabel === "Webview"
                  ? "h-auto px-0 text-[13px]"
                  : "border-border/60 text-foreground/90 hover:border-brand-accent/45 hover:text-brand-accent h-8 gap-1.5",
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
    </ProjectCardSurface>
  );
}

function ProjectCardSurface({
  id,
  children,
  reducedMotion,
}: {
  id: string;
  children: ReactNode;
  reducedMotion: boolean | null;
}) {
  return (
    <div id={id} className="h-full min-w-0 scroll-mt-24">
      <m.article
        className={cn(
          "project-card group flex h-full min-w-0 flex-col",
          projectSurfacePanelClass,
        )}
        initial={false}
        animate={{
          boxShadow: "0 0 0 rgb(76 215 246 / 0)",
        }}
        whileHover={
          reducedMotion
            ? undefined
            : {
                boxShadow:
                  "0 0 0 1px rgb(76 215 246 / 0.35), 0 0 28px rgb(76 215 246 / 0.14)",
                transition: {
                  duration: motionDuration.fast,
                  ease: motionEase,
                },
              }
        }
      >
        <div
          className={cn(
            projectSurfaceHairlineClass,
            "opacity-70 transition-opacity duration-200 group-hover:opacity-100 motion-reduce:opacity-70 motion-reduce:transition-none",
          )}
          aria-hidden
        />
        {children}
      </m.article>
    </div>
  );
}
