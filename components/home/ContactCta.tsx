import { FileText, Mail, MessageCircle } from "lucide-react";

import { Container } from "@/components/Container";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export type ContactCtaAction = {
  href: string;
  label: string;
  icon: "mail" | "whatsapp" | "file";
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
};

const ACTION_ICONS = {
  mail: Mail,
  whatsapp: MessageCircle,
  file: FileText,
} as const;

const DEFAULT_ACTIONS: ContactCtaAction[] = [
  {
    href: site.links.email,
    label: "Initiate Contact",
    icon: "mail",
    variant: "default",
    primary: true,
  },
  {
    href: site.links.whatsapp,
    label: "Direct WhatsApp",
    icon: "whatsapp",
    variant: "secondary",
    external: true,
  },
];

export function ContactCta({
  id = "contact",
  eyebrow = "Ready to build something exceptional?",
  title = "Let's discuss frontend architecture, product UI, or your next React / Next.js build.",
  description = "Available for full-time frontend roles, design-system work, and high-impact contractor partnerships worldwide.",
  actions = DEFAULT_ACTIONS,
  withContainer = true,
  className,
  panelClassName,
}: ContactCtaProps) {
  const headingId = `${id}-heading`;

  const panel = (
    <div
      className={cn(
        "relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-3xl bg-muted p-8 shadow-xl ring-1 ring-border/20 md:flex-row md:items-center md:gap-10 md:p-12",
        panelClassName,
      )}
    >
      <div
        className="pointer-events-none absolute -right-20 -bottom-20 size-80 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 flex max-w-2xl flex-col">
        <Badge
          variant="secondary"
          className="mb-3 w-fit gap-2 bg-transparent px-0 font-mono text-[10px] tracking-widest text-primary uppercase"
        >
          <span className="size-2 animate-ping rounded-full bg-primary" />
          {eyebrow}
        </Badge>
        <h2
          id={headingId}
          className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          {title}
        </h2>
        <p className="mt-3 text-[15px] leading-6 text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="relative z-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
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
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={cn(
        buttonVariants({
          variant: action.variant ?? "secondary",
          size: "lg",
        }),
        "h-11 w-full gap-2 px-5 text-[15px] font-medium sm:w-auto",
        isPrimary && "font-semibold shadow-[0_0_20px_rgba(78,222,163,0.3)]",
      )}
    >
      <Icon
        className={cn("size-5", !isPrimary && "text-primary")}
        aria-hidden
      />
      {action.label}
    </a>
  );
}

export function experienceContactActions(): ContactCtaAction[] {
  return [
    {
      href: site.links.whatsapp,
      label: `WhatsApp (${site.links.whatsappLabel})`,
      icon: "whatsapp",
      variant: "default",
      external: true,
      primary: true,
    },
    {
      href: site.links.email,
      label: site.links.emailLabel,
      icon: "mail",
      variant: "secondary",
    },
    {
      href: site.links.resume,
      label: "Resume (PDF)",
      icon: "file",
      variant: "secondary",
      external: true,
    },
  ];
}
