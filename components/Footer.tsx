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
    <footer className="border-border/40 w-full border-t bg-[#0a0e14] py-12 md:py-16">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="flex max-w-md flex-col gap-2">
            <Badge
              variant="secondary"
              className="text-primary w-fit gap-2 bg-transparent px-0 font-mono text-[10px] tracking-widest uppercase"
            >
              <span className="relative flex size-2">
                <span className="bg-primary absolute inline-flex size-full animate-ping rounded-full opacity-75" />
                <span className="bg-primary relative inline-flex size-2 rounded-full" />
              </span>
              Telemetry: All Systems Operational
            </Badge>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Engineering production web platforms — frontend craft, API
              integration, and low-latency product interfaces.
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

        <div className="border-border/40 flex flex-col items-center justify-between gap-3 border-t pt-6 sm:flex-row">
          <span className="text-muted-foreground font-mono text-[12px]">
            © {new Date().getFullYear()} {site.fullName}. Software Engineer ·
            Frontend-Heavy.
          </span>
          <span className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
            v4.2.0-kernel // latency ~14ms
          </span>
        </div>
      </Container>
    </footer>
  );
}
