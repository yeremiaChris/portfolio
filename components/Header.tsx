import { HeaderBar } from "@/components/HeaderBar";

export function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <HeaderBar />
    </header>
  );
}
