import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type HeroViewportSectionProps = {
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  id?: string;
  ariaLabelledby?: string;
};

export function HeroViewportSection({
  children,
  footer,
  className,
  id,
  ariaLabelledby,
}: HeroViewportSectionProps) {
  return (
    <section id={id} aria-labelledby={ariaLabelledby} className={cn(className)}>
      {children}
      {footer}
    </section>
  );
}
