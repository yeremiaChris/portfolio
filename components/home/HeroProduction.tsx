"use client";

import { HeroProductionProjectCard } from "@/components/home/HeroProductionProjectCard";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { getHomeProductionProjects } from "@/lib/home-production";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const productionProjects = getHomeProductionProjects();

export function HeroProduction() {
  return (
    <section
      aria-labelledby="production-heading"
      className="flex w-full flex-col gap-4 md:gap-5"
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
          className="grid grid-cols-1 gap-3 md:grid-cols-[1.4fr_1fr_1fr] md:items-start md:gap-3"
        >
          {productionProjects.map((project) => (
            <StaggerItem key={project.id} className="min-h-0">
              <HeroProductionProjectCard project={project} />
            </StaggerItem>
          ))}
        </Stagger>
      </nav>

      <div className="border-border/50 border-t pt-3 md:pt-3.5">
        <h3 id="production-stats" className="sr-only">
          Key statistics
        </h3>
        <Stagger
          preset="expressive"
          when="inView"
          aria-labelledby="production-stats"
          className="grid grid-cols-1 sm:grid-cols-3"
        >
          {site.stats.map((stat, index) => (
            <StaggerItem
              key={stat.label}
              className={cn(
                "flex flex-col justify-center py-2.5 sm:py-3",
                index > 0 &&
                  "border-border/50 border-t sm:border-t-0 sm:border-l sm:pl-5",
                index === 0 && "sm:pr-5",
                index === 1 && "sm:px-5",
                index === 2 && "sm:pl-5",
              )}
            >
              <div className="flex flex-col gap-0.5 text-left">
                <span className="font-heading text-foreground text-xl font-semibold tracking-tight sm:text-2xl">
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
