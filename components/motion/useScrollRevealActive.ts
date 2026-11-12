"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

import { motionPresetViewport, type MotionPreset } from "@/lib/motion-tokens";

const FAILSAFE_MS = 12_000;

const supportsIntersectionObserver =
  typeof IntersectionObserver !== "undefined";

type UseScrollRevealActiveOptions = {
  when: "mount" | "inView";
  preset?: MotionPreset;
};

function parseRootMarginBottom(margin: string, viewHeight: number): number {
  const parts = margin.trim().split(/\s+/);
  const bottom = parts[2] ?? parts[0] ?? "0px";
  if (bottom.endsWith("%")) {
    return (Math.abs(Number.parseFloat(bottom)) / 100) * viewHeight;
  }
  if (bottom.endsWith("px")) {
    return Math.abs(Number.parseFloat(bottom));
  }
  return 0;
}

function measurePresentInView(el: HTMLElement, preset: MotionPreset): boolean {
  const { amount, margin } = motionPresetViewport(preset);
  const rect = el.getBoundingClientRect();
  const viewHeight = window.innerHeight;
  const bottomInset = parseRootMarginBottom(margin, viewHeight);
  const visibleTop = Math.max(rect.top, 0);
  const visibleBottom = Math.min(rect.bottom, viewHeight - bottomInset);
  if (visibleBottom <= visibleTop) {
    return false;
  }
  const visibleHeight = visibleBottom - visibleTop;
  const threshold = typeof amount === "number" ? amount : 0.18;
  return visibleHeight / Math.max(rect.height, 1) >= threshold;
}

export function useScrollRevealActive({
  when,
  preset = "calm",
}: UseScrollRevealActiveOptions) {
  const ref = useRef<HTMLDivElement>(null);
  const viewport = motionPresetViewport(preset);
  const inView = useInView(ref, {
    once: viewport.once,
    amount: viewport.amount,
    margin: viewport.margin,
    initial: viewport.inViewInitial,
  });
  const [mountArmed, setMountArmed] = useState(false);
  const [inViewArmed, setInViewArmed] = useState(false);
  const [presentInitially, setPresentInitially] = useState(false);
  const [failOpen, setFailOpen] = useState(!supportsIntersectionObserver);

  useLayoutEffect(() => {
    if (when !== "inView") {
      return;
    }
    const node = ref.current;
    if (!node) {
      return;
    }
    if (measurePresentInView(node, preset)) {
      setPresentInitially(true);
      setInViewArmed(true);
    }
  }, [preset, when]);

  useEffect(() => {
    if (when !== "mount") {
      return;
    }
    let frame = 0;
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => setMountArmed(true));
    });
    return () => cancelAnimationFrame(frame);
  }, [when]);

  useEffect(() => {
    if (when !== "inView" || !inView) {
      if (when === "inView" && !inView && preset !== "calm") {
        const resetTimer = window.setTimeout(() => setInViewArmed(false), 0);
        return () => window.clearTimeout(resetTimer);
      }
      return;
    }
    let cancelled = false;
    if (preset === "calm") {
      const frame = requestAnimationFrame(() => {
        if (!cancelled) {
          setInViewArmed(true);
        }
      });
      return () => {
        cancelled = true;
        cancelAnimationFrame(frame);
      };
    }
    let frame = 0;
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        if (!cancelled) {
          setInViewArmed(true);
        }
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      setInViewArmed(false);
    };
  }, [when, inView, preset]);

  useEffect(() => {
    if (when !== "inView" || !supportsIntersectionObserver) {
      return;
    }
    const timer = window.setTimeout(() => {
      if (inView) {
        setFailOpen(true);
      }
    }, FAILSAFE_MS);
    return () => window.clearTimeout(timer);
  }, [when, inView]);

  const scrollActive = when === "mount" ? mountArmed : inView && inViewArmed;
  const active = failOpen || scrollActive || presentInitially;

  return { ref, active, presentInitially };
}
