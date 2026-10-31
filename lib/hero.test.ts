import { describe, expect, it } from "vitest";

import { heroCtas } from "./hero";
import { site } from "./site";

describe("heroCtas", () => {
  it("uses email-first primary mailto and outline secondary work anchor", () => {
    expect(heroCtas.primary).toEqual({
      href: site.links.email,
      label: "Email me",
    });
    expect(heroCtas.primary.href).toMatch(/^mailto:/);
    expect(heroCtas.secondary).toEqual({
      href: "#work",
      label: "Selected work",
    });
    expect(heroCtas.resume.href).toBe(site.links.resume);
    expect(heroCtas.resume.label).toBe("CV (PDF)");
  });
});
