import { ExperienceRoleCard } from "@/components/experience/ExperienceRoleCard";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { experienceRoles } from "@/lib/experience";

export function ExperienceTimeline() {
  return (
    <section
      id="experience-list"
      aria-label="Career timeline"
      className="mb-12 flex w-full flex-col gap-6 md:mb-16 md:gap-8"
    >
      <Stagger className="flex w-full flex-col gap-6 md:gap-8">
        {experienceRoles.map((role) => (
          <StaggerItem key={role.id}>
            <ExperienceRoleCard role={role} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
