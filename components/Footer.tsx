import { Container } from "@/components/Container";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const footerLinks = [
  {
    href: site.links.whatsapp,
    label: `WhatsApp ${site.links.whatsappLabel}`,
    external: true,
  },
  {
    href: site.links.email,
    label: site.links.emailLabel,
    external: false,
  },
  {
    href: site.links.github,
    label: "GitHub",
    external: true,
  },
  {
    href: site.links.linkedin,
    label: "LinkedIn",
    external: true,
  },
  {
    href: site.links.resume,
    label: "Resume",
    external: true,
    accent: true,
  },
] as const;

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-[#0a0e14] py-12 md:py-16">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="flex max-w-md flex-col gap-2">
            <Badge
              variant="secondary"
              className="w-fit gap-2 bg-transparent px-0 font-mono text-[10px] tracking-widest text-primary uppercase"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              Telemetry: All Systems Operational
            </Badge>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Engineering robust distributed frontends, design systems, and
              low-latency product interfaces.
            </p>
          </div>

          <nav
            aria-label="Contact"
            className="flex flex-wrap items-center gap-2"
          >
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  "h-auto px-3 py-1.5 text-[13px] font-normal text-muted-foreground hover:text-foreground",
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

        <div className="flex flex-col items-center justify-between gap-3 border-t border-border/40 pt-6 sm:flex-row">
          <span className="font-mono text-[12px] text-muted-foreground">
            © {new Date().getFullYear()} {site.fullName}. Crafted with
            computational luxury.
          </span>
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
            v4.2.0-kernel // latency ~14ms
          </span>
        </div>
      </Container>
    </footer>
  );
}
