"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { ServicesHeroCopyMotion } from "@/components/services/ServicesHeroCopyMotion";
import { ServicesHeroVisual } from "@/components/services/ServicesHeroVisual";

export function ServicesHeroLayout() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const reduced = reducedMotion === true;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const visualY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const visualOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section ref={sectionRef} className="relative w-full pb-8 md:pb-10">
      <div
        className="bg-primary/5 pointer-events-none absolute top-0 left-1/4 -z-10 size-[28rem] rounded-full blur-3xl md:blur-[140px]"
        aria-hidden
      />
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-10 xl:gap-12">
        <ServicesHeroCopyMotion />
        <m.div
          className="hidden w-full lg:flex lg:items-center lg:justify-end"
          style={
            reduced
              ? undefined
              : {
                  y: visualY,
                  opacity: visualOpacity,
                }
          }
        >
          <ServicesHeroVisual className="w-full" />
        </m.div>
      </div>
      <ServicesHeroVisual className="mx-auto mt-2 hidden w-full max-w-[300px] sm:block sm:max-w-[320px] lg:hidden" />
    </section>
  );
}
