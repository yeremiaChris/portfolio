export type ProjectRibbonTone = "foreground" | "primary" | "cyan";

export type ProjectRibbonMetric = {
  label: string;
  value: string;
  tone: ProjectRibbonTone;
};

export const projectsIntro = {
  breadcrumbRoot: "sys://root/index",
  breadcrumbLeaf: "architectural_deployments.log",
  title: "Featured Projects",
  description:
    "Four production stories with ownership and outcomes — health-tech and logistics first. Earlier shipped work sits in the archive below.",
} as const;

export const projectsArchiveIntro = {
  eyebrow: "Archive",
  title: "Earlier work",
  description:
    "Additional shipped sites and UI. Real work — just not the hiring signal.",
} as const;

export const projectRibbonToneClass: Record<ProjectRibbonTone, string> = {
  foreground: "text-foreground",
  primary: "text-primary",
  cyan: "text-[#4cd7f6]",
};

export const projectsRibbon: ProjectRibbonMetric[] = [
  {
    label: "Featured",
    value: "4 Production",
    tone: "foreground",
  },
  {
    label: "Domains",
    value: "Health · Logistics",
    tone: "primary",
  },
  {
    label: "Stack Focus",
    value: "React · Vue · APIs",
    tone: "cyan",
  },
];

export type ProjectTag = "work" | "personal";

export type Project = {
  id: string;
  title: string;
  tag: ProjectTag;
  year: string;
  summary: string;
  tools: string[];
  image: string;
  imageAlt: string;
  featured: boolean;
  href?: string;
  ctaLabel?: "Open Site" | "Webview";
};

export const projects: Project[] = [
  {
    id: "mazecare",
    title: "Mazecare Clinic & Hospital OS",
    tag: "work",
    year: "2025–2026",
    summary:
      "Owned clinical visit, queue, teleconsult, and billing flows on a FHIR-compliant clinic/hospital OS. Integrated GraphQL + FHIR and shipped AI-assisted documentation (speech-to-text, note drafting) used in real clinic and hospital workflows.",
    tools: ["Vue 3", "Nuxt 3", "TypeScript", "GraphQL", "FHIR"],
    image: "/projects/mazecare.png",
    imageAlt: "Mazecare receptionist dashboard and queue management",
    featured: true,
    href: "https://www.mazecare.com/",
    ctaLabel: "Open Site",
  },
  {
    id: "primaku",
    title: "PrimaKu",
    tag: "work",
    year: "2022–Present",
    summary:
      "Owned clinician and family-facing product UI on PrimaKu’s pediatric health platform — shared design-system components, REST + auth, and realtime telemetry. The consumer app has 1M+ Google Play downloads; primaku.com is the separate parent-facing growth catalog (location-priced vaccines and medical services), not the clinical app.",
    tools: [
      "Next.js",
      "TypeScript",
      "React Hook Form",
      "Valibot",
      "TanStack Query",
      "Framer Motion",
    ],
    image: "/projects/primaku.png",
    imageAlt: "PrimaKu parent-facing vaccine and medical services catalog",
    featured: true,
    href: "https://www.primaku.com",
    ctaLabel: "Open Site",
  },
  {
    id: "kiriminaja",
    title: "KiriminAja",
    tag: "work",
    year: "2023",
    summary:
      "Owned high-density logistics UI for a multi-courier aggregator. Built live shipping rates across 15+ courier partners and manifest/barcode flows with virtualized lists + Web Workers so ops could process high daily label volume without the UI locking up. The consumer app has 100K+ Google Play downloads.",
    tools: ["Nuxt.js", "TypeScript", "Swiper", "Firebase"],
    image: "/projects/kiriminaja.jpg",
    imageAlt: "KiriminAja logistics platform",
    featured: true,
    href: "https://app.kiriminaja.com",
    ctaLabel: "Open Site",
  },
  {
    id: "primacare",
    title: "PrimaCare",
    tag: "work",
    year: "2024",
    summary:
      "Owned clinician-facing medical records and SatuSehat integration flows in a clinic management app — forms, data pipelines, and day-to-day clinical UI.",
    tools: [
      "Next.js",
      "TypeScript",
      "React Hook Form",
      "TanStack Query",
      "Valibot",
    ],
    image: "/projects/primacare.jpg",
    imageAlt: "PrimaCare clinic management",
    featured: true,
    href: "https://www.primacare.ai",
    ctaLabel: "Open Site",
  },
  {
    id: "parenthood",
    title: "Parenthood Institute",
    tag: "work",
    year: "2025",
    summary:
      "Built the program site for PrimaKu’s annual parenting classes and rewards system, including registration flows and point collection features.",
    tools: [
      "Next.js",
      "TypeScript",
      "React Hook Form",
      "TanStack Query",
      "Valibot",
    ],
    image: "/projects/parenthood.jpg",
    imageAlt: "Parenthood Institute",
    featured: false,
    href: "https://www.primaku.com/parenthood-institute",
    ctaLabel: "Open Site",
  },
  {
    id: "buildingbots",
    title: "BuildingBots AI",
    tag: "work",
    year: "2024",
    summary:
      "Landing page for an AI solutions agency. Built the site structure, content sections, and form handling.",
    tools: ["Nuxt.js", "Supabase", "Tailwind CSS", "TypeScript"],
    image: "/projects/buildingbots.png",
    imageAlt: "BuildingBots AI",
    featured: false,
    href: "https://buildingbots.ai",
    ctaLabel: "Open Site",
  },
  {
    id: "cdic",
    title: "CDIC",
    tag: "work",
    year: "2023",
    summary:
      "Webview app for pediatric diabetes management with device connection and health diary features.",
    tools: ["Nuxt.js", "Tailwind CSS", "Axios"],
    image: "/projects/cdic.jpg",
    imageAlt: "CDIC pediatric diabetes tracker",
    featured: false,
    href: "https://play.google.com/store/apps/details?id=com.primaku.app&hl=id",
    ctaLabel: "Webview",
  },
  {
    id: "floucloud",
    title: "Flou Cloud",
    tag: "work",
    year: "2023",
    summary:
      "Landing page and CMS-driven site for a local cloud service provider.",
    tools: ["Nuxt.js", "Tailwind CSS", "Axios"],
    image: "/projects/floucloud.jpg",
    imageAlt: "Flou Cloud",
    featured: false,
    href: "https://www.floucloud.id",
    ctaLabel: "Open Site",
  },
  {
    id: "ukm-digital",
    title: "UKM Digital",
    tag: "work",
    year: "2021–2022",
    summary:
      "No-code website builder for Indonesian SMEs. At ICreative Labs (Bandung), created new themes and improved existing templates for the template marketplace and visual editor.",
    tools: ["Laravel", "Vue", "JavaScript"],
    image: "/projects/ukm-digital.png",
    imageAlt: "UKM Digital template gallery dashboard",
    featured: false,
    href: "https://ukm.digital/",
    ctaLabel: "Open Site",
  },
  {
    id: "telkom-infra",
    title: "Telkom Infra",
    tag: "work",
    year: "2022",
    summary:
      "Corporate site for Telkom’s infrastructure subsidiary with CMS-managed content.",
    tools: ["Nuxt.js", "Tailwind CSS", "Axios"],
    image: "/projects/telkom-infra.png",
    imageAlt: "Telkom Infra",
    featured: false,
    href: "https://telkominfra.co.id",
    ctaLabel: "Open Site",
  },
  {
    id: "dashboard-purity",
    title: "Dashboard Purity",
    tag: "personal",
    year: "2022",
    summary:
      "Personal project — pixel-perfect admin dashboard UI built with Nuxt.js and Tailwind CSS.",
    tools: ["Nuxt.js", "Tailwind CSS"],
    image: "/projects/dashboard-purity.png",
    imageAlt: "Dashboard Purity UI",
    featured: false,
    href: "https://slicing-ui-purity.netlify.app/",
    ctaLabel: "Open Site",
  },
];

export function getFeaturedProjects(
  items: readonly Project[] = projects,
): Project[] {
  return items.filter((project) => project.featured);
}

export function getArchiveProjects(
  items: readonly Project[] = projects,
): Project[] {
  return items.filter((project) => !project.featured);
}

export const projectsContactCta = {
  eyebrow: "Available for Software Engineer roles (frontend-heavy)",
  title: "Interested in hiring or discussing a product build?",
  description:
    "Open for full-time remote or hybrid opportunities. Feel free to reach out via WhatsApp or email.",
} as const;
