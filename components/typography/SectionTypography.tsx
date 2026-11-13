import type { ReactNode } from "react";

import {
  sectionEyebrowClass,
  sectionHeadingClass,
  sectionLeadClass,
} from "@/components/typography/typography-tokens";
import { cn } from "@/lib/utils";

type SectionEyebrowProps = {
  children: ReactNode;
  className?: string;
};

export function SectionEyebrow({ children, className }: SectionEyebrowProps) {
  return <p className={cn(sectionEyebrowClass, className)}>{children}</p>;
}

type SectionHeadingProps = {
  children: ReactNode;
  id?: string;
  className?: string;
};

export function SectionHeading({
  children,
  id,
  className,
}: SectionHeadingProps) {
  return (
    <h2 id={id} className={cn(sectionHeadingClass, className)}>
      {children}
    </h2>
  );
}

type SectionLeadProps = {
  children: ReactNode;
  className?: string;
};

export function SectionLead({ children, className }: SectionLeadProps) {
  return <p className={cn(sectionLeadClass, className)}>{children}</p>;
}

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  headingId: string;
  className?: string;
};

export function SectionIntro({
  eyebrow,
  title,
  description,
  headingId,
  className,
}: SectionIntroProps) {
  return (
    <header className={cn("flex max-w-2xl flex-col gap-2", className)}>
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <SectionHeading id={headingId}>{title}</SectionHeading>
      <SectionLead>{description}</SectionLead>
    </header>
  );
}
