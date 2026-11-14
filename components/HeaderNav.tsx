"use client";

import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";

import {
  headerNavEmbeddedClass,
  headerNavExpandedClass,
  headerNavIndicatorClass,
  headerNavIndicatorTransitionClass,
  headerNavLinkClass,
} from "@/lib/header-nav-styles";
import { isElementRenderedForAnimation } from "@/lib/header-bar-flip";
import {
  buildHeaderNavIndicatorBox,
  buildHeaderNavIndicatorStyle,
  headerNavIndicatorBoxesEqual,
  hiddenHeaderNavIndicator,
  type HeaderNavIndicatorBox,
} from "@/lib/header-nav-indicator";
import { HEADER_NAV, isNavActive } from "@/lib/nav";
import { cn } from "@/lib/utils";

type HeaderNavProps = {
  embedded?: boolean;
};

export function HeaderNav({ embedded = false }: HeaderNavProps) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HeaderNavIndicatorBox>(hiddenHeaderNavIndicator);
  const [indicator, setIndicator] = useState<HeaderNavIndicatorBox>(
    hiddenHeaderNavIndicator,
  );

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const applyMeasure = () => {
      if (!isElementRenderedForAnimation(nav)) {
        return;
      }

      const activeLink = nav.querySelector<HTMLElement>(
        '[aria-current="page"]',
      );
      if (!activeLink) {
        if (
          !headerNavIndicatorBoxesEqual(
            indicatorRef.current,
            hiddenHeaderNavIndicator,
          )
        ) {
          indicatorRef.current = hiddenHeaderNavIndicator;
          setIndicator(hiddenHeaderNavIndicator);
        }
        return;
      }

      const nextBox = buildHeaderNavIndicatorBox(
        nav.getBoundingClientRect(),
        activeLink.getBoundingClientRect(),
      );
      const resolved = nextBox ?? hiddenHeaderNavIndicator;
      if (headerNavIndicatorBoxesEqual(indicatorRef.current, resolved)) {
        return;
      }
      indicatorRef.current = resolved;
      setIndicator(resolved);
    };

    applyMeasure();
    const observer = new ResizeObserver(applyMeasure);
    observer.observe(nav);
    window.addEventListener("resize", applyMeasure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", applyMeasure);
    };
  }, [pathname, embedded]);

  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      data-flip-item=""
      className={cn(
        embedded ? headerNavEmbeddedClass() : headerNavExpandedClass(),
      )}
    >
      <span
        aria-hidden
        className={cn(
          headerNavIndicatorClass(embedded),
          headerNavIndicatorTransitionClass(indicator.visible, !!reducedMotion),
        )}
        style={buildHeaderNavIndicatorStyle(indicator)}
      />
      {HEADER_NAV.map((item) => {
        const active = isNavActive(pathname, item.href);
        return (
          <div key={item.href} data-flip-item="" className="relative shrink-0">
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={headerNavLinkClass(active, embedded)}
            >
              {item.label}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}
