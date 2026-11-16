export type ServiceOfferingId = "websites" | "web-systems";

export type ServiceOffering = {
  id: ServiceOfferingId;
  title: string;
  description: string;
  bullets: readonly string[];
  stack: string;
};

export const servicesHero = {
  title: "I build fast, reliable websites and web systems for businesses.",
  whatsappCtaLabel: "Chat on WhatsApp",
} as const;

export const servicesPageMetaDescription =
  "Websites, landing pages, and web systems for businesses — dashboards, admin panels, and internal tools. Free consultation with an estimate within 24 hours.";

export const servicesHeroLines = [
  "I build fast, reliable",
  "websites and web systems",
  "for businesses.",
] as const;

export function servicesHeroLinesJoin(): string {
  return servicesHeroLines.join(" ");
}

export const servicesOfferings: readonly ServiceOffering[] = [
  {
    id: "websites",
    title: "Websites & landing pages",
    description:
      "A site that loads fast, ranks on Google, and turns visitors into inquiries.",
    bullets: [
      "Responsive and SEO-ready",
      "Easy to update",
      "Deployed on Vercel",
    ],
    stack: "Next.js · TypeScript · Tailwind",
  },
  {
    id: "web-systems",
    title: "Web systems",
    description:
      "Dashboards, admin panels, and internal tools that make daily work simpler.",
    bullets: ["Clean, data-dense UI", "Role-based access", "Built to grow"],
    stack: "React/Next.js",
  },
] as const;

export const servicesOfferingsHeading = "Services" as const;

export const servicesHowItWorksHeading = "How it works" as const;

export const servicesHowItWorksSteps = [
  "Tell me what you need.",
  "I send a plan and estimate.",
  "I build it with a live preview link you can check anytime.",
] as const;

export const servicesPricingLine =
  "Free consultation · estimate within 24 hours" as const;

export const servicesLabTeaser = {
  beforeLink: "Exploring AI? See what I'm building in my ",
  linkHref: "/lab",
  linkLabel: "/lab",
  afterLink: ".",
} as const;

export const servicesContactCta = {
  title: "Have a project in mind? Let's talk.",
} as const;
