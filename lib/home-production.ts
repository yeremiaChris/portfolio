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
  image: string;
  imageAlt: string;
  visitUrl?: string;
  featured: boolean;
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
      role: role.title,
      stackTags: project.tools.slice(0, 3),
      image: project.image,
      imageAlt: project.imageAlt,
      visitUrl: id === "primaku" ? "https://primaku.com" : undefined,
      featured: id === "primaku",
    };
  });
}
