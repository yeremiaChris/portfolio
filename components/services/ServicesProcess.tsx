"use client";

import Link from "next/link";

import { aboutStepNumberClass } from "@/components/about/aboutSurface";
import { Reveal } from "@/components/motion/Reveal";
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

export function ServicesProcess() {
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

      <Reveal when="inView" preset="expressive">
        <Card className="border-border/50 bg-muted/90 ring-border/30 overflow-hidden rounded-2xl border shadow-sm ring-1 md:rounded-3xl">
          <CardContent className="p-0">
            <ol className="divide-border/40 grid grid-cols-1 divide-y md:grid-cols-3 md:divide-x md:divide-y-0">
              {servicesHowItWorksSteps.map((step, index) => (
                <li key={step} className="min-h-0">
                  <h3 className="sr-only">
                    Step {index + 1}: {step}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 px-3 py-3 md:px-4 md:py-3.5">
                    <span
                      className={cn(
                        aboutStepNumberClass,
                        "px-1.5 py-0 text-xs leading-none",
                      )}
                    >
                      {index + 1}
                    </span>
                    <p className="font-heading text-foreground min-w-0 flex-1 text-[14px] leading-snug font-semibold tracking-tight sm:text-[15px]">
                      {step}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
          <CardFooter className="border-border/50 bg-muted/60 flex flex-col items-start gap-2 border-t text-left sm:flex-row sm:items-center sm:justify-between sm:gap-4 md:text-left">
            <p className="text-foreground text-[14px] font-medium sm:text-[15px]">
              {servicesPricingLine}
            </p>
            <p className="text-muted-foreground text-left text-[12px] leading-relaxed sm:text-[13px] md:text-right">
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
      </Reveal>
    </section>
  );
}
