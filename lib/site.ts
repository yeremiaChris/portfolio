import { getExperienceLabel } from "./career";

export const DEFAULT_SITE_URL = "https://yeremiachris.com";

export function getSiteUrl(
  value: string | undefined = process.env.NEXT_PUBLIC_SITE_URL,
): string {
  const raw = value?.trim();
  if (!raw) return DEFAULT_SITE_URL;
  return raw.replace(/\/+$/, "");
}

export const site = {
  name: "Yeremia",
  fullName: "Yeremia Chris Saragi",
  pronunciation: "/ jɛ-rə-ˈmaɪ-ə krɪs sə-ˈrɑː-ɡi /",
  role: "Software Engineer · Frontend-Heavy",
  heroTitle: "Software Engineer",
  heroSubtitle: "Frontend-heavy · health-tech & logistics",
  availability: "Open to full-time · also scoped remote contracts",
  tagline:
    "Yeremia Chris Saragi is a Software Engineer specializing in frontend-heavy product development with React, Next.js, TypeScript, and Vue.",
  bio: `Yeremia Chris Saragi is a Software Engineer specializing in frontend-heavy product development, with ${getExperienceLabel()} years building production web platforms across health-tech (HIS/EMR) and logistics. Strong in React, Next.js, and Vue — with real API, auth, and data ownership. Looking for frontend-heavy roles on product platforms and clinical systems where UI quality and backend integration both matter.`,
  heroBio: `${getExperienceLabel()} years on frontend-heavy platforms across health-tech (HIS/EMR) and logistics — React, Next.js, and Vue.`,
  proof: [
    {
      id: "primaku",
      label: "PrimaKu",
      href: "/projects#primaku",
      meta: "Clinical + family web UI",
    },
    {
      id: "mazecare",
      label: "Mazecare",
      href: "/projects#mazecare",
      meta: "FHIR EMR / HIS",
    },
    {
      id: "kiriminaja",
      label: "KiriminAja",
      href: "/projects#kiriminaja",
      meta: "Virtualized manifests · tracking",
    },
  ],
  links: {
    whatsapp: "https://wa.me/6281212126215",
    whatsappLabel: "+62 812-1212-6215",
    github: "https://github.com/yeremiaChris",
    githubHandle: "@yeremiaChris",
    linkedin: "https://www.linkedin.com/in/yeremia-chris-saragi-587a671a9/",
    email: "mailto:yeremia997@gmail.com",
    emailLabel: "yeremia997@gmail.com",
    resume: "/Yeremia_Chris_Saragi_CV.pdf",
    about: "/about",
    experience: "/experience",
  },
  stats: [
    {
      label: "Experience",
      value: `${getExperienceLabel()} Years`,
      detail: "Health-tech + logistics",
      icon: "award" as const,
    },
    {
      label: "Logistics UI",
      value: "15+",
      detail: "Couriers in live rate UI",
      icon: "gauge" as const,
    },
    {
      label: "Companies",
      value: "4",
      detail: "PrimaKu · Mazecare · KiriminAja · iCreativeLabs",
      icon: "users" as const,
    },
  ],
} as const;
