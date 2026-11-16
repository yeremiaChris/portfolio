import { FileText, Link2, Mail, MessageCircle } from "lucide-react";

import {
  ThreadsChannelIcon,
  XChannelIcon,
} from "@/components/contact/InlineChannelIcons";
import { Container } from "@/components/Container";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { xAndThreadsContactActions } from "@/lib/contact-social-actions";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export type ContactCtaAction = {
  href: string;
  label: string;
  icon: "mail" | "whatsapp" | "file" | "linkedin" | "x" | "threads";
  variant?: "default" | "secondary";
  external?: boolean;
  primary?: boolean;
};

export type ContactCtaProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  actions?: ContactCtaAction[];
  withContainer?: boolean;
  className?: string;
  panelClassName?: string;
  compact?: boolean;
};

const ACTION_ICONS = {
  mail: Mail,
  whatsapp: MessageCircle,
  file: FileText,
  linkedin: Link2,
  x: XChannelIcon,
  threads: ThreadsChannelIcon,
} as const;

const DEFAULT_ACTIONS: ContactCtaAction[] = [
  {
    href: site.links.email,
    label: "Email",
    icon: "mail",
    variant: "default",
    primary: true,
  },
  {
    href: site.links.linkedin,
    label: "LinkedIn",
    icon: "linkedin",
    variant: "secondary",
    external: true,
  },
  ...xAndThreadsContactActions(),
  {
    href: site.links.resume,
    label: "CV (PDF)",
    icon: "file",
    variant: "secondary",
  },
];

export function ContactCta({
  id = "contact",
  eyebrow = "Open to full-time or scoped contracts",
  title = "Let's talk about a full-time role or a scoped remote build.",
  description = "Invoice or hourly is fine. Frontend-heavy work in React, Next.js, or Vue — health-tech, logistics, and product platforms. Remote-friendly (Indonesia / UTC+7).",
  actions = DEFAULT_ACTIONS,
  withContainer = true,
  className,
  panelClassName,
  compact = false,
}: ContactCtaProps) {
  const headingId = `${id}-heading`;

  const panel = (
    <div
      className={cn(
        "border-gradient bg-muted relative flex w-full flex-col items-start justify-between overflow-hidden",
        compact
          ? "border-border/50 gap-4 rounded-2xl border p-5 shadow-sm md:flex-row md:items-center md:gap-6 md:p-6"
          : "gap-8 rounded-3xl p-8 shadow-xl md:flex-row md:items-center md:gap-10 md:p-12",
        panelClassName,
      )}
    >
      {compact ? null : (
        <div
          className="bg-primary/10 pointer-events-none absolute -right-20 -bottom-20 size-80 rounded-full blur-3xl"
          aria-hidden
        />
      )}

      <div
        className={cn(
          "relative z-10 flex min-w-0 flex-col",
          compact ? "flex-1" : "max-w-2xl",
        )}
      >
        {eyebrow ? (
          <Badge
            variant="secondary"
            className="text-primary label-caps mb-3 w-fit gap-2 bg-transparent px-0 text-[10px] tracking-widest"
          >
            <span className="bg-primary size-2 shrink-0 rounded-full" />
            {eyebrow}
          </Badge>
        ) : null}
        <h2
          id={headingId}
          className={cn(
            "font-heading text-foreground font-semibold tracking-tight",
            compact ? "text-lg sm:text-xl" : "text-2xl sm:text-3xl",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p className="text-muted-foreground mt-3 text-[15px] leading-6">
            {description}
          </p>
        ) : null}
      </div>

      <div
        className={cn(
          "relative z-10 flex w-full flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center",
          compact ? "md:w-auto md:shrink-0" : "gap-3 sm:w-auto",
        )}
      >
        {actions.map((action) => (
          <ContactActionLink
            key={`${action.href}-${action.label}`}
            action={action}
          />
        ))}
      </div>
    </div>
  );

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(
        withContainer ? "w-full py-16 md:py-24" : "w-full",
        className,
      )}
    >
      {withContainer ? <Container>{panel}</Container> : panel}
    </section>
  );
}

function ContactActionLink({ action }: { action: ContactCtaAction }) {
  const Icon = ACTION_ICONS[action.icon];
  const isPrimary = action.primary || action.variant === "default";

  return (
    <a
      href={action.href}
      {...(action.external
        ? {
            target: "_blank",
            rel:
              action.icon === "linkedin" ||
              action.icon === "x" ||
              action.icon === "threads"
                ? "me noopener noreferrer"
                : "noopener noreferrer",
          }
        : {})}
      className={cn(
        buttonVariants({
          variant: action.variant ?? "secondary",
          size: "lg",
        }),
        "h-11 w-full max-w-full gap-2 px-5 text-[15px] font-medium sm:w-auto",
        isPrimary &&
          "bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent-hover font-semibold shadow-[0_0_20px_rgba(76,215,246,0.25)]",
      )}
    >
      <Icon
        className={cn("size-5 shrink-0", !isPrimary && "text-primary")}
        aria-hidden
      />
      <span className="truncate">{action.label}</span>
    </a>
  );
}

export function experienceContactActions(): ContactCtaAction[] {
  return [
    {
      href: site.links.email,
      label: site.links.emailLabel,
      icon: "mail",
      variant: "default",
      primary: true,
    },
    {
      href: site.links.linkedin,
      label: "LinkedIn",
      icon: "linkedin",
      variant: "secondary",
      external: true,
    },
    ...xAndThreadsContactActions(),
    {
      href: site.links.resume,
      label: "CV (PDF)",
      icon: "file",
      variant: "secondary",
    },
    {
      href: site.links.whatsapp,
      label: "WhatsApp",
      icon: "whatsapp",
      variant: "secondary",
      external: true,
    },
  ];
}

export function projectsContactActions(): ContactCtaAction[] {
  return [
    {
      href: site.links.email,
      label: site.links.emailLabel,
      icon: "mail",
      variant: "default",
      primary: true,
    },
    {
      href: site.links.linkedin,
      label: "LinkedIn",
      icon: "linkedin",
      variant: "secondary",
      external: true,
    },
    ...xAndThreadsContactActions(),
    {
      href: site.links.resume,
      label: "CV (PDF)",
      icon: "file",
      variant: "secondary",
    },
    {
      href: site.links.whatsapp,
      label: "WhatsApp",
      icon: "whatsapp",
      variant: "secondary",
      external: true,
    },
  ];
}

export function servicesContactActions(): ContactCtaAction[] {
  return [
    {
      href: site.links.whatsapp,
      label: "WhatsApp",
      icon: "whatsapp",
      variant: "default",
      primary: true,
      external: true,
    },
    {
      href: site.links.email,
      label: site.links.emailLabel,
      icon: "mail",
      variant: "secondary",
    },
  ];
}

export function blogContactActions(): ContactCtaAction[] {
  return [
    {
      href: site.links.email,
      label: site.links.emailLabel,
      icon: "mail",
      variant: "default",
      primary: true,
    },
    {
      href: site.links.linkedin,
      label: "LinkedIn",
      icon: "linkedin",
      variant: "secondary",
      external: true,
    },
    ...xAndThreadsContactActions(),
    {
      href: site.links.resume,
      label: "CV (PDF)",
      icon: "file",
      variant: "secondary",
    },
    {
      href: site.links.whatsapp,
      label: "WhatsApp",
      icon: "whatsapp",
      variant: "secondary",
      external: true,
    },
  ];
}
