import { describe, expect, it } from "vitest";

import { getFeaturedProjects } from "@/lib/projects";
import { getFeaturedScreenshotMobileSrc } from "@/lib/projects-screenshots";
import { existsSync } from "node:fs";
import path from "node:path";

describe("featured screenshot sources", () => {
  it("maps each featured desktop webp to a mobile sibling path", () => {
    for (const project of getFeaturedProjects()) {
      expect(getFeaturedScreenshotMobileSrc(project.image)).toBe(
        `/projects/featured-${project.id}-sm.webp`,
      );
    }
  });

  it("ships mobile webp assets for every featured project", () => {
    const root = path.join(process.cwd(), "public");
    for (const project of getFeaturedProjects()) {
      const mobile = path.join(
        root,
        getFeaturedScreenshotMobileSrc(project.image),
      );
      expect(existsSync(mobile)).toBe(true);
    }
  });
});
