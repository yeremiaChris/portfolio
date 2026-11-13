import { SectionEyebrow } from "@/components/typography/SectionTypography";
import { site } from "@/lib/site";

export function HeroEyebrow() {
  return (
    <SectionEyebrow className="mb-3 tracking-[0.14em] md:mb-4">
      {site.role.toUpperCase()}
    </SectionEyebrow>
  );
}
