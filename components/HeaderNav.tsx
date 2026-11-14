"use client";

import Link from "next/link";
import { m, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";

import { useHeaderCompact } from "@/components/motion/HeaderCompactContext";
import {
  headerNavIndicatorClass,
  headerNavLinkClass,
  headerNavPillClass,
} from "@/lib/header-nav-styles";
import { motionSpring } from "@/lib/motion-tokens";
import { HEADER_NAV, isNavActive } from "@/lib/nav";

const navIndicatorLayoutId = "header-nav-indicator";

export function HeaderNav() {
  const pathname = usePathname();
  const compact = useHeaderCompact();
  const reducedMotion = useReducedMotion();
  const indicatorTransition = reducedMotion ? { duration: 0 } : motionSpring;
  const pillTransition = reducedMotion ? { duration: 0 } : motionSpring;

  return (
    <m.nav
      layout
      aria-label="Primary"
      className={`pointer-events-auto hidden lg:flex ${headerNavPillClass(compact)}`}
      transition={pillTransition}
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
                transition={indicatorTransition}
              />
            ) : null}
            <span className="relative z-10">{item.label}</span>
          </Link>
        );
      })}
    </m.nav>
  );
}
