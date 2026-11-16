"use client";

import { MessageCircle } from "lucide-react";
import { m, useReducedMotion } from "motion/react";

import {
  servicesEase,
  servicesHeroTitleWords,
} from "@/components/services/servicesMotion";
import { servicesSectionClass } from "@/components/services/servicesSurface";
import { buttonVariants } from "@/components/ui/button-variants";
import { servicesHero } from "@/lib/services";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const wordStagger = 0.055;

export function ServicesHero() {
  const reducedMotion = useReducedMotion();
  const titleWords = servicesHeroTitleWords(servicesHero.title);
  const followDelay = titleWords.length * wordStagger + 0.14;
  const ctaDelay = followDelay + 0.1;

  const staticBlock = (
    <>
      <div className="flex flex-col gap-2 md:gap-2.5">
        <h1 className="font-heading text-foreground text-2xl leading-tight font-semibold tracking-tight sm:text-3xl lg:text-4xl">
          {servicesHero.title}
        </h1>
        <p className="text-muted-foreground text-[15px] leading-relaxed sm:text-base">
          {servicesHero.supportingLine}
        </p>
      </div>
      <a
        href={site.links.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          buttonVariants({ variant: "default", size: "default" }),
          "inline-flex h-10 w-fit gap-2 px-4 text-[13px] font-semibold",
        )}
      >
        <MessageCircle className="size-4 shrink-0" aria-hidden />
        {servicesHero.whatsappCtaLabel}
      </a>
    </>
  );

  return (
    <section className={cn(servicesSectionClass, "w-full max-w-2xl")}>
      <div className="flex flex-col gap-4 md:gap-5">
        {reducedMotion ? (
          staticBlock
        ) : (
          <>
            <div className="flex flex-col gap-2 md:gap-2.5">
              <h1 className="font-heading text-foreground text-2xl leading-tight font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                {titleWords.map((word, index) => (
                  <m.span
                    key={`${word}-${index}`}
                    className="mr-[0.28em] inline-block last:mr-0"
                    initial={{ y: 14, opacity: 1 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.42,
                      ease: servicesEase,
                      delay: index * wordStagger,
                    }}
                  >
                    {word}
                  </m.span>
                ))}
              </h1>
              <m.p
                className="text-muted-foreground text-[15px] leading-relaxed sm:text-base"
                initial={{ y: 12, opacity: 0.25 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.45,
                  ease: servicesEase,
                  delay: followDelay,
                }}
              >
                {servicesHero.supportingLine}
              </m.p>
            </div>
            <m.a
              href={site.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "default", size: "default" }),
                "inline-flex h-10 w-fit gap-2 px-4 text-[13px] font-semibold",
              )}
              initial={{ y: 12, opacity: 0.25 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.45,
                ease: servicesEase,
                delay: ctaDelay,
              }}
            >
              <MessageCircle className="size-4 shrink-0" aria-hidden />
              {servicesHero.whatsappCtaLabel}
            </m.a>
          </>
        )}
      </div>
    </section>
  );
}
