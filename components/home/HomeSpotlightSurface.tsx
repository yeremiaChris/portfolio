"use client";

import { m, useMotionTemplate, useMotionValue } from "motion/react";
import {
  useCallback,
  useRef,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";

import { useHomePointerEffectsEnabled } from "@/components/home/useHomeMotionEnabled";
import { cn } from "@/lib/utils";

type HomeSpotlightSurfaceProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function HomeSpotlightSurface<T extends ElementType = "div">({
  as,
  children,
  className,
  ...rest
}: HomeSpotlightSurfaceProps<T>) {
  const Component = (as ?? "div") as ElementType;
  const pointerEffects = useHomePointerEffectsEnabled();
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);
  const spotOpacity = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${spotX}% ${spotY}%, rgb(76 215 246 / 0.18), transparent 70%)`;
  const rafRef = useRef(0);
  const pendingRef = useRef<{ x: number; y: number } | null>(null);

  const flushSpot = useCallback(() => {
    rafRef.current = 0;
    const point = pendingRef.current;
    if (!point) {
      return;
    }
    spotX.set(point.x);
    spotY.set(point.y);
    spotOpacity.set(1);
  }, [spotOpacity, spotX, spotY]);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!pointerEffects) {
        return;
      }
      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      pendingRef.current = {
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100,
      };
      if (!rafRef.current) {
        rafRef.current = window.requestAnimationFrame(flushSpot);
      }
    },
    [pointerEffects, flushSpot],
  );

  const onPointerLeave = useCallback(() => {
    pendingRef.current = null;
    if (rafRef.current) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    spotOpacity.set(0);
  }, [spotOpacity]);

  return (
    <Component
      {...rest}
      className={cn("relative overflow-hidden", className)}
      onPointerMove={pointerEffects ? onPointerMove : undefined}
      onPointerLeave={pointerEffects ? onPointerLeave : undefined}
    >
      <div className="relative z-[1] contents">{children}</div>
      {pointerEffects ? (
        <m.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2] rounded-[inherit] mix-blend-plus-lighter"
          style={{ background: spotlight, opacity: spotOpacity }}
        />
      ) : null}
    </Component>
  );
}
