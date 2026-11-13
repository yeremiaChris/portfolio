"use client";

import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import {
  ProjectCard,
  type ProjectCardSize,
} from "@/components/projects/ProjectCard";
import { getFeaturedProjects, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

type BentoSlot = {
  id: string;
  size: ProjectCardSize;
  placement: string;
};

const bentoSlots: BentoSlot[] = [
  {
    id: "mazecare",
    size: "large",
    placement:
      "order-1 md:order-none md:col-span-7 md:col-start-1 md:row-start-1",
  },
  {
    id: "primaku",
    size: "large",
    placement:
      "order-2 md:order-none md:col-span-7 md:col-start-6 md:row-start-2",
  },
  {
    id: "kiriminaja",
    size: "compact",
    placement:
      "order-3 md:order-none md:col-span-5 md:col-start-8 md:row-start-1",
  },
  {
    id: "primacare",
    size: "compact",
    placement:
      "order-4 md:order-none md:col-span-5 md:col-start-1 md:row-start-2",
  },
];

function resolveFeatured(projects: Project[]): Array<Project & BentoSlot> {
  const byId = new Map(projects.map((project) => [project.id, project]));
  return bentoSlots
    .map((slot) => {
      const project = byId.get(slot.id);
      if (!project) {
        return null;
      }
      return { ...project, ...slot };
    })
    .filter((project): project is Project & BentoSlot => project !== null);
}

export function ProjectsBentoGrid() {
  const featured = resolveFeatured(getFeaturedProjects());

  return (
    <section
      id="projects-grid"
      aria-label="Featured projects"
      className="mb-10 w-full min-w-0 md:mb-14"
    >
      <Stagger
        preset="calm"
        when="inView"
        className="grid w-full min-w-0 grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-2 md:gap-5"
      >
        {featured.map((project) => (
          <StaggerItem
            key={project.id}
            className={cn("min-w-0", project.placement)}
          >
            <ProjectCard project={project} size={project.size} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
