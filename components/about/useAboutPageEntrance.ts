"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export function useAboutPageEntrance() {
  const reducedMotion = useReducedMotion();
  const [run, setRun] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }
    const frame = requestAnimationFrame(() => setRun(true));
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion]);

  return { run, reducedMotion: !!reducedMotion };
}
