"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { aboutWorkflowSteps } from "@/lib/about";
import type { AboutWorkflowStep } from "@/lib/about";
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
        "border-border/35 bg-secondary/30 ring-border/25 w-full min-w-0 rounded-xl border p-3.5 ring-1 sm:p-4",
        className,
      )}
    >
      {stepId === "plan" && <PlanVisual motionOn={motionOn} />}
      {stepId === "ticket" && <TicketVisual motionOn={motionOn} />}
      {stepId === "agent" && <AgentVisual motionOn={motionOn} />}
      {stepId === "review" && <ReviewVisual motionOn={motionOn} />}
      {stepId === "merge" && <MergeVisual motionOn={motionOn} />}
    </div>
  );
}

function PlanVisual({ motionOn }: { motionOn: boolean }) {
  const planStep = aboutWorkflowSteps.find((s) => s.id === "plan");
  const bullets = [
    { label: "Scope", detail: "sketch scope before anything hits a backlog" },
    { label: "Constraints", detail: "constraints with AI" },
    { label: "Approach", detail: "tickets start with context, not guesswork" },
  ];
  return (
    <div className="flex flex-col gap-2">
      <p className="text-muted-foreground text-[10px] font-medium tracking-widest uppercase">
        Plan notes
      </p>
      {bullets.map((row, index) => (
        <m.div
          key={row.label}
          className="border-border/30 bg-muted/70 flex flex-col gap-0.5 rounded-lg border px-2.5 py-2"
          initial={false}
          animate={{
            opacity: motionOn ? 1 : 0.85,
            translateY: motionOn ? 0 : 4,
          }}
          transition={{
            ...aboutWorkflowStepSpring,
            delay: motionOn ? index * 0.06 : 0,
          }}
        >
          <span className="text-brand-accent text-[11px] font-semibold tracking-wide">
            {row.label}
          </span>
          <span className="text-foreground text-[12px] leading-snug">
            {row.detail}
          </span>
        </m.div>
      ))}
      {planStep ? (
        <p className="text-muted-foreground mt-0.5 text-[11px]">
          {planStep.footer}
        </p>
      ) : null}
    </div>
  );
}

function TicketVisual({ motionOn }: { motionOn: boolean }) {
  const ticketStep = aboutWorkflowSteps.find((s) => s.id === "ticket");
  const criteria = [
    "Clear acceptance criteria",
    "Source of truth for humans and agents",
    "Linear · Jira",
  ];
  return (
    <m.div
      className="border-border/40 bg-muted/90 flex flex-col gap-2.5 rounded-lg border p-3 shadow-[0_0_20px_rgb(76_215_246_/_0.08)]"
      initial={false}
      animate={{ opacity: motionOn ? 1 : 0.9 }}
      transition={aboutWorkflowStepSpring}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="bg-brand-accent/15 text-brand-accent rounded px-2 py-0.5 text-[10px] font-semibold tracking-wider">
          NOV-253
        </span>
        <span className="text-muted-foreground text-[11px]">In Progress</span>
      </div>
      <p className="text-foreground text-[13px] leading-snug font-medium">
        {ticketStep?.title ?? "Capture as a ticket"}
      </p>
      <ul className="text-muted-foreground space-y-1 text-[11px] leading-relaxed">
        {criteria.map((line) => (
          <li key={line} className="flex gap-2">
            <span className="text-brand-accent mt-0.5">—</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </m.div>
  );
}

function AgentVisual({ motionOn }: { motionOn: boolean }) {
  const agentStep = aboutWorkflowSteps.find((s) => s.id === "agent");
  const commits = [
    "feat: implement scoped changes",
    "test: cover acceptance criteria",
    "docs: PR logic summary",
  ];
  return (
    <MotionStack className="gap-2.5 font-mono text-[11px]" motionOn={motionOn}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-brand-accent font-semibold">
          yeremia997/nov-253-revamp-about
        </span>
        <span className="text-muted-foreground text-[10px]">open</span>
      </div>
      <p className="text-foreground font-sans text-[12px] font-medium">
        {agentStep?.title ?? "Agent builds the PR"}
      </p>
      <div className="flex flex-col gap-1">
        {commits.map((line, index) => (
          <m.p
            key={line}
            className="text-muted-foreground flex gap-2"
            initial={false}
            animate={{ opacity: motionOn ? 1 : 0.8 }}
            transition={{
              ...aboutWorkflowStepSpring,
              delay: motionOn ? index * 0.05 : 0,
            }}
          >
            <span className="text-brand-accent shrink-0">+</span>
            <span>{line}</span>
          </m.p>
        ))}
      </div>
      <p className="border-brand-accent/40 bg-brand-accent/10 text-brand-accent rounded-md border px-2 py-1.5 font-sans text-[11px]">
        + logic summary in PR description
      </p>
    </MotionStack>
  );
}

function ReviewVisual({ motionOn }: { motionOn: boolean }) {
  const checks = [
    "Read logic summary",
    "Exercise Vercel preview",
    "Request changes until UX matches",
  ];
  return <ValidationVisual motionOn={motionOn} checks={checks} />;
}

function ValidationVisual({
  motionOn,
  checks,
}: {
  motionOn: boolean;
  checks: string[];
}) {
  return (
    <MotionStack motionOn={motionOn}>
      <div className="border-border/35 overflow-hidden rounded-lg border bg-[#0a0e14]">
        <div className="border-border/30 flex items-center gap-1 border-b px-2.5 py-1.5">
          <span className="bg-destructive/80 size-1.5 rounded-full" />
          <span className="bg-muted-foreground/50 size-1.5 rounded-full" />
          <span className="bg-brand-accent/60 size-1.5 rounded-full" />
          <span className="text-muted-foreground ml-2 truncate text-[10px]">
            vercel.app/preview
          </span>
        </div>
        <div className="space-y-1.5 p-2.5">
          <p className="text-foreground text-[12px] font-medium">
            Preview deploy
          </p>
          <p className="text-muted-foreground text-[11px]">
            Vercel preview · I decide
          </p>
        </div>
      </div>
      <ul className="space-y-1.5">
        {checks.map((item, index) => (
          <m.li
            key={item}
            className="text-foreground flex items-start gap-2 text-[12px]"
            initial={false}
            animate={{ opacity: motionOn ? 1 : 0.75 }}
            transition={{
              ...aboutWorkflowStepSpring,
              delay: motionOn ? 0.12 + index * 0.07 : 0,
            }}
          >
            <span
              className={cn(
                "border-brand-accent/50 mt-0.5 flex size-4 shrink-0 items-center justify-center rounded border text-[10px]",
                motionOn && index < checks.length
                  ? "bg-brand-accent/15 text-brand-accent"
                  : "text-muted-foreground",
              )}
            >
              {motionOn ? "✓" : ""}
            </span>
            {item}
          </m.li>
        ))}
      </ul>
    </MotionStack>
  );
}

function MergeVisual({ motionOn }: { motionOn: boolean }) {
  const rows = ["lint", "typecheck", "tests", "Lighthouse"] as const;
  return (
    <MotionStack motionOn={motionOn}>
      <ul className="space-y-1.5">
        {rows.map((check, index) => (
          <m.li
            key={check}
            className={cn(
              "flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-[12px]",
              motionOn
                ? "bg-brand-accent/10 text-brand-accent"
                : "bg-secondary/60 text-muted-foreground",
            )}
            initial={false}
            animate={{ opacity: motionOn ? 1 : 0.8 }}
            transition={{
              ...aboutWorkflowStepSpring,
              delay: motionOn ? index * 0.06 : 0,
            }}
          >
            <span className="flex items-center gap-2">
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  motionOn ? "bg-brand-accent" : "bg-muted-foreground/50",
                )}
              />
              {check}
            </span>
            <span className="text-[10px] font-medium uppercase">
              {motionOn ? "green" : "…"}
            </span>
          </m.li>
        ))}
      </ul>
      <m.p
        className="text-brand-accent text-center text-[12px] font-semibold tracking-wide"
        initial={false}
        animate={{ opacity: motionOn ? 1 : 0.7 }}
        transition={{ ...aboutWorkflowStepSpring, delay: motionOn ? 0.28 : 0 }}
      >
        development → main
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
      animate={{ opacity: motionOn ? 1 : 0.92 }}
      transition={aboutWorkflowStepSpring}
    >
      {children}
    </m.div>
  );
}
