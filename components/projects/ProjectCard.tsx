import Image from "next/image";
import { Calendar, ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function ProjectCard({ project }: { project: Project }) {
  const media = (
    <div className="relative h-44 overflow-hidden rounded-xl bg-[#0a0e14] ring-1 ring-border/40">
      <Image
        src={project.image}
        alt={project.imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition duration-300 group-hover:scale-[1.03] group-hover:brightness-110"
      />
    </div>
  );

  return (
    <Card className="group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl bg-muted py-0 ring-border/20 transition-transform duration-300 hover:-translate-y-0.5">
      <CardHeader className="min-w-0 gap-0 p-3 pb-0">
        {project.href ? (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {media}
          </a>
        ) : (
          media
        )}
      </CardHeader>

      <CardContent className="flex min-w-0 flex-1 flex-col gap-3 px-4 pt-4 pb-0">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <CardTitle className="min-w-0 font-heading text-lg font-semibold tracking-tight wrap-break-word">
            <h3>{project.title}</h3>
          </CardTitle>
          <Badge
            variant="outline"
            className="rounded-md font-mono text-[11px] font-normal normal-case tracking-normal text-muted-foreground"
          >
            #{project.tag}
          </Badge>
        </div>

        <CardDescription className="line-clamp-3 text-[13px] leading-relaxed wrap-break-word text-muted-foreground">
          {project.summary}
        </CardDescription>

        <div className="flex min-w-0 flex-wrap items-center gap-2 pt-1">
          <span className="text-[12px] font-semibold text-foreground">
            Tools:
          </span>
          {project.tools.map((tool) => (
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

      <CardFooter className="mt-auto flex min-w-0 flex-wrap items-center justify-between gap-3 border-t-0 bg-transparent px-4 py-4">
        <span className="inline-flex items-center gap-2 font-mono text-[12px] text-muted-foreground">
          <Calendar className="size-3.5 shrink-0" aria-hidden />#{project.year}
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
    </Card>
  );
}
