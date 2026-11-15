import type { ContactCtaAction } from "@/components/home/ContactCta";
import { site } from "@/lib/site";

export function xAndThreadsContactActions(): ContactCtaAction[] {
  return [
    {
      href: site.links.x,
      label: site.links.xHandle,
      icon: "x",
      variant: "secondary",
      external: true,
    },
    {
      href: site.links.threads,
      label: site.links.threadsHandle,
      icon: "threads",
      variant: "secondary",
      external: true,
    },
  ];
}
