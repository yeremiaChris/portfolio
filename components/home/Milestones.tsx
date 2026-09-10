import { Container } from "@/components/Container";
import { CaseStudyCard } from "@/components/home/milestones/CaseStudyCard";
import { FeaturedCaseStudy } from "@/components/home/milestones/FeaturedCaseStudy";
import { Badge } from "@/components/ui/badge";
import {
  featuredMilestone,
  milestonesIntro,
  secondaryMilestones,
} from "@/lib/milestones";

export function Milestones() {
  return (
    <section
      id="experience"
      aria-labelledby="milestones-heading"
      className="w-full py-16 md:py-24"
    >
      <Container className="flex flex-col gap-10 md:gap-12">
        <header className="flex max-w-2xl flex-col gap-1">
          <Badge
            variant="secondary"
            className="mb-1 w-fit gap-2 bg-transparent px-0 font-mono text-[10px] tracking-widest text-primary uppercase"
          >
            <span className="size-2.5 rounded-full bg-primary" aria-hidden />
            {milestonesIntro.eyebrow}
          </Badge>
          <h2
            id="milestones-heading"
            className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            {milestonesIntro.title}
          </h2>
          <p className="text-[15px] leading-6 text-muted-foreground">
            {milestonesIntro.description}
          </p>
        </header>

        <FeaturedCaseStudy study={featuredMilestone} />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {secondaryMilestones.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>
      </Container>
    </section>
  );
}
