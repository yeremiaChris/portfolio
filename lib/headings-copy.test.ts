import { describe, expect, it } from "vitest";

import { aboutIntro } from "./about";
import { blogIntro } from "./blog";
import { experienceIntro, experienceRoles } from "./experience";
import { askYeremia, labIntro } from "./lab";
import { projectsIntro } from "./projects";

const TERMINAL_CHROME = /sys:\/\/|\.log\b|\.md\b|ROLE:\d+|\/\/\s|\/\/[A-Z]/;

function collectStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === "object") {
    return Object.values(value).flatMap(collectStrings);
  }
  return [];
}

describe("page intro copy", () => {
  it("avoids terminal-style breadcrumbs and path labels", () => {
    for (const intro of [
      aboutIntro,
      blogIntro,
      projectsIntro,
      experienceIntro,
      labIntro,
    ]) {
      expect(intro).not.toHaveProperty("breadcrumbRoot");
      expect(intro).not.toHaveProperty("breadcrumbLeaf");
    }
  });

  it("uses plain professional headings on key pages", () => {
    expect(experienceIntro.eyebrow).toBe("Career timeline");
    expect(askYeremia.topBarEyebrow).toBe("Lab · Ask Yeremia");
    expect(blogIntro).not.toHaveProperty("statusBadge");
  });

  it("does not embed terminal chrome in experience roles", () => {
    for (const role of experienceRoles) {
      expect(role).not.toHaveProperty("roleCode");
    }
  });

  it("keeps user-visible lib strings free of sys:// and // gimmicks", () => {
    const strings = [
      ...collectStrings(aboutIntro),
      ...collectStrings(blogIntro),
      ...collectStrings(projectsIntro),
      ...collectStrings(experienceIntro),
      ...collectStrings(labIntro),
      ...collectStrings(askYeremia),
      ...experienceRoles.flatMap((role) => collectStrings(role)),
    ];

    for (const text of strings) {
      expect(text).not.toMatch(TERMINAL_CHROME);
    }
  });
});
