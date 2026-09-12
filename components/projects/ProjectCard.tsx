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
    <div className="ring-border/40 relative h-44 overflow-hidden rounded-xl bg-[#0a0e14] ring-1">
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
    <Card className="group bg-muted ring-border/20 flex h-full min-w-0 flex-col overflow-hidden rounded-3xl py-0 transition-transform duration-300 hover:-translate-y-0.5">
      <CardHeader className="min-w-0 gap-0 p-3 pb-0">
        {project.href ? (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-visible:ring-ring block min-w-0 focus-visible:ring-2 focus-visible:outline-none"
          >
            {media}
          </a>
        ) : (
          media
        )}
      </CardHeader>

      <CardContent className="flex min-w-0 flex-1 flex-col gap-3 px-4 pt-4 pb-0">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <CardTitle className="font-heading min-w-0 text-lg font-semibold tracking-tight wrap-break-word">
            <h3>{project.title}</h3>
          </CardTitle>
          <Badge
            variant="outline"
            className="text-muted-foreground rounded-md font-mono text-[11px] font-normal tracking-normal normal-case"
          >
            #{project.tag}
          </Badge>
        </div>

        <CardDescription className="text-muted-foreground line-clamp-3 text-[13px] leading-relaxed wrap-break-word">
          {project.summary}
        </CardDescription>

        <div className="flex min-w-0 flex-wrap items-center gap-2 pt-1">
          <span className="text-foreground text-[12px] font-semibold">
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
        <span className="text-muted-foreground inline-flex items-center gap-2 font-mono text-[12px]">
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
