import Link from "next/link";

import { Container } from "@/components/Container";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { HEADER_NAV } from "@/lib/nav";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const footerLinks = [
  {
    href: site.links.email,
    label: site.links.emailLabel,
    external: false,
  },
  {
    href: site.links.linkedin,
    label: "LinkedIn",
    external: true,
  },
  {
    href: site.links.x,
    label: "X",
    external: true,
    profile: true,
  },
  {
    href: site.links.threads,
    label: "Threads",
    external: true,
    profile: true,
  },
  {
    href: site.links.github,
    label: "GitHub",
    external: true,
  },
  {
    href: site.links.resume,
    label: "Resume",
    external: true,
    accent: true,
  },
  {
    href: site.links.whatsapp,
    label: `WhatsApp ${site.links.whatsappLabel}`,
    external: true,
  },
] as const;

export function Footer() {
  return (
    <footer className="border-border/40 w-full border-t bg-[#0a0e14] py-12 md:py-16">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="flex max-w-md flex-col gap-2">
            <Badge
              variant="secondary"
              className="text-primary label-caps w-fit gap-2 bg-transparent px-0 text-[10px] tracking-widest"
            >
              <span className="bg-primary size-2 shrink-0 rounded-full" />
              Based in Batam · Remote
            </Badge>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Engineering production web platforms — frontend craft and API
              integration.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <nav
              aria-label="Site"
              className="flex flex-wrap items-center gap-2"
            >
              {HEADER_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "sm" }),
                    "text-muted-foreground hover:text-foreground h-auto px-3 py-1.5 text-[13px] font-normal",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <nav
              aria-label="Contact"
              className="flex flex-wrap items-center gap-2"
            >
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  {...(link.external
                    ? {
                        target: "_blank",
                        rel:
                          "profile" in link && link.profile
                            ? "me noopener noreferrer"
                            : "noopener noreferrer",
                      }
                    : {})}
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "sm" }),
                    "text-muted-foreground hover:text-foreground h-auto px-3 py-1.5 text-[13px] font-normal",
                    "accent" in link &&
                      link.accent &&
                      "text-primary hover:text-primary",
                  )}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="border-border/40 border-t pt-6">
          <span className="text-muted-foreground text-[12px]">
            © {new Date().getFullYear()} {site.fullName}. Software Engineer ·
            Frontend-Heavy.
          </span>
        </div>
      </Container>
    </footer>
  );
}
