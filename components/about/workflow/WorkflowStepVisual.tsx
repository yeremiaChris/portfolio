"use client";

import { m, useReducedMotion } from "motion/react";

import type { AboutWorkflowStep } from "@/lib/about";
import { aboutStaggerTransition } from "@/lib/scroll-motion";
import { cn } from "@/lib/utils";

type WorkflowStepVisualProps = {
  stepId: AboutWorkflowStep["id"];
  active: boolean;
};

export function WorkflowStepVisual({
  stepId,
  active,
}: WorkflowStepVisualProps) {
  const reducedMotion = useReducedMotion();
  const motionOn = active && !reducedMotion;

  return (
    <div
      className="border-border/30 bg-secondary/40 ring-border/20 relative mb-4 aspect-[5/3] w-full max-w-none overflow-hidden rounded-xl border ring-1"
      aria-hidden
    >
      <div className="absolute inset-0 p-3">
        {stepId === "plan" && <PlanVisual motionOn={motionOn} />}
        {stepId === "ticket" && <TicketVisual motionOn={motionOn} />}
        {stepId === "agent" && <AgentVisual motionOn={motionOn} />}
        {stepId === "review" && <ReviewVisual motionOn={motionOn} />}
        {stepId === "merge" && <MergeVisual motionOn={motionOn} />}
      </div>
    </div>
  );
}

function PlanVisual({ motionOn }: { motionOn: boolean }) {
  const lines = ["Scope", "Constraints", "Approach"];
  return (
    <div className="flex h-full flex-col gap-2">
      {lines.map((line, index) => (
        <m.div
          key={line}
          className="border-border/25 bg-muted/80 flex items-center gap-2 rounded-md border px-2 py-1.5"
          initial={false}
          animate={{
            opacity: motionOn ? 1 : 0.35,
            clipPath: motionOn ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)",
          }}
          transition={{
            ...aboutStaggerTransition,
            delay: motionOn ? index * 0.12 : 0,
          }}
        >
          <span className="bg-brand-accent/80 size-1.5 shrink-0 rounded-full" />
          <span className="text-muted-foreground text-[10px] font-medium tracking-wide uppercase">
            {line}
          </span>
          <span className="bg-border/40 ml-auto h-1 max-w-[40%] flex-1 rounded-full" />
        </m.div>
      ))}
    </div>
  );
}

function TicketVisual({ motionOn }: { motionOn: boolean }) {
  return (
    <m.div
      className="border-border/40 bg-muted/90 flex h-full flex-col gap-2 rounded-lg border p-2.5 shadow-[0_0_24px_rgb(76_215_246_/_0.08)]"
      initial={false}
      animate={{
        opacity: motionOn ? 1 : 0.4,
        translateY: motionOn ? 0 : 6,
      }}
      transition={aboutStaggerTransition}
    >
      <div className="flex items-center gap-1.5">
        <span className="bg-brand-accent/20 text-brand-accent rounded px-1.5 py-0.5 text-[9px] font-semibold tracking-wider">
          ···
        </span>
        <span className="bg-border/50 h-2 w-12 rounded-full" />
      </div>
      <p className="text-foreground text-[11px] leading-snug font-medium">
        <span className="bg-border/45 block h-2.5 w-full max-w-[90%] rounded-full" />
        <span className="bg-border/30 mt-1.5 block h-2 w-2/3 rounded-full" />
      </p>
      <div className="mt-auto flex flex-wrap gap-1">
        {["···", "···", "···"].map((chip) => (
          <span
            key={chip}
            className="bg-secondary text-muted-foreground rounded px-1.5 py-0.5 text-[8px]"
          >
            {chip}
          </span>
        ))}
      </div>
    </m.div>
  );
}

function AgentVisual({ motionOn }: { motionOn: boolean }) {
  const rows = [0, 1, 2];
  return (
    <div className="flex h-full flex-col gap-1.5 font-mono text-[9px] leading-relaxed">
      {rows.map((row, index) => (
        <m.div
          key={row}
          className="text-muted-foreground flex gap-1.5"
          initial={false}
          animate={{
            opacity: motionOn ? 1 : 0.3,
            clipPath: motionOn ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)",
          }}
          transition={{
            ...aboutStaggerTransition,
            delay: motionOn ? index * 0.1 : 0,
          }}
        >
          <span className="text-brand-accent shrink-0">+</span>
          <span className="bg-border/40 h-2 min-w-0 flex-1 rounded-full" />
        </m.div>
      ))}
      <m.div
        className="border-brand-accent/35 bg-brand-accent/10 text-brand-accent mt-auto flex items-center gap-1.5 rounded border px-2 py-1"
        initial={false}
        animate={{ opacity: motionOn ? 1 : 0.25 }}
        transition={{ ...aboutStaggerTransition, delay: motionOn ? 0.35 : 0 }}
      >
        <span className="bg-brand-accent size-1.5 rounded-full" />
        <span className="bg-border/35 h-2 w-24 rounded-full" />
      </m.div>
    </div>
  );
}

function ReviewVisual({ motionOn }: { motionOn: boolean }) {
  return (
    <div className="flex h-full flex-col gap-2">
      <m.div
        className="border-border/35 relative flex-1 overflow-hidden rounded-md border bg-[#0a0e14]"
        initial={false}
        animate={{ opacity: motionOn ? 1 : 0.45 }}
        transition={aboutStaggerTransition}
      >
        <div className="border-border/30 flex items-center gap-1 border-b px-2 py-1">
          <span className="bg-destructive/80 size-1.5 rounded-full" />
          <span className="bg-muted-foreground/50 size-1.5 rounded-full" />
          <span className="bg-brand-accent/60 size-1.5 rounded-full" />
        </div>
        <div className="p-2">
          <div className="bg-border/30 mb-1.5 h-2 w-3/4 rounded-full" />
          <div className="bg-border/20 h-2 w-1/2 rounded-full" />
        </div>
        <m.span
          className="border-brand-accent/50 bg-brand-accent/15 text-brand-accent absolute right-2 bottom-2 flex size-6 items-center justify-center rounded-full border"
          initial={false}
          animate={{
            opacity: motionOn ? 1 : 0,
            clipPath: motionOn ? "circle(50%)" : "circle(0%)",
          }}
          transition={{ ...aboutStaggerTransition, delay: motionOn ? 0.25 : 0 }}
        >
          ✓
        </m.span>
      </m.div>
    </div>
  );
}

function MergeVisual({ motionOn }: { motionOn: boolean }) {
  const checks = ["lint", "types", "tests", "LH"];
  return (
    <div className="flex h-full flex-col justify-between gap-2">
      <MotionCheckRow checks={checks} motionOn={motionOn} />
      <m.div
        className={cn(
          "text-center text-[10px] font-semibold tracking-wide",
          motionOn ? "text-brand-accent" : "text-muted-foreground",
        )}
        initial={false}
        animate={{ opacity: motionOn ? 1 : 0.35 }}
        transition={{ ...aboutStaggerTransition, delay: motionOn ? 0.45 : 0 }}
      >
        development → main
      </m.div>
    </div>
  );
}

function MotionCheckRow({
  checks,
  motionOn,
}: {
  checks: string[];
  motionOn: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {checks.map((check, index) => (
        <m.span
          key={check}
          className={cn(
            "flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-medium",
            motionOn
              ? "bg-brand-accent/15 text-brand-accent shadow-[0_0_12px_rgb(76_215_246_/_0.25)]"
              : "bg-secondary text-muted-foreground",
          )}
          initial={false}
          animate={{ opacity: motionOn ? 1 : 0.4 }}
          transition={{
            ...aboutStaggerTransition,
            delay: motionOn ? index * 0.08 : 0,
          }}
        >
          <span
            className={cn(
              "size-1.5 rounded-full",
              motionOn ? "bg-brand-accent" : "bg-muted-foreground/50",
            )}
          />
          {check}
        </m.span>
      ))}
    </div>
  );
}
