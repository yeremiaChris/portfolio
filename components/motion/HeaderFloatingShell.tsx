"use client";

import type { ReactNode } from "react";
import { m, useScroll, useTransform } from "motion/react";

import { cn } from "@/lib/utils";

type HeaderFloatingShellProps = {
  children: ReactNode;
  className?: string;
};

export function HeaderFloatingShell({
  children,
  className,
}: HeaderFloatingShellProps) {
  const { scrollY } = useScroll();
  const backgroundAlpha = useTransform(scrollY, [0, 80], [0.58, 0.9]);
  const paddingY = useTransform(scrollY, [0, 80], [10, 6]);
  const paddingX = useTransform(scrollY, [0, 80], [14, 10]);

  const backgroundColor = useTransform(
    backgroundAlpha,
    (alpha) => `rgb(16 20 26 / ${alpha})`,
  );

  return (
    <m.div
      className={cn(
        "mx-auto w-full max-w-350 rounded-full border border-white/[0.08] bg-[rgb(16_20_26/0.58)] shadow-[0_10px_40px_rgb(0_0_0/0.35)] backdrop-blur-xl backdrop-saturate-150",
        className,
      )}
      style={{
        backgroundColor,
        paddingTop: paddingY,
        paddingBottom: paddingY,
        paddingLeft: paddingX,
        paddingRight: paddingX,
      }}
    >
      <div className="flex min-h-[var(--nav-pill-height)] items-center justify-between gap-2 sm:gap-3 lg:gap-4">
        {children}
      </div>
    </m.div>
  );
}
