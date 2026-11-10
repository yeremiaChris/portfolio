"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  m,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

import { cn } from "@/lib/utils";

const SPOTLIGHT_SPRING = {
  type: "spring" as const,
  stiffness: 280,
  damping: 32,
  mass: 0.6,
};

type HeroNameSpotlightProps = {
  children: ReactNode;
  spotlight: ReactNode;
  className?: string;
};

export function HeroNameSpotlight({
  children,
  spotlight,
  className,
}: HeroNameSpotlightProps) {
  const reducedMotion = useReducedMotion();
  const hostRef = useRef<HTMLSpanElement>(null);
  const [pointerFine, setPointerFine] = useState(false);
  const [hovering, setHovering] = useState(false);
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);
  const springX = useSpring(spotX, SPOTLIGHT_SPRING);
  const springY = useSpring(spotY, SPOTLIGHT_SPRING);
  const spotlightGradient = useMotionTemplate`radial-gradient(circle at ${springX}% ${springY}%, #f5fcfe 0%, #4cd7f6 20%, rgb(76 215 246 / 0.42) 38%, transparent 56%)`;

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const sync = () => setPointerFine(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLSpanElement>) => {
      if (!pointerFine || reducedMotion) {
        return;
      }
      const node = hostRef.current;
      if (!node) {
        return;
      }
      const rect = node.getBoundingClientRect();
      spotX.set(((event.clientX - rect.left) / rect.width) * 100);
      spotY.set(((event.clientY - rect.top) / rect.height) * 100);
    },
    [pointerFine, reducedMotion, spotX, spotY],
  );

  const spotlightEnabled = pointerFine && !reducedMotion;

  return (
    <span
      ref={hostRef}
      className={cn("relative inline max-w-full", className)}
      onPointerEnter={spotlightEnabled ? () => setHovering(true) : undefined}
      onPointerLeave={
        spotlightEnabled
          ? () => {
              setHovering(false);
              spotX.set(50);
              spotY.set(50);
            }
          : undefined
      }
      onPointerMove={spotlightEnabled ? handlePointerMove : undefined}
    >
      {children}
      {spotlightEnabled ? (
        <m.span
          aria-hidden
          className="hero-name-spotlight pointer-events-none absolute inset-0 select-none"
          initial={false}
          animate={{ opacity: hovering ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ backgroundImage: spotlightGradient }}
        >
          {spotlight}
        </m.span>
      ) : null}
    </span>
  );
}
