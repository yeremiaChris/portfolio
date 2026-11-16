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
  ServicesProcessTrack,
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

function StepBadge({
  index,
  progress,
  stepIndex,
  total,
  className,
}: {
  index: number;
  progress: MotionValue<number>;
  stepIndex: number;
  total: number;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  const highlight = useServicesStepHighlight(progress, stepIndex, total);
  const badgeBorder = useTransform(
    highlight,
    [0, 1],
    ["rgba(76, 215, 246, 0.22)", "rgba(76, 215, 246, 0.85)"],
  );
  const badgeBackground = useTransform(
    highlight,
    [0, 1],
    ["rgba(76, 215, 246, 0.08)", "rgba(76, 215, 246, 0.26)"],
  );
  const badgeColor = useTransform(
    highlight,
    [0, 1],
    ["rgba(76, 215, 246, 0.5)", "rgb(76, 215, 246)"],
  );

  if (reducedMotion) {
    return (
      <span
        className={cn(
          aboutStepNumberClass,
          "relative z-10 w-fit px-2 py-0.5 text-xs leading-none",
          className,
        )}
      >
        {index + 1}
      </span>
    );
  }

  return (
    <m.span
      className={cn(
        aboutStepNumberClass,
        "relative z-10 w-fit px-2 py-0.5 text-xs leading-none",
        className,
      )}
      style={{
        borderColor: badgeBorder,
        backgroundColor: badgeBackground,
        color: badgeColor,
      }}
    >
      {index + 1}
    </m.span>
  );
}

function StepCopy({
  step,
  progress,
  stepIndex,
  total,
  className,
}: {
  step: string;
  progress: MotionValue<number>;
  stepIndex: number;
  total: number;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  const highlight = useServicesStepHighlight(progress, stepIndex, total);
  const stepTextColor = useTransform(
    highlight,
    [0, 1],
    ["rgba(148, 163, 184, 0.58)", "rgb(248, 250, 252)"],
  );

  if (reducedMotion) {
    return (
      <p
        className={cn(
          "font-heading text-foreground text-[15px] leading-relaxed font-semibold tracking-tight sm:text-base",
          className,
        )}
      >
        {step}
      </p>
    );
  }

  return (
    <m.p
      className={cn(
        "font-heading text-[15px] leading-relaxed font-semibold tracking-tight sm:text-base",
        className,
      )}
      style={{ color: stepTextColor }}
    >
      {step}
    </m.p>
  );
}

function DesktopStepBadgeCell({
  step,
  stepIndex,
  total,
  progress,
  motionHover,
  hovered,
  onHover,
}: {
  step: string;
  stepIndex: number;
  total: number;
  progress: MotionValue<number>;
  motionHover: boolean;
  hovered: boolean;
  onHover: (active: boolean) => void;
}) {
  return (
    <li
      className="flex min-h-0 flex-col"
      onPointerEnter={motionHover ? () => onHover(true) : undefined}
      onPointerLeave={motionHover ? () => onHover(false) : undefined}
    >
      <h3 className="sr-only">
        Step {stepIndex + 1}: {step}
      </h3>
      <div className="relative w-fit">
        <ServicesStepPill visible={motionHover && hovered} />
        <StepBadge
          index={stepIndex}
          progress={progress}
          stepIndex={stepIndex}
          total={total}
        />
      </div>
    </li>
  );
}

function DesktopStepCopyCell({
  step,
  stepIndex,
  total,
  progress,
}: {
  step: string;
  stepIndex: number;
  total: number;
  progress: MotionValue<number>;
}) {
  return (
    <li className="min-h-0">
      <StepCopy
        step={step}
        progress={progress}
        stepIndex={stepIndex}
        total={total}
      />
    </li>
  );
}

function MobileProcessStep({
  step,
  stepIndex,
  total,
  progress,
  motionHover,
  hovered,
  onHover,
}: {
  step: string;
  stepIndex: number;
  total: number;
  progress: MotionValue<number>;
  motionHover: boolean;
  hovered: boolean;
  onHover: (active: boolean) => void;
}) {
  return (
    <li
      className="relative flex min-h-0 flex-col gap-3 pl-8 md:gap-3.5"
      onPointerEnter={motionHover ? () => onHover(true) : undefined}
      onPointerLeave={motionHover ? () => onHover(false) : undefined}
    >
      <h3 className="sr-only">
        Step {stepIndex + 1}: {step}
      </h3>
      <div className="relative w-fit">
        <ServicesStepPill visible={motionHover && hovered} />
        <StepBadge
          index={stepIndex}
          progress={progress}
          stepIndex={stepIndex}
          total={total}
        />
      </div>
      <StepCopy
        step={step}
        progress={progress}
        stepIndex={stepIndex}
        total={total}
      />
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
    <ProcessStepsLayout
      motionHover={motionHover}
      hoveredStep={hoveredStep}
      setHoveredStep={setHoveredStep}
      stepProgress={stepProgress}
      total={total}
    />
  );
}

function ProcessStepsLayout({
  motionHover,
  hoveredStep,
  setHoveredStep,
  stepProgress,
  total,
}: {
  motionHover: boolean;
  hoveredStep: number | null;
  setHoveredStep: (step: number | null) => void;
  stepProgress: MotionValue<number>;
  total: number;
}) {
  return (
    <div className="px-4 py-6 sm:px-5 sm:py-7 md:px-6 md:py-8 lg:px-8 lg:py-9">
      <div className="hidden md:block">
        <ol className="grid list-none grid-cols-3 gap-6 lg:gap-8">
          {servicesHowItWorksSteps.map((step, index) => (
            <DesktopStepBadgeCell
              key={`${step}-badge`}
              step={step}
              stepIndex={index}
              total={total}
              progress={stepProgress}
              motionHover={motionHover}
              hovered={hoveredStep === index}
              onHover={(active) => setHoveredStep(active ? index : null)}
            />
          ))}
        </ol>
        <ServicesProcessTrack
          progress={stepProgress}
          layout="horizontal"
          className="my-4"
        />
        <ol className="grid list-none grid-cols-3 gap-6 lg:gap-8">
          {servicesHowItWorksSteps.map((step, index) => (
            <DesktopStepCopyCell
              key={`${step}-body`}
              step={step}
              stepIndex={index}
              total={total}
              progress={stepProgress}
            />
          ))}
        </ol>
      </div>

      <div className="relative md:hidden">
        <ServicesProcessTrack
          progress={stepProgress}
          layout="vertical"
          className="absolute top-2 bottom-2 left-[0.65rem]"
        />
        <ol className="grid list-none grid-cols-1 gap-8">
          {servicesHowItWorksSteps.map((step, index) => (
            <MobileProcessStep
              key={step}
              step={step}
              stepIndex={index}
              total={total}
              progress={stepProgress}
              motionHover={motionHover}
              hovered={hoveredStep === index}
              onHover={(active) => setHoveredStep(active ? index : null)}
            />
          ))}
        </ol>
      </div>
    </div>
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
      <div className={servicesSectionHeadingGap}>
        <SectionHeading id="services-process-heading">
          {servicesHowItWorksHeading}
        </SectionHeading>
      </div>

      <ServicesScrollReveal shareProgress scrollRange="bottom">
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
