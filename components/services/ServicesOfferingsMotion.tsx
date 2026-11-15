"use client";

import { m, useReducedMotion } from "motion/react";

import { ServiceOfferingCardMotion } from "@/components/services/ServiceOfferingCardMotion";
import {
  servicesCardRevealOffsetPx,
  servicesCardRevealTransition,
  servicesMotionViewport,
} from "@/lib/services-motion";
import { servicesOfferings } from "@/lib/services";

export function ServicesOfferingsMotion() {
  const reducedMotion = useReducedMotion();
  const reduced = reducedMotion === true;

  return (
    <section aria-label="Services" className="mb-8 w-full md:mb-10">
      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 md:gap-5">
        {servicesOfferings.map((offering, index) => (
          <m.div
            key={offering.id}
            initial={
              reduced ? false : { y: servicesCardRevealOffsetPx, opacity: 0.72 }
            }
            whileInView={reduced ? undefined : { y: 0, opacity: 1 }}
            viewport={reduced ? undefined : servicesMotionViewport}
            transition={
              reduced ? { duration: 0 } : servicesCardRevealTransition(index)
            }
          >
            <ServiceOfferingCardMotion offering={offering} />
          </m.div>
        ))}
      </div>
    </section>
  );
}
