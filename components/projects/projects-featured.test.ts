import { describe, expect, it } from "vitest";

import { getFeaturedProjects } from "@/lib/projects";

describe("featured project cards", () => {
  it("gives every featured project domain, tagline, and 2–3 highlights", () => {
    for (const project of getFeaturedProjects()) {
      expect(project.domain).toBeDefined();
      expect(project.tagline).toBeTruthy();
      expect(project.highlights?.length).toBeGreaterThanOrEqual(2);
      expect(project.highlights?.length).toBeLessThanOrEqual(3);
    }
  });

  it("maps health-tech and logistics domains from the live list", () => {
    const byId = Object.fromEntries(
      getFeaturedProjects().map((project) => [project.id, project.domain]),
    );
    expect(byId.mazecare).toBe("Health-tech");
    expect(byId.primaku).toBe("Health-tech");
    expect(byId.primacare).toBe("Health-tech");
    expect(byId.kiriminaja).toBe("Logistics");
  });
});
