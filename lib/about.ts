export const aboutIntro = {
  breadcrumbRoot: "sys://root/index",
  breadcrumbLeaf: "engineer_manifesto.md",
  statusBadge: "Identity // System Philosophy",
  eyebrow: "Dossier · Spec 2025.1",
  title: "About Yeremia Chris Saragi",
  description:
    "Crafting resilient product interfaces, performance-minded React / Next.js apps, and human-centered UI systems with obsessive attention to runtime quality.",
  resumeLabel: "Official Resume",
  chatLabel: "Schedule a chat",
} as const;

export type AboutMetricTone = "foreground" | "primary" | "cyan";

export type AboutProfileMetric = {
  label: string;
  value: string;
  tone: AboutMetricTone;
};

export type AboutStoryTone = "cyan" | "violet" | "primary";

export type AboutStoryEra = {
  id: string;
  label: string;
  period: string;
  title: string;
  body: string;
  tone: AboutStoryTone;
  current?: boolean;
};

export const aboutProfile = {
  status: "Operational // Active",
  nodeId: "NODE_ID: YCS-2000",
  image: "/yeremia-1.JPG",
  imageAlt: "Portrait of Yeremia Chris Saragi",
  location: "Indonesia // Remote Worldwide",
  ageLabel: "26 y.o.",
  intent:
    "Ready for senior frontend execution, high-cadence product UI work, or dedicated enterprise consulting.",
} as const;

export const aboutProfileMetricToneClass: Record<AboutMetricTone, string> = {
  foreground: "text-foreground",
  primary: "text-primary",
  cyan: "text-[#4cd7f6]",
};

export const aboutProfileMetrics: AboutProfileMetric[] = [
  {
    label: "Core Specialization",
    value: "Distributed Frontends & Micro-UIs",
    tone: "foreground",
  },
  {
    label: "Healthcare Impact",
    value: "1M+ Pediatric Records (PrimaKu)",
    tone: "primary",
  },
  {
    label: "Logistics Engine",
    value: "Multi-Carrier Aggregator (KiriminAja)",
    tone: "cyan",
  },
  {
    label: "Target Domain",
    value: "Senior / Staff / Lead Roles",
    tone: "foreground",
  },
];

export const aboutStoryIntro = {
  title: "The System Evolution",
  meta: "sys.log(2000..2026)",
} as const;

export const aboutStoryToneClass: Record<AboutStoryTone, string> = {
  cyan: "text-[#4cd7f6]",
  violet: "text-[#bb86fc]",
  primary: "text-primary",
};

export const aboutStoryDotClass: Record<AboutStoryTone, string> = {
  cyan: "bg-[#4cd7f6]",
  violet: "bg-[#bb86fc]",
  primary: "bg-primary",
};

export const aboutStoryEras: AboutStoryEra[] = [
  {
    id: "origin",
    label: "Origin Protocol",
    period: "2000 // Kabanjahe, Sumatra Utara",
    title: "Foundational Curiosity & Logic",
    body: "Raised in the highlands of Kabanjahe, North Sumatra. Early affinity for systems thinking, discrete mathematics, and structured logic laid the groundwork for an engineering career focused on clarity and operational robustness.",
    tone: "cyan",
  },
  {
    id: "pandemic",
    label: "Autonomous Expansion",
    period: "2020 // Global Pandemic Pivot",
    title: "Self-Taught Engineering Disciplines",
    body: "Turned pandemic isolation into an intensive apprenticeship. Deconstructed web standards (HTML5 / CSS3 / ES6+), then built backends with Python (Django, Flask) and PHP (Laravel). That server-side foundation cemented an intuitive grasp of HTTP lifecycles, cache policies, and relational data.",
    tone: "violet",
  },
  {
    id: "industry",
    label: "Industry Immersion",
    period: "2021 — 2023 // Scale Sprint",
    title: "Reactive Client Architecture & Team Delivery",
    body: "Specialized in React / Next.js and Vue / Nuxt. Joined iCreativeLabs and later KiriminAja to ship merchant dashboards, transactional tracking views, and unified design-token systems across distributed cross-functional squads.",
    tone: "cyan",
  },
  {
    id: "senior",
    label: "Production Reign",
    period: "2023 — Present // Senior Tenure",
    title: "Mission-Critical Healthtech Frontends",
    body: "Driving core frontend infrastructure at PrimaKu (Indonesian Pediatric Society partner) — patient monitoring, growth-chart telemetry, and clinician appointment flows. Also shipped FHIR-compliant clinic & hospital OS features at Mazecare (Jun 2025 — Jul 2026) on Vue 3 / Nuxt 3 with GraphQL.",
    tone: "primary",
    current: true,
  },
  {
    id: "mazecare",
    label: "HIS Track",
    period: "2025 — 2026 // Clinic & Hospital OS",
    title: "Mazecare — AI-Native Clinic & Hospital OS",
    body: "Built patient-lifecycle features for Mazecare’s EMR/HIS: clinical visits, queues, teleconsultation, billing, and AI clinical assistant / configuration tooling — TypeScript, Vue 3, Nuxt 3, GraphQL, and FHIR integrations.",
    tone: "violet",
  },
];
