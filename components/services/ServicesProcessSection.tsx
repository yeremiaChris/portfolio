import Link from "next/link";

import { aboutStepNumberClass } from "@/components/about/aboutSurface";
import {
  servicesSectionClass,
  servicesStepCardClass,
} from "@/components/services/servicesSurface";
import {
  servicesHowItWorksHeading,
  servicesHowItWorksSteps,
  servicesLabTeaser,
  servicesPricingLine,
} from "@/lib/services";
import { cn } from "@/lib/utils";

function PricingLabStrip({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "border-border/50 bg-muted/60 flex flex-col gap-2 rounded-2xl border px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 md:rounded-3xl",
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

export function ServicesProcessSection() {
  return (
    <section
      aria-labelledby="services-process-heading"
      className={cn(servicesSectionClass)}
    >
      <h2
        id="services-process-heading"
        className="font-heading text-foreground mb-5 text-2xl font-semibold tracking-tight sm:mb-6 sm:text-3xl"
      >
        {servicesHowItWorksHeading}
      </h2>

      <ol className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-5">
        {servicesHowItWorksSteps.map((step, index) => (
          <li key={step} className="min-h-0">
            <article className={cn(servicesStepCardClass, "h-full")}>
              <h3 className="sr-only">
                Step {index + 1}: {step}
              </h3>
              <StepContent step={step} index={index} />
            </article>
          </li>
        ))}
      </ol>

      <PricingLabStrip className="mt-5 md:mt-6" />
    </section>
  );
}
