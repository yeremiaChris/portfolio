"use client";

import type { ReactNode } from "react";

import { useHomeMotion } from "@/components/home/useHomeMotionEnabled";
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
  const { pointer } = useHomeMotion();
  const shellClass = cn(
    homeBentoCardClass,
    "outline-none transition-[border-color,box-shadow] duration-300 motion-reduce:transition-none",
    pointer &&
      "hover:border-brand-accent/45 hover:shadow-[0_0_36px_-12px_rgba(76,215,246,0.42)]",
    className,
  );

  if (as === "article") {
    return <article className={shellClass}>{children}</article>;
  }

  return (
    <a href={href} className={cn(shellClass, "focus-ring")}>
      {children}
    </a>
  );
}
