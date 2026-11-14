"use client";

import Link from "next/link";
import { m, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";

import { useHeaderCompact } from "@/components/motion/HeaderCompactContext";
import {
  headerNavIndicatorClass,
  headerNavLinkClass,
} from "@/lib/header-nav-styles";
import { motionHeaderBackdropTransition } from "@/lib/header-backdrop-motion";
import { HEADER_NAV, isNavActive } from "@/lib/nav";

type IndicatorBox = {
  x: number;
  width: number;
  visible: boolean;
};

const hiddenIndicator: IndicatorBox = { x: 0, width: 0, visible: false };

export function HeaderNav() {
  const pathname = usePathname();
  const compact = useHeaderCompact();
  const reducedMotion = useReducedMotion();
  const navRef = useRef<HTMLElement>(null);
  const [indicator, setIndicator] = useState<IndicatorBox>(hiddenIndicator);
  const indicatorTransition = motionHeaderBackdropTransition(!!reducedMotion);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const measure = () => {
      const activeLink = nav.querySelector<HTMLElement>(
        '[aria-current="page"]',
      );
      if (!activeLink) {
        setIndicator(hiddenIndicator);
        return;
      }
      const navRect = nav.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setIndicator({
        x: linkRect.left - navRect.left,
        width: linkRect.width,
        visible: true,
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(nav);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pathname, compact]);

  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      className="relative hidden items-center gap-0.5 lg:flex"
    >
      <m.span
        aria-hidden
        className={headerNavIndicatorClass}
        initial={false}
        animate={{
          x: indicator.x,
          width: indicator.width,
          opacity: indicator.visible ? 1 : 0,
        }}
        transition={indicatorTransition}
      />
      {HEADER_NAV.map((item) => {
        const active = isNavActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={headerNavLinkClass(active)}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
