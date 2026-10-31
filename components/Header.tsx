import Link from "next/link";

import { HeaderInteractiveEntry } from "@/components/HeaderInteractiveEntry";
import { HeaderInteractiveFallback } from "@/components/HeaderInteractiveFallback";
import { Container } from "@/components/Container";

export function Header() {
  return (
    <header className="border-border/40 bg-background/80 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md">
      <Container className="flex h-[var(--nav-height)] items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-primary text-[13px] font-bold tracking-tight">
              {"<YC />"}
            </span>
            <span className="font-heading text-foreground hidden font-semibold tracking-tight sm:inline-block">
              yeremia.dev
            </span>
          </Link>

          <span className="bg-muted text-primary hidden items-center gap-1.5 rounded-lg px-2 py-0.5 text-[10px] font-medium tracking-[0.08em] uppercase xl:inline-flex">
            <span className="bg-status-available size-2 shrink-0 rounded-full" />
            Available for work
          </span>
        </div>

        <div className="contents" data-header-fallback="">
          <HeaderInteractiveFallback />
        </div>
        <HeaderInteractiveEntry />
      </Container>
    </header>
  );
}
