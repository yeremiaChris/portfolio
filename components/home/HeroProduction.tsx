"use client";

import { HeroProofCard } from "@/components/home/HeroProofCard";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { site } from "@/lib/site";

export function HeroProduction() {
  return (
    <div className="w-full">
      <Reveal preset="expressive" when="inView" className="mb-4">
        <p className="text-muted-foreground text-left font-mono text-[11px] tracking-[0.16em] uppercase">
          Production
        </p>
      </Reveal>
      <nav aria-label="Selected production work">
        <Stagger
          preset="expressive"
          when="inView"
          className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 md:gap-6"
        >
          {site.proof.map((item) => (
            <StaggerItem key={item.id}>
              <HeroProofCard
                href={item.href}
                label={item.label}
                meta={item.meta}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </nav>
    </div>
  );
}
