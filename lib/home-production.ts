import { experienceRoles } from "@/lib/experience";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export type HomeProductionProject = {
  id: string;
  label: string;
  href: string;
  description: string;
  stackLine: string;
  visitUrl?: string;
  isCurrent: boolean;
};

const productionIds = ["primaku", "mazecare", "kiriminaja"] as const;

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
      stackLine: project.tools.slice(0, 3).join(" · "),
      visitUrl: id === "primaku" ? "https://primaku.com" : undefined,
      isCurrent: role.current === true,
    };
  });
}
