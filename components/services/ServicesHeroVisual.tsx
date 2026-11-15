import { cn } from "@/lib/utils";

type ServicesHeroVisualProps = {
  className?: string;
};

export function ServicesHeroVisual({ className }: ServicesHeroVisualProps) {
  return (
    <div
      className={cn(
        "relative h-[200px] min-h-[200px] w-full max-w-[340px] sm:h-[220px] sm:min-h-[220px]",
        className,
      )}
      aria-hidden
    >
      <div className="relative h-full w-full">
        <div className="border-border/55 absolute inset-0 overflow-hidden rounded-2xl border bg-[#0c1018] shadow-[0_24px_48px_rgb(0_0_0_/_0.35),inset_0_1px_0_rgb(255_255_255_/_0.06)]">
          <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2.5">
            <span className="size-2 rounded-full bg-[#ff5f57]/90" />
            <span className="size-2 rounded-full bg-[#febc2e]/90" />
            <span className="size-2 rounded-full bg-[#28c840]/90" />
            <span className="bg-background/40 ml-2 h-4 min-w-0 flex-1 rounded-md" />
          </div>
          <div className="space-y-3 p-4">
            <span className="bg-brand-accent/80 block h-2 w-[46%] rounded-sm" />
            <span className="bg-foreground/12 block h-2 w-full rounded-sm" />
            <span className="bg-foreground/10 block h-2 w-[88%] rounded-sm" />
            <span className="mt-2 flex gap-2">
              <span className="bg-brand-accent/25 border-brand-accent/20 h-14 min-w-0 flex-1 rounded-lg border" />
              <span className="bg-foreground/[0.06] border-border/40 h-14 min-w-0 flex-1 rounded-lg border" />
            </span>
          </div>
        </div>
        <div className="border-border/50 absolute right-0 bottom-0 w-[58%] translate-x-2 translate-y-3 overflow-hidden rounded-xl border bg-[#0a0e14] p-3 shadow-[0_16px_32px_rgb(0_0_0_/_0.4)]">
          <span className="bg-foreground/20 mb-2 block h-1.5 w-12 rounded-sm" />
          <span className="mb-3 flex h-10 items-end gap-1">
            <span className="bg-brand-accent/70 h-[55%] w-2 rounded-t-sm" />
            <span className="bg-brand-accent/45 h-[78%] w-2 rounded-t-sm" />
            <span className="bg-brand-accent/90 h-full w-2 rounded-t-sm" />
            <span className="bg-brand-accent/35 h-[42%] w-2 rounded-t-sm" />
            <span className="bg-brand-accent/60 h-[64%] w-2 rounded-t-sm" />
          </span>
          <span className="space-y-1.5">
            <span className="bg-foreground/[0.07] block h-1.5 w-full rounded-sm" />
            <span className="bg-foreground/[0.05] block h-1.5 w-[92%] rounded-sm" />
            <span className="bg-foreground/[0.05] block h-1.5 w-[78%] rounded-sm" />
          </span>
        </div>
      </div>
    </div>
  );
}
