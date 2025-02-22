"use client";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";
import Image from "next/image";
// import Link from "next/link";

const defaultMotionProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};
// const techStack = [
//   {
//     name: "React.js",
//     delay: 0.8,
//     description:
//       "A JavaScript library for building user interfaces with component-based architecture",
//     link: "https://react.dev",
//   },
//   {
//     name: "Vue.js",
//     delay: 0.9,
//     description:
//       "Progressive JavaScript framework for building modern user interfaces",
//     link: "https://vuejs.org",
//   },
//   {
//     name: "Next.js",
//     delay: 1.0,
//     description:
//       "React framework for production-grade applications with server-side rendering",
//     link: "https://nextjs.org",
//   },
//   {
//     name: "Nuxt.js",
//     delay: 1.1,
//     description: "Vue framework for creating full-stack web applications",
//     link: "https://nuxt.com",
//   },
//   {
//     name: "TailwindCSS",
//     delay: 1.2,
//     description: "Utility-first CSS framework for rapid UI development",
//     link: "https://tailwindcss.com",
//   },
//   {
//     name: "TypeScript",
//     delay: 1.3,
//     description:
//       "JavaScript with syntax for types, enhancing code quality and maintainability",
//     link: "https://www.typescriptlang.org",
//   },
//   {
//     name: "JavaScript",
//     delay: 1.4,
//     description: "Dynamic programming language that powers the interactive web",
//     link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
//   },
//   {
//     name: "Jest",
//     delay: 1.5,
//     description:
//       "Delightful JavaScript testing framework with a focus on simplicity",
//     link: "https://jestjs.io",
//   },
// ];
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
        className="mb-20 space-y-2"
      >
        <h2 className="md:text-5xl text-3xl text-center font-bold">
          My <span className="text-green-400">Story</span>
        </h2>
        <p className="text-center text-sm bg-gradient-to-r from-neutral-700 via-neutral-500 to-neutral-700 text-transparent bg-clip-text bg-300% animate-shine font-medium">
          Crafting digital experiences with passion and purpose
        </p>
      </motion.div>

      <div className="grid gap-8 justify-start md:grid-cols-2">
        <div>
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
            Hi! I&apos;m Yeremia, a Software Engineer specializing in the React
            ecosystem. I build modern, responsive web applications using React,
            Next.js, and React Native. I was born in 2000 in Kabanjahe, Sumatera
            Utara, Indonesia. <br /> <br /> I started learning web development
            in 2020 when my university closed during the pandemic. I began with
            HTML, CSS, JavaScript, and Bootstrap, then explored backend
            development with Python (Flask, Django) and Laravel. <br /> <br />
            In 2021, I shifted my focus to frontend frameworks like React,
            Next.js, Vue.js, and Nuxt.js. This journey led to my first job as a
            frontend engineer. I love building web applications and continuously
            learning new technologies.
          </motion.p>
        </div>

        <div className="flex items-center justify-center">
          <div
            style={{
              aspectRatio: "1/1",
            }}
            className="relative h-full w-full md:w-auto max-h-[350px] rounded-3xl transform rotate-3 "
          >
            <div className="absolute w-20 h-20 bg-green-500 -right-1 -top-1 rounded-tr-3xl" />
            <div className="absolute w-20 h-20 bg-green-500 -left-1 -bottom-1 rounded-bl-3xl" />

            <Image
              src="/yeremia.jpg"
              alt="yeremia"
              fill
              className="w-[300px] rounded-3xl"
            />
          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
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
      </div> */}
    </motion.section>
  );
};
