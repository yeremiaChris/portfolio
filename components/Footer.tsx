import {
  GithubChannelIcon,
  LinkedinChannelIcon,
  MailChannelIcon,
  ResumeChannelIcon,
  ThreadsChannelIcon,
  WhatsappChannelIcon,
  XChannelIcon,
} from "@/components/contact/InlineChannelIcons";
import { Container } from "@/components/Container";
import { Badge } from "@/components/ui/badge";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type FooterContactChannel = {
  href: string;
  ariaLabel: string;
  icon: typeof MailChannelIcon;
  external?: boolean;
  profile?: boolean;
  accent?: boolean;
};

const footerContactChannels: FooterContactChannel[] = [
  {
    href: site.links.whatsapp,
    ariaLabel: `WhatsApp ${site.links.whatsappLabel}`,
    icon: WhatsappChannelIcon,
    external: true,
  },
  {
    href: site.links.email,
    ariaLabel: site.links.emailLabel,
    icon: MailChannelIcon,
  },
  {
    href: site.links.github,
    ariaLabel: "GitHub",
    icon: GithubChannelIcon,
    external: true,
    profile: true,
  },
  {
    href: site.links.linkedin,
    ariaLabel: "LinkedIn",
    icon: LinkedinChannelIcon,
    external: true,
    profile: true,
  },
  {
    href: site.links.resume,
    ariaLabel: "Resume",
    icon: ResumeChannelIcon,
    external: true,
    accent: true,
  },
  {
    href: site.links.x,
    ariaLabel: site.links.xHandle,
    icon: XChannelIcon,
    external: true,
    profile: true,
  },
  {
    href: site.links.threads,
    ariaLabel: site.links.threadsHandle,
    icon: ThreadsChannelIcon,
    external: true,
    profile: true,
  },
];

const footerContactLinkClass =
  "focus-ring inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-[#4cd7f6] motion-reduce:transition-none";

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

          <nav
            aria-label="Contact"
            className="flex max-w-full flex-wrap items-center gap-2"
          >
            {footerContactChannels.map((channel) => {
              const Icon = channel.icon;

              return (
                <a
                  key={channel.href}
                  href={channel.href}
                  aria-label={channel.ariaLabel}
                  {...(channel.external
                    ? {
                        target: "_blank",
                        rel: channel.profile
                          ? "me noopener noreferrer"
                          : "noopener noreferrer",
                      }
                    : {})}
                  className={cn(
                    footerContactLinkClass,
                    channel.accent && "text-primary hover:text-[#4cd7f6]",
                  )}
                >
                  <Icon />
                </a>
              );
            })}
          </nav>
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
