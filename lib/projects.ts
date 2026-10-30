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
    href: "https://www.mazecare.com/",
    ctaLabel: "Open Site",
  },
  {
    id: "primaku",
    title: "PrimaKu",
    tag: "work",
    year: "2022–Present",
    summary:
      "Web platform for clinician and family UI — design system, REST + auth. PrimaKu's consumer app has 1M+ Play downloads; primaku.com is the parent-facing catalog I ship on SSR, separate from the clinical product.",
    tools: ["Next.js", "TypeScript", "React Hook Form", "TanStack Query"],
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
    year: "2023–2024",
    summary:
      "High-density logistics web UI: live rate UI across 15+ couriers, virtualized manifests + Web Workers. KiriminAja's consumer app has 100K+ Play downloads; I own the control-room web platform.",
    tools: ["Nuxt.js", "TypeScript", "Swiper"],
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
      "Clinician-facing medical records and SatuSehat flows — forms, data pipelines, and day-to-day clinic UI.",
    tools: ["Next.js", "TypeScript", "React Hook Form", "TanStack Query"],
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
