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
        <HeaderResumeLink />
        <HeaderMobileMenu />
      </div>
    </>
  );
}
