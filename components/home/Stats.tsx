import { AwardIcon, GaugeIcon, UsersIcon } from "lucide-react";

import { Container } from "@/components/Container";
import { site } from "@/lib/site";

const ICONS = {
  award: AwardIcon,
  gauge: GaugeIcon,
  users: UsersIcon,
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
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
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
                      stat.icon === "gauge"
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
