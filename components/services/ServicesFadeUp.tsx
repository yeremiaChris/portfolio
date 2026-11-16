"use client";

import type { ReactNode } from "react";
import { m, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

type ServicesFadeUpProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  when?: "mount" | "inView";
};

const fadeUpVisible = { opacity: 1, y: 0 } as const;
const fadeUpHidden = { opacity: 0, y: 24 } as const;

function fadeUpTransition(delay: number) {
  return {
    duration: 0.6,
    ease: [0, 0, 0.2, 1] as const,
    delay,
  };
}

const inViewViewport = { once: true, amount: 0.2 } as const;

export function ServicesFadeUp({
  children,
  className,
  delay = 0,
  when = "inView",
}: ServicesFadeUpProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  if (when === "mount") {
    return (
      <m.div
        className={cn(className)}
        initial={fadeUpHidden}
        animate={fadeUpVisible}
        transition={fadeUpTransition(delay)}
      >
        {children}
      </m.div>
    );
  }

  return (
    <m.div
      className={cn(className)}
      initial={fadeUpHidden}
      whileInView={fadeUpVisible}
      viewport={inViewViewport}
      transition={fadeUpTransition(delay)}
    >
      {children}
    </m.div>
  );
}
