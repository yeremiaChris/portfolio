import { site } from "@/lib/site";

export const heroCtas = {
  primary: {
    href: site.links.email,
    label: "Email me",
  },
  secondary: {
    href: "#work",
    label: "Selected work",
  },
  resume: {
    href: site.links.resume,
    label: "CV (PDF)",
  },
} as const;
