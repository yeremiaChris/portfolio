import Link from "next/link";

import {
  headerNavIndicatorClass,
  headerNavLinkClass,
  headerNavPillClass,
} from "@/lib/header-nav-styles";
import { HEADER_NAV, isNavActive } from "@/lib/nav";
import { getRequestPathname } from "@/lib/request-pathname";

export async function HeaderNavLinks() {
  const pathname = await getRequestPathname();

  return (
    <nav
      aria-label="Primary"
      className={`pointer-events-auto hidden lg:flex ${headerNavPillClass(false)}`}
    >
      {HEADER_NAV.map((item) => {
        const active = isNavActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={headerNavLinkClass(active)}
          >
            {active ? (
              <span aria-hidden className={headerNavIndicatorClass} />
            ) : null}
            <span className="relative z-10">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
