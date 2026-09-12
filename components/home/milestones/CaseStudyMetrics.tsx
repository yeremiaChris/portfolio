import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  metricToneClass,
  type MilestoneMetric,
} from "@/lib/milestones";
import { cn } from "@/lib/utils";

export function CaseStudyMetrics({
  metrics,
  columns = 2,
}: {
  metrics: MilestoneMetric[];
  columns?: 2 | 3;
}) {
  return (
    <div
      className={cn(
        "grid gap-2 font-mono sm:gap-3",
        columns === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2",
      )}
    >
      {metrics.map((metric) => (
        <Card
          key={metric.label}
          size="sm"
          className="gap-0 rounded-xl bg-[#0a0e14] py-0 ring-border/40"
        >
          <CardContent className="p-3">
            <dl className="flex flex-row items-baseline justify-between gap-3 sm:flex-col sm:items-stretch">
              <dt className="order-2 shrink-0 text-right text-[10px] tracking-wider text-muted-foreground uppercase sm:order-2 sm:mt-1 sm:text-left">
                {metric.label}
              </dt>
              <dd
                className={cn(
                  "order-1 min-w-0 text-xl font-bold tracking-tight sm:text-2xl",
                  metric.tone
                    ? metricToneClass[metric.tone]
                    : "text-foreground",
                )}
              >
                {metric.value}
              </dd>
            </dl>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
