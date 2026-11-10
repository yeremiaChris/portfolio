import {
  HeroCodeSnippetMotion,
  heroCodeBodyMinHeight,
} from "@/components/home/HeroCodeSnippetMotion";

type HeroVisualProps = {
  terminalReady: boolean;
};

export function HeroVisual({ terminalReady }: HeroVisualProps) {
  return (
    <div className="flex w-full min-w-0 justify-center xl:justify-end xl:self-center">
      <div className="hero-code-stage relative w-full max-w-[min(420px,100%)] p-2.5">
        <div aria-hidden className="hero-terminal-glow pointer-events-none" />
        <div className="hero-code-shell relative z-10 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0e14]">
          <div className="flex flex-col">
            <div
              aria-hidden
              className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-3 py-2.5"
            >
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
              </div>
              <span className="text-muted-foreground ml-1 truncate font-mono text-[10px] tracking-wide">
                QueuePanel.tsx
              </span>
            </div>
            <div
              className="hero-code-body relative px-3 py-3.5 sm:px-4 sm:py-4"
              style={{ minHeight: heroCodeBodyMinHeight }}
              data-lenis-prevent=""
            >
              <HeroCodeSnippetMotion ready={terminalReady} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
