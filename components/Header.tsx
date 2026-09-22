import Link from "next/link";
import { UserIcon } from "lucide-react";

import { HeaderMobileMenu } from "@/components/HeaderMobileMenu";
import { HeaderNav } from "@/components/HeaderNav";
import { Container } from "@/components/Container";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="border-border/40 bg-background/80 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
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
            <span className="relative flex size-2">
              <span className="bg-primary absolute inline-flex size-full animate-ping rounded-full opacity-75" />
              <span className="bg-primary relative inline-flex size-2 rounded-full" />
            </span>
            Available for work
          </span>
        </div>

        <HeaderNav />

        <div className="flex items-center gap-2">
          <Link
            href="/#contact"
            className={cn(
              buttonVariants({ size: "sm" }),
              "hover:bg-primary hidden bg-[#10b981] text-[#00422b] sm:inline-flex",
            )}
          >
            Get in Touch
          </Link>

          <Link
            href={site.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "text-muted-foreground font-mono text-[13px]",
            )}
          >
            CV.pdf
          </Link>

          <span className="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-full">
            <UserIcon className="size-4" />
          </span>

          <HeaderMobileMenu />
        </div>
      </Container>
    </header>
  );
}
