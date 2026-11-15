import { describe, expect, it } from "vitest";

import { projects } from "./projects";
import {
  getServiceOfferingProjectHref,
  getServiceOfferingProjectShortName,
  servicesHero,
  servicesHeroLines,
  servicesPageMetaDescription,
  servicesHowItWorksSteps,
  servicesOfferings,
  servicesPricingLine,
  servicesHeroLinesJoin,
  type ServiceOffering,
} from "./services";

const projectIds = new Set(projects.map((project) => project.id));

function offeringAnchorId(offering: ServiceOffering): string | undefined {
  return offering.projectAnchorId;
}

describe("servicesHero", () => {
  it("uses the approved hero headline", () => {
    expect(servicesHero.title).toBe(
      "I build fast, reliable websites and web systems for businesses.",
    );
  });

  it("keeps line splits aligned with the full headline", () => {
    expect(servicesHeroLinesJoin()).toBe(servicesHero.title);
    expect(servicesHeroLines.join(" ")).toBe(servicesHero.title);
  });

  it("uses a dedicated meta description without prices", () => {
    expect(servicesPageMetaDescription).not.toBe(servicesHero.title);
    expect(servicesPageMetaDescription).not.toMatch(/\$/);
    expect(servicesPageMetaDescription.toLowerCase()).toContain("consultation");
  });
});

describe("servicesOfferings project links", () => {
  it("links each card only to existing project anchors", () => {
    for (const offering of servicesOfferings) {
      const href = getServiceOfferingProjectHref(offering);
      if (!offering.projectAnchorId) {
        expect(href).toBeUndefined();
        continue;
      }
      expect(projectIds.has(offering.projectAnchorId)).toBe(true);
      expect(href).toBe(`/projects#${offering.projectAnchorId}`);
    }
  });

  it("maps websites to PrimaKu and web systems to Mazecare", () => {
    const byId = Object.fromEntries(
      servicesOfferings.map((offering) => [offering.id, offering]),
    );
    expect(offeringAnchorId(byId.websites)).toBe("primaku");
    expect(offeringAnchorId(byId["web-systems"])).toBe("mazecare");
    expect(getServiceOfferingProjectShortName(byId.websites)).toBe("PrimaKu");
    expect(getServiceOfferingProjectShortName(byId["web-systems"])).toBe(
      "Mazecare",
    );
  });
});

describe("servicesHowItWorksSteps", () => {
  it("lists three approved steps in order", () => {
    expect(servicesHowItWorksSteps).toEqual([
      "Tell me what you need.",
      "I send a plan and estimate.",
      "I build it with a live preview link you can check anytime.",
    ]);
  });
});

describe("servicesPricingLine", () => {
  it("does not include prices", () => {
    expect(servicesPricingLine).toBe(
      "Free consultation · estimate within 24 hours",
    );
    expect(servicesPricingLine).not.toMatch(/\$/);
  });
});
