import Link from "next/link";

import {
  aboutBentoCardClass,
  aboutStepNumberClass,
} from "@/components/about/aboutSurface";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
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
      className="mb-10 w-full md:mb-12"
    >
      <Reveal className="mb-6 max-w-2xl">
        <h2
          id="services-process-heading"
          className="font-heading text-foreground text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {servicesHowItWorksHeading}
        </h2>
      </Reveal>

      <Stagger className="grid grid-cols-1 gap-3.5 md:grid-cols-3 md:gap-4">
        {servicesHowItWorksSteps.map((step, index) => (
          <StaggerItem key={step}>
            <article className={cn(aboutBentoCardClass, "h-full")}>
              <h3 className="flex flex-wrap items-center gap-2">
                <span className={aboutStepNumberClass}>{index + 1}</span>
                <span className="font-heading text-foreground text-base font-semibold tracking-tight sm:text-lg">
                  {step}
                </span>
              </h3>
            </article>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-6 space-y-3 md:mt-8">
        <p className="text-foreground text-[15px] font-medium sm:text-base">
          {servicesPricingLine}
        </p>
        <p className="text-muted-foreground text-[13px] leading-relaxed sm:text-[14px]">
          {servicesLabTeaser.beforeLink}
          <Link
            href={servicesLabTeaser.linkHref}
            className="text-brand-accent hover:text-brand-accent/85 underline underline-offset-4 transition-colors duration-200 motion-reduce:transition-none"
          >
            {servicesLabTeaser.linkLabel}
          </Link>
          {servicesLabTeaser.afterLink}
        </p>
      </Reveal>
    </section>
  );
}
