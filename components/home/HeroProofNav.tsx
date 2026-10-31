"use client";

import type { ComponentProps } from "react";

export function HeroProofNav({ onMouseMove, ...props }: ComponentProps<"nav">) {
  return (
    <nav
      {...props}
      onMouseMove={(event) => {
        const card = (event.target as HTMLElement).closest("a.hero-proof-card");
        if (card instanceof HTMLElement) {
          const rect = card.getBoundingClientRect();
          card.style.setProperty(
            "--spotlight-x",
            `${event.clientX - rect.left}px`,
          );
          card.style.setProperty(
            "--spotlight-y",
            `${event.clientY - rect.top}px`,
          );
        }
        onMouseMove?.(event);
      }}
    />
  );
}
