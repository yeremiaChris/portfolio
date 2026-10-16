import { describe, expect, it } from "vitest";

import { cleanMarkdownSource } from "./lab-clean";

describe("cleanMarkdownSource", () => {
  it("strips import and export lines", () => {
    const cleaned = cleanMarkdownSource(
      ['import x from "y";', "Hello world.", "export const z = 1;"].join("\n"),
    );
    expect(cleaned).toBe("Hello world.");
  });

  it("keeps headings as plain text", () => {
    const cleaned = cleanMarkdownSource("## PrimaKu\n\nBuilt clinician UI.");
    expect(cleaned).toContain("## PrimaKu");
    expect(cleaned).toContain("Built clinician UI.");
  });

  it("drops long code fences and keeps short ones without markers", () => {
    const longCode = "x".repeat(450);
    const cleaned = cleanMarkdownSource(
      [
        "Before",
        "```ts",
        "const short = true;",
        "```",
        "Middle",
        "```ts",
        longCode,
        "```",
        "After",
      ].join("\n"),
    );

    expect(cleaned).toContain("const short = true;");
    expect(cleaned).not.toContain("```");
    expect(cleaned).not.toContain(longCode);
    expect(cleaned).toContain("Before");
    expect(cleaned).toContain("After");
  });

  it("strips JSX/MDX components and HTML tags", () => {
    const cleaned = cleanMarkdownSource(
      [
        '<Callout title="Note" />',
        "<Wrapper>",
        "Inner",
        "</Wrapper>",
        "<p>Hello <strong>there</strong></p>",
      ].join("\n"),
    );

    expect(cleaned).not.toContain("Callout");
    expect(cleaned).not.toContain("Wrapper");
    expect(cleaned).toContain("Hello there");
  });

  it("collapses excess whitespace", () => {
    expect(cleanMarkdownSource("One\n\n\n\nTwo   three")).toBe(
      "One\n\nTwo three",
    );
  });
});
