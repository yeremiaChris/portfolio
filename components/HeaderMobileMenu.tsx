"use client";

import dynamic from "next/dynamic";
import { m, useReducedMotion } from "motion/react";
import { useState, useSyncExternalStore } from "react";

import { buttonVariants } from "@/components/ui/button-variants";
import {
  headerMobileMenuBottomBarMotion,
  headerMobileMenuMiddleBarMotion,
  headerMobileMenuTopBarMotion,
} from "@/lib/header-mobile-menu-motion";
import { motionSpring } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

const HeaderMobileSheet = dynamic(
  () =>
    import("./HeaderMobileSheet").then((mod) => ({
      default: mod.HeaderMobileSheet,
    })),
  { ssr: false },
);

const barTransition = (reduced: boolean) =>
  reduced ? { duration: 0 } : motionSpring;

function subscribeMobileNavMq(onStoreChange: () => void) {
  const mq = window.matchMedia("(max-width: 859px)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getMobileNavMqSnapshot() {
  return window.matchMedia("(max-width: 859px)").matches;
}

function getMobileNavMqServerSnapshot() {
  return false;
}

function HamburgerIcon({
  open,
  reducedMotion,
}: {
  open: boolean;
  reducedMotion: boolean;
}) {
  const transition = barTransition(reducedMotion);
  const barClassName =
    "absolute top-[calc(50%-1px)] left-0 block h-0.5 w-4 rounded-full bg-current";

  return (
    <span className="relative block size-4" aria-hidden>
      <m.span
        className={barClassName}
        animate={headerMobileMenuTopBarMotion(open)}
        transition={transition}
      />
      <m.span
        className={barClassName}
        animate={headerMobileMenuMiddleBarMotion(open)}
        transition={transition}
      />
      <m.span
        className={barClassName}
        animate={headerMobileMenuBottomBarMotion(open)}
        transition={transition}
      />
    </span>
  );
}

function HamburgerIconStatic({ open }: { open: boolean }) {
  return (
    <span className="relative block size-4" aria-hidden>
      <span
        className={cn(
          "absolute top-[calc(50%-1px)] left-0 block h-0.5 w-4 rounded-full bg-current",
          open ? "rotate-45" : "-translate-y-1",
        )}
      />
      <span
        className={cn(
          "absolute top-[calc(50%-1px)] left-0 block h-0.5 w-4 rounded-full bg-current",
          open && "opacity-0",
        )}
      />
      <span
        className={cn(
          "absolute top-[calc(50%-1px)] left-0 block h-0.5 w-4 rounded-full bg-current",
          open ? "-rotate-45" : "translate-y-1.5",
        )}
      />
    </span>
  );
}

export function HeaderMobileMenu() {
  const [open, setOpen] = useState(false);
  const [loadSheet, setLoadSheet] = useState(false);
  const reducedMotion = useReducedMotion();
  const mobileNavVisible = useSyncExternalStore(
    subscribeMobileNavMq,
    getMobileNavMqSnapshot,
    getMobileNavMqServerSnapshot,
  );

  const toggle = () => {
    setLoadSheet(true);
    setOpen((value) => !value);
  };

  return (
    <>
      <button
        type="button"
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon-sm" }),
          "focus-ring min-[860px]:hidden",
        )}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={toggle}
      >
        {mobileNavVisible ? (
          <HamburgerIcon open={open} reducedMotion={!!reducedMotion} />
        ) : (
          <HamburgerIconStatic open={open} />
        )}
      </button>
      {loadSheet ? (
        <HeaderMobileSheet open={open} onOpenChange={setOpen} />
      ) : null}
    </>
  );
}
