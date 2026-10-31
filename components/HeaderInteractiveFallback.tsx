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
      <div className="flex items-center gap-2">
        <Link
          href="/#contact"
          className={cn(
            buttonVariants({ size: "sm" }),
            "hidden bg-[#4cd7f6] text-[#042028] hover:bg-[#3bc4e3] sm:inline-flex",
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
