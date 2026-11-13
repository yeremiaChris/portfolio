import { Container } from "@/components/Container";
import { WorkBentoCard } from "@/components/home/work/WorkBentoCard";
import { WorkBentoFeatured } from "@/components/home/work/WorkBentoFeatured";
import { SectionIntro } from "@/components/typography/SectionTypography";
import {
  getFeaturedHomeWorkCard,
  getSecondaryHomeWorkCards,
} from "@/lib/home-work";
import { milestonesIntro } from "@/lib/milestones";

export function Milestones() {
  const featured = getFeaturedHomeWorkCard();
  const secondary = getSecondaryHomeWorkCards();

  return (
    <section
      id="work"
      aria-labelledby="milestones-heading"
      className="w-full scroll-mt-24 py-12 md:py-16"
    >
      <Container className="flex flex-col gap-8 md:gap-10">
        <SectionIntro
          eyebrow={milestonesIntro.eyebrow}
          title={milestonesIntro.title}
          description={milestonesIntro.description}
          headingId="milestones-heading"
        />

        <div className="flex flex-col gap-4 md:gap-5">
          <WorkBentoFeatured card={featured} />
          <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-2">
            {secondary.map((study) => (
              <WorkBentoCard key={study.id} card={study} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
