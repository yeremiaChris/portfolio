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
            className="flex flex-col rounded-lg bg-muted p-3 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                {stat.label}
              </span>
              <Icon
                className={
                  stat.icon === "cloud" || stat.icon === "layers"
                    ? "size-4 text-[#4cd7f6]"
                    : "size-4 text-primary"
                }
              />
            </div>
            <span className="font-heading mt-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {stat.value}
            </span>
            <span className="text-[13px] text-muted-foreground">
              {stat.detail}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
