import { describe, expect, it } from "vitest";

import { aboutIntro } from "@/lib/about";
import { site } from "@/lib/site";

import {
  HERO_TERMINAL_DEMO_COMMANDS,
  formatUnknownCommand,
  parseHeroTerminalCommand,
  runHeroTerminalCommand,
} from "./hero-terminal-commands";

describe("hero-terminal-commands", () => {
  it("defines the auto-demo command sequence", () => {
    expect(HERO_TERMINAL_DEMO_COMMANDS).toEqual([
      "about",
      "projects",
      "contact",
    ]);
  });

  it("parses the first token case-insensitively", () => {
    expect(parseHeroTerminalCommand("  Help  ")).toBe("help");
    expect(parseHeroTerminalCommand("projects extra")).toBe("projects");
    expect(parseHeroTerminalCommand("")).toBe("");
  });

  it("returns help output with all command names", () => {
    const result = runHeroTerminalCommand("help");
    expect(result.kind).toBe("output");
    if (result.kind !== "output") return;
    const text = result.lines.flatMap((line) =>
      line.map((segment) => (segment.kind === "text" ? segment.text : "")),
    );
    expect(text.join("\n")).toContain("about");
    expect(text.join("\n")).toContain("clear");
  });

  it("sources about from aboutIntro", () => {
    const result = runHeroTerminalCommand("about");
    expect(result.kind).toBe("output");
    if (result.kind !== "output") return;
    expect(result.lines[0]?.[0]).toMatchObject({
      kind: "text",
      text: aboutIntro.description,
    });
  });

  it("sources projects from site.proof", () => {
    const result = runHeroTerminalCommand("projects");
    expect(result.kind).toBe("output");
    if (result.kind !== "output") return;
    expect(result.lines).toHaveLength(site.proof.length);
    expect(result.lines[0]?.[1]).toMatchObject({
      kind: "link",
      href: site.proof[0]?.href,
      label: site.proof[0]?.label,
    });
  });

  it("handles clear and unknown commands", () => {
    expect(runHeroTerminalCommand("clear")).toEqual({ kind: "clear" });
    const unknown = runHeroTerminalCommand("foo");
    expect(unknown.kind).toBe("unknown");
    const formatted = formatUnknownCommand("foo");
    expect(formatted[0]?.[0]).toMatchObject({
      kind: "text",
      text: expect.stringContaining("help"),
    });
  });
});
