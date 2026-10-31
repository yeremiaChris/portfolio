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

export type AboutWorkflowToolItem = {
  label: string;
  href?: string;
};

export type AboutWorkflowToolGroup = {
  id: string;
  label: string;
  items: AboutWorkflowToolItem[];
};

export type AboutWorkflowIcon = "plan" | "ticket" | "agent" | "review" | "ship";

export type AboutWorkflowStep = {
  id: string;
  step: string;
  title: string;
  description: string;
  footer: string;
  tone: AboutStoryTone;
  icon: AboutWorkflowIcon;
};

export const aboutWorkflowToolGroups: AboutWorkflowToolGroup[] = [
  {
    id: "editor",
    label: "Editor",
    items: [
      { label: "Cursor", href: "https://cursor.com/@yeremia" },
      { label: "Vim" },
    ],
  },
  {
    id: "agents",
    label: "AI agents",
    items: [
      { label: "Cursor cloud agents" },
      { label: "Grok Bot" },
      { label: "Hermes Agent" },
    ],
  },
  {
    id: "planning",
    label: "Planning",
    items: [{ label: "Linear" }, { label: "Jira" }],
  },
  {
    id: "ship",
    label: "Ship",
    items: [{ label: "GitHub" }, { label: "Vercel preview deploys" }],
  },
  {
    id: "quality",
    label: "Quality",
    items: [
      { label: "lint" },
      { label: "typecheck" },
      { label: "tests" },
      { label: "Lighthouse" },
    ],
  },
];

export const aboutWorkflowIntro = {
  eyebrow: "Process",
  title: "How I work",
  description:
    "I work in an AI-era loop: research and plan with AI, track work in Linear or Jira, review agent PRs on Vercel previews, then merge when quality checks pass.",
} as const;

export const aboutWorkflowSteps: AboutWorkflowStep[] = [
  {
    id: "plan",
    step: "01",
    title: "Research and plan with AI",
    description:
      "I sketch scope, constraints, and approach with AI before anything hits a backlog — so tickets start with context, not guesswork.",
    footer: "Context before code",
    tone: "accent",
    icon: "plan",
  },
  {
    id: "ticket",
    step: "02",
    title: "Capture as a ticket",
    description:
      "The plan becomes a Linear or Jira ticket with clear acceptance criteria. That ticket is the source of truth for humans and agents.",
    footer: "Linear · Jira",
    tone: "primary",
    icon: "ticket",
  },
  {
    id: "agent",
    step: "03",
    title: "Agent builds the PR",
    description:
      "A Cursor cloud agent (or Grok Bot / Hermes Agent when it fits) implements on its own branch and opens a PR with a logic summary — never a direct push to main.",
    footer: "Branch · PR · logic summary",
    tone: "accent",
    icon: "agent",
  },
  {
    id: "review",
    step: "04",
    title: "Review on the preview",
    description:
      "I read the logic summary, exercise the Vercel preview, and request changes until the UX and architecture match what I want.",
    footer: "Vercel preview · I decide",
    tone: "accent",
    icon: "review",
  },
  {
    id: "merge",
    step: "05",
    title: "Merge and promote",
    description:
      "When lint, typecheck, tests, and Lighthouse are green, I merge to development and promote to main for production.",
    footer: "Checks · development → main",
    tone: "primary",
    icon: "ship",
  },
];

export const aboutWorkflowSplit = {
  ai: {
    title: "AI does",
    items: ["Drafting code", "Refactors", "Tests", "Research", "PR summaries"],
  },
  me: {
    title: "I do",
    items: [
      "Scope and priorities",
      "Architecture and UX decisions",
      "Review",
      "Merging",
    ],
  },
} as const;

export const aboutWorkflowExample = {
  beforeLink: "The ",
  linkLabel: "/lab",
  linkHref: "/lab",
  afterLink:
    " chat redesign went from a phone screenshot to a ticket, an agent-built PR with before/after screenshots, my review, and a merge the same evening.",
} as const;

export const aboutWorkflowClosing =
  "AI handles repetitive drafting; I focus on scope, architecture, review, and product decisions." as const;
