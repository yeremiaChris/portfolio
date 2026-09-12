import {
  AwardIcon,
  BadgeCheckIcon,
  CloudCheckIcon,
  LayersIcon,
} from "lucide-react";

import { site } from "@/lib/site";

const ICONS = {
  award: AwardIcon,
  cloud: CloudCheckIcon,
  verified: BadgeCheckIcon,
  layers: LayersIcon,
} as const;

export function HeroStats() {
  return (
    <ul className="grid w-full grid-cols-2 gap-2">
      {site.stats.map((stat) => {
        const Icon = ICONS[stat.icon];
        return (
          <li
            key={stat.label}
            className="bg-muted flex flex-col rounded-lg p-3 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground font-mono text-[10px] tracking-wider uppercase">
                {stat.label}
              </span>
              <Icon
                className={
                  stat.icon === "cloud" || stat.icon === "layers"
                    ? "size-4 text-[#4cd7f6]"
                    : "text-primary size-4"
                }
              />
            </div>
            <span className="font-heading text-foreground mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
              {stat.value}
            </span>
            <span className="text-muted-foreground text-[13px]">
              {stat.detail}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
