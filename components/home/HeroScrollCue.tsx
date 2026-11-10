"use client";

import { useEffect, useState } from "react";
import { ChevronDownIcon } from "lucide-react";

import { motionHeroScrollCue } from "@/lib/motion-tokens";
import { scrollDocumentToElement } from "@/lib/programmatic-scroll";
import { cn } from "@/lib/utils";

type HeroScrollCueProps = {
  targetId: string;
  className?: string;
};

export function HeroScrollCue({ targetId, className }: HeroScrollCueProps) {
  const [opacity, setOpacity] = useState(1);
  const [interactive, setInteractive] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const section = document.getElementById("overview");
    if (!section) {
      return;
    }

    const update = () => {
      const rect = section.getBoundingClientRect();
      const fadeSpan = Math.max(
        rect.height * motionHeroScrollCue.scrollFadeEnd,
        1,
      );
      const progress = Math.min(1, Math.max(0, -rect.top / fadeSpan));
      const nextOpacity = 1 - progress;
      setOpacity(nextOpacity);
      setInteractive(nextOpacity > 0.08);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to production work"
      aria-hidden={!interactive}
      tabIndex={interactive ? 0 : -1}
      style={{ opacity }}
      className={cn(
        "hero-scroll-cue text-muted-foreground hover:text-brand-accent absolute bottom-10 left-1/2 z-20 hidden -translate-x-1/2 items-center justify-center rounded-full p-2 transition-colors lg:flex",
        !interactive && "pointer-events-none",
        reducedMotion && "hero-scroll-cue--static",
        className,
      )}
      onClick={() => {
        if (!interactive) {
          return;
        }
        const target = document.getElementById(targetId);
        if (target) {
          scrollDocumentToElement(target, -8);
        }
      }}
    >
      <span aria-hidden className="flex flex-col items-center gap-1">
        <span
          aria-hidden
          className="hero-scroll-cue-bar bg-brand-accent/40 block h-6 w-px origin-top rounded-full"
        />
        <span aria-hidden className="hero-scroll-cue-chevron inline-flex">
          <ChevronDownIcon className="size-4" strokeWidth={1.75} />
        </span>
      </span>
    </button>
  );
}
