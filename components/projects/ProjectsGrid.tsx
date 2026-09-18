import { ProjectCard } from "@/components/projects/ProjectCard";
import {
  getArchiveProjects,
  getFeaturedProjects,
  projectsArchiveIntro,
} from "@/lib/projects";

export function ProjectsGrid() {
  const featured = getFeaturedProjects();
  const [lead, ...featuredRest] = featured;
  const archive = getArchiveProjects();

  return (
    <div className="flex w-full min-w-0 flex-col">
      <section
        id="projects-grid"
        aria-label="Featured projects"
        className="mb-10 flex w-full min-w-0 flex-col gap-4 md:mb-14 md:gap-6"
      >
        {lead ? <ProjectCard project={lead} variant="lead" /> : null}

        {featuredRest.length > 0 ? (
          <div className="grid w-full min-w-0 grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {featuredRest.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : null}
      </section>

      {archive.length > 0 ? (
        <section
          id="projects-archive"
          aria-labelledby="projects-archive-heading"
          className="mb-8 md:mb-12"
        >
          <header className="mb-6 flex max-w-2xl flex-col gap-1">
            <p className="font-mono text-[10px] tracking-widest text-[#4cd7f6] uppercase">
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

          <div className="grid w-full min-w-0 grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {archive.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
