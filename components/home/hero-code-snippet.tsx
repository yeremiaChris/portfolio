import {
  HERO_CODE_LINES,
  TONE_CLASS,
  linePlainText,
} from "@/lib/hero-code-lines";

export function HeroCodeSnippet() {
  return (
    <div className="hero-code-snippet grid gap-y-0.5">
      {HERO_CODE_LINES.map((line) => (
        <div
          key={line.n}
          className="grid grid-cols-[1.25rem_minmax(0,1fr)] items-baseline gap-x-2.5"
        >
          <span className="text-[9px] leading-[1.55] text-white/25 tabular-nums select-none">
            {line.n}
          </span>
          <span className="min-w-0 font-mono text-[10px] leading-[1.55] break-all sm:text-[10.5px] sm:break-normal sm:whitespace-pre">
            {line.tokens.length === 0
              ? "\u00A0"
              : line.tokens.map((token, index) => (
                  <span
                    key={`${line.n}-${index}`}
                    className={token.tone ? TONE_CLASS[token.tone] : undefined}
                  >
                    {token.text}
                  </span>
                ))}
          </span>
        </div>
      ))}
    </div>
  );
}

export function heroCodeSnippetPlainText(): string {
  return HERO_CODE_LINES.map((line) => linePlainText(line))
    .join("\n")
    .trim();
}
