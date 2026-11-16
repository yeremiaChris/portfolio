import Link from "next/link";

import { aboutStepNumberClass } from "@/components/about/aboutSurface";
import {
  servicesSectionClass,
  servicesSectionHeadingClass,
} from "@/components/services/servicesSurface";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  servicesHowItWorksHeading,
  servicesHowItWorksSteps,
  servicesLabTeaser,
  servicesPricingLine,
} from "@/lib/services";

export function ServicesProcess() {
  return (
    <section
      aria-labelledby="services-process-heading"
      className={servicesSectionClass}
    >
      <h2 id="services-process-heading" className={servicesSectionHeadingClass}>
        {servicesHowItWorksHeading}
      </h2>

      <Card className="border-border/50 bg-muted/90 ring-border/30 overflow-hidden rounded-2xl border shadow-sm ring-1 md:rounded-3xl">
        <CardContent className="p-0">
          <ol className="divide-border/40 grid grid-cols-1 divide-y md:grid-cols-3 md:divide-x md:divide-y-0">
            {servicesHowItWorksSteps.map((step, index) => (
              <li key={step} className="min-h-0">
                <h3 className="sr-only">
                  Step {index + 1}: {step}
                </h3>
                <div className="flex flex-col items-start gap-3 p-5 md:p-6">
                  <span className={aboutStepNumberClass}>{index + 1}</span>
                  <p className="font-heading text-foreground text-[15px] leading-snug font-semibold tracking-tight sm:text-base">
                    {step}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
        <CardFooter className="border-border/50 bg-muted/60 flex flex-col gap-2 border-t sm:flex-row sm:items-center sm:justify-between sm:gap-4">
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
        </CardFooter>
      </Card>
    </section>
  );
}
