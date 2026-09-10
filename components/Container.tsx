import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-350 px-4 md:px-6 lg:px-8 xl:px-10",
        className,
      )}
      {...props}
    />
  );
}
