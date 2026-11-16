import Link from "next/link";
import { Globe, LayoutDashboard } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getServiceOfferingProjectHref,
  getServiceOfferingProjectShortName,
  type ServiceOffering,
  type ServiceOfferingId,
} from "@/lib/services";
import { cn } from "@/lib/utils";

const OFFERING_ICONS: Record<ServiceOfferingId, typeof Globe> = {
  websites: Globe,
  "web-systems": LayoutDashboard,
};

type ServiceOfferingCardProps = {
  offering: ServiceOffering;
  className?: string;
};

export function ServiceOfferingCard({
  offering,
  className,
}: ServiceOfferingCardProps) {
  const projectHref = getServiceOfferingProjectHref(offering);
  const projectShortName = getServiceOfferingProjectShortName(offering);
  const Icon = OFFERING_ICONS[offering.id];

  return (
    <Card
      className={cn(
        "border-border/50 bg-muted/90 ring-border/30 hover:border-brand-accent/40 flex h-full flex-col justify-between rounded-3xl border shadow-sm ring-1 transition-[border-color,box-shadow] duration-200 [--card-spacing:--spacing(5)] hover:shadow-[0_0_0_1px_rgba(76,215,246,0.14)] motion-reduce:transition-none md:[--card-spacing:--spacing(6)]",
        className,
      )}
    >
      <CardHeader className="flex flex-1 flex-col gap-3.5">
        <div className="bg-brand-accent/10 text-brand-accent border-brand-accent/35 inline-flex size-10 items-center justify-center rounded-lg border">
          <Icon className="size-5" aria-hidden />
        </div>
        <div className="space-y-2">
          <CardTitle className="font-heading text-foreground text-xl font-semibold tracking-tight">
            <h3>{offering.title}</h3>
          </CardTitle>
          <CardDescription className="text-[15px] leading-relaxed">
            {offering.description}
          </CardDescription>
        </div>
        <ul className="text-foreground space-y-2 text-[14px] leading-relaxed">
          {offering.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2">
              <span
                className="bg-brand-accent mt-2 size-1.5 shrink-0 rounded-full"
                aria-hidden
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </CardHeader>

      <CardFooter className="border-border/40 mt-auto flex flex-col items-start gap-2.5 border-t bg-transparent pt-3.5">
        <p className="text-brand-accent text-[12px] font-medium tracking-wide">
          {offering.stack}
        </p>
        {projectHref && projectShortName ? (
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="secondary"
              className="text-muted-foreground label-caps bg-transparent px-0 text-[10px] tracking-[0.14em]"
            >
              Recent work
            </Badge>
            <Badge
              variant="outline"
              render={
                <Link
                  href={projectHref}
                  aria-label={`${projectShortName} project`}
                />
              }
              className={cn(
                "text-brand-accent hover:border-brand-accent/45 hover:text-brand-accent/90 rounded-full px-2.5 py-1 text-[12px] font-medium sm:px-3 sm:text-[13px]",
                "motion-reduce:transition-none",
              )}
            >
              {projectShortName}
            </Badge>
          </div>
        ) : null}
      </CardFooter>
    </Card>
  );
}
