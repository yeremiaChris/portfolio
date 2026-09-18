export type MilestoneMetric = {
  value: string;
  label: string;
  tone?: "primary" | "cyan" | "violet" | "foreground";
};

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
  stack: "React · Next.js · Design tokens",
  title: "Product UI on a national pediatric health platform",
  summary:
    "Owned clinician and family-facing product surfaces on PrimaKu — shared UI from multi-brand Figma tokens, REST + auth, and realtime telemetry. The consumer app has 1M+ Google Play downloads; primaku.com is the separate parent-facing growth catalog (vaccines, services, geo-priced SKUs), not the clinical app.",
  metrics: [
    { value: "1M+", label: "App Downloads (Play)", tone: "primary" },
    { value: "Tokens", label: "Multi-brand design system", tone: "cyan" },
    { value: "REST + auth", label: "Product integrations", tone: "foreground" },
  ],
};

export const secondaryMilestones: MilestoneCaseStudy[] = [
  {
    id: "mazecare",
    tag: "Mazecare",
    tagTone: "cyan",
    stack: "Vue 3 · Nuxt 3 · GraphQL · FHIR",
    title: "FHIR clinic & hospital OS — full patient lifecycle",
    summary:
      "Owned clinical visit, queue, teleconsult, and billing flows on a FHIR-compliant EMR/HIS. Integrated GraphQL + FHIR and shipped AI-assisted documentation used in real clinic and hospital workflows.",
    metrics: [
      { value: "FHIR", label: "Clinical Integration", tone: "cyan" },
      {
        value: "AI notes",
        label: "Speech-to-text + Drafting",
        tone: "primary",
      },
    ],
  },
  {
    id: "kiriminaja",
    tag: "KiriminAja",
    tagTone: "violet",
    stack: "Vue · Nuxt · Web Workers · Virtualization",
    title: "High-density logistics UI under real operational load",
    summary:
      "Owned pricing, manifest, and tracking interfaces for a multi-courier aggregator. The consumer app has 100K+ Google Play downloads. Virtualized lists and Web Workers kept batch barcode and high-volume label flows responsive.",
    metrics: [
      { value: "100K+", label: "App Downloads (Play)", tone: "violet" },
      { value: "15+", label: "Courier partners (live rates)", tone: "primary" },
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
