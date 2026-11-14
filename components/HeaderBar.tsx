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
import { motionHeaderFlipTransition } from "@/lib/keffi-header-motion";
import { headerShellMotionStyle } from "@/lib/header-shell-style";
import { cn } from "@/lib/utils";

function HeaderBarLayout() {
  const compact = useHeaderCompact();
  const reducedMotion = useReducedMotion();
  const flipTransition = motionHeaderFlipTransition(!!reducedMotion);

  return (
    <Container className="flex h-[var(--nav-height)] items-center justify-center">
      <LayoutGroup id="header-layout">
        <m.div
          layout
          layoutRoot
          layoutDependency={compact}
          transition={flipTransition}
          className={cn(
            "pointer-events-auto h-11 items-center rounded-full",
            "transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-out",
            compact
              ? "bg-card/90 mx-auto flex w-full max-w-full justify-between gap-1 px-3.5 shadow-[inset_0_0_0_1px_rgb(223_226_235/0.35),0_12px_32px_-18px_rgb(0_0_0/0.5)] backdrop-blur-[14px] sm:w-max sm:justify-start sm:pr-1 sm:pl-4"
              : "grid w-full grid-cols-[1fr_auto_1fr] bg-transparent shadow-none backdrop-blur-none",
          )}
          style={headerShellMotionStyle(compact)}
        >
          <m.div
            layout="position"
            className="flex h-8 min-w-0 shrink-0 items-center gap-3 whitespace-nowrap sm:gap-4 lg:justify-self-start"
          >
            <Link
              href="/"
              className="focus-ring flex h-8 items-center gap-3 rounded-md outline-none"
            >
              <m.span
                layout="position"
                className="text-primary h-[17px] shrink-0 text-[13px] leading-none font-bold tracking-tight"
              >
                {"<YC />"}
              </m.span>
              <m.span
                layout="position"
                className={cn(
                  "font-heading text-foreground hidden h-[17px] shrink-0 leading-none font-semibold tracking-tight whitespace-nowrap sm:inline-block",
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
            className="hidden h-8 shrink-0 items-center lg:flex lg:justify-self-center"
          >
            <HeaderNav embedded={compact} />
          </m.div>

          <m.div
            layout="position"
            className="flex h-8 shrink-0 items-center justify-end gap-2 whitespace-nowrap lg:justify-self-end"
          >
            <m.div layout="position" className="shrink-0">
              <Link
                href="/#contact"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "focus-ring bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent-hover hidden h-8 shrink-0 rounded-full whitespace-nowrap sm:inline-flex",
                  compact && "px-3.5 py-1.5",
                )}
              >
                Get in Touch
              </Link>
            </m.div>
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
