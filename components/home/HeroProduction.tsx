"use client";

import { HeroProductionProjectCard } from "@/components/home/HeroProductionProjectCard";
import { homeBentoGridClass } from "@/components/home/homeSurface";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import {
  getHomeProductionIntro,
  getHomeProductionProjects,
} from "@/lib/home-production";

const productionProjects = getHomeProductionProjects();
const productionIntro = getHomeProductionIntro();

export function HeroProduction() {
  return (
    <section
      aria-labelledby="production-heading"
      className="flex w-full flex-col gap-4"
    >
      <Reveal when="inView" className="flex flex-col gap-2">
        <h2
          id="production-heading"
          className="text-muted-foreground text-left font-mono text-[11px] tracking-[0.16em] uppercase"
        >
          Production
        </h2>
        <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
          {productionIntro}
        </p>
      </Reveal>

      <nav aria-label="Selected production work">
        <Stagger when="inView" className={homeBentoGridClass}>
          {productionProjects.map((project) => (
            <StaggerItem key={project.id} className="flex h-full min-h-0">
              <HeroProductionProjectCard project={project} />
            </StaggerItem>
          ))}
        </Stagger>
      </nav>
    </section>
  );
}
