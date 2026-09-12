import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  metricToneClass,
  tagToneClass,
  type MilestoneCaseStudy,
} from "@/lib/milestones";
import { cn } from "@/lib/utils";

import { LatencyChart } from "./LatencyChart";

export function FeaturedCaseStudy({ study }: { study: MilestoneCaseStudy }) {
  return (
    <Card className="overflow-hidden rounded-3xl bg-muted ring-border/20">
      <CardContent className="grid grid-cols-1 gap-8 p-6 md:p-8 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col justify-between gap-6 lg:col-span-7">
          <CardHeader className="gap-2 p-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="secondary"
                className={cn(
                  "font-mono text-[11px] tracking-wider uppercase",
                  tagToneClass[study.tagTone],
                )}
              >
                {study.tag}
              </Badge>
              <span className="font-mono text-[13px] text-muted-foreground">
                {study.stack}
              </span>
            </div>
            <CardTitle className="font-heading text-2xl font-bold tracking-tight text-foreground">
              <h3>{study.title}</h3>
            </CardTitle>
            <CardDescription className="text-[15px] leading-relaxed text-muted-foreground">
              {study.summary}
            </CardDescription>
          </CardHeader>

          <div className="grid grid-cols-3 gap-3 font-mono">
            {study.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl bg-[#0a0e14] p-3"
              >
                <dl>
                  <dt className="sr-only">{metric.label}</dt>
                  <dd
                    className={cn(
                      "block text-2xl font-bold tracking-tight",
                      metric.tone
                        ? metricToneClass[metric.tone]
                        : "text-foreground",
                    )}
                  >
                    {metric.value}
                  </dd>
                </dl>
                <p className="mt-1 block text-[10px] tracking-wider text-muted-foreground uppercase">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {study.chart ? (
          <div className="lg:col-span-5">
            <LatencyChart {...study.chart} />
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
