import Link from "next/link";

import { buttonVariants } from "@/components/ui/button-variants";
import { HEADER_NAV } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function HeaderNavLinks() {
  return (
    <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
      {HEADER_NAV.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "text-[13px]",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
