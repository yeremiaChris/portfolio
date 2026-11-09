"use client";

import Link from "next/link";
import { m } from "motion/react";
import { usePathname } from "next/navigation";

import { buttonVariants } from "@/components/ui/button-variants";
import { motionSpring } from "@/lib/motion-tokens";
import { HEADER_NAV, isNavActive } from "@/lib/nav";
import { cn } from "@/lib/utils";

const navIndicatorLayoutId = "header-nav-indicator";

export function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
      {HEADER_NAV.map((item) => {
        const active = isNavActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "text-[13px]",
              "relative",
              active && "text-foreground font-semibold",
            )}
          >
            {active ? (
              <m.span
                layoutId={navIndicatorLayoutId}
                className="bg-brand-accent/18 ring-brand-accent/35 absolute inset-0 rounded-lg ring-1 ring-inset"
                transition={motionSpring}
              />
            ) : null}
            <span className="relative z-10">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
