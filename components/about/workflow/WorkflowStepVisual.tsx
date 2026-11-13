"use client";

import { m, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

import {
  getWorkflowAgentPrLines,
  getWorkflowMergeChecks,
  getWorkflowPlanNotes,
  getWorkflowReviewChecks,
  getWorkflowTicketCriteria,
} from "@/components/about/workflow/workflow-step-copy";
import type { AboutWorkflowStep } from "@/lib/about";
import { aboutWorkflowSteps } from "@/lib/about";
import { aboutWorkflowStepSpring } from "@/lib/scroll-motion";
import { cn } from "@/lib/utils";

type WorkflowStepVisualProps = {
  stepId: AboutWorkflowStep["id"];
  active?: boolean;
  className?: string;
};

export function WorkflowStepVisual({
  stepId,
  active = true,
  className,
}: WorkflowStepVisualProps) {
  const reducedMotion = useReducedMotion();
  const motionOn = active && !reducedMotion;

  return (
    <div
      className={cn(
        "border-border/35 bg-secondary/25 ring-border/20 w-full min-w-0 rounded-xl border p-4 ring-1",
        className,
      )}
    >
      {stepId === "plan" && <PlanVisual motionOn={motionOn} />}
      {stepId === "ticket" && <TicketVisual motionOn={motionOn} />}
      {stepId === "agent" && <AgentVisual motionOn={motionOn} />}
      {stepId === "review" && (
        <ReviewVisual
          key={`review-${stepId}-${motionOn ? "motion" : "still"}`}
          motionOn={motionOn}
          reducedMotion={!!reducedMotion}
        />
      )}
      {stepId === "merge" && (
        <MergeVisual
          key={`merge-${stepId}-${motionOn ? "motion" : "still"}`}
          motionOn={motionOn}
          reducedMotion={!!reducedMotion}
        />
      )}
    </div>
  );
}

function PlanVisual({ motionOn }: { motionOn: boolean }) {
  const planStep = aboutWorkflowSteps.find((s) => s.id === "plan");
  const bullets = getWorkflowPlanNotes();
  return (
    <MotionStack motionOn={motionOn} className="gap-2">
      <p className="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">
        Plan notes
      </p>
      {bullets.map((row, index) => (
        <m.div
          key={row.label}
          className="border-border/30 bg-muted/70 flex flex-col gap-1 rounded-lg border px-3 py-2"
          initial={false}
          animate={{
            opacity: motionOn ? 1 : 0.9,
            translateY: motionOn ? 0 : 4,
          }}
          transition={{
            ...aboutWorkflowStepSpring,
            delay: motionOn ? index * 0.08 : 0,
          }}
        >
          <span className="text-brand-accent text-[11px] font-semibold tracking-wide">
            {row.label}
          </span>
          <span className="text-foreground text-[13px] leading-snug">
            {row.text}
          </span>
        </m.div>
      ))}
      {planStep ? (
        <p className="text-muted-foreground text-[12px]">{planStep.footer}</p>
      ) : null}
    </MotionStack>
  );
}

function TicketVisual({ motionOn }: { motionOn: boolean }) {
  const ticketStep = aboutWorkflowSteps.find((s) => s.id === "ticket");
  const criteria = getWorkflowTicketCriteria();
  return (
    <MotionStack motionOn={motionOn}>
      <m.div
        className="border-border/40 bg-muted/90 flex flex-col gap-2 rounded-lg border p-3 shadow-[0_0_20px_rgb(76_215_246_/_0.08)]"
        initial={false}
        animate={{ opacity: motionOn ? 1 : 0.92 }}
        transition={aboutWorkflowStepSpring}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-brand-accent/15 text-brand-accent rounded px-2 py-0.5 text-[10px] font-semibold tracking-wider">
            NOV-253
          </span>
          <span className="text-muted-foreground text-[12px]">In Progress</span>
        </div>
        <p className="text-foreground text-[14px] leading-snug font-medium">
          {ticketStep?.title ?? "Capture as a ticket"}
        </p>
        <ul className="text-muted-foreground space-y-1.5 text-[12px] leading-relaxed">
          {criteria.map((line, index) => (
            <m.li
              key={line}
              className="flex gap-2"
              initial={false}
              animate={{ opacity: motionOn ? 1 : 0.85 }}
              transition={{
                ...aboutWorkflowStepSpring,
                delay: motionOn ? index * 0.06 : 0,
              }}
            >
              <span className="text-brand-accent shrink-0">—</span>
              <span>{line}</span>
            </m.li>
          ))}
        </ul>
      </m.div>
    </MotionStack>
  );
}

function AgentVisual({ motionOn }: { motionOn: boolean }) {
  const agentStep = aboutWorkflowSteps.find((s) => s.id === "agent");
  const pr = getWorkflowAgentPrLines();
  const lines = ["never a direct push to main", pr.footer, pr.summary] as const;
  return (
    <MotionStack className="gap-2 font-mono text-[11px]" motionOn={motionOn}>
      <m.div
        className="flex flex-wrap items-center justify-between gap-2"
        initial={false}
        animate={{ opacity: motionOn ? 1 : 0.9 }}
        transition={aboutWorkflowStepSpring}
      >
        <span className="text-brand-accent font-semibold break-all">
          feature/agent-pr
        </span>
        <span className="text-muted-foreground shrink-0 text-[10px]">open</span>
      </m.div>
      <p className="text-foreground font-sans text-[13px] leading-snug font-medium">
        {agentStep?.title ?? "Agent builds the PR"}
      </p>
      <div className="flex flex-col gap-1.5">
        {lines.map((line, index) => (
          <m.p
            key={`${line}-${index}`}
            className="text-muted-foreground flex gap-2 font-sans text-[12px] leading-snug"
            initial={false}
            animate={{ opacity: motionOn ? 1 : 0.88 }}
            transition={{
              ...aboutWorkflowStepSpring,
              delay: motionOn ? index * 0.07 : 0,
            }}
          >
            <span className="text-brand-accent shrink-0 font-mono">+</span>
            <span>{line}</span>
          </m.p>
        ))}
      </div>
    </MotionStack>
  );
}

function ReviewVisual({
  motionOn,
  reducedMotion,
}: {
  motionOn: boolean;
  reducedMotion: boolean;
}) {
  const checks = getWorkflowReviewChecks();
  const [staggerCount, setStaggerCount] = useState(0);
  const revealedCount = reducedMotion
    ? checks.length
    : motionOn
      ? staggerCount
      : 0;

  useEffect(() => {
    if (!motionOn || reducedMotion) return;
    const timers: number[] = [];
    checks.forEach((_, index) => {
      timers.push(
        window.setTimeout(
          () => setStaggerCount((count) => Math.max(count, index + 1)),
          120 + index * 140,
        ),
      );
    });
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [motionOn, reducedMotion, checks]);

  return (
    <MotionStack motionOn={motionOn}>
      <div className="border-border/35 overflow-hidden rounded-lg border bg-[#0a0e14]">
        <div className="border-border/30 flex min-w-0 items-center gap-1 border-b px-3 py-2">
          <span className="bg-destructive/80 size-1.5 shrink-0 rounded-full" />
          <span className="bg-muted-foreground/50 size-1.5 shrink-0 rounded-full" />
          <span className="bg-brand-accent/60 size-1.5 shrink-0 rounded-full" />
          <span className="text-muted-foreground ml-1 min-w-0 text-[11px] break-all">
            Vercel preview deploy
          </span>
        </div>
        <div className="space-y-1 p-3">
          <p className="text-foreground text-[13px] font-medium">
            Review on the preview
          </p>
          <p className="text-muted-foreground text-[12px] leading-snug">
            Vercel preview · I decide
          </p>
        </div>
      </div>
      <ul className="space-y-2">
        {checks.map((item, index) => {
          const lit = revealedCount > index;
          return (
            <m.li
              key={item}
              className="text-foreground flex items-start gap-2 text-[13px] leading-snug"
              initial={false}
              animate={{ opacity: lit || !motionOn ? 1 : 0.55 }}
              transition={aboutWorkflowStepSpring}
            >
              <span
                className={cn(
                  "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded border text-[10px]",
                  lit
                    ? "border-brand-accent/50 bg-brand-accent/15 text-brand-accent"
                    : "border-border/40 text-transparent",
                )}
                aria-hidden
              >
                {lit ? "✓" : ""}
              </span>
              <span>{item}</span>
            </m.li>
          );
        })}
      </ul>
    </MotionStack>
  );
}

function MergeVisual({
  motionOn,
  reducedMotion,
}: {
  motionOn: boolean;
  reducedMotion: boolean;
}) {
  const rows = getWorkflowMergeChecks();
  const mergeStep = aboutWorkflowSteps.find((s) => s.id === "merge");
  const [staggerCount, setStaggerCount] = useState(0);
  const revealedCount = reducedMotion
    ? rows.length
    : motionOn
      ? staggerCount
      : 0;

  useEffect(() => {
    if (!motionOn || reducedMotion) return;
    const timers: number[] = [];
    rows.forEach((_, index) => {
      timers.push(
        window.setTimeout(
          () => setStaggerCount((count) => Math.max(count, index + 1)),
          80 + index * 110,
        ),
      );
    });
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [motionOn, reducedMotion, rows]);

  return (
    <MotionStack motionOn={motionOn}>
      <ul className="space-y-1.5">
        {rows.map((check, index) => {
          const lit = revealedCount > index;
          return (
            <m.li
              key={check}
              className={cn(
                "flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-[13px]",
                lit
                  ? "bg-brand-accent/10 text-brand-accent"
                  : "bg-secondary/50 text-muted-foreground",
              )}
              initial={false}
              animate={{ opacity: lit || !motionOn ? 1 : 0.7 }}
              transition={aboutWorkflowStepSpring}
            >
              <span className="flex min-w-0 items-center gap-2">
                <span
                  className={cn(
                    "size-1.5 shrink-0 rounded-full",
                    lit ? "bg-brand-accent" : "bg-muted-foreground/40",
                  )}
                />
                {check}
              </span>
              <span className="shrink-0 text-[10px] font-medium uppercase">
                {lit ? "pass" : "…"}
              </span>
            </m.li>
          );
        })}
      </ul>
      <m.p
        className={cn(
          "text-center text-[13px] font-semibold tracking-wide",
          revealedCount === rows.length || !motionOn
            ? "text-brand-accent"
            : "text-muted-foreground",
        )}
        initial={false}
        animate={{
          opacity:
            revealedCount === rows.length || reducedMotion || !motionOn
              ? 1
              : 0.6,
        }}
        transition={aboutWorkflowStepSpring}
      >
        {mergeStep?.footer ?? "Checks · development → main"}
      </m.p>
    </MotionStack>
  );
}

function MotionStack({
  motionOn,
  className,
  children,
}: {
  motionOn: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <m.div
      className={cn("flex flex-col gap-2", className)}
      initial={false}
      animate={{ opacity: motionOn ? 1 : 0.95 }}
      transition={aboutWorkflowStepSpring}
    >
      {children}
    </m.div>
  );
}
