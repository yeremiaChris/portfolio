"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";
import Link from "next/link";

const defaultMotionProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};
const techStack = [
  {
    name: "React.js",
    delay: 0.8,
    description:
      "A JavaScript library for building user interfaces with component-based architecture",
    link: "https://react.dev",
  },
  {
    name: "Vue.js",
    delay: 0.9,
    description:
      "Progressive JavaScript framework for building modern user interfaces",
    link: "https://vuejs.org",
  },
  {
    name: "Next.js",
    delay: 1.0,
    description:
      "React framework for production-grade applications with server-side rendering",
    link: "https://nextjs.org",
  },
  {
    name: "Nuxt.js",
    delay: 1.1,
    description: "Vue framework for creating full-stack web applications",
    link: "https://nuxt.com",
  },
  {
    name: "TailwindCSS",
    delay: 1.2,
    description: "Utility-first CSS framework for rapid UI development",
    link: "https://tailwindcss.com",
  },
  {
    name: "TypeScript",
    delay: 1.3,
    description:
      "JavaScript with syntax for types, enhancing code quality and maintainability",
    link: "https://www.typescriptlang.org",
  },
  {
    name: "JavaScript",
    delay: 1.4,
    description: "Dynamic programming language that powers the interactive web",
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    name: "Jest",
    delay: 1.5,
    description:
      "Delightful JavaScript testing framework with a focus on simplicity",
    link: "https://jestjs.io",
  },
];
export const About = () => {
  return (
    <motion.section
      {...defaultMotionProps}
      id="about"
      className="max-w-6xl mb-20 mt-20 self-center space-y-5 px-5 mx-auto text-white scroll-mt-28"
    >
      <motion.div
        {...defaultMotionProps}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-8 space-y-2"
      >
        <h2 className="md:text-5xl text-3xl text-center font-bold">
          About <span className="text-green-400">Me</span>
        </h2>
        <p className="text-center text-sm bg-gradient-to-r from-neutral-700 via-neutral-500 to-neutral-700 text-transparent bg-clip-text bg-300% animate-shine font-medium">
          Crafting digital experiences with passion and purpose
        </p>
      </motion.div>

      <motion.div
        {...defaultMotionProps}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-4"
      >
        <h2 className="text-xl font-bold">Yeremia Chris Saragi</h2>
        <p className="text-neutral-400 text-sm bg-gradient-to-r from-neutral-700 via-neutral-500 to-neutral-700 text-transparent bg-clip-text bg-300% animate-shine font-medium">
          Frontend Web Developer at PrimaKu
        </p>
      </motion.div>
      <motion.p
        {...defaultMotionProps}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-white text-sm"
      >
        Hello! You can call me Yeremia. I am a Software Engineer specializing in
        the React ecosystem, focusing on building modern and responsive web
        applications. I was born in 2000 in Kabanjahe, Sumatera Utara,
        Indonesia. When the pandemic hit in 2020, my university closed for a few
        weeks, and out of boredom, I started learning web development, beginning
        with the basics like HTML, CSS, JavaScript, and Bootstrap, following the
        roadmap from roadmap.sh. <br /> <br /> After laying the foundation, I
        dove into backend development, learning Python with Flask and Django. I
        also explored Laravel. However, by 2021, I noticed the rise of
        JavaScript frameworks, especially React and Vue, with abundant job
        opportunities in that space. I shifted my focus to mastering React and
        Next.js, including React Native, as well as Vue.js and Nuxt.js. <br />
        <br /> Through this journey, I was able to secure my first job as a
        frontend engineer. As part of my learning journey, I&apos;ve been
        working on various projects to apply and strengthen my knowledge. I am
        passionate about building web applications and continuously learning new
        technologies. As a software engineer, here are my current favorite tech
        stack:
      </motion.p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {techStack.map((tech) => (
          <TooltipProvider key={tech.name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: tech.delay }}
                  className="relative p-4 rounded-lg text-center animate-shine group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 transition-opacity duration-300 ease-in-out group-hover:opacity-0" />
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-700 to-neutral-800 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
                  <h2 className="text-sm text-neutral-400 relative z-10">
                    {tech.name}
                  </h2>
                </motion.div>
              </TooltipTrigger>

              <TooltipContent
                className="bg-neutral-800 z-50 border border-neutral-700 rounded-lg p-3 max-w-[200px] space-y-2 data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade"
                sideOffset={5}
              >
                <Link
                  href={tech.link}
                  target="_blank"
                  className="underline text-green-400"
                >
                  <p className="font-semibold text-sm">{tech.name}</p>
                </Link>
                <p className="text-xs text-neutral-400">{tech.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </motion.section>
  );
};
