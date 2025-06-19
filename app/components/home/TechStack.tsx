"use client";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { motion } from "framer-motion";

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
    <motion.figure
      whileHover={{
        scale: 1.05,
        y: -5,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "relative h-full w-48 cursor-pointer overflow-hidden rounded-xl border p-4 backdrop-blur-sm",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <motion.div
          className="text-3xl"
          whileHover={{
            scale: 1.2,
            rotate: 5,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
        >
          {icon}
        </motion.div>
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{category}</p>
        </div>
      </div>
    </motion.figure>
  );
};

export function TechStack() {
  return (
    <section className="text-white mb-32 px-5 max-w-6xl mx-auto space-y-14">
      <motion.div
        className="space-y-5"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl">
          <motion.span
            className="text-neutral-200 text-3xl md:text-4xl font-extrabold tracking-tight lg:text-5xl"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            With Cutting-Edge{" "}
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-shine">
              Tech Stack
            </span>
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.4,
              type: "spring",
              stiffness: 200,
            }}
          >
            {" "}
            🚀
          </motion.span>
        </h2>
      </motion.div>

      <motion.div
        className="relative flex w-full flex-col items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <Marquee pauseOnHover className="[--duration:30s]">
          {firstRow.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TechCard {...tech} />
            </motion.div>
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:30s]">
          {secondRow.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TechCard {...tech} />
            </motion.div>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-neutral-950 to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-neutral-950 to-transparent"></div>
      </motion.div>
    </section>
  );
}
