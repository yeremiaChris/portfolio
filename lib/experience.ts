import { getExperienceLabel } from "./career";

export type ExperienceRoleTone = "primary" | "accent";

export type ExperienceRole = {
  id: string;
  status: string;
  current?: boolean;
  location?: string;
  locationPeriod: string;
  title: string;
  company: string;
  companyLegal: string;
  summary: string;
  sideStats: string[];
  highlights: string[];
  stack: string[];
  tone: ExperienceRoleTone;
};

export const experienceIntro = {
  eyebrow: "Career timeline",
  title: "Engineering Experience",
  description:
    "Production track record across health-tech platforms, logistics systems, and product teams.",
  tenureBadge: `${getExperienceLabel()} years of experience`,
} as const;

export const experienceRoleToneClass: Record<ExperienceRoleTone, string> = {
  primary: "text-primary",
  accent: "text-brand-accent",
};

export const experienceRoles: ExperienceRole[] = [
  {
    id: "primaku",
    status: "PRESENT",
    current: true,
    location: "Jakarta, Indonesia · Remote",
    locationPeriod: "Full-time · Dec 2022 – Present",
    title: "Frontend Engineer",
    company: "PrimaKu",
    companyLegal: "(PT Cipta Medika Informasi)",
    summary:
      "Pediatric health-tech company endorsed by the Indonesian Pediatric Society (IDAI); company's mobile app has 1M+ Google Play downloads. I work on the web platform.",
    sideStats: ["Design system · Jest / RTL"],
    highlights: [
      "Built and maintain PrimaKu’s consumer web platform (Next.js / TypeScript): parent-facing flows, clinician-facing PrimaCare UI, and integrations with REST APIs and token-based auth.",
      "Shipped PrimaCare clinician UI tied to health-record / SatuSehat-related flows, plus the Parenthood Institute program site (registration and reward points) on the same web stack.",
      "Built a shared design system across PrimaKu web products from multi-brand Figma tokens, with accessible defaults and tested with Jest and React Testing Library.",
      "Improved day-to-day frontend delivery with AI-assisted coding and review, keeping the web platform reliable for health-tech users.",
    ],
    stack: [
      "React",
      "Next.js (App Router)",
      "TypeScript",
      "Redux",
      "TanStack Query",
      "Tailwind CSS",
      "REST APIs",
      "Jest / RTL",
    ],
    tone: "primary",
  },
  {
    id: "mazecare",
    status: "COMPLETED",
    location: "Hong Kong · Remote",
    locationPeriod: "Full-time · Jun 2025 – Jul 2026",
    title: "Frontend Engineer",
    company: "Mazecare",
    companyLegal: "",
    summary:
      "AI-native Clinic & Hospital Information System (EMR/HIS), FHIR-compliant, covering the full patient lifecycle from registration through billing and insurance.",
    sideStats: ["FHIR · GraphQL", "Vue 3 / Nuxt 3"],
    highlights: [
      "Built features spanning the patient lifecycle: registration, scheduling, clinical visits (diagnosis, notes, prescriptions, procedures), care episodes, teleconsultation, queues, digital consent forms, medical imaging, and billing workflows.",
      "Shipped AI clinical-assistant capabilities, including speech-to-text and AI-assisted medical note drafting with diagnosis/prescription suggestions during encounters.",
      "Delivered AI configuration tools (natural-language builders for encounter templates, dashboards, and workflows) plus intelligent document processing for billing and insurance data extraction.",
      "Integrated FHIR & GraphQL APIs with standardized clinical coding for third-party and payor integrations.",
    ],
    stack: ["Vue 3", "Nuxt 3", "TypeScript", "GraphQL", "FHIR"],
    tone: "accent",
  },
  {
    id: "kiriminaja",
    status: "COMPLETED",
    locationPeriod:
      "Yogyakarta, Indonesia · On-site · Full-time · Jan 2023 – Apr 2024",
    title: "Frontend Engineer",
    company: "KiriminAja",
    companyLegal: "(PT Selalu Siap Solusi)",
    summary:
      "Multi-courier parcel aggregation platform handling bulk cargo, instant transit, and multi-tier e-commerce fulfillment across Indonesia.",
    sideStats: ["15+ courier partners", "High-density UI"],
    highlights: [
      "Developed logistics control-room interfaces using Vue.js and Nuxt.js, including a live rate UI across 15+ couriers.",
      "Built high-density parcel-manifest and batch barcode-scanning interfaces for high-volume daily shipping labels, using Web Workers and virtualized lists.",
      "Implemented efficient state management with Pinia and Vuex for courier calculation caching and live shipment tracking, supporting high platform reliability.",
      "Collaborated with operations and QA on performance benchmarks and incident handling.",
    ],
    stack: [
      "Vue.js",
      "Nuxt.js",
      "TypeScript",
      "Pinia / Vuex",
      "Tailwind CSS",
      "REST APIs",
    ],
    tone: "accent",
  },
  {
    id: "icreativelabs",
    status: "FOUNDATIONAL",
    locationPeriod:
      "Bandung, Indonesia · On-site · Full-time · Jan 2022 – May 2023",
    title: "Frontend Engineer",
    company: "iCreativeLabs",
    companyLegal: "(PT Idekreatif Menusa Teknologi)",
    summary:
      "Digital transformation consultancy delivering enterprise web and mobile applications.",
    sideStats: ["Web & mobile", "Client sprints"],
    highlights: [
      "Built client-facing web applications, admin dashboards, and hybrid mobile interfaces using React, Next.js, Vue, and React Native.",
      "Delivered pixel-accurate responsive interfaces from complex client Figma designs.",
      "Implemented payment-gateway integrations (Midtrans, Xendit), complex state management, and multilingual support (i18n).",
      "Worked in fast client sprints and handed off production-ready code to internal teams.",
    ],
    stack: ["React", "Next.js", "Vue", "Nuxt", "React Native", "Tailwind CSS"],
    tone: "accent",
  },
];

export type ExperienceDiscipline = {
  id: string;
  title: string;
  description: string;
  footer: string;
  tone: ExperienceRoleTone;
  icon: "layout" | "network" | "code";
};

export const experienceDisciplinesIntro = {
  eyebrow: "Execution habits",
  title: "How I Work",
} as const;

export const experienceDisciplines: ExperienceDiscipline[] = [
  {
    id: "tokens",
    title: "Design Systems",
    description:
      "Strong Figma token consistency — shared components, predictable spacing, and interfaces that stay coherent as products grow.",
    footer: "Tokens → Components → Screens",
    tone: "primary",
    icon: "layout",
  },
  {
    id: "runtime",
    title: "Performance-Focused Frontend",
    description:
      "Careful attention to Core Web Vitals, payload size, and main-thread work so product UI stays responsive under real usage.",
    footer: "CWV · Smooth interaction",
    tone: "accent",
    icon: "network",
  },
  {
    id: "testing",
    title: "Type Safety & Testing",
    description:
      "Type-safe TypeScript and solid testing habits — unit/integration coverage and CI checks that keep releases safer.",
    footer: "TS Strict · Jest / RTL · Smoke tests",
    tone: "accent",
    icon: "code",
  },
];

export const experienceContactCta = {
  eyebrow: "Open to the right opportunity",
  title: "Want to talk about a role or a product problem?",
  description:
    "Open for Software Engineer roles (frontend-heavy) — full-time or contract. Feel free to reach out by email or LinkedIn (WhatsApp works too).",
} as const;

export function formatExperienceStackLine(stack: readonly string[]): string {
  return stack.join(" · ");
}
