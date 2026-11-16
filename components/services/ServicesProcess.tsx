"use client";

import Link from "next/link";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useState } from "react";

import { aboutStepNumberClass } from "@/components/about/aboutSurface";
import {
  ServicesScrollReveal,
  ServicesStepPill,
  useServicesMotionHover,
  useServicesScrollSectionProgress,
  useServicesStepHighlight,
} from "@/components/services/ServicesScrollMotion";
import {
  servicesSectionClass,
  servicesSectionHeadingGap,
} from "@/components/services/servicesSurface";
import { SectionHeading } from "@/components/typography/SectionTypography";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  servicesHowItWorksHeading,
  servicesHowItWorksSteps,
  servicesLabTeaser,
  servicesPricingLine,
} from "@/lib/services";
import { cn } from "@/lib/utils";

function ProcessStep({
  step,
  index,
  total,
  progress,
  motionHover,
  hovered,
  onHover,
}: {
  step: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  motionHover: boolean;
  hovered: boolean;
  onHover: (active: boolean) => void;
}) {
  const reducedMotion = useReducedMotion();
  const highlight = useServicesStepHighlight(progress, index, total);

  const stepTextColor = useTransform(
    highlight,
    [0, 1],
    ["rgba(148, 163, 184, 0.72)", "rgb(248, 250, 252)"],
  );
  const badgeBorder = useTransform(
    highlight,
    [0, 1],
    ["rgba(76, 215, 246, 0.22)", "rgba(76, 215, 246, 0.72)"],
  );
  const badgeBackground = useTransform(
    highlight,
    [0, 1],
    ["rgba(76, 215, 246, 0.08)", "rgba(76, 215, 246, 0.2)"],
  );
  const badgeColor = useTransform(
    highlight,
    [0, 1],
    ["rgba(76, 215, 246, 0.55)", "rgb(76, 215, 246)"],
  );

  const scrollMotion = !reducedMotion;

  return (
    <li
      className="relative flex min-h-0 flex-col gap-3 md:gap-3.5"
      onPointerEnter={motionHover ? () => onHover(true) : undefined}
      onPointerLeave={motionHover ? () => onHover(false) : undefined}
    >
      <h3 className="sr-only">
        Step {index + 1}: {step}
      </h3>
      <div className="relative w-fit">
        <ServicesStepPill visible={motionHover && hovered} />
        {scrollMotion ? (
          <m.span
            className={cn(
              aboutStepNumberClass,
              "relative z-10 w-fit px-2 py-0.5 text-xs leading-none",
            )}
            style={{
              borderColor: badgeBorder,
              backgroundColor: badgeBackground,
              color: badgeColor,
            }}
          >
            {index + 1}
          </m.span>
        ) : (
          <span
            className={cn(
              aboutStepNumberClass,
              "relative z-10 w-fit px-2 py-0.5 text-xs leading-none",
              !motionHover &&
                "hover:border-brand-accent/45 transition-colors duration-200",
            )}
          >
            {index + 1}
          </span>
        )}
      </div>
      {scrollMotion ? (
        <m.p
          className="font-heading text-foreground text-[15px] leading-relaxed font-semibold tracking-tight sm:text-base"
          style={{ color: stepTextColor }}
        >
          {step}
        </m.p>
      ) : (
        <p className="font-heading text-foreground text-[15px] leading-relaxed font-semibold tracking-tight sm:text-base">
          {step}
        </p>
      )}
    </li>
  );
}

function ProcessSteps({
  motionHover,
  hoveredStep,
  setHoveredStep,
}: {
  motionHover: boolean;
  hoveredStep: number | null;
  setHoveredStep: (step: number | null) => void;
}) {
  const progress = useServicesScrollSectionProgress();
  const fallbackProgress = useMotionValue(1);
  const stepProgress = progress ?? fallbackProgress;
  const total = servicesHowItWorksSteps.length;

  return (
    <ol className="grid list-none grid-cols-1 gap-8 px-4 py-6 sm:px-5 sm:py-7 md:grid-cols-3 md:gap-6 md:px-6 md:py-8 lg:gap-8 lg:px-8 lg:py-9">
      {servicesHowItWorksSteps.map((step, index) => (
        <ProcessStep
          key={step}
          step={step}
          index={index}
          total={total}
          progress={stepProgress}
          motionHover={motionHover}
          hovered={hoveredStep === index}
          onHover={(active) => setHoveredStep(active ? index : null)}
        />
      ))}
    </ol>
  );
}

export function ServicesProcess() {
  const motionHover = useServicesMotionHover();
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section
      aria-labelledby="services-process-heading"
      className={servicesSectionClass}
    >
      <ServicesScrollReveal className={servicesSectionHeadingGap}>
        <SectionHeading id="services-process-heading">
          {servicesHowItWorksHeading}
        </SectionHeading>
      </ServicesScrollReveal>

      <ServicesScrollReveal shareProgress>
        <Card className="border-border/50 bg-muted/90 ring-border/30 overflow-hidden rounded-2xl border shadow-sm ring-1 md:rounded-3xl">
          <CardContent className="p-0">
            <ProcessSteps
              motionHover={motionHover}
              hoveredStep={hoveredStep}
              setHoveredStep={setHoveredStep}
            />
          </CardContent>
          <CardFooter className="border-border/50 bg-muted/60 flex flex-col items-start gap-3 border-t px-4 py-4 text-left sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5 sm:py-5 md:px-6">
            <p className="text-foreground text-[14px] font-medium sm:text-[15px]">
              {servicesPricingLine}
            </p>
            <p className="text-muted-foreground text-left text-[12px] leading-relaxed sm:text-[13px] md:max-w-[min(100%,22rem)] md:text-right">
              {servicesLabTeaser.beforeLink}
              <Link
                href={servicesLabTeaser.linkHref}
                className="text-brand-accent hover:text-brand-accent/85 underline underline-offset-4 transition-colors duration-200 motion-reduce:transition-none"
              >
                {servicesLabTeaser.linkLabel}
              </Link>
              {servicesLabTeaser.afterLink}
            </p>
          </CardFooter>
        </Card>
      </ServicesScrollReveal>
    </section>
  );
}
