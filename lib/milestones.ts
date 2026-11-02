export type MilestoneMetric = {
  value: string;
  label: string;
  tone?: "primary" | "accent" | "foreground";
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
  tagTone: "primary" | "accent";
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
    "Built PrimaKu's web platform: SSR on primaku.com (parent-facing catalog for vaccines and services), the Parenthood Institute program site, and clinician-facing PrimaCare UI, all on a shared design system from multi-brand Figma tokens, with REST + auth. The company's mobile app has 1M+ Google Play downloads; I work on the web platform, not the app.",
  metrics: [],
};

export const secondaryMilestones: MilestoneCaseStudy[] = [
  {
    id: "mazecare",
    tag: "Mazecare",
    tagTone: "accent",
    stack: "Vue 3 · Nuxt 3 · GraphQL · FHIR",
    title: "FHIR clinic & hospital OS — full patient lifecycle",
    summary:
      "Built clinical visit, queue, teleconsult, and billing flows on a FHIR-compliant EMR/HIS. Integrated GraphQL + FHIR and shipped AI-assisted documentation (speech-to-text + drafting) used in real clinic and hospital workflows.",
    metrics: [],
  },
  {
    id: "kiriminaja",
    tag: "KiriminAja",
    tagTone: "accent",
    stack: "Vue · Nuxt · Web Workers · Virtualization",
    title: "High-density logistics UI under real operational load",
    summary:
      "Developed pricing, manifest, and tracking interfaces for a multi-courier aggregator: a live rate UI across 15+ couriers, with virtualized lists and Web Workers for batch barcode and high-volume label flows.",
    metrics: [],
  },
];

export const metricToneClass: Record<
  NonNullable<MilestoneMetric["tone"]>,
  string
> = {
  primary: "text-primary",
  accent: "text-brand-accent",
  foreground: "text-foreground",
};

export const tagToneClass: Record<MilestoneCaseStudy["tagTone"], string> = {
  primary: "text-primary",
  accent: "text-brand-accent",
};

export function homeMilestoneCaseStudies(): MilestoneCaseStudy[] {
  return [featuredMilestone, ...secondaryMilestones];
}
