"use client";

import { Check } from "lucide-react";
import { m, useMotionValue, useReducedMotion } from "motion/react";
import { useState } from "react";

import {
  ServicesOfferingEdge,
  ServicesScrollReveal,
  useServicesBulletMotion,
  useServicesMotionHover,
  useServicesScrollSectionProgress,
} from "@/components/services/ServicesScrollMotion";
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

const offeringParallax = [1, 1.22] as const;

function formatOfferingIndex(index: number): string {
  return String(index + 1).padStart(2, "0");
}

function OfferingBullet({
  bullet,
  bulletIndex,
}: {
  bullet: string;
  bulletIndex: number;
}) {
  const reducedMotion = useReducedMotion();
  const progress = useServicesScrollSectionProgress();
  const fallback = useMotionValue(1);
  const source = progress ?? fallback;
  const { x, opacity } = useServicesBulletMotion(source, bulletIndex);

  if (reducedMotion) {
    return (
      <li className="text-foreground flex items-start gap-2 text-[13px] leading-snug font-medium md:text-[14px]">
        <Check
          className="text-brand-accent mt-0.5 size-4 shrink-0"
          strokeWidth={2}
          aria-hidden
        />
        <span>{bullet}</span>
      </li>
    );
  }

  return (
    <m.li
      className="text-foreground flex items-start gap-2 text-[13px] leading-snug font-medium md:text-[14px]"
      style={{ x, opacity }}
    >
      <Check
        className="text-brand-accent mt-0.5 size-4 shrink-0"
        strokeWidth={2}
        aria-hidden
      />
      <span>{bullet}</span>
    </m.li>
  );
}

function OfferingCard({
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
            {offering.bullets.map((bullet, bulletIndex) => (
              <OfferingBullet
                key={bullet}
                bullet={bullet}
                bulletIndex={bulletIndex}
              />
            ))}
          </ul>
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
      <div className={servicesSectionHeadingGap}>
        <SectionHeading id="services-offerings-heading">
          {servicesOfferingsHeading}
        </SectionHeading>
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-2 lg:gap-6">
        {servicesOfferings.map((offering, index) => (
          <ServicesScrollReveal
            key={offering.id}
            className="h-full min-h-0"
            parallaxY={offeringParallax[index] ?? 1}
            shareProgress
          >
            <OfferingCard
              offering={offering}
              index={index}
              motionHover={motionHover}
              hovered={hoveredId === offering.id}
              onHover={(active) => setHoveredId(active ? offering.id : null)}
            />
          </ServicesScrollReveal>
        ))}
      </div>
    </section>
  );
}
