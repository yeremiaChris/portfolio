import type { ComponentProps } from "react";

import { homeSignalCardClassName } from "@/lib/home-signal-card";
import { cn } from "@/lib/utils";

type HeroProofCardProps = ComponentProps<"a"> & {
  label: string;
  meta: string;
};

export function HeroProofCard({
  label,
  meta,
  className,
  ...props
}: HeroProofCardProps) {
  return (
    <a
      {...props}
      className={cn(
        "hero-proof-card hero-link group relative items-start gap-2 text-left",
        homeSignalCardClassName,
        className,
      )}
    >
      <span className="text-foreground relative z-[1] text-[15px] font-semibold sm:text-base">
        {label}
      </span>
      <span className="text-muted-foreground relative z-[1] text-sm leading-snug sm:text-[15px]">
        {meta}
      </span>
    </a>
  );
}
