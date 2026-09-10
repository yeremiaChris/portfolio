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

export function CaseStudyCard({ study }: { study: MilestoneCaseStudy }) {
  return (
    <Card className="flex h-full flex-col rounded-3xl bg-muted ring-border/20">
      <CardHeader className="gap-2">
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
        <CardTitle className="font-heading text-xl font-bold tracking-tight">
          <h3>{study.title}</h3>
        </CardTitle>
        <CardDescription className="text-[15px] leading-relaxed">
          {study.summary}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-auto">
        <dl className="grid grid-cols-2 gap-3 font-mono">
          {study.metrics.map((metric) => (
            <div key={metric.label} className="rounded-xl bg-[#0a0e14] p-3">
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
              <span className="mt-1 block text-[10px] tracking-wider text-muted-foreground uppercase">
                {metric.label}
              </span>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
