"use client";

import { Check } from "lucide-react";
import { m, useReducedMotion } from "motion/react";

import {
  servicesInViewViewport,
  servicesOfferingBulletVariants,
  servicesOfferingBulletsVariants,
  servicesOfferingCardVariants,
  servicesOfferingHoverGlow,
  servicesOfferingsGridVariants,
} from "@/components/services/servicesMotion";
import {
  servicesSectionClass,
  servicesSectionHeadingGap,
} from "@/components/services/servicesSurface";
import { SectionHeading } from "@/components/typography/SectionTypography";
import { Card, CardContent } from "@/components/ui/card";
import {
  servicesOfferings,
  servicesOfferingsHeading,
  type ServiceOffering,
} from "@/lib/services";
import { cn } from "@/lib/utils";

const offeringCardClass =
  "border-border/50 bg-muted/90 ring-border/30 h-full rounded-2xl border shadow-sm ring-1 md:rounded-3xl";

const offeringCardStaticHoverClass =
  "transition-colors duration-200 hover:border-brand-accent/40 motion-reduce:transition-none";

function formatOfferingIndex(index: number): string {
  return String(index + 1).padStart(2, "0");
}

function OfferingCardBody({
  offering,
  index,
}: {
  offering: ServiceOffering;
  index: number;
}) {
  return (
    <>
      <span className="text-brand-accent font-mono text-xs font-semibold tracking-widest">
        {formatOfferingIndex(index)}
      </span>
      <h3 className="font-heading text-foreground text-lg font-semibold tracking-tight md:text-xl">
        {offering.title}
      </h3>
      <p className="text-muted-foreground text-[14px] leading-relaxed md:text-[15px]">
        {offering.description}
      </p>
      <p className="text-muted-foreground border-border/50 border-t pt-3 text-[11px] font-medium tracking-wide md:text-[12px]">
        {offering.stack}
      </p>
      <ul className="mt-1 flex flex-col gap-2">
        {offering.bullets.map((bullet) => (
          <li
            key={bullet}
            className="text-foreground flex items-start gap-2 text-[13px] leading-snug font-medium md:text-[14px]"
          >
            <Check
              className="text-brand-accent mt-0.5 size-4 shrink-0"
              strokeWidth={2}
              aria-hidden
            />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export function ServicesOfferings() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="services-offerings-heading"
      className={servicesSectionClass}
    >
      <SectionHeading
        id="services-offerings-heading"
        className={servicesSectionHeadingGap}
      >
        {servicesOfferingsHeading}
      </SectionHeading>

      {reducedMotion ? (
        <ul className="grid list-none grid-cols-1 gap-4 md:gap-5 lg:grid-cols-2 lg:gap-6">
          {servicesOfferings.map((offering, index) => (
            <li key={offering.id} className="min-h-0">
              <Card
                className={cn(offeringCardClass, offeringCardStaticHoverClass)}
              >
                <CardContent className="flex h-full flex-col gap-3 p-5 md:gap-3.5 md:p-6">
                  <OfferingCardBody offering={offering} index={index} />
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <m.ul
          className="grid list-none grid-cols-1 gap-4 md:gap-5 lg:grid-cols-2 lg:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={servicesInViewViewport}
          variants={servicesOfferingsGridVariants}
        >
          {servicesOfferings.map((offering, index) => (
            <m.li
              key={offering.id}
              className="min-h-0"
              variants={servicesOfferingCardVariants}
            >
              <m.div
                className={cn(
                  offeringCardClass,
                  "flex h-full flex-col gap-3 p-5 md:gap-3.5 md:p-6",
                )}
                whileHover={servicesOfferingHoverGlow}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-brand-accent font-mono text-xs font-semibold tracking-widest">
                  {formatOfferingIndex(index)}
                </span>
                <h3 className="font-heading text-foreground text-lg font-semibold tracking-tight md:text-xl">
                  {offering.title}
                </h3>
                <p className="text-muted-foreground text-[14px] leading-relaxed md:text-[15px]">
                  {offering.description}
                </p>
                <p className="text-muted-foreground border-border/50 border-t pt-3 text-[11px] font-medium tracking-wide md:text-[12px]">
                  {offering.stack}
                </p>
                <m.ul
                  className="mt-1 flex flex-col gap-2"
                  variants={servicesOfferingBulletsVariants}
                >
                  {offering.bullets.map((bullet) => (
                    <m.li
                      key={bullet}
                      variants={servicesOfferingBulletVariants}
                      className="text-foreground flex items-start gap-2 text-[13px] leading-snug font-medium md:text-[14px]"
                    >
                      <Check
                        className="text-brand-accent mt-0.5 size-4 shrink-0"
                        strokeWidth={2}
                        aria-hidden
                      />
                      <span>{bullet}</span>
                    </m.li>
                  ))}
                </m.ul>
              </m.div>
            </m.li>
          ))}
        </m.ul>
      )}
    </section>
  );
}
