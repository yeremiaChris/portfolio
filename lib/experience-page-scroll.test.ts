import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("experience page scroll container", () => {
  it("uses overflow-x-clip on the page shell so overflow-y stays visible on mobile WebKit", () => {
    const source = readFileSync("app/(site)/experience/page.tsx", "utf8");
    expect(source).toContain("overflow-x-clip");
    expect(source).not.toContain("overflow-x-hidden");
  });
});
