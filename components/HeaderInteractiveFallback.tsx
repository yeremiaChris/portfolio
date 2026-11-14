import Link from "next/link";

import { HeaderMobileMenuFallback } from "@/components/HeaderMobileMenuFallback";
import { HeaderNavLinks } from "@/components/HeaderNavLinks";
import { HeaderResumeLinkStatic } from "@/components/HeaderResumeLinkStatic";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function HeaderInteractiveFallback() {
  return (
    <>
      <HeaderNavLinks />
      <div className="pointer-events-auto ml-auto flex items-center justify-end gap-2 lg:ml-0">
        <Link
          href="/#contact"
          className={cn(
            buttonVariants({ size: "sm" }),
            "focus-ring bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent-hover hidden rounded-full sm:inline-flex",
          )}
        >
          Get in Touch
        </Link>
        <HeaderResumeLinkStatic />
        <HeaderMobileMenuFallback />
      </div>
    </>
  );
}
