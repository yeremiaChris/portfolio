import { aboutWorkflowSteps } from "@/lib/about";
import type { AboutWorkflowStep } from "@/lib/about";

function stepById(id: AboutWorkflowStep["id"]) {
  return aboutWorkflowSteps.find((s) => s.id === id);
}

export function getWorkflowPlanNotes() {
  const step = stepById("plan");
  const description =
    step?.description ??
    "I sketch scope, constraints, and approach with AI before anything hits a backlog — so tickets start with context, not guesswork.";
  const [beforeBacklog, afterDash] = description.split(" — ");
  const scopeLine = beforeBacklog.split(" before anything hits a backlog")[0];
  return [
    {
      label: "Scope",
      text: scopeLine.trim(),
    },
    {
      label: "Constraints",
      text: "before anything hits a backlog",
    },
    {
      label: "Approach",
      text: (afterDash ?? step?.footer ?? "Context before code").trim(),
    },
  ] as const;
}

export function getWorkflowTicketCriteria() {
  const step = stepById("ticket");
  return [
    "The plan becomes a Linear or Jira ticket with clear acceptance criteria.",
    "That ticket is the source of truth for humans and agents.",
    step?.footer ?? "Linear · Jira",
  ] as const;
}

export function getWorkflowAgentPrLines() {
  const step = stepById("agent");
  return {
    summary:
      step?.description ??
      "A Cursor cloud agent implements on its own branch and opens a PR with a logic summary.",
    footer: step?.footer ?? "Branch · PR · logic summary",
  };
}

export function getWorkflowReviewChecks() {
  return [
    "I read the logic summary",
    "I exercise the Vercel preview",
    "I request changes until the UX and architecture match what I want",
  ] as const;
}

export function getWorkflowMergeChecks() {
  return ["lint", "typecheck", "tests", "Lighthouse"] as const;
}
