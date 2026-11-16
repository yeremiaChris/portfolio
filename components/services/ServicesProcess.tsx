"use client";

import Link from "next/link";
import { m, useReducedMotion } from "motion/react";

import { aboutStepNumberClass } from "@/components/about/aboutSurface";
import {
  servicesInViewViewport,
  servicesProcessBadgeVariants,
  servicesProcessLineHorizontalVariants,
  servicesProcessLineVerticalVariants,
  servicesProcessPanelVariants,
  servicesProcessStepVariants,
} from "@/components/services/servicesMotion";
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

function ProcessStepsStatic() {
  return (
    <ol className="divide-border/40 grid grid-cols-1 divide-y md:grid-cols-3 md:divide-x md:divide-y-0">
      {servicesHowItWorksSteps.map((step, index) => (
        <li key={step} className="min-h-0">
          <h3 className="sr-only">
            Step {index + 1}: {step}
          </h3>
          <div className="flex flex-col gap-2.5 px-4 py-5 sm:px-5 sm:py-6 md:gap-3 md:px-6 md:py-7">
            <span
              className={cn(
                aboutStepNumberClass,
                "w-fit px-2 py-0.5 text-xs leading-none",
              )}
            >
              {index + 1}
            </span>
            <p className="font-heading text-foreground text-[15px] leading-relaxed font-semibold tracking-tight sm:text-base">
              {step}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function ServicesProcess() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="services-process-heading"
      className={servicesSectionClass}
    >
      <SectionHeading
        id="services-process-heading"
        className={servicesSectionHeadingGap}
      >
        {servicesHowItWorksHeading}
      </SectionHeading>

      <Card className="border-border/50 bg-muted/90 ring-border/30 overflow-hidden rounded-2xl border shadow-sm ring-1 md:rounded-3xl">
        <CardContent className="p-0">
          {reducedMotion ? (
            <ProcessStepsStatic />
          ) : (
            <div className="relative">
              <m.div
                aria-hidden
                className="bg-brand-accent/45 pointer-events-none absolute top-[2.65rem] right-6 left-6 z-0 hidden h-px origin-left md:block"
                initial="hidden"
                whileInView="visible"
                viewport={servicesInViewViewport}
                variants={servicesProcessLineHorizontalVariants}
              />
              <m.div
                aria-hidden
                className="bg-brand-accent/45 pointer-events-none absolute top-6 bottom-[4.5rem] left-[1.65rem] z-0 w-px origin-top md:hidden"
                initial="hidden"
                whileInView="visible"
                viewport={servicesInViewViewport}
                variants={servicesProcessLineVerticalVariants}
              />
              <m.ol
                className="divide-border/40 relative z-[1] grid grid-cols-1 divide-y md:grid-cols-3 md:divide-x md:divide-y-0"
                initial="hidden"
                whileInView="visible"
                viewport={servicesInViewViewport}
                variants={servicesProcessPanelVariants}
              >
                {servicesHowItWorksSteps.map((step, index) => (
                  <m.li
                    key={step}
                    className="relative z-[1] min-h-0"
                    variants={servicesProcessStepVariants}
                  >
                    <h3 className="sr-only">
                      Step {index + 1}: {step}
                    </h3>
                    <div className="flex flex-col gap-2.5 px-4 py-5 sm:px-5 sm:py-6 md:gap-3 md:px-6 md:py-7">
                      <m.span
                        className={cn(
                          aboutStepNumberClass,
                          "w-fit border px-2 py-0.5 text-xs leading-none",
                        )}
                        variants={servicesProcessBadgeVariants}
                      >
                        {index + 1}
                      </m.span>
                      <p className="font-heading text-foreground text-[15px] leading-relaxed font-semibold tracking-tight sm:text-base">
                        {step}
                      </p>
                    </div>
                  </m.li>
                ))}
              </m.ol>
            </div>
          )}
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
    </section>
  );
}
