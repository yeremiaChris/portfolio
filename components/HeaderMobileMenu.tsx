"use client";

import dynamic from "next/dynamic";
import { m, useReducedMotion } from "motion/react";
import { useState } from "react";

import { buttonVariants } from "@/components/ui/button-variants";
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

export function HeaderMobileMenu() {
  const [open, setOpen] = useState(false);
  const [loadSheet, setLoadSheet] = useState(false);
  const reducedMotion = useReducedMotion();

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
        <span className="relative block size-4" aria-hidden>
          <m.span
            className="absolute left-0 block h-0.5 w-4 rounded-full bg-current"
            animate={
              open
                ? { top: "calc(50% - 1px)", rotate: 45 }
                : { top: 3, rotate: 0 }
            }
            transition={barTransition(!!reducedMotion)}
          />
          <m.span
            className="absolute top-[calc(50%-1px)] left-0 block h-0.5 w-4 rounded-full bg-current"
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            transition={barTransition(!!reducedMotion)}
          />
          <m.span
            className="absolute left-0 block h-0.5 w-4 rounded-full bg-current"
            animate={
              open
                ? { top: "calc(50% - 1px)", rotate: -45 }
                : { top: 13, rotate: 0 }
            }
            transition={barTransition(!!reducedMotion)}
          />
        </span>
      </button>
      {loadSheet ? (
        <HeaderMobileSheet open={open} onOpenChange={setOpen} />
      ) : null}
    </>
  );
}
