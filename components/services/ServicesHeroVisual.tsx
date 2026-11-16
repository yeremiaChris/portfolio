import { cn } from "@/lib/utils";

type ServicesHeroVisualProps = {
  className?: string;
};

export function ServicesHeroVisual({ className }: ServicesHeroVisualProps) {
  return (
    <div
      className={cn(
        "relative h-[150px] min-h-[150px] w-full max-w-[280px] sm:h-[165px] sm:min-h-[165px] lg:h-[190px] lg:min-h-[190px] lg:max-w-[300px]",
        className,
      )}
      aria-hidden
    >
      <div className="relative h-full w-full">
        <div className="border-border/55 ring-border/30 absolute inset-0 overflow-hidden rounded-xl border bg-[#0c1018] shadow-[0_16px_32px_rgb(0_0_0_/_0.32),inset_0_1px_0_rgb(255_255_255_/_0.06)] ring-1 sm:rounded-2xl">
          <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-2.5 py-2">
            <span className="size-1.5 rounded-full bg-[#ff5f57]/90" />
            <span className="size-1.5 rounded-full bg-[#febc2e]/90" />
            <span className="size-1.5 rounded-full bg-[#28c840]/90" />
            <span className="bg-background/40 ml-1.5 h-3 min-w-0 flex-1 rounded-md" />
          </div>
          <div className="space-y-2 p-3">
            <span className="bg-brand-accent/80 block h-1.5 w-[46%] rounded-sm" />
            <span className="bg-foreground/12 block h-1.5 w-full rounded-sm" />
            <span className="bg-foreground/10 block h-1.5 w-[88%] rounded-sm" />
            <span className="mt-1.5 flex gap-1.5">
              <span className="bg-brand-accent/25 border-brand-accent/20 h-12 min-w-0 flex-1 rounded-md border lg:h-14" />
              <span className="bg-foreground/[0.06] border-border/40 h-12 min-w-0 flex-1 rounded-md border lg:h-14" />
            </span>
          </div>
        </div>
        <div className="border-border/50 absolute right-0 bottom-0 w-[58%] translate-x-1.5 translate-y-2 overflow-hidden rounded-lg border bg-[#0a0e14] p-2 shadow-[0_12px_24px_rgb(0_0_0_/_0.38)] sm:rounded-xl sm:p-2.5">
          <span className="bg-foreground/20 mb-1.5 block h-1 w-10 rounded-sm" />
          <span className="mb-2 flex h-8 items-end gap-0.5">
            <span className="bg-brand-accent/70 h-[55%] w-1.5 rounded-t-sm" />
            <span className="bg-brand-accent/45 h-[78%] w-1.5 rounded-t-sm" />
            <span className="bg-brand-accent/90 h-full w-1.5 rounded-t-sm" />
            <span className="bg-brand-accent/35 h-[42%] w-1.5 rounded-t-sm" />
            <span className="bg-brand-accent/60 h-[64%] w-1.5 rounded-t-sm" />
          </span>
          <span className="space-y-1">
            <span className="bg-foreground/[0.07] block h-1 w-full rounded-sm" />
            <span className="bg-foreground/[0.05] block h-1 w-[92%] rounded-sm" />
          </span>
        </div>
      </div>
    </div>
  );
}
