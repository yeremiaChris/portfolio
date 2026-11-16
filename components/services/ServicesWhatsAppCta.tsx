import { MessageCircle } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { servicesHero } from "@/lib/services";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type ServicesWhatsAppCtaProps = {
  className?: string;
};

export function ServicesWhatsAppCta({ className }: ServicesWhatsAppCtaProps) {
  return (
    <a
      href={site.links.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        buttonVariants({ variant: "default", size: "default" }),
        "h-10 gap-2 px-4 text-[13px] font-semibold shadow-[0_0_14px_rgba(76,215,246,0.2)]",
        className,
      )}
    >
      <MessageCircle className="size-4 shrink-0" aria-hidden />
      {servicesHero.whatsappCtaLabel}
    </a>
  );
}
