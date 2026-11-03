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
  ...props
}: HeroProofCardProps) {
  return (
    <a
      {...props}
      className={cn(
        "hero-proof-card hero-link border-gradient group relative flex flex-col items-start gap-2 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-left shadow-sm sm:px-5 sm:py-5",
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
