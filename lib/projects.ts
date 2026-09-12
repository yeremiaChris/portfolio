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
    "Production work across healthcare and logistics — clinical systems, shipping platforms, and product interfaces built with React, Next.js, Vue, and modern APIs.",
} as const;

export const projectRibbonToneClass: Record<ProjectRibbonTone, string> = {
  foreground: "text-foreground",
  primary: "text-primary",
  cyan: "text-[#4cd7f6]",
};

export const projectsRibbon: ProjectRibbonMetric[] = [
  {
    label: "Shipped Projects",
    value: "11 Featured",
    tone: "foreground",
  },
  {
    label: "Domains",
    value: "Health · Logistics · SaaS",
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
      "FHIR-compliant EMR/HIS covering the full patient lifecycle. Built clinical visit flows, queues, teleconsultation, billing, and AI-assisted documentation features using Vue 3 and Nuxt 3.",
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
      "Revamped the main marketing site with smoother animations and clearer product storytelling. Focused on performance, form handling, and engagement tracking.",
    tools: [
      "Next.js",
      "TypeScript",
      "React Hook Form",
      "Valibot",
      "TanStack Query",
      "Framer Motion",
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
    href: "https://www.primaku.com/parenthood-institute",
    ctaLabel: "Open Site",
  },
  {
    id: "primacare",
    title: "PrimaCare",
    tag: "work",
    year: "2024",
    summary:
      "Clinic management web app focused on medical records and SatuSehat integration. Worked on core forms, data flows, and clinician-facing interfaces.",
    tools: [
      "Next.js",
      "TypeScript",
      "React Hook Form",
      "TanStack Query",
      "Valibot",
    ],
    image: "/projects/primacare.jpg",
    imageAlt: "PrimaCare clinic management",
    href: "https://www.primacare.ai",
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
    href: "https://buildingbots.ai",
    ctaLabel: "Open Site",
  },
  {
    id: "kiriminaja",
    title: "KiriminAja",
    tag: "work",
    year: "2023",
    summary:
      "Frontend for a multi-courier shipping platform used by 200K+ users. Built logistics interfaces for pricing, manifest handling, and shipment tracking.",
    tools: ["Nuxt.js", "TypeScript", "Swiper", "Firebase"],
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
      "Webview app for pediatric diabetes management with device connection and health diary features.",
    tools: ["Nuxt.js", "Tailwind CSS", "Axios"],
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
      "Landing page and CMS-driven site for a local cloud service provider.",
    tools: ["Nuxt.js", "Tailwind CSS", "Axios"],
    image: "/projects/floucloud.jpg",
    imageAlt: "Flou Cloud",
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
    href: "https://slicing-ui-purity.netlify.app/",
    ctaLabel: "Open Site",
  },
];

export const projectsContactCta = {
  eyebrow: "Available for Software Engineer roles (frontend-heavy)",
  title: "Interested in hiring or discussing a product build?",
  description:
    "Open for full-time remote or hybrid opportunities. Feel free to reach out via WhatsApp or email.",
} as const;
