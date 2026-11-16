"use client";

import { m, useReducedMotion } from "motion/react";

import { ServiceOfferingCardMotion } from "@/components/services/ServiceOfferingCardMotion";
import {
  SERVICES_STATIC_LAYOUT,
  servicesSectionClass,
} from "@/components/services/servicesSurface";
import {
  servicesCardRevealOffsetPx,
  servicesCardRevealTransition,
  servicesMotionViewport,
} from "@/lib/services-motion";
import { servicesOfferings } from "@/lib/services";

export function ServicesOfferingsMotion() {
  const reducedMotion = useReducedMotion();
  const reduced = reducedMotion === true || SERVICES_STATIC_LAYOUT;

  return (
    <section aria-label="Services" className={servicesSectionClass}>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {servicesOfferings.map((offering, index) =>
          reduced ? (
            <div key={offering.id}>
              <ServiceOfferingCardMotion offering={offering} />
            </div>
          ) : (
            <m.div
              key={offering.id}
              initial={{ y: servicesCardRevealOffsetPx, opacity: 0.72 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={servicesMotionViewport}
              transition={servicesCardRevealTransition(index)}
            >
              <ServiceOfferingCardMotion offering={offering} />
            </m.div>
          ),
        )}
      </div>
    </section>
  );
}
