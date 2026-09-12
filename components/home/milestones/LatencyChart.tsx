import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { MilestoneChartBar } from "@/lib/milestones";
import { cn } from "@/lib/utils";

type LatencyChartProps = {
  title: string;
  subtitle: string;
  caption: string;
  verified: string;
  bars: MilestoneChartBar[];
};

export function LatencyChart({
  title,
  subtitle,
  caption,
  verified,
  bars,
}: LatencyChartProps) {
  return (
    <Card
      size="sm"
      className="h-full gap-3 rounded-2xl bg-[#0a0e14] py-0 ring-border/40"
    >
      <CardHeader className="flex-row items-center justify-between gap-2 p-4 pb-0">
        <CardTitle className="font-mono text-[13px] font-semibold text-foreground">
          {title}
        </CardTitle>
        <span className="font-mono text-[10px] text-primary">{subtitle}</span>
      </CardHeader>

      <CardContent className="px-4">
        <div
          className="flex h-44 w-full items-end gap-2 px-2 pt-4"
          role="img"
          aria-label={`${title}. ${subtitle}`}
        >
          {bars.map((bar) => (
            <div
              key={bar.label}
              className="flex h-full flex-1 flex-col items-center justify-end gap-1"
            >
              <div
                className={cn(
                  "w-full rounded-t",
                  bar.emphasized ? "bg-primary" : "bg-secondary",
                )}
                style={{ height: `${bar.heightPct}%` }}
              />
              <span
                className={cn(
                  "font-mono text-[10px] text-muted-foreground",
                  bar.emphasized && "font-bold text-primary",
                )}
              >
                {bar.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="justify-between border-t-0 bg-transparent px-4 pt-0 pb-4 font-mono text-xs text-muted-foreground">
        <span>{caption}</span>
        <span className="font-bold text-primary">{verified}</span>
      </CardFooter>
    </Card>
  );
}
