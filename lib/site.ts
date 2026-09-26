import { UMAMI_SHARE_PATH } from "./umami";

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
  availability: "Open to exciting opportunities",
  tagline:
    "Yeremia Chris Saragi is a Software Engineer specializing in frontend-heavy product development with React, Next.js, TypeScript, and Vue.",
  bio: "Yeremia Chris Saragi is a Software Engineer specializing in frontend-heavy product development, with 5+ years building production web platforms across health-tech (HIS/EMR) and logistics. Strong in React, Next.js, and Vue — with real API, auth, and data ownership. Looking for frontend-heavy roles on product platforms and clinical systems where UI quality and backend integration both matter.",
  proof: [
    {
      id: "primaku",
      label: "PrimaKu",
      href: "/projects#primaku",
      meta: "1M+ downloads",
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
      meta: "100K+ downloads",
    },
  ],
  links: {
    whatsapp: "https://wa.me/6281212126215",
    whatsappLabel: "+62-812",
    github: "https://github.com/yeremiaChris",
    githubHandle: "@yeremiaChris",
    linkedin: "https://www.linkedin.com/in/yeremia-chris-saragi-587a671a9/",
    email: "mailto:yeremia997@gmail.com",
    emailLabel: "yeremia997@gmail.com",
    resume:
      "https://docs.google.com/document/d/1lF9qIEuyGviopkk51BARVXWxTjCCDKeF9nBXmMWx8Is/edit?usp=sharing",
    about: "/about",
    experience: "/experience",
    analytics: UMAMI_SHARE_PATH,
  },
  stats: [
    {
      label: "Experience",
      value: "5+ Years",
      detail: "Health-tech + logistics",
      icon: "award" as const,
    },
    {
      label: "Platform",
      value: "1M+",
      detail: "PrimaKu app downloads",
      icon: "users" as const,
    },
    {
      label: "Logistics",
      value: "100K+",
      detail: "KiriminAja app downloads",
      icon: "gauge" as const,
    },
    {
      label: "Domain",
      value: "FHIR",
      detail: "Clinic / hospital OS",
      icon: "heart" as const,
    },
  ],
} as const;
