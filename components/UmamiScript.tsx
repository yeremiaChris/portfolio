import Script from "next/script";

import {
  UMAMI_GATEWAY_ORIGIN,
  UMAMI_SCRIPT_ORIGIN,
  UMAMI_SCRIPT_SRC,
  getUmamiWebsiteId,
} from "@/lib/umami";

export function UmamiScript() {
  const websiteId = getUmamiWebsiteId();
  if (!websiteId) return null;

  return (
    <>
      <link rel="preconnect" href={UMAMI_SCRIPT_ORIGIN} />
      <link
        rel="preconnect"
        href={UMAMI_GATEWAY_ORIGIN}
        crossOrigin="anonymous"
      />
      <Script
        src={UMAMI_SCRIPT_SRC}
        data-website-id={websiteId}
        strategy="afterInteractive"
      />
    </>
  );
}
