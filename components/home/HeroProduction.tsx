"use client";

import { AwardIcon, GaugeIcon, UsersIcon } from "lucide-react";

import { HeroProofCard } from "@/components/home/HeroProofCard";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { homeSignalCardClassName } from "@/lib/home-signal-card";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const STAT_ICONS = {
  award: AwardIcon,
  gauge: GaugeIcon,
  users: UsersIcon,
} as const;

export function HeroProduction() {
  return (
    <div className="flex w-full flex-col gap-12 md:gap-16">
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
            className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6"
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
      <div aria-labelledby="stats-heading" className="w-full">
        <h2 id="stats-heading" className="sr-only">
          Key statistics
        </h2>
        <Stagger
          preset="expressive"
          when="inView"
          className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6"
        >
          {site.stats.map((stat) => {
            const Icon = STAT_ICONS[stat.icon];
            return (
              <StaggerItem key={stat.label}>
                <div className={cn(homeSignalCardClassName)}>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-[10px] tracking-wider uppercase">
                      {stat.label}
                    </span>
                    <Icon
                      className={
                        stat.icon === "gauge"
                          ? "text-brand-accent size-4"
                          : "text-primary size-4"
                      }
                    />
                  </div>
                  <span className="font-heading text-foreground mt-2 text-2xl font-semibold tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-muted-foreground mt-1 text-[13px]">
                    {stat.detail}
                  </span>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </div>
  );
}
