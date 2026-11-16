"use client";

import { MessageCircle } from "lucide-react";
import { m, useReducedMotion } from "motion/react";

import {
  servicesHeroMountContainer,
  servicesHeroMountItem,
} from "@/components/services/servicesReveal";
import { servicesSectionClass } from "@/components/services/servicesSurface";
import { buttonVariants } from "@/components/ui/button-variants";
import { servicesHero } from "@/lib/services";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const whatsappClassName = cn(
  buttonVariants({ variant: "default", size: "default" }),
  "inline-flex h-10 w-fit gap-2 px-4 text-[13px] font-semibold",
);

export function ServicesHero() {
  const reducedMotion = useReducedMotion();

  return (
    <section className={cn(servicesSectionClass, "w-full max-w-2xl")}>
      <h1 className="font-heading text-foreground text-2xl leading-tight font-semibold tracking-tight sm:text-3xl lg:text-4xl">
        {servicesHero.title}
      </h1>
      {reducedMotion ? (
        <div className="mt-4 flex flex-col gap-4 md:mt-5 md:gap-5">
          <p className="text-muted-foreground text-[15px] leading-relaxed sm:text-base">
            {servicesHero.supportingLine}
          </p>
          <a
            href={site.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={whatsappClassName}
          >
            <MessageCircle className="size-4 shrink-0" aria-hidden />
            {servicesHero.whatsappCtaLabel}
          </a>
        </div>
      ) : (
        <m.div
          className="mt-4 flex flex-col gap-4 md:mt-5 md:gap-5"
          initial="hidden"
          animate="visible"
          variants={servicesHeroMountContainer}
        >
          <m.p
            variants={servicesHeroMountItem}
            className="text-muted-foreground text-[15px] leading-relaxed sm:text-base"
          >
            {servicesHero.supportingLine}
          </m.p>
          <m.a
            variants={servicesHeroMountItem}
            href={site.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={whatsappClassName}
          >
            <MessageCircle className="size-4 shrink-0" aria-hidden />
            {servicesHero.whatsappCtaLabel}
          </m.a>
        </m.div>
      )}
    </section>
  );
}
