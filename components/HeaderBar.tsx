"use client";

import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { useRef } from "react";

import { Container } from "@/components/Container";
import { HeaderAvailabilityBadge } from "@/components/HeaderAvailabilityBadge";
import { HeaderMobileMenu } from "@/components/HeaderMobileMenu";
import { HeaderNav } from "@/components/HeaderNav";
import { HeaderResumeLink } from "@/components/HeaderResumeLink";
import {
  HeaderCompactProvider,
  useHeaderCompact,
} from "@/components/motion/HeaderCompactContext";
import { useHeaderBarFlip } from "@/components/motion/useHeaderBarFlip";
import { buttonVariants } from "@/components/ui/button-variants";
import { headerLogoDomainClass } from "@/lib/header-availability-badge";
import {
  headerBarChromeTransitionClass,
  headerBarCompactClass,
  headerBarExpandedClass,
} from "@/lib/header-nav-styles";
import { cn } from "@/lib/utils";

function HeaderBarLayout() {
  const compact = useHeaderCompact();
  const reducedMotion = useReducedMotion();
  const barRef = useRef<HTMLDivElement>(null);

  useHeaderBarFlip(barRef, compact, !!reducedMotion);

  return (
    <Container className="flex h-[var(--nav-height)] items-center">
      <div
        ref={barRef}
        data-flip-bar=""
        className={cn(
          headerBarChromeTransitionClass(compact),
          compact ? headerBarCompactClass() : headerBarExpandedClass(),
        )}
        style={{ borderRadius: 9999 }}
      >
        <div
          data-flip-item=""
          className="flex h-8 max-h-8 min-h-8 min-w-0 items-center gap-2.5 justify-self-start whitespace-nowrap sm:gap-3"
        >
          <Link
            href="/"
            className="focus-ring flex h-8 items-center gap-3 rounded-md outline-none"
          >
            <span
              data-flip-item=""
              className="text-primary h-[17px] shrink-0 text-[13px] leading-none font-bold tracking-tight"
            >
              {"<YC />"}
            </span>
            <span data-flip-item="" className={headerLogoDomainClass()}>
              yeremiachris.com
            </span>
          </Link>

          <HeaderAvailabilityBadge />
        </div>

        <div
          data-flip-item=""
          className="hidden shrink-0 justify-self-center min-[860px]:block"
        >
          <HeaderNav embedded={compact} />
        </div>

        <div
          data-flip-item=""
          className="flex h-8 max-h-8 min-h-8 shrink-0 items-center gap-2.5 justify-self-end whitespace-nowrap"
        >
          <Link
            data-flip-item=""
            href="/#contact"
            className={cn(
              buttonVariants({ size: "sm" }),
              "focus-ring bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent-hover inline-flex h-8 shrink-0 rounded-full px-4 whitespace-nowrap",
              compact && "px-3.5",
            )}
          >
            Get in Touch
          </Link>
          <div data-flip-item="" className="hidden shrink-0 min-[860px]:block">
            <HeaderResumeLink />
          </div>
          <div data-flip-item="" className="shrink-0">
            <HeaderMobileMenu />
          </div>
        </div>
      </div>
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
