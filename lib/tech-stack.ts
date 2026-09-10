export type TechTone = "primary" | "cyan" | "violet";

export type TechItem = {
  name: string;
  tone: TechTone;
};

export type TechCategory = {
  id: string;
  title: string;
  badge: string;
  description: string;
  tone: TechTone;
  icon: "layout" | "database" | "cloud";
  items: TechItem[];
};

export const techStackIntro = {
  eyebrow: "Battle-Tested Arsenal",
  title: "Production Frontend Stack",
  description:
    "A React-first toolkit hardened across real product surfaces — with solid SQL and delivery habits underneath.",
  focusLabel: "Focus:",
  focusValue: "Frontend · React / Next.js",
} as const;

export const techToneClass: Record<TechTone, string> = {
  primary: "text-primary",
  cyan: "text-[#4cd7f6]",
  violet: "text-[#bb86fc]",
};

export const techDotClass: Record<TechTone, string> = {
  primary: "bg-primary",
  cyan: "bg-[#4cd7f6]",
  violet: "bg-[#bb86fc]",
};

export const techBadgeClass: Record<TechTone, string> = {
  primary: "text-primary",
  cyan: "text-[#4cd7f6]",
  violet: "text-[#bb86fc]",
};

export const techCategories: TechCategory[] = [
  {
    id: "frontend",
    title: "Modern Frontend",
    badge: "PRIMARY",
    description:
      "App Router rendering, typed UI systems, progressive hydration, and Core Web Vitals discipline.",
    tone: "primary",
    icon: "layout",
    items: [
      { name: "Next.js (App Router)", tone: "primary" },
      { name: "React 19", tone: "primary" },
      { name: "TypeScript", tone: "primary" },
      { name: "Tailwind CSS", tone: "cyan" },
      { name: "shadcn/ui", tone: "cyan" },
      { name: "HeroUI (NextUI)", tone: "cyan" },
      { name: "React Hook Form", tone: "primary" },
      { name: "Valibot", tone: "primary" },
      { name: "Zustand / TanStack Query", tone: "cyan" },
      { name: "Core Web Vitals", tone: "primary" },
      { name: "Micro-Frontends", tone: "primary" },
    ],
  },
  {
    id: "data",
    title: "Data & APIs",
    badge: "QUERY",
    description:
      "SQL-first data work, BaaS when it speeds delivery, and typed services in Node or Go when the UI needs a real backend.",
    tone: "cyan",
    icon: "database",
    items: [
      { name: "PostgreSQL", tone: "cyan" },
      { name: "MySQL", tone: "cyan" },
      { name: "SQLite", tone: "cyan" },
      { name: "Supabase", tone: "primary" },
      { name: "NestJS", tone: "primary" },
      { name: "Node.js", tone: "primary" },
      { name: "Go (Golang)", tone: "cyan" },
      { name: "REST APIs", tone: "primary" },
      { name: "GraphQL", tone: "primary" },
      { name: "WebSockets", tone: "cyan" },
    ],
  },
  {
    id: "delivery",
    title: "Delivery & Platform",
    badge: "SHIP",
    description:
      "Predictable deploys, host platforms for fast frontend surfaces, and end-to-end suites that gate what ships.",
    tone: "violet",
    icon: "cloud",
    items: [
      { name: "GitHub Actions CI/CD", tone: "violet" },
      { name: "Playwright", tone: "primary" },
      { name: "Cypress", tone: "primary" },
      { name: "Docker", tone: "violet" },
      { name: "Vercel", tone: "violet" },
      { name: "Netlify", tone: "violet" },
      { name: "Cloudflare Edge", tone: "primary" },
    ],
  },
];
