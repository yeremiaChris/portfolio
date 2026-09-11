export const aboutIntro = {
  breadcrumbRoot: "sys://root/index",
  breadcrumbLeaf: "about.md",
  statusBadge: "About",
  eyebrow: "Profile",
  title: "About Yeremia Chris Saragi",
  description:
    "Software Engineer (frontend-heavy) building production platforms across health-tech and logistics. Strong in React, Next.js, and Vue, with solid experience in API integration, authentication flows, and data-aware delivery.",
  resumeLabel: "Resume",
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
  cyan: "text-[#4cd7f6]",
};

export const aboutProfileMetrics: AboutProfileMetric[] = [
  {
    label: "Core Strength",
    value: "Frontend Craft + API / Data Integration",
    tone: "foreground",
  },
  {
    label: "Healthcare Impact",
    value: "1M+ clinicians (PrimaKu)",
    tone: "primary",
  },
  {
    label: "Logistics",
    value: "Multi-carrier shipping (KiriminAja)",
    tone: "cyan",
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
    label: "Early Years",
    period: "Kabanjahe, North Sumatra",
    title: "Curiosity & Logic",
    body: "Grew up in Kabanjahe, North Sumatra. Developed an early interest in logic, systems, and structured problem-solving that later shaped how I approach engineering.",
    tone: "cyan",
  },
  {
    id: "pandemic",
    label: "2020",
    period: "Self-Taught Foundation",
    title: "Learning the Stack",
    body: "Used the pandemic period to learn web development seriously. Started with HTML, CSS, and JavaScript, then explored backend with Python (Django/Flask) and PHP (Laravel). This gave me a practical understanding of HTTP, data, and full request lifecycles.",
    tone: "violet",
  },
  {
    id: "industry",
    label: "2021 – 2023",
    period: "Entering the Industry",
    title: "React · Vue · Team Delivery",
    body: "Focused on React, Next.js, Vue, and Nuxt. Worked at iCreativeLabs and KiriminAja building dashboards, transactional interfaces, and design systems in cross-functional teams.",
    tone: "cyan",
  },
  {
    id: "senior",
    label: "2023 – Present",
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
    tone: "violet",
  },
];
