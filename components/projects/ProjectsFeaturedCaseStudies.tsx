import { FeaturedCaseStudy } from "@/components/projects/FeaturedCaseStudy";
import { getFeaturedProjects } from "@/lib/projects";

export function ProjectsFeaturedCaseStudies() {
  const featured = getFeaturedProjects();

  return (
    <section
      id="projects-grid"
      aria-label="Featured projects"
      className="mb-10 flex w-full min-w-0 flex-col gap-14 md:mb-16 md:gap-20"
    >
      {featured.map((project, index) => (
        <FeaturedCaseStudy
          key={project.id}
          project={project}
          index={index}
          reverse={index % 2 === 1}
        />
      ))}
    </section>
  );
}
