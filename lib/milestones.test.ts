import { describe, expect, it } from "vitest";

import {
  featuredMilestone,
  homeMilestoneCaseStudies,
  isNumericMetricValue,
  secondaryMilestones,
} from "./milestones";

describe("isNumericMetricValue", () => {
  it("accepts values that include digits", () => {
    expect(isNumericMetricValue("15+")).toBe(true);
    expect(isNumericMetricValue("1M+")).toBe(true);
  });

  it("rejects label-style metric values", () => {
    expect(isNumericMetricValue("Tokens")).toBe(false);
    expect(isNumericMetricValue("FHIR")).toBe(false);
    expect(isNumericMetricValue("REST + auth")).toBe(false);
    expect(isNumericMetricValue("Workers")).toBe(false);
  });
});

describe("home Selected Work metrics", () => {
  it("uses only numeric values in metric slots", () => {
    for (const study of homeMilestoneCaseStudies()) {
      for (const metric of study.metrics) {
        expect(
          isNumericMetricValue(metric.value),
          `${study.id} metric "${metric.value}"`,
        ).toBe(true);
      }
    }
  });

  it("renders home case studies without metric rows", () => {
    for (const study of homeMilestoneCaseStudies()) {
      expect(study.metrics).toHaveLength(0);
    }
  });

  it("drops non-numeric PrimaKu metrics in favor of stack and summary copy", () => {
    expect(featuredMilestone.metrics).toHaveLength(0);
    expect(featuredMilestone.stack).toMatch(
      /Multi-brand design tokens · Figma → UI/,
    );
    expect(featuredMilestone.summary).toMatch(/multi-brand Figma tokens/);
    expect(featuredMilestone.summary).toMatch(/REST \+ auth/);
  });

  it("keeps Mazecare FHIR and AI notes in narrative fields only", () => {
    const mazecare = secondaryMilestones.find(
      (study) => study.id === "mazecare",
    );
    expect(mazecare?.metrics).toHaveLength(0);
    expect(mazecare?.stack).toMatch(/FHIR/);
    expect(mazecare?.summary).toMatch(/AI-assisted documentation/);
  });

  it("keeps KiriminAja 15+ couriers and Workers in summary only", () => {
    const kiriminaja = secondaryMilestones.find(
      (study) => study.id === "kiriminaja",
    );
    expect(kiriminaja?.metrics).toHaveLength(0);
    expect(kiriminaja?.summary).toMatch(/15\+ couriers/);
    expect(kiriminaja?.summary).toMatch(/Web Workers/);
  });
});
