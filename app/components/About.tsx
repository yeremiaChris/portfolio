"use client";
import { Button } from "@/components/ui/button";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";
import { Home, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
      className="max-w-6xl mt-20 mb-10 relative self-center space-y-5 px-5 mx-auto text-white"
    >
      <div className="grid w-full gap-12 justify-center items-center md:grid-cols-3">
        <div className="md:col-span-2">
          <motion.div
            {...defaultMotionProps}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-10 space-y-2"
          >
            <Button size="sm" asChild>
              <Link href="/">
                <Home />
                Home
              </Link>
            </Button>
            <h2 className="md:text-5xl text-3xl font-bold">
              I&apos;m Yeremia Chris Saragi
              {/* My <span className="text-green-400">Story</span> */}
            </h2>
            <p className="text-sm bg-gradient-to-r from-neutral-700 via-neutral-500 to-neutral-700 text-transparent bg-clip-text bg-300% animate-shine font-medium">
              Crafting digital experiences with passion and purpose
            </p>
          </motion.div>

          {/* <motion.div
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
          </motion.div> */}

          <motion.p
            {...defaultMotionProps}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white text-sm"
          >
            Software Engineer specializing in the React ecosystem. I build
            modern, responsive web applications using React, Next.js and also
            VueJs or NuxtJs. I was born in 2000 in Kabanjahe, Sumatera Utara,
            Indonesia. <br /> <br /> I started learning web development in 2020
            when my university closed during the pandemic. I began with HTML,
            CSS, JavaScript, and Bootstrap, then explored backend development
            with Python (Flask, Django) and Laravel. <br /> <br />
            In 2021, I shifted my focus to frontend frameworks like React,
            Next.js, Vue.js, and Nuxt.js. This journey led to my first job as a
            frontend engineer. I love building web applications and continuously
            learning new technologies.
          </motion.p>

          <motion.div
            {...defaultMotionProps}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-2 mt-10"
          >
            <h2 className="md:text-5xl mb-4 text-3xl font-bold">
              Want to work together?
              {/* My <span className="text-green-400">Story</span> */}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-green-400 flex group tracking-widest"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 bg-green-700 rounded-full" />
                <div className="absolute inset-0 group-hover:-inset-0.5 bg-green-200 blur rounded-full transition-all duration-300" />
              </div>

              <div>
                {"Available for hire".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.1,
                      delay: index * 0.1,
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          <Button className="mt-4" asChild>
            <Link href="mailto:yeremia997@gmail.com">
              <Mail /> Send me an email
            </Link>
          </Button>

          <p className="text-sm mt-3">
            Or copy this email manually: yeremia997@gmail.com
          </p>
        </div>

        <div className="px-5">
          <div className="transition-all duration-300 relative aspect-1-1">
            <div className="absolute w-20 h-20 bg-green-500 -right-1 -top-1 rounded-tr-3xl" />
            <div className="absolute w-20 h-20 bg-green-500 -left-1 -bottom-1 rounded-bl-3xl" />

            <Image
              src="/yeremia-1.JPG"
              alt="yeremia"
              fill
              className="rounded-3xl"
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
