import { ProjectArchiveList } from "@/components/projects/ProjectArchiveList";
import { ProjectsBentoGrid } from "@/components/projects/ProjectsBentoGrid";

export function ProjectsGrid() {
  return (
    <div className="flex w-full min-w-0 flex-col">
      <ProjectsBentoGrid />
      <ProjectArchiveList />
    </div>
  );
}
