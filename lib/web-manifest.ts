import type { MetadataRoute } from "next";

import { site } from "./site";

export const WEB_APP_BACKGROUND_COLOR = "#10141a";
export const WEB_APP_THEME_COLOR = "#4cd7f6";

export function buildWebManifest(): MetadataRoute.Manifest {
  return {
    name: site.fullName,
    short_name: site.name,
    start_url: "/",
    display: "standalone",
    background_color: WEB_APP_BACKGROUND_COLOR,
    theme_color: WEB_APP_THEME_COLOR,
    icons: [
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
    ],
  };
}
