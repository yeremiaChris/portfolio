"use client";

import Image from "next/image";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { homeParallaxMaxPx } from "@/lib/home-motion";
import { cn } from "@/lib/utils";

type HomeWorkImageParallaxProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function HomeWorkImageParallax({
  src,
  alt,
  className,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority,
}: HomeWorkImageParallaxProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [homeParallaxMaxPx, -homeParallaxMaxPx],
  );
  const parallaxEnabled = !reducedMotion;

  return (
    <div
      ref={frameRef}
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-xl",
        className,
      )}
    >
      <m.div
        className="absolute inset-0 size-full"
        style={parallaxEnabled ? { y: parallaxY } : undefined}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-cover object-top"
        />
      </m.div>
    </div>
  );
}
