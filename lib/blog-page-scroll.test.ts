import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("blog list page scroll container", () => {
  it("uses overflow-x-clip on the page shell so overflow-y stays visible on mobile WebKit", () => {
    const source = readFileSync("app/(site)/blog/page.tsx", "utf8");
    expect(source).toContain("overflow-x-clip");
    expect(source).not.toContain("overflow-x-hidden");
  });
});
