import Link from "next/link";

import { HeaderInteractiveEntry } from "@/components/HeaderInteractiveEntry";
import { HeaderInteractiveFallback } from "@/components/HeaderInteractiveFallback";
import { HeaderFloatingShell } from "@/components/motion/HeaderFloatingShell";

export function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:px-4 md:px-6">
      <HeaderFloatingShell className="pointer-events-auto">
        <div className="flex min-w-0 shrink items-center gap-2 sm:gap-3 lg:gap-4">
          <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
            <span className="text-primary text-[13px] font-bold tracking-tight">
              {"<YC />"}
            </span>
            <span className="font-heading text-foreground hidden truncate font-semibold tracking-tight sm:inline-block">
              yeremiachris.com
            </span>
          </Link>

          <span className="bg-muted/80 text-primary hidden items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium tracking-[0.08em] uppercase xl:inline-flex">
            <span className="bg-status-available size-2 shrink-0 rounded-full" />
            Available for work
          </span>
        </div>

        <div className="contents" data-header-fallback="">
          <HeaderInteractiveFallback />
        </div>
        <HeaderInteractiveEntry />
      </HeaderFloatingShell>
    </header>
  );
}
