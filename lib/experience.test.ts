import { describe, expect, it } from "vitest";

import { experienceRoles } from "./experience";

describe("experienceRoles employment status", () => {
  it("marks only PrimaKu as current", () => {
    const currentRoles = experienceRoles.filter(
      (role) => role.current === true,
    );
    expect(currentRoles.map((role) => role.id)).toEqual(["primaku"]);
  });

  it("keeps Mazecare as a completed role with a fixed end date", () => {
    const mazecare = experienceRoles.find((role) => role.id === "mazecare");
    expect(mazecare?.status).toBe("COMPLETED");
    expect(mazecare?.current).toBeUndefined();
    expect(mazecare?.locationPeriod).toMatch(/Jun 2025 — Jul 2026/);
    expect(mazecare?.locationPeriod).not.toMatch(/Present/i);
  });

  it("does not mark Mazecare as present", () => {
    const mazecare = experienceRoles.find((role) => role.id === "mazecare");
    expect(mazecare?.status).not.toBe("PRESENT");
  });
});
