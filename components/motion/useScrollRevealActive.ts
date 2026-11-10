"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

import { motionViewport } from "@/lib/motion-tokens";

type UseScrollRevealActiveOptions = {
  when: "mount" | "inView";
};

export function useScrollRevealActive({ when }: UseScrollRevealActiveOptions) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, motionViewport);
  const [aboveFold, setAboveFold] = useState(when === "mount");

  useLayoutEffect(() => {
    if (when === "mount") {
      return;
    }

    const measure = () => {
      const element = ref.current;
      if (!element) {
        return;
      }
      const rect = element.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      if (rect.top < viewHeight + 64 && rect.bottom > 0) {
        setAboveFold(true);
      }
    };

    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, [when]);

  const active = when === "mount" || aboveFold || inView;

  return { ref, active };
}
