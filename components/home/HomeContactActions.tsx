"use client";

import { FileText, Link2, Mail } from "lucide-react";

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

export function HomeContactActions() {
  return (
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
              className={cn("size-5 shrink-0", !isPrimary && "text-primary")}
              aria-hidden
            />
            <span className="truncate">{action.label}</span>
          </a>
        );
      })}
    </div>
  );
}
