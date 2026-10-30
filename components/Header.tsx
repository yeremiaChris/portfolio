import Link from "next/link";

import { HeaderMobileMenu } from "@/components/HeaderMobileMenu";
import { HeaderResumeLink } from "@/components/HeaderResumeLink";
import { HeaderNav } from "@/components/HeaderNav";
import { Container } from "@/components/Container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="border-border/40 bg-background/80 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md">
      <Container className="flex h-[var(--nav-height)] items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-primary font-mono text-[13px] font-bold tracking-tight">
              {"<YC />"}
            </span>
            <span className="font-heading text-foreground hidden font-semibold tracking-tight sm:inline-block">
              yeremia.dev
            </span>
          </Link>

          <span className="bg-muted text-primary hidden items-center gap-1.5 rounded-lg px-2 py-0.5 text-[10px] font-medium tracking-[0.08em] uppercase xl:inline-flex">
            <span className="bg-primary size-2 shrink-0 rounded-full" />
            Available for work
          </span>
        </div>

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
      </Container>
    </header>
  );
}
