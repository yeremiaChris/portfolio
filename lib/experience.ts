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
    progressPct: number;
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
    "Production track record across health-tech platforms, logistics systems, and digital product teams.",
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
    label: "Shipped Work",
    value: "150+",
    detail: "Components & features",
    tone: "violet",
    icon: "package",
  },
  {
    label: "Performance",
    value: "< 100ms",
    detail: "INP · 99.9% uptime",
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
    title: "Senior Frontend Web Developer",
    company: "PrimaKu",
    companyLegal: "(PT Cipta Medika Informasi)",
    summary:
      "National health-tech platform endorsed by the Indonesian Pediatric Society (IDAI), supporting early childhood health monitoring for clinicians and families.",
    sideStats: ["1M+ clinicians on platform", "Jest / RTL coverage"],
    highlights: [
      "Built and maintained frontend architecture for consumer growth platforms and clinical portals using React and Next.js (App Router), with a strong focus on performance and maintainability.",
      "Developed accessible design system components synced with multi-brand Figma tokens, used across a platform serving 1M+ clinicians.",
      "Implemented REST API integrations, token-based authentication flows, and third-party pediatric telemetry streaming.",
      "Improved team practices around code reviews, linting standards, and Agile processes.",
    ],
    panel: {
      title: "Product Focus",
      score: "Growth + Clinical UI",
      progressPct: 92,
      rows: [
        { label: "Stack:", value: "React · Next.js App Router", emphasize: true },
        { label: "Integrations:", value: "REST · Auth · Telemetry" },
        { label: "Quality:", value: "Design system · Jest / RTL" },
      ],
      footnote: "IDAI-endorsed pediatric health platform",
    },
    stack: [
      "React",
      "Next.js (App Router)",
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
      "Built features across the patient lifecycle: registration, scheduling, clinical visits, teleconsultation, queues, medical imaging, and billing.",
      "Shipped AI clinical assistant features including speech-to-text and AI-assisted medical note drafting with diagnosis/prescription suggestions.",
      "Developed AI configuration tools for encounter templates, dashboards, and workflows, plus document processing for billing and insurance.",
      "Integrated FHIR and GraphQL APIs with standardized clinical coding for third-party and payor systems.",
    ],
    panel: {
      title: "Clinical Platform Scope",
      score: "Full Patient Lifecycle",
      progressPct: 100,
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
    sideStats: ["15+ couriers", "High-density UI"],
    highlights: [
      "Developed logistics control-room interfaces using Vue.js and Nuxt.js, including real-time pricing across 15+ domestic couriers.",
      "Built high-density parcel manifest and batch barcode scanning interfaces for high daily label volume, using Web Workers and virtualized lists.",
      "Implemented efficient state management with Pinia/Vuex for courier calculation caching and live shipment tracking.",
      "Worked closely with operations and QA on performance and incident handling.",
    ],
    panel: {
      title: "Logistics UI Focus",
      score: "Control Room + Pricing",
      progressPct: 90,
      rows: [
        {
          label: "Multi-carrier:",
          value: "15+ integrated",
          emphasize: true,
        },
        { label: "Heavy lists:", value: "Virtualization · Workers" },
        { label: "State:", value: "Pinia / Vuex" },
      ],
      footnote: "Parcel aggregation · fulfillment ops",
    },
    stack: [
      "Vue.js",
      "Nuxt.js",
      "Pinia / Vuex",
      "Tailwind CSS",
      "REST APIs",
    ],
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
      "Built client-facing web applications, admin dashboards, and hybrid mobile interfaces using React, Next.js, Vue, and React Native.",
      "Delivered pixel-accurate responsive interfaces from complex Figma designs.",
      "Implemented payment gateway integrations (Midtrans, Xendit), complex state management, and multilingual support (i18n).",
      "Worked in fast client sprints and handed off production-ready code to internal teams.",
    ],
    panel: {
      title: "Client Delivery",
      score: "Web · Mobile · Payments",
      progressPct: 95,
      rows: [
        { label: "Platforms:", value: "Web & mobile", emphasize: true },
        { label: "Payments:", value: "Midtrans · Xendit" },
        { label: "Extras:", value: "i18n · Design handoff" },
      ],
      footnote: "Agency delivery across enterprise clients",
    },
    stack: [
      "React",
      "Next.js",
      "Vue",
      "Nuxt",
      "React Native",
      "Tailwind CSS",
    ],
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
