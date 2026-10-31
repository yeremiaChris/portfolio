import { getExperienceLabel } from "./career";

export type ExperienceRoleTone = "primary" | "accent";

export type ExperienceRole = {
  id: string;
  status: string;
  current?: boolean;
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
    "Production track record across health-tech platforms, logistics systems, and product teams. Some roles overlapped in time — each entry is the work I owned there.",
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
    locationPeriod: "Jakarta, ID (Remote) · Dec 2022 — Present",
    title: "Frontend Web Developer",
    company: "PrimaKu",
    companyLegal: "(PT Cipta Medika Informasi)",
    summary:
      "National health-tech platform endorsed by the Indonesian Pediatric Society (IDAI), supporting early childhood health monitoring for clinicians and families.",
    sideStats: ["Design system · Jest / RTL"],
    highlights: [
      "Owned frontend architecture for PrimaKu's web platform in React/Next.js with shared UI, REST + auth. PrimaKu's consumer app has 1M+ Google Play downloads; I build the web surfaces, not the mobile app.",
      "Shipped accessible design-system components synced to multi-brand Figma tokens, used across clinician and family-facing product surfaces.",
      "Delivered primaku.com as the parent-facing growth catalog (location-priced vaccines and medical services) on SSR — a different surface from the clinician product.",
    ],
    stack: ["React", "Next.js", "REST", "Jest / RTL"],
    tone: "primary",
  },
  {
    id: "mazecare",
    status: "COMPLETED",
    locationPeriod: "Indonesia (Remote) · Jun 2025 — Jul 2026",
    title: "Frontend Engineer",
    company: "Mazecare",
    companyLegal: "(Full-time)",
    summary:
      "AI-native Clinic & Hospital Information System (EMR/HIS), FHIR-compliant, covering the full patient lifecycle.",
    sideStats: ["FHIR · GraphQL", "Vue 3 / Nuxt 3"],
    highlights: [
      "Owned patient-lifecycle UI: registration, scheduling, clinical visits, teleconsultation, queues, imaging, and billing on a FHIR-compliant EMR/HIS.",
      "Shipped AI clinical assistant features — speech-to-text and AI-assisted notes with diagnosis/prescription suggestions — used in real clinic workflows.",
      "Integrated FHIR and GraphQL APIs with standardized clinical coding for third-party and payor systems.",
    ],
    stack: ["Vue 3", "Nuxt 3", "GraphQL", "FHIR"],
    tone: "accent",
  },
  {
    id: "kiriminaja",
    status: "COMPLETED",
    locationPeriod: "Yogyakarta, ID (Onsite) · Jan 2023 — Apr 2024",
    title: "Frontend Web Developer",
    company: "KiriminAja",
    companyLegal: "(PT Selalu Siap Solusi)",
    summary:
      "Multi-courier parcel aggregation platform handling bulk cargo, instant delivery, and e-commerce fulfillment across Indonesia.",
    sideStats: ["15+ courier partners", "High-density UI"],
    highlights: [
      "Owned logistics control-room UI in Vue/Nuxt, including live rate UI across 15+ domestic courier partners. KiriminAja's consumer app has 100K+ Google Play downloads; I build the web platform.",
      "Built high-density manifest and batch barcode flows with Web Workers and virtualized lists so ops could process high daily label volume without the UI locking up.",
      "Implemented Pinia/Vuex caching for courier calculation and live shipment tracking, working with ops and QA on performance and incidents.",
    ],
    stack: ["Vue", "Nuxt", "Pinia / Vuex", "REST"],
    tone: "accent",
  },
  {
    id: "icreativelabs",
    status: "FOUNDATIONAL",
    locationPeriod: "Bandung, ID (Hybrid) · Jan 2022 — May 2023",
    title: "Frontend Web Developer",
    company: "iCreativeLabs",
    companyLegal: "(PT Idekreatif Menusa Teknologi)",
    summary:
      "Digital transformation consultancy delivering enterprise web and mobile applications.",
    sideStats: ["Web & mobile", "Client sprints"],
    highlights: [
      "Delivered client web apps, admin dashboards, and hybrid mobile UI in React, Next.js, Vue, and React Native.",
      "Shipped payment gateway integrations (Midtrans, Xendit), complex state, and i18n in fast client sprints.",
      "Handed off production-ready, pixel-accurate interfaces from complex Figma designs to internal teams.",
    ],
    stack: ["React", "Next.js", "Vue", "Nuxt", "React Native"],
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
