"use client";

import type { ReactNode } from "react";
import { m, useReducedMotion } from "motion/react";

import {
  servicesContactRevealVariants,
  servicesInViewViewport,
} from "@/components/services/servicesMotion";
import { cn } from "@/lib/utils";

type ServicesContactRevealProps = {
  children: ReactNode;
  className?: string;
};

export function ServicesContactReveal({
  children,
  className,
}: ServicesContactRevealProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={servicesInViewViewport}
      variants={servicesContactRevealVariants}
    >
      {children}
    </m.div>
  );
}
