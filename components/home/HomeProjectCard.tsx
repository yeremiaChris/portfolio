import type { ReactNode } from "react";

import { homeBentoCardClass } from "@/components/home/homeSurface";
import { cn } from "@/lib/utils";

type HomeProjectCardProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  as?: "a" | "article";
};

export function HomeProjectCard({
  children,
  className,
  href,
  as = "a",
}: HomeProjectCardProps) {
  const shellClass = cn(homeBentoCardClass, className);

  if (as === "article") {
    return <article className={shellClass}>{children}</article>;
  }

  return (
    <a href={href} className={cn(shellClass, "focus-ring outline-none")}>
      {children}
    </a>
  );
}
