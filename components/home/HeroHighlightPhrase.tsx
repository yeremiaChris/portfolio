import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type HeroHighlightPhraseProps = {
  children: ReactNode;
  delayClass?: string;
  className?: string;
};

export function HeroHighlightPhrase({
  children,
  delayClass,
  className,
}: HeroHighlightPhraseProps) {
  return (
    <span className={cn("hero-highlight-phrase", delayClass, className)}>
      {children}
    </span>
  );
}
