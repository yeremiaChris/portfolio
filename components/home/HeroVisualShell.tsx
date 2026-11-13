import { HeroCodeSnippetPreview } from "@/components/home/HeroCodeSnippetPreview";
import { HeroTerminalLiveStatus } from "@/components/home/HeroTerminalLiveStatus";
import { heroCodeBodyMinHeight } from "@/lib/hero-code-lines";
import { homeSignalTerminalShellClassName } from "@/lib/home-signal-card";

export function HeroVisualShell() {
  return (
    <div className="flex w-full min-w-0 justify-center xl:justify-end xl:self-center">
      <div className="hero-code-stage relative w-full max-w-[min(420px,100%)]">
        <div className={homeSignalTerminalShellClassName}>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-3 py-2.5">
              <div aria-hidden className="flex shrink-0 gap-1.5">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
              </div>
              <span className="text-muted-foreground shrink-0 font-mono text-[10px] tracking-wide">
                QueuePanel.tsx
              </span>
              <HeroTerminalLiveStatus />
            </div>
            <div
              className="hero-code-body relative px-3 py-3.5 sm:px-4 sm:py-4"
              style={{ minHeight: heroCodeBodyMinHeight }}
            >
              <HeroCodeSnippetPreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
