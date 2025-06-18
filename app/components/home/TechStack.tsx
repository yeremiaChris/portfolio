import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";

const techStack = [
  {
    name: "React",
    icon: "⚛️",
    category: "Frontend",
  },
  {
    name: "Next.js",
    icon: "▲",
    category: "Framework",
  },
  {
    name: "TypeScript",
    icon: "📘",
    category: "Language",
  },
  {
    name: "Tailwind CSS",
    icon: "🎨",
    category: "Styling",
  },
  {
    name: "Vue.js",
    icon: "💚",
    category: "Frontend",
  },
  {
    name: "Nuxt.js",
    icon: "🟢",
    category: "Framework",
  },
  {
    name: "Node.js",
    icon: "🟩",
    category: "Backend",
  },
  {
    name: "Framer Motion",
    icon: "✨",
    category: "Animation",
  },
  {
    name: "Supabase",
    icon: "🟢",
    category: "Database",
  },
  {
    name: "Firebase",
    icon: "🟠",
    category: "Backend",
  },
  {
    name: "NestJS",
    icon: "🛡️",
    category: "Backend",
  },
  {
    name: "Remix",
    icon: "🎭",
    category: "Framework",
  },
  {
    name: "Astro",
    icon: "🌌",
    category: "Framework",
  },
  {
    name: "JavaScript",
    icon: "🟨",
    category: "Language",
  },
  {
    name: "HTML",
    icon: "📄",
    category: "Markup",
  },
  {
    name: "Git",
    icon: "🔧",
    category: "Version Control",
  },
  {
    name: "Jira",
    icon: "📋",
    category: "Project Management",
  },
  {
    name: "Notion",
    icon: "🗒️",
    category: "Productivity",
  },
];

const firstRow = techStack.slice(0, techStack.length / 2);
const secondRow = techStack.slice(techStack.length / 2);

const TechCard = ({
  icon,
  name,
  category,
}: {
  icon: string;
  name: string;
  category: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-48 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="text-3xl">{icon}</div>
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{category}</p>
        </div>
      </div>
    </figure>
  );
};

export function TechStack() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:30s]">
        {firstRow.map((tech) => (
          <TechCard key={tech.name} {...tech} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:30s]">
        {secondRow.map((tech) => (
          <TechCard key={tech.name} {...tech} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-neutral-950 to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-neutral-950 to-transparent"></div>
    </div>
  );
}
