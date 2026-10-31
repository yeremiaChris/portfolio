export type CoreTool = {
  id: string;
  title: string;
  context: string;
};

export type SecondaryTechCategory = {
  id: string;
  title: string;
  items: readonly string[];
};

export const techStackIntro = {
  eyebrow: "In production",
  title: "Tools I use",
  description:
    "Frontend craft as the core strength — backed by API integration, SQL familiarity, and delivery habits that hold up in production.",
  focusLabel: "Focus:",
  focusValue: "Software Engineer · Frontend-Heavy",
} as const;

export const coreTools: readonly CoreTool[] = [
  {
    id: "react-next",
    title: "React · Next.js",
    context: "PrimaKu web platform",
  },
  {
    id: "vue-nuxt",
    title: "Vue · Nuxt",
    context: "Mazecare and KiriminAja",
  },
  {
    id: "typescript",
    title: "TypeScript",
    context: "React, Next.js, and Vue in production",
  },
  {
    id: "tailwind",
    title: "Tailwind",
    context: "Multi-brand design system",
  },
  {
    id: "apis",
    title: "GraphQL · REST APIs",
    context: "Clinic OS and product integrations",
  },
];

export const secondaryTechCategories: readonly SecondaryTechCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    items: [
      "Redux",
      "Zustand / TanStack Query",
      "React Hook Form",
      "Valibot",
      "shadcn/ui",
      "HeroUI",
      "Micro-Frontends",
      "Core Web Vitals",
    ],
  },
  {
    id: "data",
    title: "Data & APIs",
    items: [
      "NestJS",
      "Node.js",
      "Go",
      "MySQL",
      "SQLite",
      "Supabase",
      "FHIR",
      "WebSockets",
    ],
  },
  {
    id: "delivery",
    title: "Delivery",
    items: [
      "Docker",
      "GitHub Actions CI/CD",
      "Playwright",
      "Cypress",
      "Vercel",
      "Netlify",
      "Cloudflare Edge",
      "React Native",
    ],
  },
];
