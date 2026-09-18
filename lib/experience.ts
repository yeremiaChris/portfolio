export type ExperienceMetricTone = "primary" | "cyan" | "violet" | "foreground";

export type ExperienceMetric = {
  label: string;
  value: string;
  detail: string;
  tone: ExperienceMetricTone;
  icon: "clock" | "building" | "package" | "gauge";
};

export type ExperienceRoleTone = "primary" | "cyan" | "violet";

export type ExperienceRolePanelRow = {
  label: string;
  value: string;
  emphasize?: boolean;
};

export type ExperienceRole = {
  id: string;
  roleCode: string;
  status: string;
  current?: boolean;
  locationPeriod: string;
  title: string;
  company: string;
  companyLegal: string;
  summary: string;
  sideStats: string[];
  highlights: string[];
  panel: {
    title: string;
    score: string;
    progressPct?: number;
    rows: ExperienceRolePanelRow[];
    footnote: string;
  };
  stack: string[];
  tone: ExperienceRoleTone;
};

export const experienceIntro = {
  breadcrumbRoot: "sys://root/index",
  breadcrumbLeaf: "career_trajectory.log",
  eyebrow: "// CAREER TIMELINE · PRODUCTION TRACK RECORD",
  title: "Engineering Experience",
  description:
    "Production track record across health-tech platforms, logistics systems, and product teams. Some roles overlapped in time — each entry is the work I owned there.",
  tenureBadge: "Career Timeline // 5+ Years",
} as const;

export const experienceMetricToneClass: Record<ExperienceMetricTone, string> = {
  primary: "text-primary",
  cyan: "text-[#4cd7f6]",
  violet: "text-[#bb86fc]",
  foreground: "text-foreground",
};

export const experienceRoleToneClass: Record<ExperienceRoleTone, string> = {
  primary: "text-primary",
  cyan: "text-[#4cd7f6]",
  violet: "text-[#bb86fc]",
};

export const experienceRoleBarClass: Record<ExperienceRoleTone, string> = {
  primary: "bg-primary",
  cyan: "bg-[#4cd7f6]",
  violet: "bg-[#bb86fc]",
};

export const experienceMetrics: ExperienceMetric[] = [
  {
    label: "Experience",
    value: "5+ Years",
    detail: "Continuous shipping",
    tone: "primary",
    icon: "clock",
  },
  {
    label: "Domains",
    value: "3 Focus Areas",
    detail: "Health · Logistics · Agency",
    tone: "foreground",
    icon: "building",
  },
  {
    label: "Production UI",
    value: "React + Vue",
    detail: "Next.js · Nuxt in prod",
    tone: "violet",
    icon: "package",
  },
  {
    label: "Scale",
    value: "1M+",
    detail: "PrimaKu app downloads",
    tone: "cyan",
    icon: "gauge",
  },
];

export const experienceRoles: ExperienceRole[] = [
  {
    id: "primaku",
    roleCode: "ROLE:01",
    status: "PRESENT",
    current: true,
    locationPeriod: "Jakarta, ID (Remote) · Dec 2022 — Present",
    title: "Frontend Web Developer",
    company: "PrimaKu",
    companyLegal: "(PT Cipta Medika Informasi)",
    summary:
      "National health-tech platform endorsed by the Indonesian Pediatric Society (IDAI), supporting early childhood health monitoring for clinicians and families.",
    sideStats: ["1M+ Play downloads", "Jest / RTL coverage"],
    highlights: [
      "Owned frontend architecture for PrimaKu product and clinical portals in React/Next.js — shared UI, REST + auth, and telemetry. The consumer parenting app has 1M+ Google Play downloads.",
      "Shipped accessible design-system components synced to multi-brand Figma tokens, used across clinician and family-facing product surfaces.",
      "Delivered primaku.com as the parent-facing growth catalog (location-priced vaccines and medical services) on SSR — a different surface from the clinician product.",
    ],
    panel: {
      title: "Product Focus",
      score: "Growth + Clinical UI",
      rows: [
        {
          label: "Stack:",
          value: "React · Next.js",
          emphasize: true,
        },
        { label: "Integrations:", value: "REST · Auth · Telemetry" },
        { label: "Quality:", value: "Design system · Jest / RTL" },
      ],
      footnote: "IDAI-endorsed pediatric health platform",
    },
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "REST APIs",
      "Jest / RTL",
    ],
    tone: "primary",
  },
  {
    id: "mazecare",
    roleCode: "ROLE:02",
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
    panel: {
      title: "Clinical Platform Scope",
      score: "Full Patient Lifecycle",
      rows: [
        { label: "Domain:", value: "EMR / HIS / Queues", emphasize: true },
        { label: "AI Surface:", value: "Notes · Templates · Docs" },
        { label: "Integration:", value: "FHIR · GraphQL" },
      ],
      footnote: "Clinic & hospital OS · mazecare.com",
    },
    stack: ["Vue 3", "Nuxt 3", "TypeScript", "GraphQL", "FHIR"],
    tone: "cyan",
  },
  {
    id: "kiriminaja",
    roleCode: "ROLE:03",
    status: "COMPLETED",
    locationPeriod: "Yogyakarta, ID (Onsite) · Jan 2023 — Apr 2024",
    title: "Frontend Web Developer",
    company: "KiriminAja",
    companyLegal: "(PT Selalu Siap Solusi)",
    summary:
      "Multi-courier parcel aggregation platform handling bulk cargo, instant delivery, and e-commerce fulfillment across Indonesia.",
    sideStats: ["15+ courier partners", "High-density UI"],
    highlights: [
      "Owned logistics control-room UI in Vue/Nuxt, including live shipping rates across 15+ domestic courier partners. The consumer app has 100K+ Google Play downloads.",
      "Built high-density manifest and batch barcode flows with Web Workers and virtualized lists so ops could process high daily label volume without the UI locking up.",
      "Implemented Pinia/Vuex caching for courier calculation and live shipment tracking, working with ops and QA on performance and incidents.",
    ],
    panel: {
      title: "Logistics UI Focus",
      score: "Control Room + Pricing",
      rows: [
        {
          label: "Multi-carrier:",
          value: "15+ partners",
          emphasize: true,
        },
        { label: "Heavy lists:", value: "Virtualization · Workers" },
        { label: "State:", value: "Pinia / Vuex" },
      ],
      footnote: "Parcel aggregation · fulfillment ops",
    },
    stack: ["Vue.js", "Nuxt.js", "Pinia / Vuex", "Tailwind CSS", "REST APIs"],
    tone: "violet",
  },
  {
    id: "icreativelabs",
    roleCode: "ROLE:04",
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
    panel: {
      title: "Client Delivery",
      score: "Web · Mobile · Payments",
      rows: [
        { label: "Platforms:", value: "Web & mobile", emphasize: true },
        { label: "Payments:", value: "Midtrans · Xendit" },
        { label: "Extras:", value: "i18n · Design handoff" },
      ],
      footnote: "Agency delivery across enterprise clients",
    },
    stack: ["React", "Next.js", "Vue", "Nuxt", "React Native", "Tailwind CSS"],
    tone: "cyan",
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
  eyebrow: "EXECUTION HABITS",
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
    tone: "cyan",
    icon: "network",
  },
  {
    id: "testing",
    title: "Type Safety & Testing",
    description:
      "Type-safe TypeScript and solid testing habits — unit/integration coverage and CI checks that keep releases safer.",
    footer: "TS Strict · Jest / RTL · Smoke tests",
    tone: "violet",
    icon: "code",
  },
];

export const experienceContactCta = {
  eyebrow: "Open to the right opportunity",
  title: "Want to talk about a role or a product problem?",
  description:
    "Open for Software Engineer roles (frontend-heavy) — full-time or contract. Feel free to reach out via WhatsApp, email, or LinkedIn.",
} as const;
