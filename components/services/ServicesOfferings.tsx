import { Check } from "lucide-react";

import { ServicesFadeUp } from "@/components/services/ServicesFadeUp";
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

const offeringCardClass =
  "border-border/50 bg-muted/90 ring-border/30 h-full rounded-2xl border shadow-sm ring-1 transition-[border-color,box-shadow] duration-200 hover:border-brand-accent/45 hover:shadow-[0_0_0_1px_rgba(76,215,246,0.14)] motion-reduce:transition-none md:rounded-3xl";

function formatOfferingIndex(index: number): string {
  return String(index + 1).padStart(2, "0");
}

function OfferingCard({
  offering,
  index,
}: {
  offering: ServiceOffering;
  index: number;
}) {
  return (
    <Card className={offeringCardClass}>
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
      </CardContent>
    </Card>
  );
}

export function ServicesOfferings() {
  return (
    <section
      aria-labelledby="services-offerings-heading"
      className={servicesSectionClass}
    >
      <ServicesFadeUp className={servicesSectionHeadingGap}>
        <SectionHeading id="services-offerings-heading">
          {servicesOfferingsHeading}
        </SectionHeading>
      </ServicesFadeUp>

      <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-2 lg:gap-6">
        {servicesOfferings.map((offering, index) => (
          <ServicesFadeUp
            key={offering.id}
            delay={index * 0.1}
            className="h-full min-h-0"
          >
            <OfferingCard offering={offering} index={index} />
          </ServicesFadeUp>
        ))}
      </div>
    </section>
  );
}
