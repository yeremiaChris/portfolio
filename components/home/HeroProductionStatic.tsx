import { HeroProductionProjectCard } from "@/components/home/HeroProductionProjectCard";
import {
  getHomeProductionIntro,
  getHomeProductionProjects,
} from "@/lib/home-production";

const productionProjects = getHomeProductionProjects();
const productionIntro = getHomeProductionIntro();

export function HeroProductionStatic() {
  return (
    <section
      aria-labelledby="production-heading"
      className="flex w-full flex-col gap-4"
    >
      <header className="flex flex-col gap-2">
        <h2
          id="production-heading"
          className="text-muted-foreground text-left font-mono text-[11px] tracking-[0.16em] uppercase"
        >
          Production
        </h2>
        <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
          {productionIntro}
        </p>
      </header>

      <nav aria-label="Selected production work">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:items-stretch md:gap-3">
          {productionProjects.map((project) => (
            <div key={project.id} className="flex h-full min-h-0">
              <HeroProductionProjectCard project={project} />
            </div>
          ))}
        </div>
      </nav>
    </section>
  );
}
