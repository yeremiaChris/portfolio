"use client";

import Image from "next/image";
import { m, useReducedMotion } from "motion/react";

import { motionDuration, motionEase } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

type ProjectBrowserFrameProps = {
  src: string;
  alt: string;
  tilt?: "left" | "right";
  priority?: boolean;
  className?: string;
};

export function ProjectBrowserFrame({
  src,
  alt,
  tilt = "left",
  priority = false,
  className,
}: ProjectBrowserFrameProps) {
  const reducedMotion = useReducedMotion();
  const rotateY = tilt === "left" ? -1.25 : 1.25;

  return (
    <div className={cn("relative min-w-0", className)}>
      <div
        className="bg-brand-accent/14 pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
        aria-hidden
      />
      <m.div
        className="relative w-full"
        style={{
          transform: `perspective(1200px) rotateY(${rotateY}deg)`,
        }}
        initial={false}
        whileHover={
          reducedMotion
            ? undefined
            : {
                x: tilt === "left" ? 6 : -6,
                transition: { duration: motionDuration.base, ease: motionEase },
              }
        }
      >
        <div className="bg-muted ring-border/40 overflow-hidden rounded-2xl shadow-xl ring-1">
          <div
            className="border-border/40 bg-background/80 flex items-center gap-1.5 border-b px-3 py-2.5"
            aria-hidden
          >
            <span className="size-2 rounded-full bg-[#ff5f57]/90" />
            <span className="size-2 rounded-full bg-[#febc2e]/90" />
            <span className="size-2 rounded-full bg-[#28c840]/90" />
            <span className="bg-secondary/80 ml-2 h-2 max-w-[40%] flex-1 rounded-full" />
          </div>
          <div className="relative aspect-[8/5] w-full bg-[#070b10]">
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              loading={priority ? undefined : "lazy"}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 560px"
              className="object-cover object-top"
            />
          </div>
        </div>
      </m.div>
    </div>
  );
}
