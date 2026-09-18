import { describe, expect, it } from "vitest";

import { DEFAULT_UMAMI_WEBSITE_ID, getUmamiWebsiteId } from "./umami";

describe("getUmamiWebsiteId", () => {
  it("skips outside production so local hits stay out of analytics", () => {
    expect(getUmamiWebsiteId(DEFAULT_UMAMI_WEBSITE_ID, "development")).toBe(
      undefined,
    );
    expect(getUmamiWebsiteId(DEFAULT_UMAMI_WEBSITE_ID, "test")).toBe(undefined);
    expect(getUmamiWebsiteId(DEFAULT_UMAMI_WEBSITE_ID, undefined)).toBe(
      undefined,
    );
  });

  it("falls back to the cloud website id in production", () => {
    expect(getUmamiWebsiteId(undefined, "production")).toBe(
      DEFAULT_UMAMI_WEBSITE_ID,
    );
    expect(getUmamiWebsiteId("", "production")).toBe(DEFAULT_UMAMI_WEBSITE_ID);
    expect(getUmamiWebsiteId("   ", "production")).toBe(
      DEFAULT_UMAMI_WEBSITE_ID,
    );
  });

  it("uses an explicit production id", () => {
    expect(
      getUmamiWebsiteId(
        "  11111111-1111-1111-1111-111111111111  ",
        "production",
      ),
    ).toBe("11111111-1111-1111-1111-111111111111");
  });
});
