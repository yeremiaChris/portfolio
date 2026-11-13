import type { AboutWorkflowStep } from "@/lib/about";

export const aboutWorkflowToolActiveSteps: Record<
  AboutWorkflowStep["id"],
  readonly string[]
> = {
  plan: ["editor", "agents", "planning"],
  ticket: ["planning"],
  agent: ["editor", "agents", "ship"],
  review: ["ship"],
  merge: ["ship", "quality"],
};

export const aboutWorkflowSplitPairs: ReadonlyArray<{
  aiIndex: number;
  meIndex: number;
}> = [
  { aiIndex: 0, meIndex: 0 },
  { aiIndex: 1, meIndex: 1 },
  { aiIndex: 2, meIndex: 2 },
  { aiIndex: 3, meIndex: 0 },
  { aiIndex: 4, meIndex: 3 },
];
