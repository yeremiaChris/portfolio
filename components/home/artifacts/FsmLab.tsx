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
    <Card className="h-full bg-muted ring-border/20 transition-colors hover:bg-card">
      <CardHeader>
        <div className="col-span-full mb-2 flex items-center justify-between">
          <span className="rounded-xl bg-secondary p-2 text-primary">
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
            <span className="font-mono text-xs text-foreground">
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

          <div className="flex items-center justify-between rounded bg-secondary/80 p-2 font-mono text-xs text-muted-foreground">
            <span>WCAG 2.2 AA contrast:</span>
            <span className="font-bold text-primary">14.2:1 (PASS)</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="justify-between border-t-0 bg-transparent font-mono text-[10px] text-muted-foreground">
        <span>ARIA labels &amp; keyboard-ready controls</span>
        <span className="text-primary">Demo coverage</span>
      </CardFooter>
    </Card>
  );
}
