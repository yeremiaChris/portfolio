import { ServiceOfferingCard } from "@/components/services/ServiceOfferingCard";
import { servicesSectionClass } from "@/components/services/servicesSurface";
import { servicesOfferings } from "@/lib/services";

export function ServicesOfferings() {
  return (
    <section aria-label="Services" className={servicesSectionClass}>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {servicesOfferings.map((offering) => (
          <ServiceOfferingCard key={offering.id} offering={offering} />
        ))}
      </div>
    </section>
  );
}
