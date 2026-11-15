"use client";

import Link from "next/link";
import {
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";

import { aboutStepNumberClass } from "@/components/about/aboutSurface";
import {
  servicesHowItWorksHeading,
  servicesHowItWorksSteps,
  servicesLabTeaser,
  servicesPricingLine,
} from "@/lib/services";
import {
  servicesMotionViewport,
  servicesStepRevealTransition,
} from "@/lib/services-motion";
import { cn } from "@/lib/utils";

function PricingLabStrip({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "border-border/50 bg-muted/60 flex flex-col gap-2 rounded-2xl border px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4",
        className,
      )}
    >
      <p className="text-foreground text-[14px] font-medium sm:text-[15px]">
        {servicesPricingLine}
      </p>
      <p className="text-muted-foreground text-[12px] leading-relaxed sm:text-right sm:text-[13px]">
        {servicesLabTeaser.beforeLink}
        <Link
          href={servicesLabTeaser.linkHref}
          className="text-brand-accent hover:text-brand-accent/85 underline underline-offset-4 transition-colors duration-200 motion-reduce:transition-none"
        >
          {servicesLabTeaser.linkLabel}
        </Link>
        {servicesLabTeaser.afterLink}
      </p>
    </div>
  );
}

function StepContent({ step, index }: { step: string; index: number }) {
  return (
    <div className="flex flex-col items-start gap-3">
      <span className={aboutStepNumberClass}>{index + 1}</span>
      <p className="font-heading text-foreground text-[15px] leading-snug font-semibold tracking-tight sm:text-base">
        {step}
      </p>
    </div>
  );
}

function ServicesProcessMobile({ reduced }: { reduced: boolean }) {
  return (
    <div className="flex flex-col gap-5 lg:hidden">
      <h2 className="font-heading text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
        {servicesHowItWorksHeading}
      </h2>
      <ol className="flex flex-col gap-3">
        {servicesHowItWorksSteps.map((step, index) => (
          <m.li
            key={step}
            initial={reduced ? false : { y: 20, opacity: 0.75 }}
            whileInView={reduced ? undefined : { y: 0, opacity: 1 }}
            viewport={reduced ? undefined : servicesMotionViewport}
            transition={
              reduced ? { duration: 0 } : servicesStepRevealTransition(index)
            }
          >
            <article className="border-border/50 bg-muted/90 rounded-2xl border p-4">
              <h3 className="sr-only">
                Step {index + 1}: {step}
              </h3>
              <StepContent step={step} index={index} />
            </article>
          </m.li>
        ))}
      </ol>
      <PricingLabStrip />
    </div>
  );
}

export function ServicesProcessMotion() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const reduced = reducedMotion === true;
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.15", "end 0.85"],
  });

  const progressBarScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (reduced) {
      return;
    }
    if (value < 0.3) {
      setActiveStep(0);
    } else if (value < 0.62) {
      setActiveStep(1);
    } else {
      setActiveStep(2);
    }
  });

  return (
    <section
      ref={sectionRef}
      aria-label={servicesHowItWorksHeading}
      className="mb-8 w-full md:mb-10"
    >
      <ServicesProcessMobile reduced={reduced} />

      <div className="relative hidden lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12 xl:gap-14">
        <aside className="sticky top-24 self-start">
          <h2 className="font-heading text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
            {servicesHowItWorksHeading}
          </h2>
          <div className="mt-6 flex gap-4">
            <div className="bg-border/40 relative h-44 w-0.5 shrink-0 overflow-hidden rounded-full">
              <m.div
                aria-hidden
                className="bg-brand-accent absolute inset-0 w-full origin-top"
                style={{ scaleY: reduced ? 1 : progressBarScale }}
              />
            </div>
            <PricingLabStrip className="min-w-0 flex-1" />
          </div>
        </aside>

        <ol className="relative flex flex-col">
          {servicesHowItWorksSteps.map((step, index) => (
            <li
              key={step}
              className="flex min-h-[55vh] items-start py-6 first:pt-0 last:pb-0 xl:min-h-[62vh]"
            >
              <m.article
                className="border-border/50 bg-muted/90 w-full rounded-2xl border p-5"
                animate={{
                  opacity: reduced || index === activeStep ? 1 : 0.35,
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="sr-only">
                  Step {index + 1}: {step}
                </h3>
                <StepContent step={step} index={index} />
              </m.article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
