import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function HeaderMobileMenuFallback() {
  return (
    <button
      type="button"
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon-sm" }),
        "lg:hidden",
      )}
      aria-label="Open menu"
      tabIndex={-1}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="size-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M4 5h16" />
        <path d="M4 12h16" />
        <path d="M4 19h16" />
      </svg>
    </button>
  );
}
