"use client";

import Link from "next/link";
import { Globe, LayoutDashboard } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useCallback, useRef, type PointerEvent } from "react";

import {
  aboutBentoCardClass,
  aboutBentoChipClass,
} from "@/components/about/aboutSurface";
import {
  getServiceOfferingProjectHref,
  getServiceOfferingProjectShortName,
  type ServiceOffering,
  type ServiceOfferingId,
} from "@/lib/services";
import { cn } from "@/lib/utils";

import { usePointerFine } from "@/components/projects/usePointerFine";

const OFFERING_ICONS: Record<ServiceOfferingId, typeof Globe> = {
  websites: Globe,
  "web-systems": LayoutDashboard,
};

type ServiceOfferingCardMotionProps = {
  offering: ServiceOffering;
};

export function ServiceOfferingCardMotion({
  offering,
}: ServiceOfferingCardMotionProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const pointerFine = usePointerFine();
  const reducedMotion = useReducedMotion();
  const spotlightEnabled = pointerFine && !reducedMotion;

  const projectHref = getServiceOfferingProjectHref(offering);
  const projectShortName = getServiceOfferingProjectShortName(offering);
  const Icon = OFFERING_ICONS[offering.id];

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
        "service-offering-shell rounded-2xl",
        spotlightEnabled && "service-offering-shell--active",
      )}
      onPointerMove={updateSpotlight}
      onPointerLeave={clearSpotlight}
    >
      <article
        className={cn(
          aboutBentoCardClass,
          "flex h-full min-h-[17.5rem] flex-col justify-between",
        )}
      >
        <div className="space-y-3.5">
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

        <div className="border-border/40 mt-5 flex flex-col gap-2.5 border-t pt-3.5">
          <p className="text-brand-accent text-[12px] font-medium tracking-wide">
            {offering.stack}
          </p>
          {projectHref && projectShortName ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-muted-foreground text-[10px] font-medium tracking-[0.14em] uppercase">
                Recent work
              </span>
              <Link
                href={projectHref}
                aria-label={`${projectShortName} project`}
                className={cn(
                  aboutBentoChipClass,
                  "text-brand-accent hover:border-brand-accent/45 hover:text-brand-accent/90 transition-colors duration-200 motion-reduce:transition-none",
                )}
              >
                {projectShortName}
              </Link>
            </div>
          ) : null}
        </div>
      </article>
    </div>
  );
}
