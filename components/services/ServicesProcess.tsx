"use client";

import { Clock } from "lucide-react";
import Link from "next/link";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useState } from "react";

import {
  ServicesProcessRail,
  ServicesScrollReveal,
  ServicesStepPill,
  useServicesMotionHover,
  useServicesProcessStepMotion,
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
  servicesLabTeaser,
  servicesPricingLine,
} from "@/lib/services";
const servicesProcessSteps = [
  {
    code: "01",
    title: "Brief",
    description: "Tell me what you need.",
  },
  {
    code: "02",
    title: "Plan",
    description: "I send a plan and estimate.",
  },
  {
    code: "03",
    title: "Build",
    description: "I build it with a live preview link you can check anytime.",
  },
] as const;

function StepDisplayNumber({
  code,
  progress,
  stepIndex,
  total,
}: {
  code: string;
  progress: MotionValue<number>;
  stepIndex: number;
  total: number;
}) {
  const reducedMotion = useReducedMotion();
  const highlight = useServicesStepHighlight(progress, stepIndex, total);
  const numberColor = useTransform(
    highlight,
    [0, 1],
    ["rgba(76, 215, 246, 0.22)", "rgba(76, 215, 246, 0.92)"],
  );

  if (reducedMotion) {
    return (
      <span className="font-heading text-[2.25rem] leading-none font-semibold tracking-tight text-[#4cd7f6]/75 tabular-nums sm:text-[2.5rem]">
        {code}
      </span>
    );
  }

  return (
    <m.span
      className="font-heading text-[2.25rem] leading-none font-semibold tracking-tight tabular-nums sm:text-[2.5rem]"
      style={{ color: numberColor }}
    >
      {code}
    </m.span>
  );
}

type ProcessStepHandlers = {
  step: (typeof servicesProcessSteps)[number];
  stepIndex: number;
  total: number;
  progress: MotionValue<number>;
  motionHover: boolean;
  hovered: boolean;
  onHover: (active: boolean) => void;
};

function useStepReveal(
  progress: MotionValue<number>,
  stepIndex: number,
  total: number,
) {
  const reducedMotion = useReducedMotion();
  const motion = useServicesProcessStepMotion(progress, stepIndex, total);
  return reducedMotion ? null : motion;
}

function ProcessStepNumberCell({
  step,
  stepIndex,
  total,
  progress,
  motionHover,
  hovered,
  onHover,
}: ProcessStepHandlers) {
  const reveal = useStepReveal(progress, stepIndex, total);
  const pointer = {
    onPointerEnter: motionHover ? () => onHover(true) : undefined,
    onPointerLeave: motionHover ? () => onHover(false) : undefined,
  };

  const numberBlock = (
    <div className="relative w-fit">
      <ServicesStepPill visible={motionHover && hovered} />
      <StepDisplayNumber
        code={step.code}
        progress={progress}
        stepIndex={stepIndex}
        total={total}
      />
    </div>
  );

  if (!reveal) {
    return (
      <li className="relative flex min-h-0 flex-col" {...pointer}>
        {numberBlock}
      </li>
    );
  }

  return (
    <m.li
      className="relative flex min-h-0 flex-col"
      style={{ y: reveal.y, opacity: reveal.opacity }}
      initial={false}
      {...pointer}
    >
      {numberBlock}
    </m.li>
  );
}

function ProcessStepCopyCell({
  step,
  stepIndex,
  total,
  progress,
  motionHover,
  onHover,
}: ProcessStepHandlers) {
  const reveal = useStepReveal(progress, stepIndex, total);
  const pointer = {
    onPointerEnter: motionHover ? () => onHover(true) : undefined,
    onPointerLeave: motionHover ? () => onHover(false) : undefined,
  };

  const copy = (
    <div className="flex min-h-0 flex-col gap-1.5">
      <h3 className="font-heading text-foreground text-base font-semibold tracking-tight sm:text-[17px]">
        {step.title}
      </h3>
      <p className="text-muted-foreground text-[14px] leading-relaxed sm:text-[15px]">
        {step.description}
      </p>
    </div>
  );

  if (!reveal) {
    return (
      <li className="relative min-h-0" {...pointer}>
        <span className="sr-only">
          Step {stepIndex + 1}: {step.title} — {step.description}
        </span>
        {copy}
      </li>
    );
  }

  return (
    <m.li
      className="relative min-h-0"
      style={{ y: reveal.y, opacity: reveal.opacity }}
      initial={false}
      {...pointer}
    >
      <span className="sr-only">
        Step {stepIndex + 1}: {step.title} — {step.description}
      </span>
      {copy}
    </m.li>
  );
}

function ProcessStepMobile({
  step,
  stepIndex,
  total,
  progress,
  motionHover,
  hovered,
  onHover,
}: ProcessStepHandlers) {
  const reveal = useStepReveal(progress, stepIndex, total);
  const pointer = {
    onPointerEnter: motionHover ? () => onHover(true) : undefined,
    onPointerLeave: motionHover ? () => onHover(false) : undefined,
  };

  const block = (
    <>
      <div className="relative w-fit">
        <ServicesStepPill visible={motionHover && hovered} />
        <StepDisplayNumber
          code={step.code}
          progress={progress}
          stepIndex={stepIndex}
          total={total}
        />
      </div>
      <div className="mt-3 flex min-h-0 flex-col gap-1.5">
        <h3 className="font-heading text-foreground text-base font-semibold tracking-tight sm:text-[17px]">
          {step.title}
        </h3>
        <p className="text-muted-foreground text-[14px] leading-relaxed sm:text-[15px]">
          {step.description}
        </p>
      </div>
    </>
  );

  if (!reveal) {
    return (
      <li className="relative flex min-h-0 flex-col" {...pointer}>
        <span className="sr-only">
          Step {stepIndex + 1}: {step.title} — {step.description}
        </span>
        {block}
      </li>
    );
  }

  return (
    <m.li
      className="relative flex min-h-0 flex-col"
      style={{ y: reveal.y, opacity: reveal.opacity }}
      initial={false}
      {...pointer}
    >
      <span className="sr-only">
        Step {stepIndex + 1}: {step.title} — {step.description}
      </span>
      {block}
    </m.li>
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
  const total = servicesProcessSteps.length;

  const stepProps = (index: number) => ({
    step: servicesProcessSteps[index]!,
    stepIndex: index,
    total,
    progress: stepProgress,
    motionHover,
    hovered: hoveredStep === index,
    onHover: (active: boolean) => setHoveredStep(active ? index : null),
  });

  return (
    <div className="px-4 py-6 sm:px-5 sm:py-7 md:px-6 md:py-8 lg:px-8 lg:py-9">
      <div className="hidden md:block">
        <ol className="grid list-none grid-cols-3 gap-6 lg:gap-10">
          {servicesProcessSteps.map((step, index) => (
            <ProcessStepNumberCell
              key={`${step.code}-num`}
              {...stepProps(index)}
            />
          ))}
        </ol>
        <div className="relative my-5 h-px lg:my-6">
          <ServicesProcessRail
            progress={stepProgress}
            layout="horizontal"
            stepCount={total}
            className="absolute inset-x-0 top-1/2"
          />
        </div>
        <ol className="grid list-none grid-cols-3 gap-6 lg:gap-10">
          {servicesProcessSteps.map((step, index) => (
            <ProcessStepCopyCell
              key={`${step.code}-copy`}
              {...stepProps(index)}
            />
          ))}
        </ol>
      </div>

      <div className="relative md:hidden">
        <ServicesProcessRail
          progress={stepProgress}
          layout="vertical"
          stepCount={total}
          className="absolute top-4 bottom-4 left-[1.2rem]"
        />
        <ol className="grid list-none grid-cols-1 gap-10 pl-10">
          {servicesProcessSteps.map((step, index) => (
            <ProcessStepMobile key={step.code} {...stepProps(index)} />
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
          <CardFooter className="border-border/50 bg-muted/60 flex flex-col items-stretch gap-3 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5 sm:py-5 md:px-6">
            <span className="border-border/55 bg-background/35 text-foreground inline-flex w-fit max-w-full items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] font-medium sm:text-[13px]">
              <Clock
                className="text-brand-accent size-3.5 shrink-0"
                strokeWidth={2}
                aria-hidden
              />
              {servicesPricingLine}
            </span>
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
