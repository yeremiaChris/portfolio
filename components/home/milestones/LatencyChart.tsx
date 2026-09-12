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
      className="ring-border/40 h-full gap-3 rounded-2xl bg-[#0a0e14] py-0"
    >
      <CardHeader className="flex-row items-center justify-between gap-2 p-4 pb-0">
        <CardTitle className="text-foreground font-mono text-[13px] font-semibold">
          {title}
        </CardTitle>
        <span className="text-primary font-mono text-[10px]">{subtitle}</span>
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
                  "text-muted-foreground font-mono text-[10px]",
                  bar.emphasized && "text-primary font-bold",
                )}
              >
                {bar.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="text-muted-foreground justify-between border-t-0 bg-transparent px-4 pt-0 pb-4 font-mono text-xs">
        <span>{caption}</span>
        <span className="text-primary font-bold">{verified}</span>
      </CardFooter>
    </Card>
  );
}
