import { describe, expect, it } from "vitest";

import { getExperienceLabel, getYearsOfExperience } from "./career";

describe("getYearsOfExperience", () => {
  it("counts whole years since Jan 2022", () => {
    expect(getYearsOfExperience(new Date(2026, 9, 20))).toBe(4);
    expect(getYearsOfExperience(new Date(2026, 11, 31))).toBe(4);
    expect(getYearsOfExperience(new Date(2027, 0, 1))).toBe(5);
  });

  it("never goes negative", () => {
    expect(getYearsOfExperience(new Date(2021, 5, 1))).toBe(0);
  });
});

describe("getExperienceLabel", () => {
  it("formats as N+", () => {
    expect(getExperienceLabel(new Date(2026, 9, 20))).toBe("4+");
  });
});
