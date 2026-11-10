"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";

import { motionHeroTiltSpring } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

const MAX_TILT_DEG = 2;

type HeroTerminalTiltProps = {
  children: ReactNode;
  className?: string;
  flat?: boolean;
};

export function HeroTerminalTilt({
  children,
  className,
  flat = false,
}: HeroTerminalTiltProps) {
  const reducedMotion = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const [tiltEnabled, setTiltEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, motionHeroTiltSpring);
  const springY = useSpring(rotateY, motionHeroTiltSpring);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const sync = () => setTiltEnabled(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const resetTilt = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  useEffect(() => {
    if (flat) {
      resetTilt();
    }
  }, [flat, resetTilt]);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!tiltEnabled || reducedMotion || flat) {
        return;
      }
      const node = hostRef.current;
      if (!node) {
        return;
      }
      const rect = node.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      rotateY.set(px * (MAX_TILT_DEG * 2));
      rotateX.set(-py * (MAX_TILT_DEG * 2));
    },
    [flat, reducedMotion, rotateX, rotateY, tiltEnabled],
  );

  const handlePointerLeave = useCallback(() => {
    setHovering(false);
    resetTilt();
  }, [resetTilt]);

  const handlePointerEnter = useCallback(() => {
    setHovering(true);
  }, []);

  if (reducedMotion || !tiltEnabled) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <m.div
      ref={hostRef}
      className={cn(
        "relative [transform-style:preserve-3d]",
        hovering ? "will-change-transform" : undefined,
        className,
      )}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 1400,
        backfaceVisibility: "hidden",
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerEnter={handlePointerEnter}
    >
      {children}
    </m.div>
  );
}
