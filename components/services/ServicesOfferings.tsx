"use client";

import { Check } from "lucide-react";
import { m } from "motion/react";
import { useState } from "react";

import {
  ServicesCopyStagger,
  servicesCopyItem,
  ServicesOfferingEdge,
  ServicesScrollClip,
  useServicesMotionHover,
} from "@/components/services/servicesReveal";
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

const offeringCardBaseClass =
  "border-border/50 bg-muted/90 ring-border/30 relative h-full overflow-hidden rounded-2xl border shadow-sm ring-1 md:rounded-3xl";

const offeringCardHoverClass =
  "transition-[border-color,box-shadow] duration-200 hover:border-brand-accent/45 hover:shadow-[0_0_0_1px_rgba(76,215,246,0.14)] motion-reduce:transition-none";

function formatOfferingIndex(index: number): string {
  return String(index + 1).padStart(2, "0");
}

function OfferingCardMotion({
  offering,
  index,
  hovered,
  onHover,
  motionHover,
}: {
  offering: ServiceOffering;
  index: number;
  hovered: boolean;
  onHover: (active: boolean) => void;
  motionHover: boolean;
}) {
  return (
    <div
      className={cn(
        offeringCardBaseClass,
        !motionHover && offeringCardHoverClass,
      )}
      onPointerEnter={motionHover ? () => onHover(true) : undefined}
      onPointerLeave={motionHover ? () => onHover(false) : undefined}
    >
      <ServicesOfferingEdge visible={hovered && motionHover} />
      <Card className="border-0 bg-transparent shadow-none ring-0">
        <CardContent className="flex h-full flex-col gap-3 p-5 md:gap-3.5 md:p-6">
          <ServicesCopyStagger className="flex h-full flex-col gap-3 md:gap-3.5">
            <m.span
              variants={servicesCopyItem}
              initial={false}
              className="text-brand-accent font-mono text-xs font-semibold tracking-widest"
            >
              {formatOfferingIndex(index)}
            </m.span>
            <m.h3
              variants={servicesCopyItem}
              initial={false}
              className="font-heading text-foreground text-lg font-semibold tracking-tight md:text-xl"
            >
              {offering.title}
            </m.h3>
            <m.p
              variants={servicesCopyItem}
              initial={false}
              className="text-muted-foreground text-[14px] leading-relaxed md:text-[15px]"
            >
              {offering.description}
            </m.p>
            <m.p
              variants={servicesCopyItem}
              initial={false}
              className="text-muted-foreground border-border/50 border-t pt-3 text-[11px] font-medium tracking-wide md:text-[12px]"
            >
              {offering.stack}
            </m.p>
            <m.ul
              variants={servicesCopyItem}
              initial={false}
              className="mt-1 flex flex-col gap-2"
            >
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
            </m.ul>
          </ServicesCopyStagger>
        </CardContent>
      </Card>
    </div>
  );
}

export function ServicesOfferings() {
  const motionHover = useServicesMotionHover();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      aria-labelledby="services-offerings-heading"
      className={servicesSectionClass}
    >
      <ServicesScrollClip className={servicesSectionHeadingGap}>
        <SectionHeading id="services-offerings-heading">
          {servicesOfferingsHeading}
        </SectionHeading>
      </ServicesScrollClip>

      <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-2 lg:gap-6">
        {servicesOfferings.map((offering, index) => (
          <ServicesScrollClip
            key={offering.id}
            className="h-full min-h-0"
            revealFromStart={index === 0}
          >
            <OfferingCardMotion
              offering={offering}
              index={index}
              motionHover={motionHover}
              hovered={hoveredId === offering.id}
              onHover={(active) => setHoveredId(active ? offering.id : null)}
            />
          </ServicesScrollClip>
        ))}
      </div>
    </section>
  );
}
