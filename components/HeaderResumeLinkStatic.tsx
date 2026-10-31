import { buttonVariants } from "@/components/ui/button-variants";
import { SITE_RESUME_HREF } from "@/lib/site-links";
import { cn } from "@/lib/utils";

export function HeaderResumeLinkStatic() {
  return (
    <a
      href={SITE_RESUME_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "header-resume-link text-muted-foreground about-hide-header-resume text-[13px]",
      )}
    >
      CV.pdf
    </a>
  );
}
