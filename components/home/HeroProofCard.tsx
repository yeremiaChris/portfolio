"use client";

import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type HeroProofCardProps = ComponentProps<"a"> & {
  label: string;
  meta: string;
};

export function HeroProofCard({
  label,
  meta,
  className,
  onMouseMove,
  ...props
}: HeroProofCardProps) {
  return (
    <a
      {...props}
      className={cn(
        "hero-proof-card hero-link group relative flex flex-col items-start gap-2 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-left shadow-sm backdrop-blur-sm transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.05] sm:px-5 sm:py-5",
        className,
      )}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty(
          "--spotlight-x",
          `${event.clientX - rect.left}px`,
        );
        event.currentTarget.style.setProperty(
          "--spotlight-y",
          `${event.clientY - rect.top}px`,
        );
        onMouseMove?.(event);
      }}
    >
      <span className="text-foreground relative z-[1] font-mono text-[15px] font-semibold sm:text-base">
        {label}
      </span>
      <span className="text-muted-foreground group-hover:text-foreground relative z-[1] text-sm leading-snug sm:text-[15px]">
        {meta}
      </span>
    </a>
  );
}
