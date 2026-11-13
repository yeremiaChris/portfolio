import { ProjectsFeaturedMotion } from "@/components/projects/ProjectsFeaturedMotion";
import { getFeaturedProjects } from "@/lib/projects";

export function ProjectsFeaturedCaseStudies() {
  const featured = getFeaturedProjects();

  return <ProjectsFeaturedMotion projects={featured} />;
}
