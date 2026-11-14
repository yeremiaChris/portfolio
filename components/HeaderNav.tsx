"use client";

import Link from "next/link";
import { m, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";

import {
  headerNavEmbeddedClass,
  headerNavExpandedClass,
  headerNavIndicatorClass,
  headerNavLinkClass,
} from "@/lib/header-nav-styles";
import {
  motionHeaderNavIndicatorHideTransition,
  motionHeaderNavIndicatorTransition,
} from "@/lib/keffi-header-motion";
import { HEADER_NAV, isNavActive } from "@/lib/nav";
import { cn } from "@/lib/utils";

type IndicatorBox = {
  x: number;
  width: number;
  visible: boolean;
};

const hiddenIndicator: IndicatorBox = { x: 0, width: 0, visible: false };

type HeaderNavProps = {
  embedded?: boolean;
};

export function HeaderNav({ embedded = false }: HeaderNavProps) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const navRef = useRef<HTMLElement>(null);
  const [indicator, setIndicator] = useState<IndicatorBox>(hiddenIndicator);

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
      <m.span
        aria-hidden
        className={headerNavIndicatorClass(embedded)}
        initial={false}
        animate={{
          x: indicator.x,
          width: indicator.width,
          opacity: indicator.visible ? 1 : 0,
        }}
        transition={
          indicator.visible
            ? motionHeaderNavIndicatorTransition(!!reducedMotion)
            : motionHeaderNavIndicatorHideTransition(!!reducedMotion)
        }
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
