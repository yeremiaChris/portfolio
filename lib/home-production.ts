import { experienceRoles } from "@/lib/experience";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export type HomeProductionProject = {
  id: string;
  label: string;
  href: string;
  description: string;
  role: string;
  stackTags: readonly string[];
  monogram: string;
  visitUrl?: string;
  featured: boolean;
  highlights?: readonly string[];
};

const productionIds = ["primaku", "mazecare", "kiriminaja"] as const;

const productionMonograms: Record<(typeof productionIds)[number], string> = {
  primaku: "PK",
  mazecare: "MC",
  kiriminaja: "KJ",
};

const primakuHomeHighlights = [
  "Next.js / TypeScript web platform: parent flows, PrimaCare UI, REST + token auth — not the mobile app.",
  "Parenthood Institute program site and PrimaCare health-record flows on the same stack.",
  "Shared design system from multi-brand Figma tokens, tested with Jest / RTL.",
] as const;

export function getHomeProductionProjects(): HomeProductionProject[] {
  return productionIds.map((id) => {
    const proof = site.proof.find((item) => item.id === id);
    const project = projects.find((item) => item.id === id);
    const role = experienceRoles.find((item) => item.id === id);

    if (!proof || !project || !role) {
      throw new Error(`Missing home production data for ${id}`);
    }

    return {
      id,
      label: proof.label,
      href: proof.href,
      description: proof.meta,
      role: role.title,
      stackTags: project.tools.slice(0, 3),
      monogram: productionMonograms[id],
      visitUrl: id === "primaku" ? "https://primaku.com" : undefined,
      featured: id === "primaku",
      highlights: id === "primaku" ? primakuHomeHighlights : undefined,
    };
  });
}
