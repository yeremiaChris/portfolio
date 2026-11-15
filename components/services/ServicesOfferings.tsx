import { ServiceOfferingCardMotion } from "@/components/services/ServiceOfferingCardMotion";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { servicesOfferings } from "@/lib/services";

export function ServicesOfferings() {
  return (
    <section aria-label="Services" className="mb-8 w-full md:mb-10">
      <Stagger className="grid grid-cols-1 gap-3.5 md:grid-cols-2 md:gap-5">
        {servicesOfferings.map((offering) => (
          <StaggerItem key={offering.id}>
            <ServiceOfferingCardMotion offering={offering} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
