export type ProjectRibbonTone = "foreground" | "primary" | "cyan";

export type ProjectRibbonMetric = {
  label: string;
  value: string;
  tone: ProjectRibbonTone;
};

export const projectsIntro = {
  breadcrumbRoot: "sys://root/index",
  breadcrumbLeaf: "architectural_deployments.log",
  title: "Featured Projects & Engineering Lab",
  description:
    "Production web platforms, clinical healthcare dashboards, high-volume shipping calculation engines, and interactive frontend architectures built with React, Next.js (App Router), Vue, Nuxt, and modern state primitives.",
} as const;

export const projectRibbonToneClass: Record<ProjectRibbonTone, string> = {
  foreground: "text-foreground",
  primary: "text-primary",
  cyan: "text-[#4cd7f6]",
};

export const projectsRibbon: ProjectRibbonMetric[] = [
  {
    label: "Deployed Repos",
    value: "6+ Enterprise",
    tone: "foreground",
  },
  {
    label: "Avg Lighthouse",
    value: "98.4 / 100",
    tone: "primary",
  },
  {
    label: "Total Reach",
    value: "1M+ Clinicians",
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
      "FHIR-compliant EMR/HIS covering the full patient lifecycle — registration, scheduling, clinical care, queues, pharmacy, billing, and AI-assisted documentation — built with Vue 3 and Nuxt 3.",
    tools: ["Vue 3", "Nuxt 3", "TypeScript", "GraphQL", "FHIR"],
    image: "/projects/mazecare.png",
    imageAlt: "Mazecare receptionist dashboard and queue management",
    href: "https://www.mazecare.com/",
    ctaLabel: "Open Site",
  },
  {
    id: "primaku",
    title: "PrimaKu Landing Page (Revamp)",
    tag: "work",
    year: "2025",
    summary:
      "The revamped PrimaKu landing page features smooth animations and sections highlighting PrimaKu's parenting tools, ecosystem, and impact, designed for an engaging user experience.",
    tools: [
      "Next.js",
      "HeroUI (NextUI)",
      "TypeScript",
      "Swiper",
      "React Hook Form",
      "Valibot",
      "TanStack Query",
      "Axios",
      "Framer Motion",
      "MoEngage",
    ],
    image: "/projects/primaku.png",
    imageAlt: "PrimaKu landing page",
    href: "https://www.primaku.com",
    ctaLabel: "Open Site",
  },
  {
    id: "parenthood",
    title: "Parenthood Institute",
    tag: "work",
    year: "2025",
    summary:
      "An annual program by PrimaKu that supports parents with free and paid classes from trusted doctors, plus opportunities to win prizes like cash, vouchers, and children's product hampers through point collection.",
    tools: [
      "Next.js",
      "HeroUI (NextUI)",
      "TypeScript",
      "Swiper",
      "React Hook Form",
      "TanStack Query",
      "Axios",
      "Valibot",
      "MoEngage",
    ],
    image: "/projects/parenthood.jpg",
    imageAlt: "Parenthood Institute",
    href: "https://www.primaku.com/parenthood-institute",
    ctaLabel: "Open Site",
  },
  {
    id: "primacare",
    title: "PrimaCare",
    tag: "work",
    year: "2024",
    summary:
      "PrimaCare.ai is a web-based clinic management app from PrimaKu that simplifies medical records, integrates with SatuSehat for compliance, and provides easy access for doctors and staff with no maintenance costs and regular updates.",
    tools: [
      "Next.js",
      "HeroUI (NextUI)",
      "TypeScript",
      "React Hook Form",
      "TanStack Query",
      "Axios",
      "Valibot",
    ],
    image: "/projects/primacare.jpg",
    imageAlt: "PrimaCare clinic management",
    href: "https://www.primacare.ai",
    ctaLabel: "Open Site",
  },
  {
    id: "buildingbots",
    title: "BuildingBots AI (Agigtech)",
    tag: "work",
    year: "2024",
    summary:
      "Official landing page for BuildingBots.AI, a software agency offering tailored AI solutions — mission, vision, values, and expertise in cutting-edge AI technologies and digital services.",
    tools: [
      "Nuxt.js",
      "Supabase",
      "Tailwind CSS",
      "Nuxt UI",
      "TypeScript",
      "VeeValidate",
      "Axios",
      "Valibot",
    ],
    image: "/projects/buildingbots.png",
    imageAlt: "BuildingBots AI",
    href: "https://buildingbots.ai",
    ctaLabel: "Open Site",
  },
  {
    id: "kiriminaja",
    title: "KiriminAja",
    tag: "work",
    year: "2023",
    summary:
      "Shipping aggregator platform that simplifies logistics for businesses — regular, instant, cargo, and bulk shipments, plus fulfillment and warehousing, trusted by over 200,000 users.",
    tools: ["Nuxt.js", "TypeScript", "Swiper", "GrapesJS", "Firebase"],
    image: "/projects/kiriminaja.jpg",
    imageAlt: "KiriminAja logistics platform",
    href: "https://app.kiriminaja.com",
    ctaLabel: "Open Site",
  },
  {
    id: "cdic",
    title: "CDIC",
    tag: "work",
    year: "2023",
    summary:
      "Webview app that makes managing a child's diabetes easier with Accu-Chek device connection and a detailed health diary for pediatric care.",
    tools: ["Nuxt.js", "Tailwind CSS", "Axios", "Swiper"],
    image: "/projects/cdic.jpg",
    imageAlt: "CDIC pediatric diabetes tracker",
    href: "https://play.google.com/store/apps/details?id=com.primaku.app&hl=id",
    ctaLabel: "Webview",
  },
  {
    id: "floucloud",
    title: "Flou Cloud",
    tag: "work",
    year: "2023",
    summary:
      "Landing page for Flou Cloud's locally-owned, high-performance cloud services, with a customizable CMS for content, pages, and menus.",
    tools: ["Nuxt.js", "Tailwind CSS", "Swiper", "Axios"],
    image: "/projects/floucloud.jpg",
    imageAlt: "Flou Cloud",
    href: "https://www.floucloud.id",
    ctaLabel: "Open Site",
  },
  {
    id: "telkom-infra",
    title: "Telkom Infra",
    tag: "work",
    year: "2022",
    summary:
      "Telkom subsidiary site for telecom infrastructure and outsourcing solutions, with a CMS-driven landing page for vision, values, and contact.",
    tools: ["Nuxt.js", "Tailwind CSS", "Swiper", "Axios"],
    image: "/projects/telkom-infra.png",
    imageAlt: "Telkom Infra",
    href: "https://telkominfra.co.id",
    ctaLabel: "Open Site",
  },
  {
    id: "dashboard-purity",
    title: "Dashboard Purity",
    tag: "personal",
    year: "2022",
    summary:
      "Pixel-perfect dashboard UI built with Nuxt.js and Tailwind CSS — charts and summaries for a seamless admin experience.",
    tools: ["Nuxt.js", "Tailwind CSS", "Swiper"],
    image: "/projects/dashboard-purity.png",
    imageAlt: "Dashboard Purity UI",
    href: "https://slicing-ui-purity.netlify.app/",
    ctaLabel: "Open Site",
  },
];

export const projectsContactCta = {
  eyebrow: "Available for senior frontend roles",
  title: "Interested in hiring or discussing technical architecture?",
  description:
    "Open for Senior Frontend Web Developer opportunities (full-time remote or hybrid). Reach me via WhatsApp or verified email.",
} as const;
