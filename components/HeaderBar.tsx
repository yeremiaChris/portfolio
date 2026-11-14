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
import { cn } from "@/lib/utils";

function HeaderBarLayout() {
  const compact = useHeaderCompact();
  const reducedMotion = useReducedMotion();
  const flipTransition = motionHeaderFlipTransition(!!reducedMotion);
  return (
    <Container className="flex h-[var(--nav-height)] items-center">
      <LayoutGroup id="header-layout">
        <m.div
          layout
          layoutRoot
          layoutDependency={compact}
          transition={flipTransition}
          className={cn(
            "pointer-events-auto relative h-11 w-full",
            compact && "px-1 sm:px-1.5",
          )}
        >
          <m.div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 rounded-full"
            initial={false}
            animate={{
              opacity: compact ? 1 : 0,
              backgroundColor: compact
                ? "rgb(22 27 34 / 0.82)"
                : "rgb(22 27 34 / 0)",
              boxShadow: compact
                ? "0 12px 40px -16px rgb(0 0 0 / 0.5)"
                : "0 0 0 rgb(0 0 0 / 0)",
            }}
            transition={flipTransition}
            style={{
              borderRadius: 9999,
              backdropFilter: compact ? "blur(14px)" : "blur(0px)",
              WebkitBackdropFilter: compact ? "blur(14px)" : "blur(0px)",
            }}
          />

          <m.div
            layout="position"
            className="absolute top-1/2 left-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
          >
            <HeaderNav embedded={compact} />
          </m.div>

          <m.div
            layout="position"
            className="relative flex h-11 w-full items-center"
          >
            <m.div
              layout="position"
              className="flex min-w-0 flex-1 items-center justify-start gap-3 whitespace-nowrap sm:gap-4"
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
                  className="text-muted-foreground bg-foreground/[0.06] hidden h-8 shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-medium tracking-[0.08em] whitespace-nowrap uppercase xl:inline-flex"
                >
                  <span className="bg-status-available size-2 shrink-0 rounded-full" />
                  Available for work
                </m.span>
              ) : null}
            </m.div>

            <m.div
              layout="position"
              className="flex flex-1 items-center justify-end gap-2 whitespace-nowrap"
            >
              <m.div layout="position" className="shrink-0">
                <Link
                  href="/#contact"
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "focus-ring bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent-hover hidden h-8 shrink-0 rounded-full whitespace-nowrap sm:inline-flex",
                    compact ? "px-3.5" : "px-4",
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
