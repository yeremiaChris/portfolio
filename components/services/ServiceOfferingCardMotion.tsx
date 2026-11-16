"use client";

import { useReducedMotion } from "motion/react";
import { useCallback, useRef, type PointerEvent } from "react";

import { ServiceOfferingCard } from "@/components/services/ServiceOfferingCard";
import { SERVICES_STATIC_LAYOUT } from "@/components/services/servicesSurface";
import type { ServiceOffering } from "@/lib/services";
import { cn } from "@/lib/utils";

import { usePointerFine } from "@/components/projects/usePointerFine";

type ServiceOfferingCardMotionProps = {
  offering: ServiceOffering;
};

export function ServiceOfferingCardMotion({
  offering,
}: ServiceOfferingCardMotionProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const pointerFine = usePointerFine();
  const reducedMotion = useReducedMotion();
  const spotlightEnabled =
    !SERVICES_STATIC_LAYOUT && pointerFine && !reducedMotion;

  const updateSpotlight = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!spotlightEnabled || !shellRef.current) return;
      const rect = shellRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      shellRef.current.style.setProperty("--spotlight-x", `${x}%`);
      shellRef.current.style.setProperty("--spotlight-y", `${y}%`);
    },
    [spotlightEnabled],
  );

  const clearSpotlight = useCallback(() => {
    if (!shellRef.current) return;
    shellRef.current.style.setProperty("--spotlight-x", "50%");
    shellRef.current.style.setProperty("--spotlight-y", "40%");
  }, []);

  return (
    <div
      ref={shellRef}
      className={cn(
        "service-offering-shell rounded-3xl",
        spotlightEnabled && "service-offering-shell--active",
      )}
      onPointerMove={spotlightEnabled ? updateSpotlight : undefined}
      onPointerLeave={spotlightEnabled ? clearSpotlight : undefined}
    >
      <ServiceOfferingCard offering={offering} />
    </div>
  );
}
