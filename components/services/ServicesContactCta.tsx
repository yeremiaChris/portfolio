"use client";

import { m, useReducedMotion } from "motion/react";

import {
  ContactCta,
  servicesContactActions,
  type ContactCtaProps,
} from "@/components/home/ContactCta";
import { servicesCtaEnterTransition } from "@/lib/services-motion";
import { cn } from "@/lib/utils";

type ServicesContactCtaProps = Pick<
  ContactCtaProps,
  "id" | "eyebrow" | "title" | "description" | "className" | "panelClassName"
>;

export function ServicesContactCta({
  id = "services-contact",
  eyebrow = "Services",
  title,
  description = "",
  className,
  panelClassName,
}: ServicesContactCtaProps) {
  const reducedMotion = useReducedMotion();
  const reduced = reducedMotion === true;

  return (
    <div className={cn("relative w-full", className)}>
      {!reduced ? (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-2 -z-10 rounded-[1.85rem] bg-[radial-gradient(ellipse_80%_70%_at_50%_100%,rgb(76_215_246_/_0.22),transparent_72%)]"
        />
      ) : null}
      <m.div
        className="w-full"
        initial={reduced ? false : { opacity: 0.88, scale: 0.98 }}
        whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
        viewport={
          reduced ? undefined : { once: true, amount: 0.35, margin: "0px" }
        }
        transition={reduced ? { duration: 0 } : servicesCtaEnterTransition}
        style={{ transformOrigin: "center center" }}
      >
        <ContactCta
          id={id}
          withContainer={false}
          className="mb-0"
          panelClassName={panelClassName}
          eyebrow={eyebrow}
          title={title}
          description={description}
          actions={servicesContactActions()}
        />
      </m.div>
    </div>
  );
}
