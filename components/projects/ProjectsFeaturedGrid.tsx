"use client";

import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { getFeaturedProjects } from "@/lib/projects";

export function ProjectsFeaturedGrid() {
  const featured = getFeaturedProjects();

  return (
    <section
      id="projects-grid"
      aria-label="Featured projects"
      className="mb-10 w-full min-w-0 md:mb-14"
    >
      <Stagger
        preset="calm"
        when="inView"
        className="grid w-full min-w-0 grid-cols-1 gap-4 md:auto-rows-fr md:grid-cols-2 md:gap-5"
      >
        {featured.map((project) => (
          <StaggerItem key={project.id} className="h-full min-w-0">
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
