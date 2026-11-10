"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

import { motionPresetViewport, type MotionPreset } from "@/lib/motion-tokens";

const FAILSAFE_MS = 12_000;

const supportsIntersectionObserver =
  typeof IntersectionObserver !== "undefined";

type UseScrollRevealActiveOptions = {
  when: "mount" | "inView";
  preset?: MotionPreset;
};

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
  const [failOpen, setFailOpen] = useState(!supportsIntersectionObserver);

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
  const active = failOpen || scrollActive;

  return { ref, active };
}
