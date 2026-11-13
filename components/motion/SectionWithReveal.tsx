"use client";

import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/Reveal";
import type { MotionPreset } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

type SectionWithRevealProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabelledby?: string;
  preset?: MotionPreset;
};

export function SectionWithReveal({
  children,
  className,
  id,
  ariaLabelledby,
  preset = "calm",
}: SectionWithRevealProps) {
  return (
    <section id={id} aria-labelledby={ariaLabelledby} className={cn(className)}>
      <Reveal when="inView" preset={preset} className="w-full min-w-0">
        {children}
      </Reveal>
    </section>
  );
}
