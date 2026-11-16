import Link from "next/link";
import { Globe, LayoutDashboard } from "lucide-react";

import { servicesSectionClass } from "@/components/services/servicesSurface";
import { SectionHeading } from "@/components/typography/SectionTypography";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  getServiceOfferingProjectHref,
  getServiceOfferingProjectShortName,
  servicesOfferings,
  servicesOfferingsHeading,
  type ServiceOffering,
  type ServiceOfferingId,
} from "@/lib/services";
import { cn } from "@/lib/utils";

const OFFERING_ICONS: Record<ServiceOfferingId, typeof Globe> = {
  websites: Globe,
  "web-systems": LayoutDashboard,
};

function OfferingRow({ offering }: { offering: ServiceOffering }) {
  const projectHref = getServiceOfferingProjectHref(offering);
  const projectShortName = getServiceOfferingProjectShortName(offering);
  const Icon = OFFERING_ICONS[offering.id];

  return (
    <article className="p-5 md:p-6 lg:grid lg:grid-cols-12 lg:items-start lg:gap-8">
      <div className="flex min-w-0 flex-col gap-3.5 lg:col-span-7">
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
      </div>
      <div className="border-border/40 mt-5 flex flex-col gap-2.5 border-t pt-3.5 lg:col-span-5 lg:mt-0 lg:border-t-0 lg:pt-0">
        <p className="text-brand-accent text-[12px] font-medium tracking-wide">
          {offering.stack}
        </p>
        {projectHref && projectShortName ? (
          <div className="flex flex-wrap items-center gap-2 lg:flex-col lg:items-start">
            <Badge
              variant="secondary"
              className="text-muted-foreground label-caps bg-transparent px-0 text-[10px] tracking-[0.14em]"
            >
              Recent work
            </Badge>
            <Badge
              variant="outline"
              render={
                <Link
                  href={projectHref}
                  aria-label={`${projectShortName} project`}
                />
              }
              className={cn(
                "text-brand-accent hover:border-brand-accent/45 hover:text-brand-accent/90 rounded-full px-2.5 py-1 text-[12px] font-medium sm:px-3 sm:text-[13px]",
                "motion-reduce:transition-none",
              )}
            >
              {projectShortName}
            </Badge>
          </div>
        ) : null}
      </div>
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
