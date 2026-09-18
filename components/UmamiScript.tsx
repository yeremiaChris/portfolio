import Script from "next/script";

import { UMAMI_SCRIPT_SRC, getUmamiWebsiteId } from "@/lib/umami";

export function UmamiScript() {
  const websiteId = getUmamiWebsiteId();
  if (!websiteId) return null;

  return (
    <Script
      src={UMAMI_SCRIPT_SRC}
      data-website-id={websiteId}
      strategy="afterInteractive"
    />
  );
}
