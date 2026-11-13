import { ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  featuredProjectRole,
  getProjectToolChips,
  type Project,
} from "@/lib/projects";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const toolChips = getProjectToolChips(project.tools, project.featured);
  const tagline = project.tagline ?? project.summary;
  const highlights = project.highlights ?? [];

  return (
    <div
      id={project.id}
      className="project-card-shell h-full min-w-0 scroll-mt-24"
    >
      <article
        className={cn(
          "project-card border-gradient group bg-muted flex h-full min-w-0 flex-col overflow-hidden rounded-3xl",
        )}
      >
        <header className="border-border/35 border-b px-5 pt-5 pb-4">
          <div className="flex min-w-0 flex-wrap items-start justify-between gap-2">
            <p className="font-heading text-foreground min-w-0 text-lg font-semibold tracking-tight wrap-break-word">
              <span className="project-card-title">{project.title}</span>
            </p>
            {project.domain ? (
              <Badge
                variant="secondary"
                className="border-brand-accent/25 bg-brand-accent/10 text-brand-accent shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium"
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
            <span className="text-border/80 hidden sm:inline" aria-hidden>
              ·
            </span>
            <div className="flex items-center gap-1.5">
              <dt className="sr-only">Years</dt>
              <dd className="tabular-nums">{project.year}</dd>
            </div>
            {project.tag === "personal" ? (
              <>
                <span className="text-border/80 hidden sm:inline" aria-hidden>
                  ·
                </span>
                <dd className="text-[11px] font-medium">Personal</dd>
              </>
            ) : null}
          </dl>
        </header>

        <div className="flex min-h-0 flex-1 flex-col gap-3 px-5 py-4">
          <p className="text-foreground text-[14px] leading-snug font-medium">
            {tagline}
          </p>

          {highlights.length > 0 ? (
            <ul className="text-muted-foreground list-none space-y-2 text-[13px] leading-snug">
              {highlights.map((item) => (
                <li key={item} className="flex gap-2">
                  <span
                    className="bg-brand-accent/80 mt-1.5 size-1.5 shrink-0 rounded-full"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="flex min-w-0 flex-wrap gap-1.5 pt-1">
            {toolChips.map((tool) => (
              <Badge
                key={tool}
                variant="secondary"
                className="text-foreground/85 ring-border/40 max-w-full rounded-md border-transparent bg-[#0f151c] px-2 py-0.5 text-[11px] font-medium ring-1"
              >
                {tool}
              </Badge>
            ))}
          </div>

          {project.href && project.ctaLabel ? (
            <div className="mt-auto pt-2">
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({
                    variant:
                      project.ctaLabel === "Webview" ? "link" : "default",
                    size: "sm",
                  }),
                  "w-full justify-center sm:w-auto",
                  project.ctaLabel === "Webview"
                    ? "h-auto px-0 text-[13px]"
                    : "h-9 gap-1.5",
                )}
              >
                {project.ctaLabel}
                {project.ctaLabel === "Open Site" ? (
                  <ExternalLink className="size-3.5" aria-hidden />
                ) : null}
              </a>
            </div>
          ) : null}
        </div>
      </article>
    </div>
  );
}
