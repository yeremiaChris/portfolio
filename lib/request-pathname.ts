import { headers } from "next/headers";

export async function getRequestPathname(): Promise<string> {
  const pathname = (await headers()).get("x-pathname");
  if (pathname) return pathname;
  return "/";
}
