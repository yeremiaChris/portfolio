"use client";

import Image from "next/image";
import { m, useInView } from "motion/react";
import { createContext, useContext, useRef, type ReactNode } from "react";

import { homeBentoCardClass } from "@/components/home/homeSurface";
import {
  useHomeMotionReduced,
  useHomeScrollMotionEnabled,
} from "@/components/home/useHomeMotionEnabled";
import { homeWorkReveal } from "@/lib/home-motion";
import { cn } from "@/lib/utils";

const WorkBentoRevealActiveContext = createContext(false);

export function useWorkBentoRevealActive() {
  return useContext(WorkBentoRevealActiveContext);
}

type WorkBentoRevealProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  as?: "a" | "article";
};

function BorderTrace({ active }: { active: boolean }) {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[3] size-full overflow-visible rounded-[inherit]"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <m.rect
        x="0.6"
        y="0.6"
        width="98.8"
        height="98.8"
        rx="4"
        ry="4"
        fill="none"
        stroke="#4cd7f6"
        strokeWidth="0.6"
        vectorEffect="non-scaling-stroke"
        initial={false}
        pathLength={1}
        strokeDasharray="1 1"
        animate={
          active
            ? { strokeDashoffset: [1, 0], opacity: [0, 1, 0.65] }
            : { strokeDashoffset: 1, opacity: 0 }
        }
        transition={{
          duration: homeWorkReveal.borderDrawDuration,
          ease: homeWorkReveal.ease,
        }}
      />
    </svg>
  );
}

export function WorkBentoReveal({
  children,
  className,
  href,
  as = "article",
}: WorkBentoRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.22 });
  const reduced = useHomeMotionReduced();
  const scrollMotion = useHomeScrollMotionEnabled();
  const active = scrollMotion && inView && !reduced;

  const sharedClass = cn(
    homeBentoCardClass,
    "relative overflow-hidden",
    className,
  );

  const revealProps = active
    ? {
        initial: { clipPath: "inset(0 0 100% 0)" as const },
        animate: { clipPath: "inset(0 0 0% 0)" as const },
        transition: {
          duration: homeWorkReveal.duration,
          ease: homeWorkReveal.ease,
        },
      }
    : {
        initial: false as const,
        animate: { clipPath: "inset(0 0 0% 0)" as const },
      };

  const inner = (
    <WorkBentoRevealActiveContext.Provider value={active}>
      <BorderTrace active={active} />
      {children}
    </WorkBentoRevealActiveContext.Provider>
  );

  if (as === "a" && href) {
    return (
      <m.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={cn(sharedClass, "focus-ring flex outline-none")}
        {...revealProps}
      >
        {inner}
      </m.a>
    );
  }

  return (
    <m.article
      ref={ref as React.RefObject<HTMLElement>}
      className={sharedClass}
      {...revealProps}
    >
      {inner}
    </m.article>
  );
}

type WorkBentoRevealImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
};

export function WorkBentoRevealImage({
  src,
  alt,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  className,
}: WorkBentoRevealImageProps) {
  const active = useWorkBentoRevealActive();

  if (!active) {
    return (
      <div
        className={cn(
          "relative aspect-[16/10] w-full overflow-hidden rounded-xl",
          className,
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          loading="lazy"
          className="object-cover object-top"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-xl",
        className,
      )}
    >
      <m.div
        className="absolute inset-0 size-full"
        initial={{ scale: homeWorkReveal.imageScaleFrom }}
        animate={{ scale: 1 }}
        transition={{
          duration: homeWorkReveal.duration,
          ease: homeWorkReveal.ease,
        }}
        style={{ transformOrigin: "center center" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          loading="lazy"
          className="object-cover object-top"
        />
      </m.div>
    </div>
  );
}
