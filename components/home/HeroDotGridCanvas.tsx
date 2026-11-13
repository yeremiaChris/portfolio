"use client";

import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export const HeroDotGridCanvas = forwardRef<HTMLCanvasElement>(
  function HeroDotGridCanvas(_props, ref) {
    return (
      <canvas
        ref={ref}
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 z-0 h-full w-full",
          "motion-reduce:hidden",
        )}
      />
    );
  },
);
