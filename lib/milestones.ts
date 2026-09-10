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
  title: "Architectural Case Studies & Quantified Impact",
  description:
    "Selected systems work measured against latency, throughput, and delivery confidence — not slide-deck claims.",
} as const;

export const featuredMilestone: MilestoneCaseStudy = {
  id: "micro-frontends",
  tag: "Enterprise Scale",
  tagTone: "primary",
  stack: "Next.js 14 · Micro-Frontends · Zustand",
  title: "Enterprise Distributed Frontend & Micro-Frontend Overhaul",
  summary:
    "Led migration of legacy monolithic client apps to Next.js App Router with clear micro-frontend boundaries. Centralized design tokens, strict TypeScript contracts, and edge caching for high-frequency dynamic routes.",
  metrics: [
    { value: "-42%", label: "P95 Page Latency", tone: "primary" },
    { value: "98/100", label: "Core Web Vitals", tone: "cyan" },
    { value: "50k+", label: "Dynamic Routes", tone: "foreground" },
  ],
  chart: {
    title: "Latency Reduction Curve",
    subtitle: "P95: 1.8s → 1.04s",
    caption: "TTFB Benchmark",
    verified: "Verified on production edge",
    bars: [
      { label: "Legacy", heightPct: 92 },
      { label: "Q1 Migr", heightPct: 75 },
      { label: "Edge Opt", heightPct: 55 },
      { label: "Now", heightPct: 38, emphasized: true },
    ],
  },
};

export const secondaryMilestones: MilestoneCaseStudy[] = [
  {
    id: "telemetry",
    tag: "Systems Throughput",
    tagTone: "cyan",
    stack: "Go · Redis Pub/Sub · WebSocket",
    title: "High-Concurrency Telemetry & Event Ingestion Engine",
    summary:
      "Built resilient Go ingestion workers with Redis clustering to consume real-time user events and push telemetry to dashboards without UI jank.",
    metrics: [
      { value: "15k req/s", label: "Sustained Ingestion", tone: "cyan" },
      { value: "< 50ms", label: "E2E Delivery", tone: "primary" },
    ],
  },
  {
    id: "cicd",
    tag: "DevOps Velocity",
    tagTone: "violet",
    stack: "GitHub Actions · Docker · K8s",
    title: "Automated GitOps, CI/CD & Regression-Safe Testing",
    summary:
      "Rebuilt multi-stage CD with parallel caches, Playwright smoke coverage, and strict TypeScript checks to ship faster with higher confidence.",
    metrics: [
      { value: "8 Min", label: "Build Time (from 45m)", tone: "violet" },
      { value: "0 Regressions", label: "Production P1s", tone: "primary" },
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
