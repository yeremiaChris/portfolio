"use client";

import {
  m,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useCallback, useRef, useState } from "react";

import {
  projectsFeaturedSpring,
  projectsMagneticMaxPx,
  projectsMagneticSpring,
  projectsPanTransition,
  projectsParallaxMaxPx,
} from "@/lib/projects-motion";
import {
  featuredScreenshotMobileHeight,
  featuredScreenshotMobileWidth,
  getFeaturedScreenshotMobileSrc,
} from "@/lib/projects-screenshots";
import { cn } from "@/lib/utils";

import { usePointerFine } from "@/components/projects/usePointerFine";

type RevealSide = "left" | "right";

type ProjectBrowserFrameMotionProps = {
  src: string;
  alt: string;
  revealFrom: RevealSide;
  revealFromStart?: boolean;
  deferMobileSrc?: boolean;
  className?: string;
};

export function ProjectBrowserFrameMotion({
  src,
  alt,
  revealFrom,
  revealFromStart = false,
  deferMobileSrc = false,
  className,
}: ProjectBrowserFrameMotionProps) {
  const mobileSrc = getFeaturedScreenshotMobileSrc(src);
  const reducedMotion = useReducedMotion();
  const pointerFine = usePointerFine();
  const frameRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  const springX = useSpring(magneticX, projectsMagneticSpring);
  const springY = useSpring(magneticY, projectsMagneticSpring);

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: revealFromStart
      ? ["start 0.98", "start 0.62"]
      : ["start 0.92", "start 0.38"],
  });

  const clipProgress = useSpring(scrollYProgress, projectsFeaturedSpring);

  const clipPath = useTransform(clipProgress, (value) => {
    if (reducedMotion) {
      return "inset(0% 0% 0% 0%)";
    }
    const open = Math.min(1, Math.max(0, value));
    if (revealFrom === "left") {
      return `inset(0% ${(1 - open) * 100}% 0% 0%)`;
    }
    return `inset(0% 0% 0% ${(1 - open) * 100}%)`;
  });

  const { scrollYProgress: parallaxProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(
    parallaxProgress,
    [0, 1],
    [projectsParallaxMaxPx, -projectsParallaxMaxPx],
  );

  const shellX = useMotionTemplate`translate3d(${springX}px, ${springY}px, 0)`;
  const parallaxEnabled = pointerFine && !reducedMotion;
  const magneticEnabled = pointerFine && !reducedMotion;
  const panEnabled = hovered && pointerFine && !reducedMotion;

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!magneticEnabled || !shellRef.current) return;
      const rect = shellRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (event.clientX - cx) / (rect.width / 2);
      const dy = (event.clientY - cy) / (rect.height / 2);
      magneticX.set(dx * projectsMagneticMaxPx);
      magneticY.set(dy * projectsMagneticMaxPx);
    },
    [magneticEnabled, magneticX, magneticY],
  );

  const resetMagnetic = useCallback(() => {
    magneticX.set(0);
    magneticY.set(0);
    setHovered(false);
  }, [magneticX, magneticY]);

  return (
    <div ref={frameRef} className={cn("relative min-w-0", className)}>
      <div
        className="bg-brand-accent/14 pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl md:blur-[80px]"
        aria-hidden
      />
      <m.div
        ref={shellRef}
        className="relative w-full"
        style={magneticEnabled ? { translate: shellX } : undefined}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={resetMagnetic}
        onPointerMove={handlePointerMove}
      >
        <m.div
          className="bg-muted ring-border/40 overflow-hidden rounded-2xl shadow-xl ring-1"
          style={{ clipPath }}
        >
          <div
            className="border-border/40 bg-background/80 flex items-center gap-1.5 border-b px-3 py-2.5"
            aria-hidden
          >
            <span className="size-2 rounded-full bg-[#ff5f57]/90" />
            <span className="size-2 rounded-full bg-[#febc2e]/90" />
            <span className="size-2 rounded-full bg-[#28c840]/90" />
            <span className="bg-secondary/80 ml-2 h-2 max-w-[40%] flex-1 rounded-full" />
          </div>
          <div className="relative aspect-[8/5] w-full overflow-hidden bg-[#070b10]">
            <m.div
              className="absolute inset-0 size-full"
              style={parallaxEnabled ? { y: parallaxY } : undefined}
            >
              <m.div
                className="size-full"
                initial={false}
                animate={panEnabled ? { y: ["0%", "-11%", "0%"] } : { y: "0%" }}
                transition={panEnabled ? projectsPanTransition : undefined}
              >
                <picture className="block size-full">
                  <source
                    media="(min-width: 768px)"
                    srcSet={src}
                    type="image/webp"
                  />
                  {deferMobileSrc ? (
                    <img
                      data-deferred-shot=""
                      data-src={mobileSrc}
                      alt={alt}
                      width={featuredScreenshotMobileWidth}
                      height={featuredScreenshotMobileHeight}
                      decoding="async"
                      loading="lazy"
                      fetchPriority="low"
                      className="size-full object-cover object-top"
                    />
                  ) : (
                    <img
                      src={mobileSrc}
                      alt={alt}
                      width={featuredScreenshotMobileWidth}
                      height={featuredScreenshotMobileHeight}
                      decoding="async"
                      loading="lazy"
                      fetchPriority="low"
                      className="size-full object-cover object-top"
                    />
                  )}
                </picture>
              </m.div>
            </m.div>
          </div>
        </m.div>
      </m.div>
    </div>
  );
}
