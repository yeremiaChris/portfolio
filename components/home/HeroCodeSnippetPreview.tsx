import {
  HERO_CODE_LINES,
  HERO_CODE_SNIPPET_ARIA_LABEL,
  TONE_CLASS,
  linePlainText,
  type SnippetLine,
} from "@/lib/hero-code-lines";
const LINE_ROW_CLASS =
  "relative grid grid-cols-[1.25rem_minmax(0,1fr)] items-baseline gap-x-2.5 rounded-sm px-0.5 -mx-0.5";

function renderTokens(line: SnippetLine) {
  if (line.tokens.length === 0) {
    return "\u00A0";
  }

  return line.tokens.map((token, index) => (
    <span
      key={`${line.n}-${index}`}
      className={token.tone ? TONE_CLASS[token.tone] : undefined}
    >
      {token.text}
    </span>
  ));
}

export function HeroCodeSnippetPreview() {
  return (
    <div className="hero-code-snippet grid gap-y-0.5">
      <p className="sr-only">{HERO_CODE_SNIPPET_ARIA_LABEL}</p>
      {HERO_CODE_LINES.map((line) => (
        <div
          key={line.n}
          role="presentation"
          aria-hidden
          className={LINE_ROW_CLASS}
          style={{ minHeight: "1.55em" }}
        >
          <span className="text-[9px] leading-[1.55] text-white/25 tabular-nums select-none">
            {line.n}
          </span>
          <span className="min-w-0 font-mono text-[10px] leading-[1.55] break-all sm:text-[10.5px] sm:break-normal sm:whitespace-pre">
            {line.kind === "command" || line.kind === "output"
              ? renderTokens(line)
              : linePlainText(line) || "\u00A0"}
          </span>
        </div>
      ))}
    </div>
  );
}
