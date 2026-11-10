"use client";

import { HeroProductionProjectCard } from "@/components/home/HeroProductionProjectCard";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { getHomeProductionProjects } from "@/lib/home-production";
import { site } from "@/lib/site";

const productionProjects = getHomeProductionProjects();

export function HeroProduction() {
  return (
    <section
      aria-labelledby="production-heading"
      className="flex w-full flex-col gap-4"
    >
      <Reveal preset="expressive" when="inView">
        <h2
          id="production-heading"
          className="text-muted-foreground text-left font-mono text-[11px] tracking-[0.16em] uppercase"
        >
          Production
        </h2>
      </Reveal>

      <nav aria-label="Selected production work">
        <Stagger
          preset="expressive"
          when="inView"
          className="grid grid-cols-1 gap-3 md:grid-cols-3 md:items-stretch md:gap-3"
        >
          {productionProjects.map((project) => (
            <StaggerItem key={project.id} className="flex h-full min-h-0">
              <HeroProductionProjectCard project={project} />
            </StaggerItem>
          ))}
        </Stagger>
      </nav>

      <div className="pt-1 md:pt-2">
        <h3 id="production-stats" className="sr-only">
          Key statistics
        </h3>
        <Stagger
          preset="expressive"
          when="inView"
          aria-labelledby="production-stats"
          className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
        >
          {site.stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="flex flex-col gap-0.5 text-left">
                <span className="font-heading text-foreground text-2xl font-semibold tracking-tight">
                  {stat.value}
                </span>
                <span className="text-muted-foreground text-[10px] tracking-[0.12em] uppercase">
                  {stat.label}
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
