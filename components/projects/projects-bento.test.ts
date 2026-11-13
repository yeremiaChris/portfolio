import { describe, expect, it } from "vitest";

import { getFeaturedProjects } from "@/lib/projects";

const bentoMobileOrder = [
  "mazecare",
  "primaku",
  "kiriminaja",
  "primacare",
] as const;

describe("projects bento layout", () => {
  it("covers every featured project in the bento grid", () => {
    const featuredIds = getFeaturedProjects().map((project) => project.id);
    expect(new Set(featuredIds)).toEqual(new Set(bentoMobileOrder));
  });

  it("declares Mazecare and PrimaKu as the large bento tiles", () => {
    expect(
      bentoMobileOrder.filter((id) => id === "mazecare" || id === "primaku"),
    ).toEqual(["mazecare", "primaku"]);
  });
});
