import { site } from "@/lib/site";

export function HeroTerminalLiveStatus() {
  return (
    <div className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-1.5 pl-2">
      <span className="relative inline-flex size-2 shrink-0">
        <span
          aria-hidden
          className="hero-terminal-live-ring absolute inset-0 rounded-full bg-[#4cd7f6]/40"
        />
        <span
          aria-hidden
          className="relative inline-flex size-2 rounded-full bg-[#4cd7f6]"
        />
      </span>
      <span className="text-muted-foreground truncate font-mono text-[9px] leading-tight tracking-wide sm:text-[10px]">
        {site.availability}
      </span>
    </div>
  );
}
