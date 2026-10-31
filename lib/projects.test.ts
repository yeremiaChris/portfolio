import { describe, expect, it } from "vitest";

import {
  getArchiveProjects,
  getFeaturedProjects,
  getProjectToolChips,
  maxArchiveProjectToolChips,
  maxFeaturedProjectToolChips,
  maxProjectToolChips,
  projectsArchiveIntro,
  projectsContactCta,
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

describe("projectsContactCta", () => {
  it("uses updated hiring copy with email before WhatsApp", () => {
    expect(projectsContactCta.description).toBe(
      "Open for Software Engineer roles (frontend-heavy) — full-time or contract. Feel free to reach out by email or LinkedIn (WhatsApp works too).",
    );
    const { description } = projectsContactCta;
    expect(description.indexOf("email")).toBeLessThan(
      description.indexOf("WhatsApp"),
    );
  });
});

describe("projectsArchiveIntro", () => {
  it("uses career-focused archive copy without the old hiring-signal line", () => {
    expect(projectsArchiveIntro.description).toBe(
      "Client sites and UI I shipped earlier in my career.",
    );
    expect(projectsArchiveIntro.description).not.toMatch(/hiring signal/i);
  });
});

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

describe("getProjectToolChips", () => {
  const fiveTools = [
    "Next.js",
    "TypeScript",
    "React Hook Form",
    "Valibot",
    "TanStack Query",
  ];

  it("caps featured chips at four", () => {
    expect(getProjectToolChips(fiveTools, true)).toHaveLength(
      maxFeaturedProjectToolChips,
    );
    expect(maxFeaturedProjectToolChips).toBe(maxProjectToolChips);
  });

  it("caps archive chips at three", () => {
    expect(getProjectToolChips(fiveTools, false)).toHaveLength(
      maxArchiveProjectToolChips,
    );
  });

  it("keeps live featured projects within the featured chip limit", () => {
    for (const project of getFeaturedProjects()) {
      expect(project.tools.length).toBeLessThanOrEqual(
        maxFeaturedProjectToolChips,
      );
      expect(getProjectToolChips(project.tools, true)).toEqual(project.tools);
    }
  });

  it("limits live archive projects to three visible chips when they have more", () => {
    for (const project of getArchiveProjects()) {
      expect(
        getProjectToolChips(project.tools, false).length,
      ).toBeLessThanOrEqual(maxArchiveProjectToolChips);
    }
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
