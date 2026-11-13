"use client";

import { m, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

import type { AboutWorkflowStep } from "@/lib/about";
import { motionSpring } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

type WorkflowStepMiniVisualProps = {
  stepId: AboutWorkflowStep["id"];
  className?: string;
};

export function WorkflowStepMiniVisual({
  stepId,
  className,
}: WorkflowStepMiniVisualProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.45 });

  return (
    <div
      ref={ref}
      className={cn(
        "border-border/35 bg-secondary/40 relative mt-4 h-[5.5rem] overflow-hidden rounded-xl border",
        className,
      )}
      aria-hidden
    >
      {stepId === "plan" && <PlanVisual active={inView && !reducedMotion} />}
      {stepId === "ticket" && (
        <TicketVisual active={inView && !reducedMotion} />
      )}
      {stepId === "agent" && <AgentVisual active={inView && !reducedMotion} />}
      {stepId === "review" && (
        <ReviewVisual active={inView && !reducedMotion} />
      )}
      {stepId === "merge" && <MergeVisual active={inView && !reducedMotion} />}
    </div>
  );
}

function PlanVisual({ active }: { active: boolean }) {
  return (
    <div className="flex h-full flex-col justify-center gap-1.5 px-3 py-2 font-mono text-[10px]">
      {[0, 1, 2].map((line) => (
        <m.div
          key={line}
          className="bg-muted-foreground/25 h-1.5 rounded-full"
          initial={false}
          style={{ width: `${55 + line * 12}%` }}
          animate={active ? { opacity: [0.35, 1] } : { opacity: 0.5 }}
          transition={{
            ...motionSpring,
            delay: line * 0.12,
          }}
        />
      ))}
      <m.span
        className="text-brand-accent mt-0.5 inline-block w-2"
        initial={false}
        animate={active ? { opacity: [1, 0, 1] } : { opacity: 1 }}
        transition={{
          duration: 0.9,
          repeat: active ? Infinity : 0,
          ease: "linear",
        }}
      >
        |
      </m.span>
    </div>
  );
}

function TicketVisual({ active }: { active: boolean }) {
  const items = ["Scope", "AC", "Owner"];
  return (
    <ul className="flex h-full flex-col justify-center gap-2 px-3 py-2">
      {items.map((label, index) => (
        <li
          key={label}
          className="text-muted-foreground flex items-center gap-2 text-[10px]"
        >
          <m.span
            className="border-brand-accent/40 text-brand-accent flex size-3.5 items-center justify-center rounded border text-[8px]"
            initial={false}
            animate={
              active
                ? { opacity: [0.25, 1], scale: [0.92, 1] }
                : { opacity: 0.45 }
            }
            transition={{ ...motionSpring, delay: index * 0.14 }}
          >
            ✓
          </m.span>
          {label}
        </li>
      ))}
    </ul>
  );
}

function AgentVisual({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 120 48"
      className="h-full w-full px-2 py-2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <m.circle
        cx="20"
        cy="24"
        r="6"
        className="fill-brand-accent/80"
        initial={false}
        animate={active ? { scale: [1, 1.08, 1] } : { scale: 1 }}
        transition={{ ...motionSpring, delay: 0.05 }}
      />
      <m.path
        d="M26 24 H52"
        stroke="rgb(76 215 246)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={false}
        animate={active ? { pathLength: [0, 1] } : { pathLength: 1 }}
        transition={{ duration: 0.45, delay: 0.1 }}
      />
      <m.circle
        cx="58"
        cy="24"
        r="6"
        className="fill-secondary stroke-brand-accent/60"
        strokeWidth="1.5"
        initial={false}
        animate={active ? { opacity: [0.4, 1] } : { opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.3 }}
      />
      <m.path
        d="M64 24 H94"
        stroke="rgb(76 215 246)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="2 3"
        initial={false}
        animate={active ? { pathLength: [0, 1] } : { pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      />
      <m.rect
        x="96"
        y="18"
        width="18"
        height="12"
        rx="3"
        className="stroke-brand-accent fill-brand-accent/15"
        strokeWidth="1.5"
        initial={false}
        animate={active ? { opacity: [0.3, 1] } : { opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.25 }}
      />
    </svg>
  );
}

function ReviewVisual({ active }: { active: boolean }) {
  return (
    <div className="flex h-full items-center gap-3 px-3">
      <div className="border-border/40 bg-muted/80 h-10 w-14 shrink-0 rounded-md border" />
      <ul className="text-muted-foreground space-y-1 text-[9px]">
        {["Logic", "Preview", "UX"].map((row, i) => (
          <m.li
            key={row}
            className="flex items-center gap-1.5"
            initial={false}
            animate={
              active
                ? { opacity: [0.4, 1], translateX: [4, 0] }
                : { opacity: 1 }
            }
            transition={{ ...motionSpring, delay: i * 0.12 }}
          >
            <span className="bg-brand-accent size-1.5 rounded-full" />
            {row}
          </m.li>
        ))}
      </ul>
    </div>
  );
}

function MergeVisual({ active }: { active: boolean }) {
  return (
    <div className="flex h-full flex-col justify-center gap-2 px-3 py-2">
      <div className="text-muted-foreground flex justify-between text-[9px] font-medium uppercase">
        <span>Lighthouse</span>
        <m.span
          initial={false}
          animate={active ? { opacity: [0.5, 1] } : { opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.2 }}
          className="text-brand-accent"
        >
          100
        </m.span>
      </div>
      <div className="bg-border/40 h-2 overflow-hidden rounded-full">
        <m.div
          className="bg-brand-accent h-full rounded-full"
          initial={false}
          style={{ width: active ? undefined : "100%" }}
          animate={active ? { width: ["0%", "100%"] } : { width: "100%" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}
