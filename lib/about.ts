import { getExperienceLabel } from "./career";

export const aboutIntro = {
  eyebrow: "Profile",
  title: "About",
  description: `I'm a Software Engineer · Frontend-Heavy with ${getExperienceLabel()} years of experience since January 2022. I build production web platforms across health-tech and logistics — React, Next.js, and Vue with real API, auth, and data-aware UI. I'm based in Batam, Indonesia, working remote.`,
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
  nodeId: "YCS",
  image: "/yeremia-1.JPG",
  imageAlt: "Portrait of Yeremia Chris Saragi",
  location: "Batam, Indonesia · Remote",
  intent:
    "I'm open to Software Engineer roles (frontend-heavy) — product platforms, clinical systems, or teams that want clean frontend work with real API and data ownership.",
} as const;

export const aboutProfileMetricToneClass: Record<AboutMetricTone, string> = {
  foreground: "text-foreground",
  primary: "text-primary",
  accent: "text-brand-accent",
};

export const aboutProfileMetrics: AboutProfileMetric[] = [
  {
    label: "Role & focus",
    value:
      "Software Engineer · Frontend-Heavy — frontend craft with API and data integration",
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
];

export const aboutStoryIntro = {
  title: "My Journey",
  meta: "Full-time roles · overlap is intentional",
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
    id: "foundation",
    label: "Before 2022",
    period: "Self-taught",
    title: "Web foundations",
    body: "I taught myself web development — HTML, CSS, JavaScript, and enough backend context to read APIs and data flow before my first full-time job.",
    tone: "accent",
  },
  {
    id: "icreativelabs",
    label: "Jan 2022 – May 2023",
    period: "iCreativeLabs · PT Idekreatif Menusa Teknologi",
    title: "Consultancy delivery",
    body: "I shipped client web apps, admin dashboards, and hybrid mobile UI in React, Next.js, Vue, and React Native.",
    tone: "accent",
  },
  {
    id: "kiriminaja",
    label: "Jan 2023 – Apr 2024",
    period: "KiriminAja · full-time",
    title: "Logistics control room",
    body: "I owned Vue/Nuxt UI for multi-carrier shipping — rates, manifests, and high-density ops flows.",
    tone: "accent",
  },
  {
    id: "primaku",
    label: "Dec 2022 – Present",
    period: "PrimaKu · full-time",
    title: "Pediatric health platform",
    body: "I own frontend architecture for PrimaKu's web platform — shared UI, REST, auth, and clinician plus family-facing surfaces.",
    tone: "primary",
    current: true,
  },
  {
    id: "mazecare",
    label: "Jun 2025 – Jul 2026",
    period: "Mazecare · full-time",
    title: "Clinic & hospital EMR/HIS",
    body: "I built patient-lifecycle UI on an AI-native EMR/HIS with Vue 3, Nuxt 3, GraphQL, and FHIR.",
    tone: "accent",
  },
];

export type AboutWorkflowIcon = "ticket" | "decide" | "checks";

export type AboutWorkflowBeat = {
  id: string;
  step: string;
  title: string;
  description: string;
  footer: string;
  tone: AboutStoryTone;
  icon: AboutWorkflowIcon;
};

export const aboutWorkflowToolLink = {
  name: "Cursor · Vim",
  detail: "Editor",
  href: "https://cursor.com/@yeremia",
} as const;

export const aboutWorkflowIntro = {
  eyebrow: "Process",
  title: "How I work",
  description:
    "I work in an AI-era loop: ticket first, agent-built PR, my review, then green checks before merge.",
} as const;

export const aboutWorkflowBeats: AboutWorkflowBeat[] = [
  {
    id: "ticket",
    step: "01",
    title: "Start from a ticket",
    description:
      "Every change begins as a Linear ticket. An AI agent implements it on its own branch, and the result is always a PR — never a direct push to main.",
    footer: "Linear → branch → PR",
    tone: "primary",
    icon: "ticket",
  },
  {
    id: "decide",
    step: "02",
    title: "I review and decide",
    description:
      "Every PR carries a logic summary: what changed, why, the alternatives, and the risky parts. I read it and merge it myself. AI speeds up the work, but I own the decisions.",
    footer: "Logic summary · I merge",
    tone: "accent",
    icon: "decide",
  },
  {
    id: "checks",
    step: "03",
    title: "Checks guard quality",
    description:
      "Lint, typecheck, tests, build, and Lighthouse must pass before merge, so moving fast stays measurable.",
    footer: "lint · typecheck · test · build · Lighthouse",
    tone: "accent",
    icon: "checks",
  },
];

export const aboutWorkflowClosing =
  "AI handles the repetitive work, so I focus on design, review, and product decisions." as const;
