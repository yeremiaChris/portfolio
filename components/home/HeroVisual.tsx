import { HeroCodeSnippet } from "@/components/home/hero-code-snippet";

export function HeroVisual() {
  return (
    <div
      aria-hidden
      className="hidden w-full min-w-0 xl:flex xl:justify-end xl:self-start"
    >
      <div className="hero-code-stage w-full max-w-[420px]">
        <div className="border-gradient hero-code-shell relative w-full overflow-hidden rounded-2xl bg-[#0a0e14]/80 shadow-[0_0_64px_rgb(76_215_246/0.16)] backdrop-blur-md">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-3 py-2.5">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
              </div>
              <span className="text-muted-foreground ml-1 truncate font-mono text-[10px] tracking-wide">
                QueuePanel.tsx
              </span>
            </div>
            <div className="hero-code-body relative px-3 py-3.5 sm:px-4 sm:py-4">
              <HeroCodeSnippet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
