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
    "A few shipped outcomes across product UI, realtime surfaces, and delivery habits — with numbers I can walk through in an interview.",
} as const;

export const featuredMilestone: MilestoneCaseStudy = {
  id: "micro-frontends",
  tag: "Product Scale",
  tagTone: "primary",
  stack: "Next.js 14 · App Router · Zustand",
  title: "Next.js App Router Migration & Shared UI Boundaries",
  summary:
    "Helped migrate legacy client apps to Next.js App Router with clearer module boundaries, shared design tokens, and TypeScript contracts — improving maintainability and page latency on high-traffic routes.",
  metrics: [
    { value: "-42%", label: "P95 Page Latency", tone: "primary" },
    { value: "98/100", label: "Core Web Vitals", tone: "cyan" },
    { value: "High-traffic", label: "Dynamic Routes", tone: "foreground" },
  ],
  chart: {
    title: "Latency Reduction Curve",
    subtitle: "P95: 1.8s → 1.04s",
    caption: "TTFB Benchmark",
    verified: "Measured on production edge",
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
    tag: "Realtime Product UI",
    tagTone: "cyan",
    stack: "WebSocket · React / Next.js · API Integration",
    title: "Realtime Telemetry Surfaces for Clinical Dashboards",
    summary:
      "Built and tuned realtime dashboard surfaces that consume event streams over WebSocket/API — keeping charts and status views responsive under frequent updates without freezing the main UI thread.",
    metrics: [
      { value: "Realtime", label: "Event-Driven UI", tone: "cyan" },
      { value: "Smooth UX", label: "Under Frequent Updates", tone: "primary" },
    ],
  },
  {
    id: "cicd",
    tag: "Delivery Confidence",
    tagTone: "violet",
    stack: "GitHub Actions · Playwright · TypeScript",
    title: "Faster Feedback Loops with CI Checks & E2E Smoke Tests",
    summary:
      "Improved delivery confidence by tightening CI gates — TypeScript checks, lint, and Playwright smoke coverage — so regressions are caught earlier and releases feel safer.",
    metrics: [
      { value: "Faster CI", label: "Feedback Loop", tone: "violet" },
      { value: "E2E Smoke", label: "Release Gate", tone: "primary" },
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
