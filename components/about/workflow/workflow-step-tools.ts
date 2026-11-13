import type { AboutWorkflowStep } from "@/lib/about";
import { aboutWorkflowToolGroups } from "@/lib/about";
import { aboutWorkflowToolActiveSteps } from "@/lib/about-workflow-map";

export function getWorkflowStepToolLabels(
  stepId: AboutWorkflowStep["id"],
): string[] {
  const groupIds = aboutWorkflowToolActiveSteps[stepId] ?? [];
  const labels: string[] = [];
  for (const group of aboutWorkflowToolGroups) {
    if (!groupIds.includes(group.id)) {
      continue;
    }
    for (const item of group.items) {
      labels.push(item.label);
    }
  }
  return labels;
}
