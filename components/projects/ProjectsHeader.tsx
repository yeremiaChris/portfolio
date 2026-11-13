import { Reveal } from "@/components/motion/Reveal";
import { projectsIntro } from "@/lib/projects";

export function ProjectsHeader() {
  return (
    <section className="relative flex w-full min-w-0 flex-col overflow-hidden pt-0 pb-6 md:pb-8">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[min(28rem,70vh)] rounded-[2rem] bg-[#070b10]"
        aria-hidden
      />
      <div
        className="bg-brand-accent/10 pointer-events-none absolute -top-16 left-0 -z-10 size-[22rem] rounded-full blur-3xl"
        aria-hidden
      />
      <div
        className="bg-brand-accent/6 pointer-events-none absolute top-1/4 right-0 -z-10 size-[20rem] rounded-full blur-[120px]"
        aria-hidden
      />
      <div
        className="border-border/35 pointer-events-none absolute inset-x-0 top-0 -z-10 h-[min(28rem,70vh)] rounded-[2rem] border bg-[#0a0e14]/80"
        aria-hidden
      />

      <Reveal
        when="mount"
        preset="calm"
        className="relative max-w-4xl min-w-0 px-1 pt-8 md:px-4 md:pt-12"
      >
        <h1 className="font-heading text-foreground text-4xl font-bold tracking-tighter text-balance sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
          {projectsIntro.title}
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl text-[15px] leading-[1.75] sm:text-base">
          {projectsIntro.description}
        </p>
      </Reveal>
    </section>
  );
}
