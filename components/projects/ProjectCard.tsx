import { Calendar, ExternalLink } from "lucide-react";

import { ProjectCardVisual } from "@/components/projects/ProjectCardVisual";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { getProjectToolChips, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

export type ProjectCardSize = "large" | "compact";

interface ProjectCardProps {
  project: Project;
  size?: ProjectCardSize;
}

export function ProjectCard({ project, size = "compact" }: ProjectCardProps) {
  const isLarge = size === "large";
  const toolChips = getProjectToolChips(project.tools, project.featured);
  const visualSize = isLarge ? "large" : "compact";

  const visual = <ProjectCardVisual projectId={project.id} size={visualSize} />;

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
        {project.href ? (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} — ${project.ctaLabel ?? "Open Site"}`}
            className={cn(
              "focus-ring block outline-none",
              "p-3 pb-0",
              isLarge && "p-4 pb-0",
            )}
          >
            {visual}
          </a>
        ) : (
          <div className={cn("p-3 pb-0", isLarge && "p-4 pb-0")}>{visual}</div>
        )}

        <div
          className={cn(
            "flex min-h-0 flex-1 flex-col gap-3 px-4 pt-4 pb-4",
            isLarge && "gap-3.5 px-5 pt-5 pb-5",
          )}
        >
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <p
              className={cn(
                "font-heading text-foreground min-w-0 font-semibold tracking-tight wrap-break-word",
                isLarge ? "text-xl sm:text-2xl" : "text-lg",
              )}
            >
              <span className="project-card-title">{project.title}</span>
            </p>
            {project.tag === "personal" ? (
              <span className="text-muted-foreground text-[11px] font-medium">
                Personal
              </span>
            ) : null}
          </div>

          <p
            className={cn(
              "text-muted-foreground leading-relaxed wrap-break-word",
              isLarge ? "line-clamp-4 text-[15px]" : "line-clamp-3 text-[13px]",
            )}
          >
            {project.summary}
          </p>

          <div className="flex min-w-0 flex-wrap gap-1.5 pt-0.5">
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

          <div className="border-border/30 mt-auto flex flex-wrap items-center justify-between gap-3 border-t pt-4">
            <span className="text-muted-foreground inline-flex items-center gap-2 text-[12px]">
              <Calendar className="size-3.5 shrink-0" aria-hidden />
              {project.year}
            </span>

            {project.href && project.ctaLabel ? (
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
                  "shrink-0",
                  project.ctaLabel === "Webview"
                    ? "h-auto px-0 text-[13px]"
                    : "h-9 gap-1.5",
                )}
              >
                {project.ctaLabel}
                {project.ctaLabel === "Webview" ? (
                  <ExternalLink className="size-3.5" aria-hidden />
                ) : null}
              </a>
            ) : null}
          </div>
        </div>
      </article>
    </div>
  );
}
