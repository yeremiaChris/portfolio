import Link from "next/link";

import { HeaderInteractiveEntry } from "@/components/HeaderInteractiveEntry";
import { HeaderInteractiveFallback } from "@/components/HeaderInteractiveFallback";
import { Container } from "@/components/Container";
import { HeaderCompactProvider } from "@/components/motion/HeaderCompactContext";

export function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <HeaderCompactProvider>
        <Container className="flex h-[var(--nav-height)] items-center gap-3 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-4">
          <div className="pointer-events-auto flex min-w-0 items-center gap-3 sm:gap-4">
            <Link
              href="/"
              className="focus-ring flex items-center gap-3 rounded-md outline-none"
            >
              <span className="text-primary text-[13px] font-bold tracking-tight">
                {"<YC />"}
              </span>
              <span className="font-heading text-foreground hidden font-semibold tracking-tight sm:inline-block">
                yeremiachris.com
              </span>
            </Link>

            <span className="bg-muted text-primary border-border/25 hidden items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-medium tracking-[0.08em] uppercase xl:inline-flex">
              <span className="bg-status-available size-2 shrink-0 rounded-full" />
              Available for work
            </span>
          </div>

          <div
            className="contents lg:justify-self-center"
            data-header-fallback=""
          >
            <HeaderInteractiveFallback />
          </div>
          <HeaderInteractiveEntry />
        </Container>
      </HeaderCompactProvider>
    </header>
  );
}
