import { AwardIcon, GaugeIcon, HeartPulseIcon, UsersIcon } from "lucide-react";

import { Container } from "@/components/Container";
import { site } from "@/lib/site";

const ICONS = {
  award: AwardIcon,
  gauge: GaugeIcon,
  users: UsersIcon,
  heart: HeartPulseIcon,
} as const;

export function Stats() {
  return (
    <section
      aria-labelledby="stats-heading"
      className="border-border/40 bg-muted/30 w-full border-y py-12 md:py-16"
    >
      <Container>
        <h2 id="stats-heading" className="sr-only">
          Key statistics
        </h2>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {site.stats.map((stat) => {
            const Icon = ICONS[stat.icon];
            return (
              <li
                key={stat.label}
                className="bg-card border-border/40 flex flex-col rounded-lg border p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground font-mono text-[10px] tracking-wider uppercase">
                    {stat.label}
                  </span>
                  <Icon
                    className={
                      stat.icon === "gauge" || stat.icon === "heart"
                        ? "size-4 text-[#4cd7f6]"
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
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
