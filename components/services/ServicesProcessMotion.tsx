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

import { aboutStepNumberClass } from "@/components/about/aboutSurface";
import {
  servicesHowItWorksHeading,
  servicesHowItWorksSteps,
  servicesLabTeaser,
  servicesPricingLine,
} from "@/lib/services";
import { cn } from "@/lib/utils";

const STEP_BADGE_ROW_CLASS = aboutStepNumberClass;

export function ServicesProcessMotion() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const reduced = reducedMotion === true;
  const [litCount, setLitCount] = useState(reduced ? 3 : 0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.85", "end 0.35"],
  });

  const lineScale = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);
  const activeLitCount = reduced ? 3 : litCount;

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (reduced) {
      return;
    }
    if (value < 0.15) {
      setLitCount(0);
    } else if (value < 0.42) {
      setLitCount(1);
    } else if (value < 0.72) {
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
      <h2
        id="services-process-heading"
        className="font-heading text-foreground mb-5 text-2xl font-semibold tracking-tight sm:text-3xl md:mb-6"
      >
        {servicesHowItWorksHeading}
      </h2>

      <div ref={trackRef} className="relative">
        <m.div
          aria-hidden
          className="bg-brand-accent/40 pointer-events-none absolute top-[1.125rem] right-[16.666%] left-[16.666%] z-0 hidden h-0.5 origin-left md:block"
          style={{ scaleX: reduced ? 1 : lineScale }}
        />
        <m.div
          aria-hidden
          className="bg-brand-accent/40 pointer-events-none absolute top-[1.125rem] bottom-[1.125rem] left-5 z-0 w-0.5 origin-top md:hidden"
          style={{ scaleY: reduced ? 1 : lineScale }}
        />

        <ol className="relative z-10 grid grid-cols-1 gap-3 pl-9 md:grid-cols-3 md:gap-4 md:pl-0">
          {servicesHowItWorksSteps.map((step, index) => (
            <li key={step} className="min-h-0">
              <article
                className={cn(
                  "border-border/50 bg-muted/90 flex h-full min-h-[7.25rem] flex-col rounded-2xl border p-4 transition-[border-color,box-shadow] duration-200 motion-reduce:transition-none md:min-h-[7.5rem] md:p-4",
                  "hover:border-brand-accent/35",
                )}
              >
                <h3 className="flex h-full flex-col items-start gap-3">
                  <span
                    className={cn(
                      STEP_BADGE_ROW_CLASS,
                      "shrink-0 transition-[box-shadow,background-color,border-color] duration-500 motion-reduce:transition-none",
                      index < activeLitCount &&
                        "border-brand-accent bg-brand-accent/20 shadow-[0_0_16px_rgb(76_215_246_/_0.45)]",
                    )}
                  >
                    {index + 1}
                  </span>
                  <span className="font-heading text-foreground text-[15px] leading-snug font-semibold tracking-tight sm:text-base">
                    {step}
                  </span>
                </h3>
              </article>
            </li>
          ))}
        </ol>

        <div className="border-border/50 bg-muted/60 mt-4 flex flex-col gap-2 rounded-2xl border px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 md:mt-5">
          <p className="text-foreground text-[14px] font-medium sm:text-[15px]">
            {servicesPricingLine}
          </p>
          <p className="text-muted-foreground text-[12px] leading-relaxed sm:text-right sm:text-[13px]">
            {servicesLabTeaser.beforeLink}
            <Link
              href={servicesLabTeaser.linkHref}
              className="text-brand-accent hover:text-brand-accent/85 underline underline-offset-4 transition-colors duration-200 motion-reduce:transition-none"
            >
              {servicesLabTeaser.linkLabel}
            </Link>
            {servicesLabTeaser.afterLink}
          </p>
        </div>
      </div>
    </section>
  );
}
