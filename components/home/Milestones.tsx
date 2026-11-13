import { Container } from "@/components/Container";
import {
  homeBentoWorkGridClass,
  homeSectionSpacingClass,
  homeSectionStackClass,
} from "@/components/home/homeSurface";
import { WorkBentoCard } from "@/components/home/work/WorkBentoCard";
import { WorkBentoFeatured } from "@/components/home/work/WorkBentoFeatured";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
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
      className={homeSectionSpacingClass}
    >
      <Container className={homeSectionStackClass}>
        <Reveal when="inView">
          <SectionIntro
            eyebrow={milestonesIntro.eyebrow}
            title={milestonesIntro.title}
            description={milestonesIntro.description}
            headingId="milestones-heading"
          />
        </Reveal>

        <Stagger when="inView" className={homeBentoWorkGridClass}>
          <StaggerItem className="col-span-full">
            <WorkBentoFeatured card={featured} />
          </StaggerItem>
          {secondary.map((study) => (
            <StaggerItem key={study.id}>
              <WorkBentoCard card={study} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
