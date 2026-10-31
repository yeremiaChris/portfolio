import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const componentPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "HeaderResumeLink.tsx",
);

describe("HeaderResumeLink", () => {
  it("links to the static CV with a native anchor instead of next/link", () => {
    const source = readFileSync(componentPath, "utf8");
    expect(source).not.toContain('from "next/link"');
    expect(source).toMatch(/<a[\s\S]*href=\{site\.links\.resume\}/);
  });
});
