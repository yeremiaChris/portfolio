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
import { headerShellCompactClass } from "@/lib/header-nav-styles";
import { motionHeaderMorphSpring } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

function HeaderBarLayout() {
  const compact = useHeaderCompact();
  const reducedMotion = useReducedMotion();
  const layoutTransition = reducedMotion
    ? { duration: 0 }
    : motionHeaderMorphSpring;

  return (
    <Container className="flex h-[var(--nav-height)] items-center justify-center">
      <LayoutGroup id="header-layout">
        <m.div
          layout
          layoutRoot
          transition={layoutTransition}
          className={cn(
            "pointer-events-auto w-full items-center gap-2 sm:gap-3",
            compact
              ? cn(
                  headerShellCompactClass(),
                  "mx-auto flex w-[calc(100%-0.5rem)] max-w-full rounded-2xl p-1.5 sm:w-max sm:rounded-full sm:px-2",
                )
              : "grid grid-cols-[minmax(0,1fr)_auto] gap-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-4",
          )}
        >
          <m.div
            layout="position"
            className="flex min-w-0 items-center gap-3 sm:gap-4"
          >
            <Link
              href="/"
              className="focus-ring flex items-center gap-3 rounded-md outline-none"
            >
              <m.span
                layout="position"
                className="text-primary text-[13px] font-bold tracking-tight"
              >
                {"<YC />"}
              </m.span>
              <m.span
                layout="position"
                className={cn(
                  "font-heading text-foreground font-semibold tracking-tight",
                  compact ? "hidden" : "hidden sm:inline-block",
                )}
              >
                yeremiachris.com
              </m.span>
            </Link>

            {!compact ? (
              <m.span
                layout="position"
                className="bg-muted text-primary border-border/25 hidden items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-medium tracking-[0.08em] uppercase xl:inline-flex"
              >
                <span className="bg-status-available size-2 shrink-0 rounded-full" />
                Available for work
              </m.span>
            ) : null}
          </m.div>

          <HeaderNav embedded={compact} />

          <m.div
            layout="position"
            className={cn(
              "flex items-center justify-end gap-2",
              compact ? "" : "lg:ml-0",
            )}
          >
            <Link
              href="/#contact"
              className={cn(
                buttonVariants({ size: "sm" }),
                "focus-ring bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent-hover hidden rounded-full sm:inline-flex",
              )}
            >
              <m.span layout="position">Get in Touch</m.span>
            </Link>
            <HeaderResumeLink />
            <HeaderMobileMenu />
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
