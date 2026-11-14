"use client";

import Link from "next/link";
import { m, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";

import {
  headerNavIndicatorClass,
  headerNavLinkClass,
  headerNavPillClass,
} from "@/lib/header-nav-styles";
import { motionHeaderMorphSpring } from "@/lib/motion-tokens";
import { HEADER_NAV, isNavActive } from "@/lib/nav";
import { cn } from "@/lib/utils";

const navIndicatorLayoutId = "header-nav-indicator";

type HeaderNavProps = {
  embedded?: boolean;
};

export function HeaderNav({ embedded = false }: HeaderNavProps) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const morphTransition = reducedMotion
    ? { duration: 0 }
    : motionHeaderMorphSpring;

  return (
    <m.nav
      layout={embedded ? "position" : true}
      aria-label="Primary"
      className={cn(
        "pointer-events-auto hidden items-center gap-0.5 lg:flex",
        embedded ? "p-0" : cn(headerNavPillClass(), "lg:justify-self-center"),
      )}
      transition={morphTransition}
    >
      {HEADER_NAV.map((item) => {
        const active = isNavActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={headerNavLinkClass(active)}
          >
            {active ? (
              <m.span
                layoutId={navIndicatorLayoutId}
                className={headerNavIndicatorClass}
                transition={morphTransition}
              />
            ) : null}
            <m.span layout="position" className="relative z-10">
              {item.label}
            </m.span>
          </Link>
        );
      })}
    </m.nav>
  );
}
