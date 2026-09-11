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
  eyebrow: "// STACK_ARCHITECTURE · VERIFIED PRODUCTION DISPATCH",
  title: "Engineering Experience",
  description:
    "Production track record across AI-native hospital systems, pediatric health platforms, high-throughput logistics, and digital product agencies.",
  tenureBadge: "Career Timeline // 5+ Years Tenor",
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
    label: "Tenor Duration",
    value: "5+ Years",
    detail: "Continuous Shipping",
    tone: "primary",
    icon: "clock",
  },
  {
    label: "Core Ecosystems",
    value: "4 Groups",
    detail: "HIS · Health · Logistics · Agency",
    tone: "foreground",
    icon: "building",
  },
  {
    label: "Shipped Modules",
    value: "150+",
    detail: "Components & Pipelines",
    tone: "violet",
    icon: "package",
  },
  {
    label: "SLA & Performance",
    value: "< 100ms",
    detail: "INP · 99.9% Core Uptime",
    tone: "cyan",
    icon: "gauge",
  },
];

export const experienceRoles: ExperienceRole[] = [
  {
    id: "primaku",
    roleCode: "ROLE:01_SYS",
    status: "PRESENT TENOR",
    current: true,
    locationPeriod: "Jakarta, ID (Remote) · Dec 2022 — Present",
    title: "Senior Frontend Web Developer",
    company: "PrimaKu",
    companyLegal: "(PT Cipta Medika Informasi)",
    summary:
      "Exclusive national health-tech platform endorsed by the Indonesian Pediatric Society (IDAI), driving early childhood health monitoring for millions of families and certified clinicians nationwide.",
    sideStats: ["Active Clinicians: 1M+", "Test Cov: >88%"],
    highlights: [
      "Spearheaded frontend architecture for consumer growth platforms and clinical portal systems using React and Next.js (App Router), sustaining low TTFB and rigid production maintainability.",
      "Engineered pixel-perfect, zero-regression accessible design system components rigorously synchronized with multi-brand Figma token repositories.",
      "Streamlined mission-critical RESTful pipelines, token rotation authentication handshakes, and third-party pediatric telemetry streaming services.",
      "Championed Agile/Scrum and Kanban ceremonies, technical RFC proposals, automated linting rules, and code review rigor across distributed squads.",
    ],
    panel: {
      title: "Core Web Vitals Impact",
      score: "99.4% LCP Pass",
      progressPct: 96,
      rows: [
        { label: "INP (Interaction):", value: "42ms [PASS]", emphasize: true },
        { label: "Rendering Engine:", value: "Next.js SSR/ISR" },
        { label: "Pipeline Gate:", value: "Jest / RTL / CI" },
      ],
      footnote: "Accredited with IDAI National Standards",
    },
    stack: [
      "React.js",
      "Next.js (App Router)",
      "TypeScript",
      "Tailwind CSS",
      "RESTful APIs",
      "Jest / RTL",
      "Performance Tuning",
    ],
    tone: "primary",
  },
  {
    id: "mazecare",
    roleCode: "ROLE:02_SYS",
    status: "COMPLETED MISSION",
    locationPeriod: "Indonesia (Remote) · Jun 2025 — Jul 2026",
    title: "Frontend Engineer",
    company: "Mazecare",
    companyLegal: "(Full-time)",
    summary:
      "AI-native Clinic & Hospital Information System (EMR/HIS) — FHIR-compliant platform covering the full patient lifecycle from registration and scheduling through clinical care, lab, pharmacy, billing, and insurance.",
    sideStats: ["FHIR · GraphQL APIs", "Vue 3 / Nuxt 3"],
    highlights: [
      "Built features across the patient lifecycle: registration, scheduling, clinical visits (diagnosis, notes, prescriptions, procedures), care episodes, teleconsultation, queues, digital consent/forms, medical imaging, and billing workflows.",
      "Shipped AI clinical assistant capabilities — speech-to-text and AI-assisted medical note drafting, with diagnosis and prescription suggestions during encounters.",
      "Delivered AI configuration tools — natural-language builders for encounter templates, dashboards, workflows, and reports — plus intelligent document processing for billing and insurance data extraction.",
      "Integrated FHIR & GraphQL APIs with standardized clinical coding for third-party and payor integrations.",
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
    stack: [
      "Vue 3",
      "Nuxt 3",
      "TypeScript",
      "GraphQL",
      "FHIR",
      "API Integration",
    ],
    tone: "cyan",
  },
  {
    id: "kiriminaja",
    roleCode: "ROLE:03_SYS",
    status: "COMPLETED MISSION",
    locationPeriod: "Yogyakarta, ID (Onsite) · Jan 2023 — Apr 2024",
    title: "Frontend Web Developer",
    company: "KiriminAja",
    companyLegal: "(PT Selalu Siap Solusi)",
    summary:
      "High-scale parcel and multi-courier aggregation ecosystem managing bulk cargo, instant transit, and multi-tier e-commerce fulfillment across Indonesia.",
    sideStats: ["Daily Vol: 50K+ Labels", "Uptime: 99.98%"],
    highlights: [
      "Directed frontend engineering of complex logistics control rooms using Vue.js and Nuxt.js, implementing real-time pricing matrix engines across 15+ domestic shipping couriers.",
      "Rendered high-density parcel manifests and batch barcode scanning interfaces with zero main-thread freezing using Web Workers and virtualized lists.",
      "Implemented high-efficiency state structures using Pinia and Vuex for localized courier calculation caches and live shipment geofencing.",
      "Collaborated deeply with warehouse operations and QA leads, defining performance benchmarks and rapid-response incident post-mortems.",
    ],
    panel: {
      title: "Dynamic Matrix Compute",
      score: "< 85ms Query",
      progressPct: 91,
      rows: [
        {
          label: "Multi-Carrier Dispatch:",
          value: "15+ Integrated",
          emphasize: true,
        },
        { label: "Print Queue Engine:", value: "ZPL / PDF Raw" },
        { label: "Architecture:", value: "Micro-frontend" },
      ],
      footnote: "Realtime Courier Webhook Consumer",
    },
    stack: [
      "Vue.js",
      "Nuxt.js",
      "Pinia / Vuex",
      "Tailwind CSS",
      "RESTful Architecture",
      "Micro-frontends",
    ],
    tone: "violet",
  },
  {
    id: "icreativelabs",
    roleCode: "ROLE:04_SYS",
    status: "FOUNDATIONAL TENOR",
    locationPeriod: "Bandung, ID (Hybrid) · Jan 2022 — May 2023",
    title: "Frontend Web Developer",
    company: "iCreativeLabs",
    companyLegal: "(PT Idekreatif Menusa Teknologi)",
    summary:
      "Tier-one software development & digital transformation consultancy with 13+ years of experience delivering 150+ bespoke enterprise implementations.",
    sideStats: ["15+ Enterprise Clients", "Cross-Stack Deliveries"],
    highlights: [
      "Engineered client-facing web applications, administrative dashboards, and hybrid mobile interfaces across React, Next.js, Vue, and React Native stacks.",
      "Delivered 100% pixel-accurate responsive interfaces directly from highly complex client Figma systems, upholding strict visual compliance.",
      "Implemented secure third-party payment gateways, complex state management, and localized multilingual localization (i18n).",
      "Engaged in rapid-cycle client sprints, agile demonstrations, and zero-debt code handoffs to enterprise in-house teams.",
    ],
    panel: {
      title: "Client Delivery SLA",
      score: "100% On-Time",
      progressPct: 100,
      rows: [
        { label: "Multi-Platform:", value: "Web & Mobile", emphasize: true },
        { label: "Payment Gateways:", value: "Midtrans · Xendit" },
        { label: "Design System Handoff:", value: "Zero-Regression" },
      ],
      footnote: "Enterprise Quality Assurance Certified",
    },
    stack: [
      "React.js",
      "Next.js",
      "Vue.js",
      "Nuxt.js",
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
  eyebrow: "// EXECUTION STANDARDS",
  title: "Rigorous Front-End Architecture Disciplines",
} as const;

export const experienceDisciplines: ExperienceDiscipline[] = [
  {
    id: "tokens",
    title: "Tokenized Design Systems",
    description:
      "Every component begins with Figma token fidelity. Zero arbitrary margins, strict responsive breakpoint contracts, and comprehensive Storybook component isolation.",
    footer: "Tokens > Atoms > Molecules",
    tone: "primary",
    icon: "layout",
  },
  {
    id: "runtime",
    title: "Network & Runtime Hygiene",
    description:
      "Optimized payload boundaries via Next.js ISR, dynamic imports, stale-while-revalidate caching, and sub-50ms main-thread compute budgets for smooth 60fps UX.",
    footer: "CWV Green · Zero Main-Thread Jitter",
    tone: "cyan",
    icon: "network",
  },
  {
    id: "testing",
    title: "Type Safety & Testing",
    description:
      "Rigid TypeScript compilation checks paired with Jest/React Testing Library unit and integration coverage. Self-documenting, readable code ready for CI/CD gates.",
    footer: "TS Strict · 85%+ Target Coverage",
    tone: "violet",
    icon: "code",
  },
];

export const experienceContactCta = {
  eyebrow: "Available for select high-impact opportunities",
  title: "Ready to review verified references or schedule an interview?",
  description:
    "Open for Software Engineer roles (frontend-heavy) — full-time or advisory. Reach me via WhatsApp, email, or formal CV review.",
} as const;
