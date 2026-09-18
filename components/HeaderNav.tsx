"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { HEADER_NAV, isNavActive } from "@/lib/nav";
import { cn } from "@/lib/utils";

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
              active &&
                "bg-secondary text-foreground hover:bg-secondary font-semibold",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
