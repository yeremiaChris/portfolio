import { describe, expect, it } from "vitest";

import { site } from "./site";
import {
  WEB_APP_BACKGROUND_COLOR,
  WEB_APP_THEME_COLOR,
  buildWebManifest,
} from "./web-manifest";

describe("buildWebManifest", () => {
  it("exposes install metadata aligned with the portfolio brand", () => {
    const manifest = buildWebManifest();

    expect(manifest.name).toBe(site.fullName);
    expect(manifest.short_name).toBe(site.name);
    expect(manifest.start_url).toBe("/");
    expect(manifest.display).toBe("standalone");
    expect(manifest.background_color).toBe(WEB_APP_BACKGROUND_COLOR);
    expect(manifest.theme_color).toBe(WEB_APP_THEME_COLOR);
    expect(manifest.icons).toEqual([
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ]);
  });
});
