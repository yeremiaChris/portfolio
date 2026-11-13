import { Container } from "@/components/Container";
import { HomeSectionReveal } from "@/components/home/HomeSectionReveal";
import { homeSectionSpacingClass } from "@/components/home/homeSurface";
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
    <HomeSectionReveal
      id="work"
      ariaLabelledby="milestones-heading"
      className={homeSectionSpacingClass}
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
    </HomeSectionReveal>
  );
}
