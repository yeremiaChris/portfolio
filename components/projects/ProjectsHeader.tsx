import { projectsIntro } from "@/lib/projects";

export function ProjectsHeader() {
  return (
    <section className="flex w-full min-w-0 flex-col gap-6 pt-2 pb-8 md:pt-4 md:pb-10">
      <div className="max-w-3xl min-w-0">
        <h1 className="font-heading text-foreground text-3xl font-bold tracking-tight wrap-break-word sm:text-4xl lg:text-5xl">
          {projectsIntro.title}
        </h1>
        <p className="text-muted-foreground mt-3 text-[15px] leading-relaxed sm:text-base">
          {projectsIntro.description}
        </p>
      </div>
    </section>
  );
}
