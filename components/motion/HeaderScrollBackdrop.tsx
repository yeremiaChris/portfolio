"use client";

import { m, useScroll, useTransform } from "motion/react";

export function HeaderScrollBackdrop() {
  const { scrollY } = useScroll();
  const backgroundAlpha = useTransform(scrollY, [0, 64], [0.55, 0.78]);
  const blurAmount = useTransform(scrollY, [0, 64], [0, 10]);
  const borderOpacity = useTransform(scrollY, [0, 24], [0.2, 0.4]);

  const backgroundColor = useTransform(
    backgroundAlpha,
    (alpha) => `rgb(16 20 26 / ${alpha})`,
  );
  const backdropFilter = useTransform(blurAmount, (px) => `blur(${px}px)`);
  const borderColor = useTransform(
    borderOpacity,
    (alpha) => `rgb(223 226 235 / ${alpha})`,
  );

  return (
    <m.div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 border-b"
      style={{
        backgroundColor,
        backdropFilter,
        WebkitBackdropFilter: backdropFilter,
        borderColor,
      }}
    />
  );
}
