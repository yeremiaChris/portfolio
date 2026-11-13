import { ProjectArchiveList } from "@/components/projects/ProjectArchiveList";
import { ProjectsFeaturedCaseStudies } from "@/components/projects/ProjectsFeaturedCaseStudies";

export function ProjectsGrid() {
  return (
    <div className="flex w-full min-w-0 flex-col">
      <ProjectsFeaturedCaseStudies />
      <ProjectArchiveList />
    </div>
  );
}
