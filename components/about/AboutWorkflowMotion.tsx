"use client";

import Link from "next/link";
import { m, useInView, useReducedMotion } from "motion/react";
import { useRef, useState, type ReactNode } from "react";

import { AboutWorkflowDesktopStage } from "@/components/about/workflow/AboutWorkflowDesktopStage";
import { AboutWorkflowMobileSteps } from "@/components/about/workflow/AboutWorkflowMobileSteps";
import {
  aboutSurfaceCardClass,
  projectSurfaceHairlineClass,
} from "@/components/about/aboutSurface";
import {
  aboutStoryToneClass,
  aboutWorkflowClosing,
  aboutWorkflowExample,
  aboutWorkflowIntro,
  aboutWorkflowSplit,
} from "@/lib/about";
import { aboutWorkflowSplitPairs } from "@/lib/about-workflow-map";
import {
  aboutStaggerTransition,
  aboutWorkflowStepSpring,
} from "@/lib/scroll-motion";
import { cn } from "@/lib/utils";

export function AboutWorkflowMotion() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="about-workflow-heading"
      className="mb-6 w-full min-w-0 md:mb-10"
    >
      <WorkflowIntro />
      {!reducedMotion ? <AboutWorkflowDesktopStage /> : null}
      <AboutWorkflowMobileSteps
        className={reducedMotion ? "lg:flex" : undefined}
      />
      <AboutWorkflowSplitSection />
      <AboutWorkflowQuote />
      <p className="text-muted-foreground mt-4 block max-w-2xl text-[15px] leading-relaxed">
        {aboutWorkflowClosing}
      </p>
    </section>
  );
}

function WorkflowIntro() {
  return (
    <div className="mb-6 max-w-2xl lg:mb-8">
      <p className="text-muted-foreground label-caps tracking-widest">
        {aboutWorkflowIntro.eyebrow}
      </p>
      <h2
        id="about-workflow-heading"
        className="font-heading text-foreground mt-1 text-2xl font-semibold tracking-tight sm:text-3xl"
      >
        {aboutWorkflowIntro.title}
      </h2>
      <p className="text-muted-foreground mt-3 text-[15px] leading-relaxed">
        {aboutWorkflowIntro.description}
      </p>
    </div>
  );
}

function AboutWorkflowSplitSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [hoveredPair, setHoveredPair] = useState<number | null>(null);

  const aiItems = aboutWorkflowSplit.ai.items;
  const meItems = aboutWorkflowSplit.me.items;

  return (
    <div ref={sectionRef} className="mt-8 min-w-0">
      <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_1.5rem_minmax(0,1fr)] md:gap-3">
        <SplitColumn
          title={aboutWorkflowSplit.ai.title}
          items={aiItems}
          tone="accent"
          side="ai"
          hoveredPair={hoveredPair}
          scrollLit={inView && !reducedMotion}
          onHoverPair={setHoveredPair}
          reducedMotion={!!reducedMotion}
        />
        <div className="relative hidden min-h-[8rem] md:block" aria-hidden>
          {aboutWorkflowSplitPairs.map((pair, pairIndex) => {
            const lit =
              !reducedMotion &&
              (hoveredPair === pairIndex ||
                (hoveredPair === null && inView && pairIndex === 0));
            const topAi = splitListOffsetPercent(pair.aiIndex, aiItems.length);
            const topMe = splitListOffsetPercent(pair.meIndex, meItems.length);
            return (
              <m.span
                key={`${pair.aiIndex}-${pair.meIndex}`}
                className="bg-brand-accent/70 absolute right-0 left-0 h-px shadow-[0_0_10px_rgb(76_215_246_/_0.45)]"
                style={{
                  top: `calc(3rem + (${topAi}% + ${topMe}%) / 2 * 0.5)`,
                }}
                initial={false}
                animate={{ opacity: lit ? 0.85 : 0.1 }}
                transition={aboutWorkflowStepSpring}
              />
            );
          })}
        </div>
        <SplitColumn
          title={aboutWorkflowSplit.me.title}
          items={meItems}
          tone="primary"
          side="me"
          hoveredPair={hoveredPair}
          scrollLit={inView && !reducedMotion}
          onHoverPair={setHoveredPair}
          reducedMotion={!!reducedMotion}
        />
      </div>
    </div>
  );
}

function splitListOffsetPercent(index: number, count: number) {
  if (count <= 1) return 50;
  return (index / (count - 1)) * 100;
}

function SplitColumn({
  title,
  items,
  tone,
  side,
  hoveredPair,
  scrollLit,
  onHoverPair,
  reducedMotion,
}: {
  title: string;
  items: readonly string[];
  tone: "accent" | "primary";
  side: "ai" | "me";
  hoveredPair: number | null;
  scrollLit: boolean;
  onHoverPair: (index: number | null) => void;
  reducedMotion: boolean;
}) {
  const toneClass = aboutStoryToneClass[tone];

  return (
    <SplitPanel className={aboutSurfaceCardClass}>
      <div className={projectSurfaceHairlineClass} />
      <h3
        className={cn(
          "font-heading mb-2 text-base font-semibold tracking-tight",
          toneClass,
        )}
      >
        {title}
      </h3>
      <ul className="text-muted-foreground space-y-1 text-[13px] leading-snug">
        {items.map((item, index) => {
          const pairIndices = aboutWorkflowSplitPairs
            .map((p, i) =>
              side === "ai"
                ? p.aiIndex === index
                  ? i
                  : -1
                : p.meIndex === index
                  ? i
                  : -1,
            )
            .filter((i) => i >= 0);
          const lit =
            scrollLit &&
            (hoveredPair === null
              ? pairIndices.includes(0)
              : pairIndices.includes(hoveredPair));

          return (
            <li key={item}>
              <m.button
                type="button"
                className={cn(
                  "flex w-full gap-2 rounded-md px-1.5 py-1 text-left",
                  lit && "bg-brand-accent/8",
                )}
                initial={false}
                animate={
                  reducedMotion ? undefined : { opacity: lit ? 1 : 0.88 }
                }
                transition={aboutWorkflowStepSpring}
                onMouseEnter={() => {
                  if (pairIndices[0] !== undefined) {
                    onHoverPair(pairIndices[0]);
                  }
                }}
                onMouseLeave={() => onHoverPair(null)}
                onFocus={() => {
                  if (pairIndices[0] !== undefined) {
                    onHoverPair(pairIndices[0]);
                  }
                }}
                onBlur={() => onHoverPair(null)}
              >
                <span
                  className={cn(
                    "mt-1.5 size-1.5 shrink-0 rounded-full",
                    lit
                      ? "bg-brand-accent"
                      : tone === "accent"
                        ? "bg-brand-accent/50"
                        : "bg-primary/50",
                  )}
                  aria-hidden
                />
                <span className={lit ? "text-foreground" : undefined}>
                  {item}
                </span>
              </m.button>
            </li>
          );
        })}
      </ul>
    </SplitPanel>
  );
}

function SplitPanel({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <m.div
      ref={ref}
      className={className}
      initial={false}
      animate={
        reducedMotion
          ? { opacity: 1, translateY: 0 }
          : {
              opacity: inView ? 1 : 0.92,
              translateY: inView ? 0 : 8,
            }
      }
      transition={aboutStaggerTransition}
    >
      {children}
    </m.div>
  );
}

function AboutWorkflowQuote() {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLQuoteElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const text = `${aboutWorkflowExample.beforeLink}${aboutWorkflowExample.linkLabel}${aboutWorkflowExample.afterLink}`;
  const words = text.split(/(\s+)/);

  return (
    <m.blockquote
      ref={ref}
      className={cn(
        aboutSurfaceCardClass,
        "border-brand-accent/30 mt-6 max-w-3xl border-l-2",
      )}
    >
      <div className={projectSurfaceHairlineClass} />
      <p className="text-foreground text-[15px] leading-relaxed">
        {words.map((segment, index) => {
          if (/^\s+$/.test(segment)) {
            return <span key={`ws-${index}`}>{segment}</span>;
          }
          const isLink = segment === aboutWorkflowExample.linkLabel;
          const content = isLink ? (
            <Link
              href={aboutWorkflowExample.linkHref}
              className="text-foreground decoration-brand-accent hover:text-brand-accent font-medium underline underline-offset-4"
            >
              {aboutWorkflowExample.linkLabel}
            </Link>
          ) : (
            segment
          );

          return (
            <m.span
              key={`w-${index}`}
              className="inline"
              initial={false}
              animate={
                reducedMotion ? { opacity: 1 } : { opacity: inView ? 1 : 0.6 }
              }
              transition={{
                ...aboutStaggerTransition,
                delay: reducedMotion ? 0 : index * 0.02,
              }}
            >
              {content}
            </m.span>
          );
        })}
      </p>
    </m.blockquote>
  );
}
