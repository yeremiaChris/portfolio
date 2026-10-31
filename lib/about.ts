import { getExperienceLabel } from "./career";

export const aboutIntro = {
  eyebrow: "Profile",
  title: "About Yeremia Chris Saragi",
  description: `Yeremia Chris Saragi is a Software Engineer specializing in frontend-heavy product development. He has ${getExperienceLabel()} years building production platforms across health-tech and logistics, with strong React, Next.js, and Vue work plus real API, auth, and data-aware delivery.`,
  chatLabel: "Get in touch",
} as const;

export type AboutMetricTone = "foreground" | "primary" | "accent";

export type AboutProfileMetric = {
  label: string;
  value: string;
  tone: AboutMetricTone;
};

export type AboutStoryTone = "accent" | "primary";

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
  status: "Open to opportunities",
  nodeId: "YCS · 2000",
  image: "/yeremia-1.JPG",
  imageAlt: "Portrait of Yeremia Chris Saragi",
  location: "Indonesia (Remote Worldwide)",
  ageLabel: "26 y.o.",
  intent:
    "Open to Software Engineer roles (frontend-heavy) — product platforms, clinical systems, or teams that value clean frontend work with real API and data ownership.",
} as const;

export const aboutProfileMetricToneClass: Record<AboutMetricTone, string> = {
  foreground: "text-foreground",
  primary: "text-primary",
  accent: "text-brand-accent",
};

export const aboutProfileMetrics: AboutProfileMetric[] = [
  {
    label: "Core Strength",
    value: "Frontend Craft + API / Data Integration",
    tone: "foreground",
  },
  {
    label: "Healthcare",
    value: "PrimaKu web platform (clinical + catalog)",
    tone: "primary",
  },
  {
    label: "Logistics",
    value: "Multi-carrier shipping (KiriminAja)",
    tone: "accent",
  },
  {
    label: "Target Role",
    value: "Software Engineer · Frontend-Heavy",
    tone: "foreground",
  },
];

export const aboutStoryIntro = {
  title: "My Journey",
  meta: "2000 – 2026",
} as const;

export const aboutStoryToneClass: Record<AboutStoryTone, string> = {
  accent: "text-brand-accent",
  primary: "text-primary",
};

export const aboutStoryDotClass: Record<AboutStoryTone, string> = {
  accent: "bg-brand-accent",
  primary: "bg-primary",
};

export const aboutStoryEras: AboutStoryEra[] = [
  {
    id: "origin",
    label: "Early Years",
    period: "Kabanjahe, North Sumatra",
    title: "Curiosity & Logic",
    body: "Grew up in Kabanjahe, North Sumatra. Developed an early interest in logic, systems, and structured problem-solving that later shaped how I approach engineering.",
    tone: "accent",
  },
  {
    id: "pandemic",
    label: "2020",
    period: "Self-Taught Foundation",
    title: "Learning the Stack",
    body: "Used the pandemic period to learn web development seriously. Started with HTML, CSS, and JavaScript, then explored backend with Python (Django/Flask) and PHP (Laravel). This gave me a practical understanding of HTTP, data, and full request lifecycles.",
    tone: "accent",
  },
  {
    id: "industry",
    label: "2022 – 2024",
    period: "Entering the Industry",
    title: "React · Vue · Team Delivery",
    body: "Focused on React, Next.js, Vue, and Nuxt. Worked at iCreativeLabs and KiriminAja building dashboards, transactional interfaces, and design systems in cross-functional teams.",
    tone: "accent",
  },
  {
    id: "primaku",
    label: "2022 – Present",
    period: "Healthtech Focus",
    title: "PrimaKu",
    body: "At PrimaKu, working on product surfaces and integrations for a national pediatric health platform — including patient monitoring, clinician tools, REST pipelines, and authentication flows.",
    tone: "primary",
    current: true,
  },
  {
    id: "mazecare",
    label: "2025 – 2026",
    period: "Clinic & Hospital Systems",
    title: "Mazecare",
    body: "At Mazecare, built end-to-end patient lifecycle features for an AI-native EMR/HIS: clinical visits, queues, teleconsultation, billing, and AI-assisted documentation tools using Vue 3, Nuxt 3, GraphQL, and FHIR.",
    tone: "accent",
  },
];

export type AboutDriverIcon = "laptop" | "keyboard" | "cursor" | "terminal";

export type AboutDriver = {
  id: string;
  name: string;
  detail: string;
  icon: AboutDriverIcon;
};

export type AboutWorkflowIcon = "plan" | "review" | "gate";

export type AboutWorkflowBeat = {
  id: string;
  step: string;
  title: string;
  description: string;
  footer: string;
  tone: AboutStoryTone;
  icon: AboutWorkflowIcon;
};

export const aboutWorkflowIntro = {
  eyebrow: "Daily drivers",
  title: "How I work",
  description:
    "MacBook Air M3, Keychron K6, Cursor with Vim, Ghostty. I let the model draft; I still read every diff.",
} as const;

export const aboutDrivers: AboutDriver[] = [
  {
    id: "mac",
    name: "MacBook Air M3",
    detail: "Machine",
    icon: "laptop",
  },
  {
    id: "keychron",
    name: "Keychron K6",
    detail: "Keyboard",
    icon: "keyboard",
  },
  {
    id: "cursor",
    name: "Cursor · Vim",
    detail: "Editor",
    icon: "cursor",
  },
  {
    id: "ghostty",
    name: "Ghostty",
    detail: "Terminal",
    icon: "terminal",
  },
];

export const aboutWorkflowBeats: AboutWorkflowBeat[] = [
  {
    id: "plan",
    step: "01",
    title: "Plan in the repo",
    description:
      "I start in the file, not a blank chat. Cursor already has the project — so the first draft stays in context.",
    footer: "Open the file → prompt",
    tone: "primary",
    icon: "plan",
  },
  {
    id: "review",
    step: "02",
    title: "Generate, then read the diff",
    description:
      "Vim motions to jump hunks. Nothing merges unread — the model is a draft, not a merge button.",
    footer: "hjkl · read every hunk",
    tone: "accent",
    icon: "review",
  },
  {
    id: "gate",
    step: "03",
    title: "Gate with the usual tools",
    description:
      "TypeScript, ESLint, and tests catch what a fluent diff hides. AI speeds the first pass; CI is the adult in the room.",
    footer: "tsc · lint · pnpm test",
    tone: "accent",
    icon: "gate",
  },
];
