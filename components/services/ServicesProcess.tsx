import Link from "next/link";

import { aboutStepNumberClass } from "@/components/about/aboutSurface";
import { servicesSectionClass } from "@/components/services/servicesSurface";
import { Card, CardContent } from "@/components/ui/card";
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
            <Card className="border-border/50 bg-muted/90 h-full rounded-2xl border [--card-spacing:--spacing(4)] md:rounded-3xl md:[--card-spacing:--spacing(5)]">
              <CardContent className="pt-(--card-spacing)">
                <h3 className="sr-only">
                  Step {index + 1}: {step}
                </h3>
                <div className="flex flex-col items-start gap-3">
                  <span className={aboutStepNumberClass}>{index + 1}</span>
                  <p className="font-heading text-foreground text-[15px] leading-snug font-semibold tracking-tight sm:text-base">
                    {step}
                  </p>
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ol>

      <Card
        className={cn(
          "border-border/50 bg-muted/60 mt-5 rounded-2xl border md:mt-6 md:rounded-3xl",
          "[--card-spacing:--spacing(4)]",
        )}
      >
        <CardContent className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
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
        </CardContent>
      </Card>
    </section>
  );
}
