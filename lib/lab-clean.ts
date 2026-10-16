const LONG_CODE_BLOCK_CHARS = 400;

/**
 * Turn MDX/markdown into plain text suitable for chunking and embedding.
 * Strips imports, JSX/MDX components, HTML, fence markers; skips long code.
 */
export function cleanMarkdownSource(raw: string): string {
  let text = raw.replace(/\r\n/g, "\n");

  text = text.replace(/^(import|export)\s.+$/gm, "");

  text = text.replace(/```[\w+-]*\n([\s\S]*?)```/g, (_match, code: string) => {
    const trimmed = code.trim();
    if (trimmed.length > LONG_CODE_BLOCK_CHARS) return "";
    return trimmed;
  });

  text = text.replace(/<[A-Z][A-Za-z0-9.]*\b[^>]*\/>/g, "");
  text = text.replace(
    /<[A-Z][A-Za-z0-9.]*\b[^>]*>[\s\S]*?<\/[A-Z][A-Za-z0-9.]*>/g,
    "",
  );

  text = text.replace(/<\/?[a-z][a-z0-9]*\b[^>]*>/gi, "");

  text = text.replace(/[ \t]+\n/g, "\n");
  text = text.replace(/\n{3,}/g, "\n\n");
  text = text.replace(/[ \t]{2,}/g, " ");

  return text.trim();
}
