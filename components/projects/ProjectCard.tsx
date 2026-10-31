import Image from "next/image";
import { ArrowUpRight, Calendar, ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button-variants";
import { getProjectToolChips, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  variant?: "default" | "lead";
}

export function ProjectCard({
  project,
  variant = "default",
}: ProjectCardProps) {
  const isLead = variant === "lead";
  const toolChips = getProjectToolChips(project.tools, project.featured);

  const media = (
    <div className="project-card-media ring-border/40 relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#0a0e14] ring-1">
      <Image
        src={project.image}
        alt={project.imageAlt}
        fill
        sizes={
          isLead
            ? "(max-width: 1024px) 100vw, 42vw"
            : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        }
        className="project-card-media-image object-cover object-top"
      />
    </div>
  );

  return (
    <Card
      id={project.id}
      className={cn(
        "project-card border-gradient group bg-muted flex min-w-0 scroll-mt-24 overflow-hidden rounded-3xl py-0",
        isLead ? "flex-col lg:flex-row" : "h-full flex-col",
      )}
    >
      <CardHeader
        className={cn(
          "gap-0 p-3 pb-0",
          isLead
            ? "w-full lg:w-5/12 lg:shrink-0 lg:self-stretch lg:pb-3"
            : "min-w-0",
        )}
      >
        {project.href ? (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-visible:ring-ring block h-full w-full focus-visible:ring-2 focus-visible:outline-none"
          >
            {media}
          </a>
        ) : (
          media
        )}
      </CardHeader>

      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col",
          isLead && "lg:justify-center",
        )}
      >
        <CardContent
          className={cn(
            "flex min-w-0 flex-1 flex-col gap-3 px-4 pt-4 pb-0",
            isLead && "lg:flex-none lg:gap-4 lg:px-6 lg:pt-6",
          )}
        >
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <CardTitle
              className={cn(
                "font-heading min-w-0 font-semibold tracking-tight wrap-break-word",
                isLead ? "text-xl sm:text-2xl" : "text-lg",
              )}
            >
              <h3 className="inline-flex min-w-0 items-center gap-1.5">
                <span className="project-card-title">{project.title}</span>
                {project.href ? (
                  <ArrowUpRight
                    className="project-card-arrow text-primary size-4 shrink-0"
                    aria-hidden
                  />
                ) : null}
              </h3>
            </CardTitle>
            {project.tag === "personal" ? (
              <span className="text-muted-foreground text-[11px] font-medium">
                Personal
              </span>
            ) : null}
          </div>

          <CardDescription
            className={cn(
              "text-muted-foreground leading-relaxed wrap-break-word",
              isLead ? "line-clamp-4 text-[15px]" : "line-clamp-3 text-[13px]",
            )}
          >
            {project.summary}
          </CardDescription>

          <div className="flex min-w-0 flex-wrap items-center gap-2 pt-1">
            <span className="text-foreground text-[12px] font-semibold">
              Tools:
            </span>
            {toolChips.map((tool) => (
              <Badge
                key={tool}
                variant="default"
                className="max-w-full rounded-md px-2 py-0.5 text-[11px] font-medium whitespace-normal"
              >
                {tool}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter
          className={cn(
            "flex min-w-0 flex-wrap items-center justify-between gap-3 border-t-0 bg-transparent px-4 py-4",
            isLead ? "lg:mt-6 lg:px-6" : "mt-auto",
          )}
        >
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
                  variant: project.ctaLabel === "Webview" ? "link" : "default",
                  size: "sm",
                }),
                "shrink-0",
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
          ) : null}
        </CardFooter>
      </div>
    </Card>
  );
}
