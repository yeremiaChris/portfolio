"use client";

import { ContactCta, type ContactCtaProps } from "@/components/home/ContactCta";
import { Reveal } from "@/components/motion/Reveal";

export function ServicesContactCta(props: ContactCtaProps) {
  return (
    <Reveal when="inView" preset="calm">
      <ContactCta {...props} />
    </Reveal>
  );
}
