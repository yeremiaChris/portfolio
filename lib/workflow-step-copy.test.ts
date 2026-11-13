import { describe, expect, it } from "vitest";

import {
  getWorkflowPlanNotes,
  getWorkflowTicketCriteria,
} from "@/components/about/workflow/workflow-step-copy";

describe("workflow-step-copy", () => {
  it("derives plan note text from about workflow copy", () => {
    const notes = getWorkflowPlanNotes();
    expect(notes).toHaveLength(3);
    expect(notes[0].text).toContain("sketch scope");
    expect(notes[2].text).toContain("context, not guesswork");
  });

  it("includes ticket acceptance criteria phrases", () => {
    const criteria = getWorkflowTicketCriteria();
    expect(criteria.some((line) => line.includes("acceptance criteria"))).toBe(
      true,
    );
  });
});
