import {
  Building2,
  Clock,
  Gauge,
  Package,
  type LucideIcon,
} from "lucide-react";

import {
  experienceMetrics,
  experienceMetricToneClass,
  type ExperienceMetric,
} from "@/lib/experience";
import { cn } from "@/lib/utils";

const METRIC_ICONS: Record<ExperienceMetric["icon"], LucideIcon> = {
  clock: Clock,
  building: Building2,
  package: Package,
  gauge: Gauge,
};

export function ExperienceMetrics() {
  return (
    <section aria-label="Experience metrics" className="mb-8 w-full md:mb-10">
      <div className="grid grid-cols-2 gap-2 rounded-xl bg-[#0a0e14] p-2 lg:grid-cols-4">
        {experienceMetrics.map((metric) => {
          const Icon = METRIC_ICONS[metric.icon];
          return (
            <article
              key={metric.label}
              className="bg-muted flex flex-col gap-1 rounded-lg p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground font-mono text-[10px] tracking-wider uppercase">
                  {metric.label}
                </span>
                <Icon
                  className={cn(
                    "size-4 shrink-0",
                    experienceMetricToneClass[metric.tone],
                  )}
                  aria-hidden
                />
              </div>
              <p
                className={cn(
                  "font-heading text-2xl font-bold tracking-tight",
                  experienceMetricToneClass[metric.tone],
                )}
              >
                {metric.value}
              </p>
              <p className="text-muted-foreground font-mono text-[12px]">
                {metric.detail}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
