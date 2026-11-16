import Link from "next/link";

import { aboutStepNumberClass } from "@/components/about/aboutSurface";
import { ServicesFadeUp } from "@/components/services/ServicesFadeUp";
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
      <ServicesFadeUp className={servicesSectionHeadingGap}>
        <SectionHeading id="services-process-heading">
          {servicesHowItWorksHeading}
        </SectionHeading>
      </ServicesFadeUp>

      <ServicesFadeUp>
        <Card className="border-border/50 bg-muted/90 ring-border/30 overflow-hidden rounded-2xl border shadow-sm ring-1 md:rounded-3xl">
          <CardContent className="p-0">
            <ol className="grid list-none grid-cols-1 gap-8 px-4 py-6 sm:px-5 sm:py-7 md:grid-cols-3 md:gap-6 md:px-6 md:py-8 lg:gap-8 lg:px-8 lg:py-9">
              {servicesHowItWorksSteps.map((step, index) => (
                <li
                  key={step}
                  className="flex min-h-0 flex-col gap-3 md:gap-3.5"
                >
                  <h3 className="sr-only">
                    Step {index + 1}: {step}
                  </h3>
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
                </li>
              ))}
            </ol>
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
      </ServicesFadeUp>
    </section>
  );
}
