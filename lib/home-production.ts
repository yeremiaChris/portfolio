import { experienceRoles } from "@/lib/experience";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export type HomeProductionProject = {
  id: string;
  label: string;
  href: string;
  description: string;
  stackLine: string;
  contextLine?: string;
  visitUrl?: string;
  isCurrent: boolean;
};

const productionIds = ["primaku", "mazecare", "kiriminaja"] as const;

function getLogisticsUiContextLine(): string | undefined {
  const logistics = site.stats.find((stat) => stat.label === "Logistics UI");
  if (!logistics) return undefined;
  return `${logistics.value} ${logistics.detail.charAt(0).toLowerCase()}${logistics.detail.slice(1)}`;
}

export function getHomeProductionIntro(): string {
  const experience = site.stats.find((stat) => stat.label === "Experience");
  const companies = site.stats.find((stat) => stat.label === "Companies");
  if (!experience || !companies) {
    throw new Error("Missing home production intro stats");
  }
  const years = experience.value.replace(/\s+Years$/i, " years");
  const domains = experience.detail.replace(/\s*\+\s*/g, " and ");
  return `${years} shipping ${domains.toLowerCase()} web platforms across ${companies.value} companies.`;
}

export function getHomeProductionProjects(): HomeProductionProject[] {
  const logisticsContext = getLogisticsUiContextLine();

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
      contextLine: id === "kiriminaja" ? logisticsContext : undefined,
      visitUrl: id === "primaku" ? "https://primaku.com" : undefined,
      isCurrent: role.current === true,
    };
  });
}
