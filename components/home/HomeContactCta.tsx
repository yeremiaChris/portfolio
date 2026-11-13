import { FileText, Link2, Mail } from "lucide-react";

import { Container } from "@/components/Container";
import { homeBentoCardClass } from "@/components/home/homeSurface";
import { SectionIntro } from "@/components/typography/SectionTypography";
import { buttonVariants } from "@/components/ui/button-variants";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type HomeContactAction = {
  href: string;
  label: string;
  icon: typeof Mail;
  primary?: boolean;
  external?: boolean;
};

const HOME_ACTIONS: HomeContactAction[] = [
  {
    href: site.links.email,
    label: "Email",
    icon: Mail,
    primary: true,
  },
  {
    href: site.links.linkedin,
    label: "LinkedIn",
    icon: Link2,
    external: true,
  },
  {
    href: site.links.resume,
    label: "CV (PDF)",
    icon: FileText,
  },
];

export function HomeContactCta() {
  const headingId = "contact-heading";

  return (
    <section
      id="contact"
      aria-labelledby={headingId}
      className="w-full py-12 md:py-16"
    >
      <Container>
        <div
          className={cn(
            homeBentoCardClass,
            "flex flex-col items-stretch justify-between gap-8 p-6 md:flex-row md:items-center md:gap-10 md:p-8",
          )}
        >
          <SectionIntro
            eyebrow="Open to full-time or scoped contracts"
            title="Let's talk about a full-time role or a scoped remote build."
            description="Invoice or hourly is fine. Frontend-heavy work in React, Next.js, or Vue — health-tech, logistics, and product platforms. Remote-friendly (Indonesia / UTC+7)."
            headingId={headingId}
            className="max-w-2xl gap-2.5"
          />

          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
            {HOME_ACTIONS.map((action) => {
              const Icon = action.icon;
              const isPrimary = action.primary === true;

              return (
                <a
                  key={action.label}
                  href={action.href}
                  {...(action.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={cn(
                    buttonVariants({
                      variant: isPrimary ? "default" : "secondary",
                      size: "lg",
                    }),
                    "h-11 w-full min-w-[9.5rem] gap-2 px-5 text-[15px] font-medium sm:w-auto",
                    isPrimary &&
                      "bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent-hover font-semibold",
                  )}
                >
                  <Icon
                    className={cn(
                      "size-5 shrink-0",
                      !isPrimary && "text-primary",
                    )}
                    aria-hidden
                  />
                  <span className="truncate">{action.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
