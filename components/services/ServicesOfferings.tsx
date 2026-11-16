"use client";

import {
  ServicesOfferingVisual,
  type ServicesOfferingVisualVariant,
} from "@/components/services/ServicesHeroVisual";
import {
  servicesSectionClass,
  servicesSectionHeadingGap,
} from "@/components/services/servicesSurface";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeading } from "@/components/typography/SectionTypography";
import { Card, CardContent } from "@/components/ui/card";
import {
  servicesOfferings,
  servicesOfferingsHeading,
  type ServiceOffering,
  type ServiceOfferingId,
} from "@/lib/services";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  PencilLine,
  Rocket,
  ShieldCheck,
  Smartphone,
  TrendingUp,
} from "lucide-react";

const offeringVisualVariant: Record<
  ServiceOfferingId,
  ServicesOfferingVisualVariant
> = {
  websites: "landing",
  "web-systems": "dashboard",
};

const offeringBulletIcon: Record<string, LucideIcon> = {
  "Responsive and SEO-ready": Smartphone,
  "Easy to update": PencilLine,
  "Deployed on Vercel": Rocket,
  "Clean, data-dense UI": LayoutDashboard,
  "Role-based access": ShieldCheck,
  "Built to grow": TrendingUp,
};

const bentoTileClass =
  "border-border/50 bg-muted/90 ring-border/30 h-full rounded-xl border shadow-sm ring-1 transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-brand-accent/45 hover:shadow-[0_10px_32px_-12px_rgba(76,215,246,0.35),0_0_0_1px_rgba(76,215,246,0.1)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:rounded-2xl";

const bulletTileLgClass = [
  "lg:col-start-1 lg:col-span-2",
  "lg:col-start-3 lg:col-span-2",
  "lg:col-start-5 lg:col-span-3",
  "lg:col-start-8 lg:col-span-2",
  "lg:col-start-10 lg:col-span-2",
  "lg:col-start-12 lg:col-span-1",
] as const;

function formatOfferingIndex(index: number): string {
  return String(index + 1).padStart(2, "0");
}

function LargeOfferingCard({
  offering,
  index,
}: {
  offering: ServiceOffering;
  index: number;
}) {
  const number = formatOfferingIndex(index);

  return (
    <Card className={bentoTileClass}>
      <CardContent className="flex flex-col gap-2.5 p-3.5 sm:p-4 md:gap-3 md:p-5">
        <span className="text-brand-accent font-mono text-xs font-semibold tracking-widest md:text-sm">
          {number}
        </span>
        <h3 className="font-heading text-foreground text-lg font-semibold tracking-tight md:text-xl lg:text-[1.35rem] lg:leading-snug">
          {offering.title}
        </h3>
        <p className="text-muted-foreground text-[14px] leading-relaxed md:text-[15px]">
          {offering.description}
        </p>
        <p className="text-muted-foreground text-[11px] font-medium tracking-wide md:text-[12px]">
          {offering.stack}
        </p>
        <div className="hidden md:block">
          <ServicesOfferingVisual
            variant={offeringVisualVariant[offering.id]}
            className="mx-0 aspect-[5/4] min-h-0 w-full max-w-[200px] lg:max-w-[220px]"
          />
        </div>
      </CardContent>
    </Card>
  );
}

function BulletOfferingCard({ bullet }: { bullet: string }) {
  const Icon = offeringBulletIcon[bullet];

  return (
    <Card className={cn(bentoTileClass, "min-h-[4.5rem]")}>
      <CardContent className="flex h-full flex-col justify-center gap-2 p-3 md:p-3.5">
        {Icon ? (
          <Icon
            className="text-brand-accent size-4 shrink-0"
            strokeWidth={1.75}
            aria-hidden
          />
        ) : null}
        <p className="text-foreground text-[12px] leading-snug font-medium md:text-[13px]">
          {bullet}
        </p>
      </CardContent>
    </Card>
  );
}

const offeringBulletTiles = servicesOfferings.flatMap((offering) =>
  offering.bullets.map((bullet) => ({ offeringId: offering.id, bullet })),
);

export function ServicesOfferings() {
  const largeTileLgClass = ["lg:col-span-7", "lg:col-span-5"] as const;

  return (
    <section
      aria-labelledby="services-offerings-heading"
      className={servicesSectionClass}
    >
      <SectionHeading
        id="services-offerings-heading"
        className={cn(servicesSectionHeadingGap, "mb-3 md:mb-4")}
      >
        {servicesOfferingsHeading}
      </SectionHeading>

      <Stagger
        when="inView"
        preset="expressive"
        className="grid grid-cols-2 gap-2.5 lg:grid-cols-12 lg:gap-3"
      >
        {servicesOfferings.map((offering, offeringIndex) => (
          <StaggerItem
            key={`${offering.id}-large`}
            className={cn("col-span-2", largeTileLgClass[offeringIndex])}
          >
            <LargeOfferingCard offering={offering} index={offeringIndex} />
          </StaggerItem>
        ))}
        {offeringBulletTiles.map(({ offeringId, bullet }, bulletIndex) => (
          <StaggerItem
            key={`${offeringId}-${bullet}`}
            className={cn("col-span-1", bulletTileLgClass[bulletIndex])}
          >
            <BulletOfferingCard bullet={bullet} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
