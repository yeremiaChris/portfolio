import { Globe, LayoutDashboard } from "lucide-react";

import { servicesSectionClass } from "@/components/services/servicesSurface";
import { SectionHeading } from "@/components/typography/SectionTypography";
import { Card, CardContent } from "@/components/ui/card";
import {
  servicesOfferings,
  servicesOfferingsHeading,
  type ServiceOffering,
  type ServiceOfferingId,
} from "@/lib/services";

const OFFERING_ICONS: Record<ServiceOfferingId, typeof Globe> = {
  websites: Globe,
  "web-systems": LayoutDashboard,
};

function OfferingRow({ offering }: { offering: ServiceOffering }) {
  const Icon = OFFERING_ICONS[offering.id];

  return (
    <article className="flex flex-col gap-3.5 p-5 md:p-6">
      <div className="bg-brand-accent/10 text-brand-accent border-brand-accent/35 inline-flex size-10 items-center justify-center rounded-lg border">
        <Icon className="size-5" aria-hidden />
      </div>
      <div className="space-y-2">
        <h3 className="font-heading text-foreground text-xl font-semibold tracking-tight">
          {offering.title}
        </h3>
        <p className="text-muted-foreground text-[15px] leading-relaxed">
          {offering.description}
        </p>
      </div>
      <ul className="text-foreground space-y-2 text-[14px] leading-relaxed">
        {offering.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2">
            <span
              className="bg-brand-accent mt-2 size-1.5 shrink-0 rounded-full"
              aria-hidden
            />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      <p className="text-brand-accent border-border/40 border-t pt-3.5 text-[12px] font-medium tracking-wide">
        {offering.stack}
      </p>
    </article>
  );
}

export function ServicesOfferings() {
  return (
    <section
      aria-labelledby="services-offerings-heading"
      className={servicesSectionClass}
    >
      <SectionHeading id="services-offerings-heading" className="mb-6 md:mb-8">
        {servicesOfferingsHeading}
      </SectionHeading>

      <Card className="border-border/50 bg-muted/90 ring-border/30 hover:border-brand-accent/40 overflow-hidden rounded-2xl border shadow-sm ring-1 transition-[border-color,box-shadow] duration-200 hover:shadow-[0_0_0_1px_rgba(76,215,246,0.14)] motion-reduce:transition-none md:rounded-3xl">
        <CardContent className="p-0">
          <div className="divide-border/40 divide-y">
            {servicesOfferings.map((offering) => (
              <OfferingRow key={offering.id} offering={offering} />
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
