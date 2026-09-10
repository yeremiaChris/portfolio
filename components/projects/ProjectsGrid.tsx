import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/lib/projects";

export function ProjectsGrid() {
  return (
    <section
      id="projects-grid"
      aria-label="Featured projects"
      className="mb-8 grid w-full min-w-0 grid-cols-1 gap-4 md:mb-12 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  );
}
