import { CaseStudyMetrics } from "@/components/home/milestones/CaseStudyMetrics";
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
        <CaseStudyMetrics metrics={study.metrics} columns={2} />
      </CardContent>
    </Card>
  );
}
