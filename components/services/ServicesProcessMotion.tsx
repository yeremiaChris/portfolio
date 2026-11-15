"use client";

import Link from "next/link";
import {
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";

import {
  aboutBentoCardClass,
  aboutStepNumberClass,
} from "@/components/about/aboutSurface";
import { Reveal } from "@/components/motion/Reveal";
import {
  servicesHowItWorksHeading,
  servicesHowItWorksSteps,
  servicesLabTeaser,
  servicesPricingLine,
} from "@/lib/services";
import { cn } from "@/lib/utils";

export function ServicesProcessMotion() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const reduced = Boolean(reducedMotion);
  const [litCount, setLitCount] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.88", "end 0.45"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const activeLitCount = reduced ? 3 : litCount;

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (reduced) {
      return;
    }
    if (value < 0.12) {
      setLitCount(0);
    } else if (value < 0.45) {
      setLitCount(1);
    } else if (value < 0.78) {
      setLitCount(2);
    } else {
      setLitCount(3);
    }
  });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="services-process-heading"
      className="mb-8 w-full md:mb-10"
    >
      <Reveal className="mb-5 max-w-2xl md:mb-6">
        <h2
          id="services-process-heading"
          className="font-heading text-foreground text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {servicesHowItWorksHeading}
        </h2>
      </Reveal>

      <div className="relative">
        <m.div
          aria-hidden
          className="bg-brand-accent/35 absolute top-[1.35rem] right-[12%] left-[12%] z-0 hidden h-px origin-left md:block"
          style={{ scaleX: reduced ? 1 : lineScale }}
        />
        <m.div
          aria-hidden
          className="bg-brand-accent/35 absolute top-8 bottom-8 left-[1.15rem] z-0 w-px origin-top md:hidden"
          style={{ scaleY: reduced ? 1 : lineScale }}
        />

        <ol className="relative z-10 flex flex-col gap-3 md:grid md:grid-cols-3 md:gap-4">
          {servicesHowItWorksSteps.map((step, index) => (
            <li key={step}>
              <article
                className={cn(aboutBentoCardClass, "h-full pl-10 md:pl-0")}
              >
                <h3 className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      aboutStepNumberClass,
                      "transition-[box-shadow,background-color,border-color] duration-300 motion-reduce:transition-none",
                      index < activeLitCount &&
                        "border-brand-accent bg-brand-accent/15 shadow-[0_0_14px_rgb(76_215_246_/_0.4)]",
                    )}
                  >
                    {index + 1}
                  </span>
                  <span className="font-heading text-foreground text-base font-semibold tracking-tight sm:text-lg">
                    {step}
                  </span>
                </h3>
              </article>
            </li>
          ))}
        </ol>
      </div>

      <Reveal className="mt-5 space-y-2.5 md:mt-6">
        <p className="text-foreground text-[15px] font-medium sm:text-base">
          {servicesPricingLine}
        </p>
        <p className="text-muted-foreground text-[13px] leading-relaxed sm:text-[14px]">
          {servicesLabTeaser.beforeLink}
          <Link
            href={servicesLabTeaser.linkHref}
            className="text-brand-accent hover:text-brand-accent/85 underline underline-offset-4 transition-colors duration-200 motion-reduce:transition-none"
          >
            {servicesLabTeaser.linkLabel}
          </Link>
          {servicesLabTeaser.afterLink}
        </p>
      </Reveal>
    </section>
  );
}
