"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type SnippetToken = {
  text: string;
  tone?: "kw" | "fn" | "str" | "type" | "muted";
};

type SnippetLine = {
  n: number;
  tokens: SnippetToken[];
};

const TONE_CLASS = {
  kw: "text-[#4cd7f6]",
  fn: "text-[#7ee8fc]",
  str: "text-[#6ecfb8]",
  type: "text-[#9ae6ff]",
  muted: "text-[#8b9cb3]",
} as const;

const SNIPPET_LINES: SnippetLine[] = [
  {
    n: 1,
    tokens: [
      { text: "import", tone: "kw" },
      { text: " { useQuery } ", tone: "muted" },
      { text: "from", tone: "kw" },
    ],
  },
  {
    n: 2,
    tokens: [{ text: "  '@tanstack/react-query';", tone: "str" }],
  },
  { n: 3, tokens: [] },
  {
    n: 4,
    tokens: [
      { text: "type", tone: "kw" },
      { text: " Row ", tone: "type" },
      { text: "= { id: ", tone: "muted" },
      { text: "string", tone: "str" },
      { text: " };", tone: "muted" },
    ],
  },
  { n: 5, tokens: [] },
  {
    n: 6,
    tokens: [
      { text: "export function", tone: "kw" },
      { text: " QueuePanel", tone: "fn" },
      { text: "() {", tone: "muted" },
    ],
  },
  {
    n: 7,
    tokens: [
      { text: "  const q = ", tone: "muted" },
      { text: "useQuery", tone: "fn" },
      { text: "({", tone: "muted" },
    ],
  },
  {
    n: 8,
    tokens: [
      { text: "    queryKey: ", tone: "muted" },
      { text: "['queue'],", tone: "str" },
    ],
  },
  {
    n: 9,
    tokens: [
      { text: "    queryFn: ", tone: "muted" },
      { text: "fetchQueue,", tone: "fn" },
    ],
  },
  {
    n: 10,
    tokens: [{ text: "  });", tone: "muted" }],
  },
  {
    n: 11,
    tokens: [
      { text: "  if (q.isPending) ", tone: "muted" },
      { text: "return", tone: "kw" },
      { text: " null;", tone: "muted" },
    ],
  },
  {
    n: 12,
    tokens: [{ text: "  return q.data?.map((row: Row) => (", tone: "muted" }],
  },
  {
    n: 13,
    tokens: [
      { text: "    <", tone: "muted" },
      { text: "li", tone: "type" },
      { text: " key={row.id} />", tone: "muted" },
    ],
  },
  {
    n: 14,
    tokens: [{ text: "  ));", tone: "muted" }],
  },
  {
    n: 15,
    tokens: [{ text: "}", tone: "muted" }],
  },
];

function CodeSnippet() {
  return (
    <div className="hero-code-snippet grid gap-y-0.5">
      {SNIPPET_LINES.map((line) => (
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

export function HeroVisual() {
  const shellRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shell = shellRef.current;
    const body = codeRef.current;
    if (!shell || !body) return;

    let bounds: DOMRect | null = null;

    const setActive = (active: boolean) => {
      shell.classList.toggle("hero-code-shell--active", active);
      if (!active) {
        bounds = null;
        body.style.removeProperty("--hero-code-spot-x");
        body.style.removeProperty("--hero-code-spot-y");
      }
    };

    const onEnter = () => {
      bounds = shell.getBoundingClientRect();
      setActive(true);
    };

    const onLeave = () => {
      setActive(false);
    };

    const onMove = (event: PointerEvent) => {
      if (!bounds) {
        bounds = shell.getBoundingClientRect();
      }
      body.style.setProperty(
        "--hero-code-spot-x",
        `${event.clientX - bounds.left}px`,
      );
      body.style.setProperty(
        "--hero-code-spot-y",
        `${event.clientY - bounds.top}px`,
      );
    };

    shell.addEventListener("pointerenter", onEnter);
    shell.addEventListener("pointerleave", onLeave);
    shell.addEventListener("pointermove", onMove);

    return () => {
      shell.removeEventListener("pointerenter", onEnter);
      shell.removeEventListener("pointerleave", onLeave);
      shell.removeEventListener("pointermove", onMove);
      setActive(false);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="hidden w-full min-w-0 xl:flex xl:justify-end xl:self-start"
    >
      <div className="hero-code-stage w-full max-w-[420px]">
        <div
          ref={shellRef}
          className={cn(
            "border-gradient hero-code-shell relative w-full overflow-hidden rounded-2xl bg-[#0a0e14]/80 shadow-[0_0_64px_rgb(76_215_246/0.16)] backdrop-blur-md",
          )}
        >
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
            <div
              ref={codeRef}
              className="hero-code-body relative px-3 py-3.5 sm:px-4 sm:py-4"
            >
              <CodeSnippet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
