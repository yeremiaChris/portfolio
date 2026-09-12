import { CaseStudyMetrics } from "@/components/home/milestones/CaseStudyMetrics";
import { LatencyChart } from "@/components/home/milestones/LatencyChart";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  tagToneClass,
  type MilestoneCaseStudy,
} from "@/lib/milestones";
import { cn } from "@/lib/utils";

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

          <CaseStudyMetrics metrics={study.metrics} columns={3} />
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
