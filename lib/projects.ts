export const projectsIntro = {
  title: "Featured Projects",
  description:
    "Four production stories with ownership and outcomes — health-tech and logistics first. Earlier shipped work sits in the archive below.",
} as const;

export const projectsArchiveIntro = {
  eyebrow: "Archive",
  title: "Earlier work",
  description: "Client sites and UI I shipped earlier in my career.",
} as const;

export type ProjectTag = "work" | "personal";

export type ProjectDomain = "Health-tech" | "Logistics";

export const featuredProjectRole = "Frontend Engineer" as const;

export const maxFeaturedProjectToolChips = 4;
export const maxArchiveProjectToolChips = 3;
export const maxProjectToolChips = maxFeaturedProjectToolChips;

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
  domain?: ProjectDomain;
  tagline?: string;
  highlights?: string[];
  href?: string;
  ctaLabel?: "Open Site" | "Webview";
};

export function getProjectToolChips(
  tools: readonly string[],
  featured: boolean,
): string[] {
  const limit = featured
    ? maxFeaturedProjectToolChips
    : maxArchiveProjectToolChips;
  return tools.slice(0, limit);
}

export const projects: Project[] = [
  {
    id: "mazecare",
    title: "Mazecare Clinic & Hospital OS",
    tag: "work",
    year: "2025–2026",
    summary:
      "Visit, queue, teleconsult, and billing UI on a FHIR-compliant clinic/hospital OS — GraphQL + FHIR, plus AI-assisted notes used in real clinic workflows.",
    tools: ["Vue 3", "Nuxt 3", "GraphQL", "FHIR"],
    image: "/projects/mazecare.png",
    imageAlt: "Mazecare receptionist dashboard and queue management",
    featured: true,
    domain: "Health-tech",
    tagline:
      "FHIR-compliant clinic and hospital OS covering visit, queue, teleconsult, and billing.",
    highlights: [
      "Visit, queue, teleconsult, and billing UI on the operating system.",
      "GraphQL + FHIR on the clinic/hospital stack.",
      "AI-assisted notes used in real clinic workflows.",
    ],
    href: "https://www.mazecare.com/",
    ctaLabel: "Open Site",
  },
  {
    id: "kiriminaja",
    title: "KiriminAja",
    tag: "work",
    year: "2023–2024",
    summary:
      "Developed high-density logistics web UI: a live rate UI across 15+ couriers, plus virtualized parcel manifests and batch barcode scanning powered by Web Workers.",
    tools: ["Vue", "Nuxt.js", "TypeScript", "Pinia / Vuex"],
    image: "/projects/kiriminaja.jpg",
    imageAlt: "KiriminAja logistics platform",
    featured: true,
    domain: "Logistics",
    tagline:
      "High-density logistics web UI for rates, manifests, and scanning.",
    highlights: [
      "Live rate UI across 15+ couriers.",
      "Virtualized parcel manifests.",
      "Batch barcode scanning powered by Web Workers.",
    ],
    href: "https://app.kiriminaja.com",
    ctaLabel: "Open Site",
  },
  {
    id: "primaku",
    title: "PrimaKu",
    tag: "work",
    year: "2022–Present",
    summary:
      "Web platform only: parent-facing primaku.com (SSR catalog for vaccines and medical services), the Parenthood Institute program site (registration and reward points), and clinician-facing PrimaCare UI, all on a shared design system. The company's mobile app has 1M+ Play downloads; I work on the web platform, not the app.",
    tools: ["Next.js", "TypeScript", "React Hook Form", "TanStack Query"],
    image: "/projects/primaku.png",
    imageAlt: "PrimaKu parent-facing vaccine and medical services catalog",
    featured: true,
    domain: "Health-tech",
    tagline:
      "Web platform for vaccines and medical services, Parenthood Institute, and shared clinician UI.",
    highlights: [
      "Parent-facing SSR catalog on primaku.com for vaccines and medical services.",
      "Parenthood Institute program site with registration and reward points.",
      "Clinician-facing PrimaCare UI on a shared design system—I work on the web platform, not the app.",
    ],
    href: "https://www.primaku.com",
    ctaLabel: "Open Site",
  },
  {
    id: "primacare",
    title: "PrimaCare",
    tag: "work",
    year: "2024",
    summary:
      "Clinician-facing PrimaCare web UI on PrimaKu's web stack: health-record and SatuSehat-related flows, forms, and day-to-day clinic screens.",
    tools: ["Next.js", "TypeScript", "React Hook Form", "TanStack Query"],
    image: "/projects/primacare.jpg",
    imageAlt: "PrimaCare clinic management",
    featured: true,
    domain: "Health-tech",
    tagline:
      "Clinician-facing web UI on PrimaKu's stack for clinic day-to-day work.",
    highlights: [
      "Health-record and SatuSehat-related flows.",
      "Forms and day-to-day clinic screens.",
    ],
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
    tools: ["Next.js", "TypeScript", "React Hook Form", "TanStack Query"],
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
      "Nuxt webview module for pediatric diabetes management (device connection and health diary), embedded in the PrimaKu app. I built the web module only.",
    tools: ["Nuxt.js", "Tailwind CSS", "Axios"],
    image: "/projects/cdic.jpg",
    imageAlt: "CDIC pediatric diabetes tracker",
    featured: false,
  },
  {
    id: "ukm-digital",
    title: "UKM Digital",
    tag: "work",
    year: "2022–2023",
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
    "Open for Software Engineer roles (frontend-heavy) — full-time or contract. Feel free to reach out by email or LinkedIn (WhatsApp works too).",
} as const;
