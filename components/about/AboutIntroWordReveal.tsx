"use client";

import { m, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

type AboutIntroWordRevealProps = {
  text: string;
  className?: string;
};

const WORD_REVEAL_DURATION_S = 0.75;

export function AboutIntroWordReveal({
  text,
  className,
}: AboutIntroWordRevealProps) {
  const reducedMotion = useReducedMotion();
  const [run, setRun] = useState(false);
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }
    const frame = requestAnimationFrame(() => setRun(true));
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion]);

  const stagger = words.length > 0 ? WORD_REVEAL_DURATION_S / words.length : 0;

  return (
    <p className={className}>
      {words.map((word, index) => (
        <m.span
          key={`${word}-${index}`}
          initial={false}
          style={{ opacity: 1 }}
          className="inline"
          animate={
            run && !reducedMotion
              ? { opacity: [0.7, 1], translateY: [4, 0] }
              : { opacity: 1, translateY: 0 }
          }
          transition={{
            duration: 0.28,
            delay: index * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
          {index < words.length - 1 ? "\u00a0" : null}
        </m.span>
      ))}
    </p>
  );
}
