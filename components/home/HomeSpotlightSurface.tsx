"use client";

import {
  m,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import {
  useCallback,
  useRef,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";

import { usePointerFine } from "@/components/projects/usePointerFine";
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
  const pointerFine = usePointerFine();
  const reducedMotion = useReducedMotion();
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);
  const spotOpacity = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(480px circle at ${spotX}% ${spotY}%, rgb(76 215 246 / 0.13), transparent 68%)`;
  const rafRef = useRef(0);
  const pendingRef = useRef<{ x: number; y: number } | null>(null);
  const enabled = pointerFine && !reducedMotion;

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
      if (!enabled) {
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
    [enabled, flushSpot],
  );

  const onPointerLeave = useCallback(() => {
    if (!enabled) {
      return;
    }
    pendingRef.current = null;
    if (rafRef.current) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    spotOpacity.set(0);
  }, [enabled, spotOpacity]);

  return (
    <Component
      {...rest}
      className={cn("relative overflow-hidden", className)}
      onPointerMove={enabled ? onPointerMove : undefined}
      onPointerLeave={enabled ? onPointerLeave : undefined}
    >
      {enabled ? (
        <m.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: spotlight, opacity: spotOpacity }}
        />
      ) : null}
      <div className="relative z-[1] contents">{children}</div>
    </Component>
  );
}
