import Link from "next/link";

import { HeaderMobileMenu } from "@/components/HeaderMobileMenu";
import { HeaderNav } from "@/components/HeaderNav";
import { HeaderResumeLink } from "@/components/HeaderResumeLink";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function HeaderInteractiveHydrated() {
  return (
    <>
      <HeaderNav />
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
        <HeaderResumeLink />
        <HeaderMobileMenu />
      </div>
    </>
  );
}
