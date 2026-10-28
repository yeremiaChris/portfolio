import { ChartNoAxesColumnIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { edgeChunks } from "@/lib/artifacts";

export function EdgeStreaming() {
  return (
    <Card className="bg-muted ring-border/20 hover:bg-card h-full transition-colors">
      <CardHeader>
        <div className="col-span-full mb-2 flex items-center justify-between">
          <span className="bg-secondary rounded-xl p-2 text-[#4cd7f6]">
            <ChartNoAxesColumnIcon className="size-5" />
          </span>
          <Badge
            variant="secondary"
            className="font-mono text-[10px] tracking-widest text-[#4cd7f6] uppercase"
          >
            Demo · Illustrative
          </Badge>
        </div>
        <CardTitle className="font-heading text-xl font-semibold tracking-tight">
          Next-Gen Edge Streaming &amp; SSR
        </CardTitle>
        <CardDescription className="text-[13px] leading-5">
          Illustrative RSC chunk waterfall — progressive hydration and parallel
          data fetching patterns.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-2 rounded-xl bg-[#0a0e14] p-3 font-mono text-xs">
          {edgeChunks.map((chunk) => (
            <div key={chunk.id} className="flex flex-col gap-1">
              <div className="text-muted-foreground flex justify-between">
                <span>{chunk.label}</span>
                <span className={chunk.timeClass}>{chunk.duration}</span>
              </div>
              <div className="bg-secondary h-2 w-full overflow-hidden rounded">
                <div
                  className={`h-full rounded ${chunk.colorClass}`}
                  style={{ width: chunk.width, marginLeft: chunk.offset }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="text-muted-foreground border-t-0 bg-transparent font-mono text-[10px]">
        Illustrative timing bars — not measured on this site.
      </CardFooter>
    </Card>
  );
}
