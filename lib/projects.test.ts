import { describe, expect, it } from "vitest";

import {
  getArchiveProjects,
  getFeaturedProjects,
  type Project,
  projects,
} from "./projects";

function makeProject(overrides: Partial<Project> = {}): Project {
  return {
    id: "example",
    title: "Example",
    tag: "work",
    year: "2026",
    summary: "Example summary",
    tools: ["TypeScript"],
    image: "/projects/example.png",
    imageAlt: "Example",
    featured: false,
    ...overrides,
  };
}

describe("getFeaturedProjects", () => {
  it("keeps featured items in the original order", () => {
    const items = [
      makeProject({ id: "a", featured: true }),
      makeProject({ id: "b", featured: false }),
      makeProject({ id: "c", featured: true }),
    ];

    expect(getFeaturedProjects(items).map((project) => project.id)).toEqual([
      "a",
      "c",
    ]);
  });

  it("features the production hiring signal from the live list", () => {
    expect(getFeaturedProjects().map((project) => project.id)).toEqual([
      "mazecare",
      "primaku",
      "kiriminaja",
      "primacare",
    ]);
  });
});

describe("getArchiveProjects", () => {
  it("returns only non-featured items", () => {
    const items = [
      makeProject({ id: "a", featured: true }),
      makeProject({ id: "b", featured: false }),
    ];

    expect(getArchiveProjects(items).map((project) => project.id)).toEqual([
      "b",
    ]);
  });

  it("does not drop live projects when splitting featured from archive", () => {
    expect(getFeaturedProjects().length + getArchiveProjects().length).toBe(
      projects.length,
    );
    expect(getArchiveProjects().some((project) => project.featured)).toBe(
      false,
    );
  });
});
