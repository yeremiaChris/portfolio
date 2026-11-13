import { describe, expect, it } from "vitest";

import { aboutWorkflowSteps, aboutWorkflowToolGroups } from "@/lib/about";
import {
  aboutWorkflowSplitPairs,
  aboutWorkflowToolActiveSteps,
} from "@/lib/about-workflow-map";

describe("aboutWorkflowToolActiveSteps", () => {
  it("covers every workflow step id", () => {
    for (const step of aboutWorkflowSteps) {
      expect(aboutWorkflowToolActiveSteps[step.id]).toBeDefined();
      expect(aboutWorkflowToolActiveSteps[step.id].length).toBeGreaterThan(0);
    }
  });

  it("only references known tool group ids", () => {
    const groupIds = new Set(aboutWorkflowToolGroups.map((g) => g.id));
    for (const step of aboutWorkflowSteps) {
      for (const id of aboutWorkflowToolActiveSteps[step.id]) {
        expect(groupIds.has(id)).toBe(true);
      }
    }
  });
});

describe("aboutWorkflowSplitPairs", () => {
  it("stays within ai and me item bounds", () => {
    const aiCount = 5;
    const meCount = 4;
    for (const pair of aboutWorkflowSplitPairs) {
      expect(pair.aiIndex).toBeGreaterThanOrEqual(0);
      expect(pair.aiIndex).toBeLessThan(aiCount);
      expect(pair.meIndex).toBeGreaterThanOrEqual(0);
      expect(pair.meIndex).toBeLessThan(meCount);
    }
  });
});
