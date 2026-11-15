"use client";

import { MessageCircle } from "lucide-react";
import { m, useReducedMotion } from "motion/react";

import { buttonVariants } from "@/components/ui/button-variants";
import { motionEase, motionPresetConfig } from "@/lib/motion-tokens";
import { servicesHero, servicesHeroLines } from "@/lib/services";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

function lineTransition(index: number, reduced: boolean) {
  return reduced
    ? { duration: 0 }
    : {
        duration: motionPresetConfig.calm.revealDurationMount,
        ease: motionEase,
        delay: index * 0.07,
      };
}

export function ServicesHeroCopyMotion() {
  const reducedMotion = useReducedMotion();
  const reduced = Boolean(reducedMotion);

  return (
    <div className="min-w-0">
      <h1 className="font-heading text-foreground text-3xl sm:text-4xl lg:text-[2.65rem] lg:leading-tight">
        <span className="sr-only">{servicesHero.title}</span>
        <span aria-hidden className="flex flex-col">
          {servicesHeroLines.map((line, index) => (
            <span
              key={line}
              className="block overflow-hidden py-[0.04em] leading-[1.2]"
            >
              <m.span
                className="block"
                initial={reduced ? false : { y: "110%" }}
                animate={{ y: 0 }}
                transition={lineTransition(index, reduced)}
                style={{ opacity: 1 }}
              >
                {line}
              </m.span>
            </span>
          ))}
        </span>
      </h1>
      <div className="mt-5 flex flex-wrap items-center gap-2 md:mt-6">
        <a
          href={site.links.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: "default", size: "default" }),
            "h-11 gap-2 px-5 text-[14px] font-semibold shadow-[0_0_16px_rgba(76,215,246,0.22)]",
          )}
        >
          <MessageCircle className="size-4 shrink-0" aria-hidden />
          {servicesHero.whatsappCtaLabel}
        </a>
      </div>
    </div>
  );
}
