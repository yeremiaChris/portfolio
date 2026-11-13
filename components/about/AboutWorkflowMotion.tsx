"use client";

import Link from "next/link";
import { m, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

import {
  aboutPageSectionClass,
  aboutSectionEyebrowClass,
  aboutSectionLeadClass,
  aboutSectionSpacingClass,
  aboutSectionTitleClass,
} from "@/components/about/aboutSectionStyles";
import { AboutWorkflowStepsGrid } from "@/components/about/workflow/AboutWorkflowStepsGrid";
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
import { aboutHeroEntranceSpring } from "@/lib/scroll-motion";
import { cn } from "@/lib/utils";

export function AboutWorkflowMotion() {
  return (
    <section
      aria-labelledby="about-workflow-heading"
      className={cn(aboutPageSectionClass, aboutSectionSpacingClass, "pb-10")}
    >
      <div className="mb-8 max-w-2xl md:mb-10">
        <p className={aboutSectionEyebrowClass}>{aboutWorkflowIntro.eyebrow}</p>
        <h2 id="about-workflow-heading" className={aboutSectionTitleClass}>
          {aboutWorkflowIntro.title}
        </h2>
        <p className={aboutSectionLeadClass}>
          {aboutWorkflowIntro.description}
        </p>
      </div>

      <AboutWorkflowStepsGrid />

      <AboutWorkflowSplit />
      <AboutWorkflowQuote />

      <p className="text-muted-foreground mt-8 max-w-2xl text-[15px] leading-[1.75]">
        {aboutWorkflowClosing}
      </p>
    </section>
  );
}

function AboutWorkflowSplit() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div
      ref={ref}
      className={cn(
        "mt-12 grid min-w-0 grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 md:gap-8",
      )}
    >
      <SplitCard
        title={aboutWorkflowSplit.ai.title}
        items={aboutWorkflowSplit.ai.items}
        tone="accent"
        inView={inView}
        reducedMotion={!!reducedMotion}
        delay={0}
      />
      <SplitCard
        title={aboutWorkflowSplit.me.title}
        items={aboutWorkflowSplit.me.items}
        tone="primary"
        inView={inView}
        reducedMotion={!!reducedMotion}
        delay={0.08}
      />
    </div>
  );
}

function SplitCard({
  title,
  items,
  tone,
  inView,
  reducedMotion,
  delay,
}: {
  title: string;
  items: readonly string[];
  tone: "accent" | "primary";
  inView: boolean;
  reducedMotion: boolean;
  delay: number;
}) {
  const toneClass = aboutStoryToneClass[tone];

  const inner = (
    <div className={cn(aboutSurfaceCardClass, "h-full")}>
      <div className={projectSurfaceHairlineClass} />
      <h3
        className={cn(
          "font-heading mb-4 text-lg font-semibold tracking-tight",
          toneClass,
        )}
      >
        {title}
      </h3>
      <ul className="text-muted-foreground space-y-2.5 text-[14px] leading-relaxed sm:text-[15px]">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5">
            <span
              className={cn(
                "mt-2 size-1.5 shrink-0 rounded-full",
                tone === "accent" ? "bg-brand-accent" : "bg-primary",
              )}
              aria-hidden
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  if (reducedMotion) {
    return inner;
  }

  return (
    <m.div
      initial={false}
      style={{ opacity: 1 }}
      animate={
        inView ? { opacity: 1, translateY: 0 } : { opacity: 1, translateY: 10 }
      }
      transition={{ ...aboutHeroEntranceSpring, delay }}
    >
      {inner}
    </m.div>
  );
}

function AboutWorkflowQuote() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.35 });

  const quote = (
    <blockquote
      className={cn(
        aboutSurfaceCardClass,
        "border-brand-accent/30 mt-10 max-w-3xl border-l-2 md:mt-12",
      )}
    >
      <div className={projectSurfaceHairlineClass} />
      <p className="text-foreground text-[15px] leading-[1.75] sm:text-base">
        {aboutWorkflowExample.beforeLink}
        <Link
          href={aboutWorkflowExample.linkHref}
          className="text-foreground decoration-brand-accent hover:text-brand-accent font-medium underline underline-offset-4"
        >
          {aboutWorkflowExample.linkLabel}
        </Link>
        {aboutWorkflowExample.afterLink}
      </p>
    </blockquote>
  );

  if (reducedMotion) {
    return quote;
  }

  return (
    <m.div
      ref={ref}
      initial={false}
      style={{ opacity: 1 }}
      animate={
        inView
          ? { opacity: 1, translateY: [10, 0] }
          : { opacity: 1, translateY: 0 }
      }
      transition={aboutHeroEntranceSpring}
    >
      {quote}
    </m.div>
  );
}
