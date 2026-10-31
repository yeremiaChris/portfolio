import { describe, expect, it } from "vitest";

import {
  PERMISSIONS_POLICY,
  REFERRER_POLICY,
  X_CONTENT_TYPE_OPTIONS,
  buildContentSecurityPolicyReportOnly,
  getSecurityResponseHeaders,
} from "./security-headers";
import { UMAMI_GATEWAY_ORIGIN, UMAMI_SCRIPT_ORIGIN } from "./umami";

describe("security response headers", () => {
  it("sets baseline header values", () => {
    expect(X_CONTENT_TYPE_OPTIONS).toBe("nosniff");
    expect(REFERRER_POLICY).toBe("strict-origin-when-cross-origin");
    expect(PERMISSIONS_POLICY).toContain("camera=()");
    expect(PERMISSIONS_POLICY).toContain("microphone=()");
    expect(PERMISSIONS_POLICY).toContain("geolocation=()");
    expect(PERMISSIONS_POLICY).toContain("payment=()");
  });

  it("allowlists audited third-party origins in CSP", () => {
    const policy = buildContentSecurityPolicyReportOnly();

    expect(policy).toContain("default-src 'self'");
    expect(policy).toContain(
      `script-src 'self' 'unsafe-inline' ${UMAMI_SCRIPT_ORIGIN}`,
    );
    expect(policy).toContain(`connect-src 'self' ${UMAMI_GATEWAY_ORIGIN}`);
    expect(policy).toContain("style-src 'self' 'unsafe-inline'");
    expect(policy).toContain("object-src 'none'");
  });

  it("returns next.config header entries", () => {
    const headers = getSecurityResponseHeaders();
    const keys = headers.map((header) => header.key);

    expect(keys).toEqual([
      "X-Content-Type-Options",
      "Referrer-Policy",
      "Permissions-Policy",
      "Content-Security-Policy-Report-Only",
    ]);
  });
});
