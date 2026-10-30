export type MilestoneMetric = {
  value: string;
  label: string;
  tone?: "primary" | "cyan" | "violet" | "foreground";
};

export function isNumericMetricValue(value: string): boolean {
  return /\d/.test(value.trim());
}

export type MilestoneChartBar = {
  label: string;
  heightPct: number;
  emphasized?: boolean;
};

export type MilestoneCaseStudy = {
  id: string;
  tag: string;
  tagTone: "primary" | "cyan" | "violet";
  stack: string;
  title: string;
  summary: string;
  metrics: MilestoneMetric[];
  chart?: {
    title: string;
    subtitle: string;
    caption: string;
    verified: string;
    bars: MilestoneChartBar[];
  };
};

export const milestonesIntro = {
  eyebrow: "Production Track Record",
  title: "Selected Work & Impact",
  description:
    "Named product work first — PrimaKu, Mazecare, and KiriminAja — with outcomes I can walk through in an interview.",
} as const;

export const featuredMilestone: MilestoneCaseStudy = {
  id: "primaku-platform",
  tag: "PrimaKu",
  tagTone: "primary",
  stack: "React · Next.js · Multi-brand design tokens · Figma → UI",
  title: "Product UI on a national pediatric health platform",
  summary:
    "Owned clinician and family-facing product surfaces on PrimaKu — shared UI from multi-brand Figma tokens, REST + auth, and SSR on primaku.com (parent-facing growth catalog: vaccines, services, geo-priced SKUs), separate from the clinical app. The consumer app has 1M+ Google Play downloads.",
  metrics: [],
};

export const secondaryMilestones: MilestoneCaseStudy[] = [
  {
    id: "mazecare",
    tag: "Mazecare",
    tagTone: "cyan",
    stack: "Vue 3 · Nuxt 3 · GraphQL · FHIR",
    title: "FHIR clinic & hospital OS — full patient lifecycle",
    summary:
      "Owned clinical visit, queue, teleconsult, and billing flows on a FHIR-compliant EMR/HIS. Integrated GraphQL + FHIR and shipped AI-assisted documentation (speech-to-text + drafting) used in real clinic and hospital workflows.",
    metrics: [],
  },
  {
    id: "kiriminaja",
    tag: "KiriminAja",
    tagTone: "violet",
    stack: "Vue · Nuxt · Web Workers · Virtualization",
    title: "High-density logistics UI under real operational load",
    summary:
      "Owned pricing, manifest, and tracking interfaces for a multi-courier aggregator — live rate UI across 15+ couriers, with virtualized lists and Web Workers for batch barcode and high-volume label flows. The consumer app has 100K+ Google Play downloads.",
    metrics: [
      {
        value: "15+",
        label: "Live rate UI across couriers",
        tone: "violet",
      },
    ],
  },
];

export const metricToneClass: Record<
  NonNullable<MilestoneMetric["tone"]>,
  string
> = {
  primary: "text-primary",
  cyan: "text-[#4cd7f6]",
  violet: "text-[#7bd0ff]",
  foreground: "text-foreground",
};

export const tagToneClass: Record<MilestoneCaseStudy["tagTone"], string> = {
  primary: "text-primary",
  cyan: "text-[#4cd7f6]",
  violet: "text-[#7bd0ff]",
};

export function homeMilestoneCaseStudies(): MilestoneCaseStudy[] {
  return [featuredMilestone, ...secondaryMilestones];
}
