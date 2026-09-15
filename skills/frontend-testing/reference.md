# Testing — examples

## Colocated Vitest (do this)

```ts
// lib/blog.test.ts
import { describe, expect, it } from "vitest";

import { getPost } from "./blog";

describe("getPost", () => {
  it("returns null for an unknown slug", () => {
    expect(getPost("does-not-exist")).toBeNull();
  });
});
```

## Do not

```ts
// lib/about.test.ts — static copy, no branches
expect(aboutDrivers[0].name).toBe("MacBook Air M3");
```

```text
src/features/blog/__tests__/blog.test.ts
app/blog/page.spec.ts
```
