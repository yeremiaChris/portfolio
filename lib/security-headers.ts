import { UMAMI_GATEWAY_ORIGIN, UMAMI_SCRIPT_ORIGIN } from "./umami";

export const X_CONTENT_TYPE_OPTIONS = "nosniff";
export const REFERRER_POLICY = "strict-origin-when-cross-origin";

export const PERMISSIONS_POLICY = [
  "accelerometer=()",
  "camera=()",
  "geolocation=()",
  "gyroscope=()",
  "magnetometer=()",
  "microphone=()",
  "payment=()",
  "usb=()",
].join(", ");

const CSP_DIRECTIVES = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${UMAMI_SCRIPT_ORIGIN} https://vercel.live`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self' ${UMAMI_GATEWAY_ORIGIN} ${UMAMI_SCRIPT_ORIGIN} https://vercel.live`,
  "frame-src 'self' https://vercel.live",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
] as const;

export function buildContentSecurityPolicyReportOnly(): string {
  return CSP_DIRECTIVES.join("; ");
}

export type SecurityResponseHeader = {
  key: string;
  value: string;
};

export function getSecurityResponseHeaders(): SecurityResponseHeader[] {
  return [
    { key: "X-Content-Type-Options", value: X_CONTENT_TYPE_OPTIONS },
    { key: "Referrer-Policy", value: REFERRER_POLICY },
    { key: "Permissions-Policy", value: PERMISSIONS_POLICY },
    {
      key: "Content-Security-Policy-Report-Only",
      value: buildContentSecurityPolicyReportOnly(),
    },
  ];
}
