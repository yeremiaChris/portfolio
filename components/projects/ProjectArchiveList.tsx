import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import {
  getArchiveProjects,
  projectsArchiveIntro,
  type Project,
} from "@/lib/projects";
import { cn } from "@/lib/utils";

export function ProjectArchiveList() {
  const archive = getArchiveProjects();

  if (archive.length === 0) {
    return null;
  }

  return (
    <section
      id="projects-archive"
      aria-labelledby="projects-archive-heading"
      className="mb-8 md:mb-12"
    >
      <Reveal>
        <header className="mb-5 flex max-w-2xl flex-col gap-1 md:mb-6">
          <p className="text-foreground/75 text-xs font-medium tracking-wide uppercase">
            {projectsArchiveIntro.eyebrow}
          </p>
          <h2
            id="projects-archive-heading"
            className="font-heading text-foreground text-2xl font-bold tracking-tight sm:text-3xl"
          >
            {projectsArchiveIntro.title}
          </h2>
          <p className="text-muted-foreground text-[15px] leading-6">
            {projectsArchiveIntro.description}
          </p>
        </header>
      </Reveal>

      <Stagger
        preset="calm"
        className="border-border/40 divide-border/40 flex w-full min-w-0 flex-col divide-y rounded-2xl border"
      >
        {archive.map((project) => (
          <StaggerItem key={project.id}>
            <ProjectArchiveRow project={project} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

function ProjectArchiveRow({ project }: { project: Project }) {
  const inner = (
    <>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-4">
        <span className="font-heading text-foreground group-hover:text-primary text-[15px] font-semibold tracking-tight transition-colors motion-reduce:transition-none sm:min-w-[12rem] sm:shrink-0">
          {project.title}
          {project.tag === "personal" ? (
            <span className="text-muted-foreground ml-2 text-[11px] font-medium">
              Personal
            </span>
          ) : null}
        </span>
        <span className="text-muted-foreground line-clamp-2 min-w-0 text-[13px] leading-snug sm:flex-1">
          {project.summary}
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-3 sm:gap-4">
        <span className="text-muted-foreground text-[12px] tabular-nums">
          {project.year}
        </span>
        {project.href ? (
          <ArrowUpRight
            className="text-primary size-4 opacity-60 transition-opacity group-hover:opacity-100 motion-reduce:opacity-100 motion-reduce:transition-none"
            aria-hidden
          />
        ) : null}
      </div>
    </>
  );

  const rowClassName = cn(
    "project-archive-row group focus-ring flex min-h-[3.25rem] w-full items-start justify-between gap-4 px-4 py-3.5 text-left outline-none transition-colors duration-200 motion-reduce:transition-none sm:items-center",
    "hover:bg-muted/50",
  );

  if (project.href) {
    return (
      <a
        id={project.id}
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(rowClassName, "scroll-mt-24")}
      >
        {inner}
      </a>
    );
  }

  return (
    <div id={project.id} className={cn(rowClassName, "scroll-mt-24")}>
      {inner}
    </div>
  );
}
