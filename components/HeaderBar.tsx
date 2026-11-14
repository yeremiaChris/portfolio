"use client";

import Link from "next/link";
import { m, useReducedMotion } from "motion/react";

import { Container } from "@/components/Container";
import { HeaderMobileMenu } from "@/components/HeaderMobileMenu";
import { HeaderNav } from "@/components/HeaderNav";
import { HeaderResumeLink } from "@/components/HeaderResumeLink";
import {
  HeaderCompactProvider,
  useHeaderCompact,
} from "@/components/motion/HeaderCompactContext";
import { buttonVariants } from "@/components/ui/button-variants";
import { motionHeaderBackdropTransition } from "@/lib/header-backdrop-motion";
import { cn } from "@/lib/utils";

function HeaderBarLayout() {
  const compact = useHeaderCompact();
  const reducedMotion = useReducedMotion();
  const backdropTransition = motionHeaderBackdropTransition(!!reducedMotion);

  return (
    <Container className="relative flex h-[var(--nav-height)] items-center justify-center">
      <m.div
        aria-hidden
        className="border-border/10 bg-background/35 pointer-events-none absolute inset-x-0 top-1/2 h-[calc(var(--nav-height)-0.35rem)] -translate-y-1/2 border-y"
        initial={false}
        animate={{
          opacity: compact ? 0 : 1,
        }}
        transition={backdropTransition}
      />

      <m.div
        className={cn(
          "pointer-events-auto relative flex w-full max-w-full items-center justify-between gap-2 p-1 sm:gap-3 sm:px-2",
          "lg:mx-auto lg:w-max lg:justify-start",
        )}
        initial={false}
        animate={{ y: compact ? 1 : 0 }}
        transition={backdropTransition}
      >
        <m.div
          aria-hidden
          className="border-border/35 bg-card/72 absolute inset-0 -z-10 overflow-hidden rounded-2xl border shadow-[0_8px_32px_rgb(0_0_0_/0.28)] backdrop-blur-md sm:rounded-full"
          initial={false}
          animate={{
            opacity: compact ? 1 : 0,
            scaleX: compact ? 1 : 1.08,
            scaleY: compact ? 1 : 0.88,
          }}
          transition={backdropTransition}
          style={{ transformOrigin: "center center" }}
        />

        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <Link
            href="/"
            className="focus-ring flex items-center gap-3 rounded-md outline-none"
          >
            <span className="text-primary text-[13px] font-bold tracking-tight">
              {"<YC />"}
            </span>
            <span className="font-heading text-foreground hidden font-semibold tracking-tight sm:inline-block">
              yeremiachris.com
            </span>
          </Link>

          <span className="bg-muted text-primary border-border/25 hidden items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-medium tracking-[0.08em] uppercase xl:inline-flex">
            <span className="bg-status-available size-2 shrink-0 rounded-full" />
            Available for work
          </span>
        </div>

        <HeaderNav />

        <div className="flex items-center gap-2">
          <Link
            href="/#contact"
            className={cn(
              buttonVariants({ size: "sm" }),
              "focus-ring bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent-hover hidden rounded-full sm:inline-flex",
            )}
          >
            Get in Touch
          </Link>
          <HeaderResumeLink />
          <HeaderMobileMenu />
        </div>
      </m.div>
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
