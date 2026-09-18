export const DEFAULT_UMAMI_WEBSITE_ID = "d2108e70-68da-44ac-9623-504113b4b355";
export const UMAMI_SCRIPT_SRC = "https://cloud.umami.is/script.js";

export function getUmamiWebsiteId(
  value: string | undefined = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
  nodeEnv: string | undefined = process.env.NODE_ENV,
): string | undefined {
  if (nodeEnv !== "production") return undefined;

  const raw = value?.trim();
  return raw || DEFAULT_UMAMI_WEBSITE_ID;
}
