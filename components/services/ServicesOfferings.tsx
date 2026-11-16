import { ServiceOfferingCard } from "@/components/services/ServiceOfferingCard";
import {
  servicesEyebrowBadgeClass,
  servicesSectionClass,
} from "@/components/services/servicesSurface";
import { Badge } from "@/components/ui/badge";
import { servicesOfferings } from "@/lib/services";
import { cn } from "@/lib/utils";

const OFFERING_COL_SPAN = {
  websites: "lg:col-span-5",
  "web-systems": "lg:col-span-7",
} as const;

export function ServicesOfferings() {
  return (
    <section
      aria-labelledby="services-offerings-heading"
      className={servicesSectionClass}
    >
      <header
        id="services-offerings-heading"
        className="mx-auto mb-6 max-w-2xl text-center md:mb-8"
      >
        <Badge
          variant="secondary"
          className={cn(servicesEyebrowBadgeClass, "mx-auto")}
        >
          <span
            className="bg-brand-accent size-2 shrink-0 rounded-full"
            aria-hidden
          />
          Services
        </Badge>
      </header>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
        {servicesOfferings.map((offering) => (
          <div
            key={offering.id}
            className={cn(
              "flex h-full min-h-0",
              OFFERING_COL_SPAN[offering.id],
            )}
          >
            <ServiceOfferingCard offering={offering} className="w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}
