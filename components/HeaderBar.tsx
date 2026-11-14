"use client";

import Link from "next/link";
import { LayoutGroup, m, useReducedMotion } from "motion/react";

import { Container } from "@/components/Container";
import { HeaderMobileMenu } from "@/components/HeaderMobileMenu";
import { HeaderNav } from "@/components/HeaderNav";
import { HeaderResumeLink } from "@/components/HeaderResumeLink";
import {
  HeaderCompactProvider,
  useHeaderCompact,
} from "@/components/motion/HeaderCompactContext";
import { buttonVariants } from "@/components/ui/button-variants";
import { headerShellMotionStyle } from "@/lib/header-shell-style";
import { motionHeaderMorphSpring } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

function HeaderBarLayout() {
  const compact = useHeaderCompact();
  const reducedMotion = useReducedMotion();
  const morphTransition = reducedMotion
    ? { duration: 0 }
    : motionHeaderMorphSpring;

  return (
    <Container className="flex h-[var(--nav-height)] items-center justify-center">
      <LayoutGroup id="header-layout">
        <m.div
          layout
          layoutRoot
          layoutDependency={compact}
          transition={morphTransition}
          className={cn(
            "pointer-events-auto flex h-11 w-full items-center",
            compact
              ? "mx-auto w-[calc(100%-0.5rem)] max-w-full justify-center gap-2 rounded-2xl px-2 sm:w-max sm:gap-3 sm:rounded-full sm:px-2"
              : "justify-between gap-3 lg:gap-4",
          )}
          style={headerShellMotionStyle(compact)}
        >
          <m.div
            layout="position"
            className="flex h-8 min-w-0 shrink-0 items-center gap-3 whitespace-nowrap sm:gap-4"
          >
            <Link
              href="/"
              className="focus-ring flex h-8 items-center gap-3 rounded-md outline-none"
            >
              <m.span
                layout="position"
                className="text-primary shrink-0 text-[13px] font-bold tracking-tight"
              >
                {"<YC />"}
              </m.span>
              <m.span
                layout="position"
                className={cn(
                  "font-heading text-foreground hidden shrink-0 font-semibold tracking-tight whitespace-nowrap sm:inline-block",
                  compact && "!hidden",
                )}
              >
                yeremiachris.com
              </m.span>
            </Link>

            {!compact ? (
              <m.span
                layout="position"
                className="bg-muted text-primary border-border/25 hidden h-8 shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-medium tracking-[0.08em] whitespace-nowrap uppercase xl:inline-flex"
              >
                <span className="bg-status-available size-2 shrink-0 rounded-full" />
                Available for work
              </m.span>
            ) : null}
          </m.div>

          <m.div
            layout="position"
            className="hidden h-8 shrink-0 items-center lg:flex"
          >
            <HeaderNav embedded={compact} />
          </m.div>

          <m.div
            layout="position"
            className="flex h-8 shrink-0 items-center justify-end gap-2 whitespace-nowrap"
          >
            <Link
              href="/#contact"
              className={cn(
                buttonVariants({ size: "sm" }),
                "focus-ring bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent-hover hidden h-8 shrink-0 rounded-full whitespace-nowrap sm:inline-flex",
              )}
            >
              <m.span layout="position">Get in Touch</m.span>
            </Link>
            <m.div layout="position" className="shrink-0">
              <HeaderResumeLink />
            </m.div>
            <m.div layout="position" className="shrink-0">
              <HeaderMobileMenu />
            </m.div>
          </m.div>
        </m.div>
      </LayoutGroup>
    </Container>
  );
}

export function HeaderBar() {
  return (
    <HeaderCompactProvider>
      <HeaderBarLayout />
    </HeaderCompactProvider>
  );
}
