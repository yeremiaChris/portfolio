type SnippetToken = {
  text: string;
  tone?: "kw" | "fn" | "str" | "type" | "muted";
};

type SnippetLine = {
  n: number;
  tokens: SnippetToken[];
};

const TONE_CLASS = {
  kw: "text-brand-accent",
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

export function HeroCodeSnippet() {
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
