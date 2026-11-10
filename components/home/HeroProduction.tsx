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
      className="flex w-full flex-col gap-6 md:gap-8"
    >
      <Reveal preset="expressive" when="inView" className="mb-1">
        <h2
          id="production-heading"
          className="text-muted-foreground text-left font-mono text-[11px] tracking-[0.16em] uppercase"
        >
          Production
        </h2>
      </Reveal>

      <Reveal preset="expressive" when="inView">
        <div className="border-border/50 bg-card/20 flex w-full flex-col overflow-hidden rounded-2xl border">
          <nav aria-label="Selected production work" className="p-4 md:p-5">
            <Stagger
              preset="expressive"
              when="inView"
              className="grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-2 md:gap-4 lg:gap-5"
            >
              {productionProjects.map((project) => (
                <StaggerItem
                  key={project.id}
                  className={cn("min-h-0", project.featured && "md:row-span-2")}
                >
                  <HeroProductionProjectCard project={project} />
                </StaggerItem>
              ))}
            </Stagger>
          </nav>

          <div className="border-border/50 border-t">
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
                    "flex min-h-[4.5rem] flex-col justify-center px-5 py-4 sm:px-6",
                    index > 0 &&
                      "border-border/50 border-t sm:border-t-0 sm:border-l",
                  )}
                >
                  <div className="flex flex-col gap-0.5 text-left">
                    <span className="font-heading text-foreground text-2xl font-semibold tracking-tight">
                      {stat.value}
                    </span>
                    <span className="text-muted-foreground text-[11px] tracking-[0.12em] uppercase">
                      {stat.label}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
