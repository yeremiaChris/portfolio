import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import {
  projectSurfaceDividerClass,
  projectSurfaceHairlineClass,
  projectSurfacePanelClass,
} from "@/components/projects/projectSurface";
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
        className={cn(projectSurfacePanelClass, "relative p-0")}
      >
        <div className={projectSurfaceHairlineClass} aria-hidden />
        <div className={cn("divide-y", projectSurfaceDividerClass)}>
          {archive.map((project) => (
            <StaggerItem key={project.id}>
              <ProjectArchiveRow project={project} />
            </StaggerItem>
          ))}
        </div>
      </Stagger>
    </section>
  );
}

function ProjectArchiveRow({ project }: { project: Project }) {
  const rowClassName = cn(
    "project-archive-row group focus-ring grid w-full grid-cols-[1fr_auto] items-start gap-x-3 gap-y-1 px-5 py-3.5 text-left outline-none transition-colors duration-200 motion-reduce:transition-none sm:grid-cols-[minmax(10.5rem,13rem)_minmax(0,1fr)_4.5rem_1.25rem] sm:items-center sm:gap-x-4 sm:px-6",
    "hover:bg-secondary/25",
  );

  const cells = (
    <>
      <span className="font-heading text-foreground group-hover:text-primary order-1 text-[15px] font-semibold tracking-tight transition-colors motion-reduce:transition-none sm:order-none">
        {project.title}
        {project.tag === "personal" ? (
          <span className="text-muted-foreground ml-2 text-[11px] font-medium">
            Personal
          </span>
        ) : null}
      </span>
      <span className="text-muted-foreground order-3 col-span-2 line-clamp-2 min-w-0 text-[13px] leading-snug sm:order-none sm:col-span-1">
        {project.summary}
      </span>
      <span className="text-muted-foreground order-2 text-[12px] tabular-nums sm:order-none sm:text-right">
        {project.year}
      </span>
      <span className="order-4 flex justify-end sm:order-none">
        {project.href ? (
          <ArrowUpRight
            className="text-primary size-4 opacity-60 transition-opacity group-hover:opacity-100 motion-reduce:opacity-100 motion-reduce:transition-none"
            aria-hidden
          />
        ) : (
          <span className="size-4" aria-hidden />
        )}
      </span>
    </>
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
        {cells}
      </a>
    );
  }

  return (
    <div id={project.id} className={cn(rowClassName, "scroll-mt-24")}>
      {cells}
    </div>
  );
}
