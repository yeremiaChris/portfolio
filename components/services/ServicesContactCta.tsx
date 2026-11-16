"use client";

import { Mail, MessageCircle } from "lucide-react";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

import {
  ServicesScrollReveal,
  useServicesScrollSectionProgress,
} from "@/components/services/ServicesScrollMotion";
import { servicesSectionClass } from "@/components/services/servicesSurface";
import { buttonVariants } from "@/components/ui/button-variants";
import { servicesContactCta } from "@/lib/services";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

function ServicesContactPanel() {
  const reducedMotion = useReducedMotion();
  const progress = useServicesScrollSectionProgress();
  const fallback = useMotionValue(1);
  const source = progress ?? fallback;
  const whatsappScale = useTransform(source, [0.45, 1], [0.97, 1]);

  const headingId = "services-contact-heading";

  return (
    <section
      id="services-contact"
      aria-labelledby={headingId}
      className="w-full"
    >
      <div
        className={cn(
          "border-gradient bg-muted border-border/50 relative flex w-full flex-col items-start justify-between gap-4 overflow-hidden rounded-2xl border p-5 shadow-sm md:flex-row md:items-center md:gap-6 md:p-6",
        )}
      >
        <h2
          id={headingId}
          className="font-heading text-foreground relative z-10 min-w-0 flex-1 text-lg font-semibold tracking-tight sm:text-xl"
        >
          {servicesContactCta.title}
        </h2>
        <div className="relative z-10 flex w-full flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center md:w-auto md:shrink-0">
          {reducedMotion ? (
            <a
              href={site.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent-hover h-11 w-full max-w-full gap-2 px-5 text-[15px] font-semibold shadow-[0_0_20px_rgba(76,215,246,0.25)] sm:w-auto",
              )}
            >
              <MessageCircle className="size-5 shrink-0" aria-hidden />
              <span className="truncate">WhatsApp</span>
            </a>
          ) : (
            <m.a
              href={site.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              style={{ scale: whatsappScale }}
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent-hover h-11 w-full max-w-full gap-2 px-5 text-[15px] font-semibold shadow-[0_0_20px_rgba(76,215,246,0.25)] sm:w-auto",
              )}
            >
              <MessageCircle className="size-5 shrink-0" aria-hidden />
              <span className="truncate">WhatsApp</span>
            </m.a>
          )}
          <a
            href={site.links.email}
            className={cn(
              buttonVariants({ variant: "secondary", size: "lg" }),
              "h-11 w-full max-w-full gap-2 px-5 text-[15px] font-medium sm:w-auto",
            )}
          >
            <Mail className="text-primary size-5 shrink-0" aria-hidden />
            <span className="truncate">{site.links.emailLabel}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function ServicesContactCta() {
  return (
    <ServicesScrollReveal
      shareProgress
      className={cn(servicesSectionClass, "mb-0")}
    >
      <ServicesContactPanel />
    </ServicesScrollReveal>
  );
}
