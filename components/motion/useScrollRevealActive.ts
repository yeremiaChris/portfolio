"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

import { motionViewport } from "@/lib/motion-tokens";

const FAILSAFE_MS = 2500;

type UseScrollRevealActiveOptions = {
  when: "mount" | "inView";
};

export function useScrollRevealActive({ when }: UseScrollRevealActiveOptions) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    ...motionViewport,
    initial: false,
  });
  const [mountArmed, setMountArmed] = useState(false);
  const [inViewArmed, setInViewArmed] = useState(false);
  const [failOpen, setFailOpen] = useState(false);

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
      return;
    }
    let cancelled = false;
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
  }, [when, inView]);

  useEffect(() => {
    const timer = window.setTimeout(() => setFailOpen(true), FAILSAFE_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const scrollActive = when === "mount" ? mountArmed : inView && inViewArmed;
  const active = failOpen || scrollActive;

  return { ref, active };
}
