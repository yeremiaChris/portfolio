import { Container } from "@/components/Container";
import { HomeContactActions } from "@/components/home/HomeContactActions";
import { homeBentoCardClass } from "@/components/home/homeSurface";
import { SectionIntro } from "@/components/typography/SectionTypography";
import { cn } from "@/lib/utils";

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

          <HomeContactActions />
        </div>
      </Container>
    </section>
  );
}
