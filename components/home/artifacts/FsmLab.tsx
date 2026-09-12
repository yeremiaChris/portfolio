"use client";

import { useState } from "react";
import { PointerIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fsmMeta, type FsmState } from "@/lib/artifacts";
import { cn } from "@/lib/utils";

const ACTIONS: { state: Exclude<FsmState, "IDLE">; label: string }[] = [
  { state: "FETCHING", label: "Fetch" },
  { state: "MUTATING", label: "Mutate" },
  { state: "SUCCESS", label: "Resolve" },
];

export function FsmLab() {
  const [state, setState] = useState<FsmState>("IDLE");
  const meta = fsmMeta[state];

  return (
    <Card className="bg-muted ring-border/20 hover:bg-card h-full transition-colors">
      <CardHeader>
        <div className="col-span-full mb-2 flex items-center justify-between">
          <span className="bg-secondary text-primary rounded-xl p-2">
            <PointerIcon className="size-5" />
          </span>
          <Badge
            variant="secondary"
            className="font-mono text-[10px] tracking-widest text-[#6ffbbe] uppercase"
          >
            State Machine
          </Badge>
        </div>
        <CardTitle className="font-heading text-xl font-semibold tracking-tight">
          Micro-Interactions &amp; A11y
        </CardTitle>
        <CardDescription className="text-[13px] leading-5">
          Deterministic UI states with focus-friendly controls and
          screen-reader-visible status.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-3 rounded-xl bg-[#0a0e14] p-3">
          <div className="flex items-center justify-between">
            <span className="text-foreground font-mono text-xs">
              FSM State:{" "}
              <strong className={cn("font-mono font-bold", meta.statusClass)}>
                {state}
              </strong>
            </span>
            <span
              className="font-mono text-[10px] text-[#4cd7f6]"
              aria-live="polite"
            >
              {meta.fps}
            </span>
          </div>

          <div className="flex gap-2" role="group" aria-label="FSM transitions">
            {ACTIONS.map((action) => (
              <Button
                key={action.state}
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setState(action.state)}
                className={cn(
                  "flex-1 font-mono text-xs",
                  state === action.state &&
                    "bg-primary text-primary-foreground hover:bg-primary/90",
                )}
              >
                {action.label}
              </Button>
            ))}
          </div>

          <div className="bg-secondary/80 text-muted-foreground flex items-center justify-between rounded p-2 font-mono text-xs">
            <span>WCAG 2.2 AA contrast:</span>
            <span className="text-primary font-bold">14.2:1 (PASS)</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="text-muted-foreground justify-between border-t-0 bg-transparent font-mono text-[10px]">
        <span>ARIA labels &amp; keyboard-ready controls</span>
        <span className="text-primary">Demo coverage</span>
      </CardFooter>
    </Card>
  );
}
