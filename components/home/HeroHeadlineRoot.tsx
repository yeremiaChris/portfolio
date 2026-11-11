import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type HeroHeadlineRootProps = {
  children: ReactNode;
  className?: string;
};

export function HeroHeadlineRoot({
  children,
  className,
}: HeroHeadlineRootProps) {
  return (
    <div
      id="hero-headline-root"
      className={cn(
        "hero-signal-headline relative w-full min-w-0 text-left",
        className,
      )}
    >
      {children}
    </div>
  );
}
