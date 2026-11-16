"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { ServicesHeroCopyMotion } from "@/components/services/ServicesHeroCopyMotion";
import { ServicesHeroVisual } from "@/components/services/ServicesHeroVisual";
import { SERVICES_STATIC_LAYOUT } from "@/components/services/servicesSurface";

export function ServicesHeroLayout() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const reduced = reducedMotion === true || SERVICES_STATIC_LAYOUT;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const visualY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const visualOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const visualClassName =
    "flex w-full justify-center lg:col-span-5 lg:justify-end";
  const visual = (
    <ServicesHeroVisual className="w-full max-w-[320px] lg:max-w-[420px]" />
  );

  return (
    <section ref={sectionRef} className="relative w-full pb-10 md:pb-14">
      <div
        className="bg-primary/5 pointer-events-none absolute top-0 left-1/4 -z-10 size-[28rem] rounded-full blur-3xl md:blur-[140px]"
        aria-hidden
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="min-w-0 lg:col-span-7 lg:max-w-2xl">
          <ServicesHeroCopyMotion />
        </div>
        {reduced ? (
          <div className={visualClassName}>{visual}</div>
        ) : (
          <m.div
            className={visualClassName}
            style={{ y: visualY, opacity: visualOpacity }}
          >
            {visual}
          </m.div>
        )}
      </div>
    </section>
  );
}
