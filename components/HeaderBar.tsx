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
import {
  headerBarChromeTransitionClass,
  headerBarCompactClass,
  headerBarExpandedClass,
} from "@/lib/header-nav-styles";
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
          data-flip-bar=""
          className={cn(
            headerBarChromeTransitionClass,
            compact ? headerBarCompactClass() : headerBarExpandedClass(),
          )}
          style={{ borderRadius: 9999 }}
        >
          <m.div
            layout="position"
            data-flip-item=""
            className="flex min-w-0 items-center gap-3 justify-self-start whitespace-nowrap sm:gap-4"
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
                className="text-muted-foreground bg-foreground/[0.06] hidden h-8 shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-medium tracking-[0.08em] whitespace-nowrap uppercase min-[860px]:inline-flex"
              >
                <span className="bg-status-available size-2 shrink-0 rounded-full" />
                Available for work
              </m.span>
            ) : null}
          </m.div>

          <m.div
            layout="position"
            data-flip-item=""
            className="hidden justify-self-center min-[860px]:block"
          >
            <HeaderNav embedded={compact} />
          </m.div>

          <m.div
            layout="position"
            data-flip-item=""
            className="flex items-center gap-2 justify-self-end whitespace-nowrap"
          >
            <m.div layout="position" data-flip-item="" className="shrink-0">
              <Link
                href="/#contact"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "focus-ring bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent-hover inline-flex h-8 shrink-0 rounded-full px-4 whitespace-nowrap",
                  compact && "px-3.5",
                )}
              >
                Get in Touch
              </Link>
            </m.div>
            <m.div
              layout="position"
              data-flip-item=""
              className="hidden shrink-0 min-[860px]:block"
            >
              <HeaderResumeLink />
            </m.div>
            <m.div layout="position" data-flip-item="" className="shrink-0">
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
