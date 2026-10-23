export const HEADER_NAV = [
  { href: "/", label: "Overview" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
  { href: "/lab", label: "Lab" },
  { href: "/about", label: "About" },
] as const;

export function isNavActive(pathname: string, href: string): boolean {
  if (href.includes("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Routes linked from Upwork must not expose the resume (it carries contact details). */
export const RESUME_HIDDEN_PATHS = ["/about"] as const;

export function isResumeHidden(pathname: string): boolean {
  return RESUME_HIDDEN_PATHS.some((path) => isNavActive(pathname, path));
}
