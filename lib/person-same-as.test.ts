import { describe, expect, it } from "vitest";

import { personSameAs } from "./person-same-as";
import { site } from "./site";

describe("personSameAs", () => {
  it("lists GitHub, LinkedIn, X, and Threads in site.links order", () => {
    expect(personSameAs).toEqual([
      site.links.github,
      site.links.linkedin,
      site.links.x,
      site.links.threads,
    ]);
  });
});
