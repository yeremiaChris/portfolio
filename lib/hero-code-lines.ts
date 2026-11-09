export type SnippetToken = {
  text: string;
  tone?: "kw" | "fn" | "str" | "type" | "muted";
};

export type SnippetLineKind = "command" | "output" | "blank";

export type SnippetLine = {
  n: number;
  kind: SnippetLineKind;
  tokens: SnippetToken[];
};

export const HERO_CODE_LINES: SnippetLine[] = [
  {
    n: 1,
    kind: "command",
    tokens: [
      { text: "import", tone: "kw" },
      { text: " { useQuery } ", tone: "muted" },
      { text: "from", tone: "kw" },
    ],
  },
  {
    n: 2,
    kind: "output",
    tokens: [{ text: "  '@tanstack/react-query';", tone: "str" }],
  },
  { n: 3, kind: "blank", tokens: [] },
  {
    n: 4,
    kind: "command",
    tokens: [
      { text: "type", tone: "kw" },
      { text: " Row ", tone: "type" },
      { text: "= { id: ", tone: "muted" },
      { text: "string", tone: "str" },
      { text: " };", tone: "muted" },
    ],
  },
  { n: 5, kind: "blank", tokens: [] },
  {
    n: 6,
    kind: "command",
    tokens: [
      { text: "export function", tone: "kw" },
      { text: " QueuePanel", tone: "fn" },
      { text: "() {", tone: "muted" },
    ],
  },
  {
    n: 7,
    kind: "output",
    tokens: [
      { text: "  const q = ", tone: "muted" },
      { text: "useQuery", tone: "fn" },
      { text: "({", tone: "muted" },
    ],
  },
  {
    n: 8,
    kind: "output",
    tokens: [
      { text: "    queryKey: ", tone: "muted" },
      { text: "['queue'],", tone: "str" },
    ],
  },
  {
    n: 9,
    kind: "output",
    tokens: [
      { text: "    queryFn: ", tone: "muted" },
      { text: "fetchQueue,", tone: "fn" },
    ],
  },
  {
    n: 10,
    kind: "output",
    tokens: [{ text: "  });", tone: "muted" }],
  },
  {
    n: 11,
    kind: "output",
    tokens: [
      { text: "  if (q.isPending) ", tone: "muted" },
      { text: "return", tone: "kw" },
      { text: " null;", tone: "muted" },
    ],
  },
  {
    n: 12,
    kind: "output",
    tokens: [{ text: "  return q.data?.map((row: Row) => (", tone: "muted" }],
  },
  {
    n: 13,
    kind: "output",
    tokens: [
      { text: "    <", tone: "muted" },
      { text: "li", tone: "type" },
      { text: " key={row.id} />", tone: "muted" },
    ],
  },
  {
    n: 14,
    kind: "output",
    tokens: [{ text: "  ));", tone: "muted" }],
  },
  {
    n: 15,
    kind: "output",
    tokens: [{ text: "}", tone: "muted" }],
  },
];

export const TONE_CLASS = {
  kw: "text-brand-accent",
  fn: "text-[#7ee8fc]",
  str: "text-[#6ecfb8]",
  type: "text-[#9ae6ff]",
  muted: "text-[#8b9cb3]",
} as const;

export const HERO_CODE_LINE_COUNT = HERO_CODE_LINES.length;

export const HERO_CODE_SNIPPET_ARIA_LABEL = HERO_CODE_LINES.map((line) =>
  linePlainText(line),
)
  .join("\n")
  .trim();

export function linePlainText(line: SnippetLine): string {
  if (line.tokens.length === 0) {
    return "";
  }
  return line.tokens.map((token) => token.text).join("");
}

export function commandLineNumbers(): number[] {
  return HERO_CODE_LINES.filter((line) => line.kind === "command").map(
    (line) => line.n,
  );
}
