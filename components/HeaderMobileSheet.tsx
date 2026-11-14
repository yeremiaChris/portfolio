"use client";

import Link from "next/link";
import { m, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";

import { buttonVariants } from "@/components/ui/button-variants";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { motionEase, motionStaggerGap } from "@/lib/motion-tokens";
import { HEADER_NAV, isNavActive } from "@/lib/nav";
import { cn } from "@/lib/utils";

interface HeaderMobileSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HeaderMobileSheet({
  open,
  onOpenChange,
}: HeaderMobileSheetProps) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const itemTransition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.28, ease: motionEase };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[min(100%,20rem)]">
        <SheetHeader>
          <SheetTitle className="text-primary">{"<YC />"}</SheetTitle>
        </SheetHeader>
        <m.nav
          aria-label="Mobile"
          className="flex flex-col gap-1 px-4 pb-4"
          initial={false}
          animate={open ? "open" : "closed"}
          variants={{
            open: {
              transition: {
                staggerChildren: reducedMotion ? 0 : motionStaggerGap,
              },
            },
            closed: {},
          }}
        >
          {HEADER_NAV.map((item, index) => {
            const active = isNavActive(pathname, item.href);
            return (
              <m.div
                key={item.href}
                variants={{
                  open: { opacity: 1, x: 0, transition: itemTransition },
                  closed: {
                    opacity: reducedMotion ? 1 : 0,
                    x: reducedMotion ? 0 : 10,
                    transition: itemTransition,
                  },
                }}
                custom={index}
              >
                <SheetClose
                  nativeButton={false}
                  render={
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "focus-ring justify-start rounded-lg outline-none",
                        active &&
                          "bg-brand-accent/12 text-foreground font-semibold",
                      )}
                    />
                  }
                >
                  {item.label}
                </SheetClose>
              </m.div>
            );
          })}
          <m.div
            variants={{
              open: { opacity: 1, x: 0, transition: itemTransition },
              closed: {
                opacity: reducedMotion ? 1 : 0,
                x: reducedMotion ? 0 : 10,
                transition: itemTransition,
              },
            }}
          >
            <SheetClose
              nativeButton={false}
              render={
                <Link
                  href="/#contact"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "focus-ring bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent-hover mt-2 justify-start rounded-lg outline-none",
                  )}
                />
              }
            >
              Get in Touch
            </SheetClose>
          </m.div>
        </m.nav>
      </SheetContent>
    </Sheet>
  );
}
