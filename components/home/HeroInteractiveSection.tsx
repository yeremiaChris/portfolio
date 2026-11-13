"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";

import { HeroDotGridCanvas } from "@/components/home/HeroDotGridCanvas";
import {
  useHomeMotionReduced,
  useHomePointerEffectsEnabled,
} from "@/components/home/useHomeMotionEnabled";
import { cn } from "@/lib/utils";

type HeroInteractiveSectionProps = {
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  id?: string;
  ariaLabelledby?: string;
};

export function HeroInteractiveSection({
  children,
  footer,
  className,
  id,
  ariaLabelledby,
}: HeroInteractiveSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: -9999, y: -9999, active: false });
  const inViewRef = useRef(true);
  const rafRef = useRef(0);
  const reduced = useHomeMotionReduced();
  const pointerEffects = useHomePointerEffectsEnabled();

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!pointerEffects || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      pointerRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true,
      };
    },
    [pointerEffects],
  );

  const onPointerLeave = useCallback(() => {
    pointerRef.current.active = false;
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry?.isIntersecting ?? false;
      },
      { threshold: 0.05 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section || reduced) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let shimmer = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = section.getBoundingClientRect();
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(section);

    const draw = () => {
      rafRef.current = 0;
      if (!inViewRef.current || document.hidden) return;

      const { width, height } = section.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      const spacing = 22;
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      const ptr = pointerRef.current;
      const fieldR = 140;
      const useField = pointerEffects && ptr.active;
      shimmer += 0.012;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          let x = col * spacing + spacing * 0.5;
          let y = row * spacing + spacing * 0.5;
          let alpha = 0.14;

          if (useField) {
            const dx = x - ptr.x;
            const dy = y - ptr.y;
            const dist = Math.hypot(dx, dy);
            if (dist < fieldR) {
              const t = 1 - dist / fieldR;
              alpha = 0.14 + t * 0.58;
              const push = t * 18;
              if (dist > 0.5) {
                x += (dx / dist) * push;
                y += (dy / dist) * push;
              }
            }
          } else {
            alpha = 0.14 + Math.sin(shimmer + col * 0.4 + row * 0.35) * 0.06;
          }

          ctx.beginPath();
          ctx.fillStyle = `rgba(76, 215, 246, ${alpha})`;
          ctx.arc(x, y, 1.1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    const onVisibility = () => {
      if (!document.hidden && !rafRef.current) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [pointerEffects, reduced]);

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn(className)}
      onPointerMove={pointerEffects ? onPointerMove : undefined}
      onPointerLeave={pointerEffects ? onPointerLeave : undefined}
    >
      {!reduced ? <HeroDotGridCanvas ref={canvasRef} /> : null}
      {children}
      {footer}
    </section>
  );
}
