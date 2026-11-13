import {
  featuredMilestone,
  secondaryMilestones,
  type MilestoneCaseStudy,
} from "@/lib/milestones";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export type HomeWorkCard = MilestoneCaseStudy & {
  href: string;
  image: string;
  imageAlt: string;
  chips: readonly string[];
  visitUrl?: string;
};

const milestoneProjectId: Record<string, string> = {
  "primaku-platform": "primaku",
  mazecare: "mazecare",
  kiriminaja: "kiriminaja",
};

const visitUrls: Partial<Record<string, string>> = {
  primaku: "https://primaku.com",
};

function enrichMilestone(study: MilestoneCaseStudy): HomeWorkCard {
  const projectId = milestoneProjectId[study.id] ?? study.id;
  const proof = site.proof.find((item) => item.id === projectId);
  const project = projects.find((item) => item.id === projectId);

  if (!proof || !project) {
    throw new Error(`Missing home work card data for ${study.id}`);
  }

  return {
    ...study,
    href: proof.href,
    image: project.image,
    imageAlt: project.imageAlt,
    chips: project.tools,
    visitUrl: visitUrls[projectId],
  };
}

export function getFeaturedHomeWorkCard(): HomeWorkCard {
  return enrichMilestone(featuredMilestone);
}

export function getSecondaryHomeWorkCards(): HomeWorkCard[] {
  return secondaryMilestones.map(enrichMilestone);
}
