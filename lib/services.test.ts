import { describe, expect, it } from "vitest";

import {
  servicesHero,
  servicesPageMetaDescription,
  servicesHowItWorksSteps,
  servicesOfferings,
  servicesPricingLine,
} from "./services";

describe("servicesHero", () => {
  it("uses the approved hero headline", () => {
    expect(servicesHero.title).toBe(
      "I build fast, reliable websites and web systems for businesses.",
    );
  });

  it("includes a short supporting line under the headline", () => {
    expect(servicesHero.supportingLine.length).toBeGreaterThan(20);
    expect(servicesHero.supportingLine).not.toBe(servicesHero.title);
  });

  it("uses a dedicated meta description without prices", () => {
    expect(servicesPageMetaDescription).not.toBe(servicesHero.title);
    expect(servicesPageMetaDescription).not.toMatch(/\$/);
    expect(servicesPageMetaDescription.toLowerCase()).toContain("consultation");
  });
});

describe("servicesOfferings", () => {
  it("lists two offerings with approved stack lines", () => {
    expect(servicesOfferings).toHaveLength(2);
    const byId = Object.fromEntries(
      servicesOfferings.map((offering) => [offering.id, offering]),
    );
    expect(byId.websites.stack).toBe("Next.js · TypeScript · Tailwind");
    expect(byId["web-systems"].stack).toBe("React/Next.js");
    expect(byId["web-systems"].stack).not.toContain("Supabase");
    expect(byId.websites.bullets).toHaveLength(3);
    expect(byId["web-systems"].bullets).toHaveLength(3);
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
