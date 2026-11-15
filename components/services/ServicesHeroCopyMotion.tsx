"use client";

import { MessageCircle } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";

import { buttonVariants } from "@/components/ui/button-variants";
import { servicesHeroLineTransition } from "@/lib/services-motion";
import { servicesHero, servicesHeroLines } from "@/lib/services";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

function subscribeClientEmpty() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function ServicesHeroCopyMotion() {
  const reducedMotion = useReducedMotion();
  const reduced = reducedMotion === true;
  const mounted = useSyncExternalStore(
    subscribeClientEmpty,
    getClientSnapshot,
    getServerSnapshot,
  );
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!mounted || reduced) {
      return;
    }
    let frame = 0;
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => setRevealed(true));
    });
    return () => cancelAnimationFrame(frame);
  }, [mounted, reduced]);

  const showLines = !mounted || reduced || revealed;

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
                style={{ opacity: 1 }}
                animate={{ y: showLines ? 0 : "108%" }}
                transition={
                  reduced || !mounted
                    ? { duration: 0 }
                    : servicesHeroLineTransition(index)
                }
              >
                {line}
              </m.span>
            </span>
          ))}
        </span>
      </h1>
      <m.div
        className="mt-5 flex flex-wrap items-center gap-2 md:mt-6"
        style={{ opacity: 1 }}
        animate={{
          y: showLines ? 0 : 14,
        }}
        transition={
          reduced || !mounted
            ? { duration: 0 }
            : { duration: 0.55, delay: 0.42, ease: [0.16, 1, 0.3, 1] }
        }
      >
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
      </m.div>
    </div>
  );
}
