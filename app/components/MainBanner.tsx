"use client";
import { Button } from "@/components/ui/button";
import { Contact, FileUser, Github, Linkedin, Mail } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  EMAIL_URL,
  GITHUB_URL,
  LINKEDIN_URL,
  RESUME_URL,
} from "../constant/constant";
export const MainBanner = () => {
  return (
    <div className="px-5 relative md:mt-5">
      {/* <motion.div
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
            {"Hi, my name is".split("").map((char, index) => (
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
      </motion.div> */}
      <Button className="flex items-center gap-3">
        <span>💅</span>
        <span>Frontend Web Developer</span>
      </Button>

      <div className="mt-5 flex flex-col md:flex-row">
        <div className="space-y-5">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="scroll-m-20 text-neutral-200 text-4xl md:text-5xl font-extrabold tracking-tight lg:text-6xl"
          >
            Hi, I&apos;m Yeremia
          </motion.h1>
          {/* <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="scroll-m-20 text-xl md:text-2xl bg-gradient-to-r from-neutral-700 via-neutral-500 to-neutral-700 text-transparent bg-clip-text bg-300% animate-shine font-extrabold tracking-tight lg:text-3xl"
          >
            Software Engineer
          </motion.h2> */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-5  text-sm md:text-base"
          >
            Software engineer with proven expertise in developing user-focused
            applications from concept to deployment, enhancing performance and
            scalability, executing tech stack upgrades, and maintaining high
            standards of code quality.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex gap-2 items-center"
          >
            <Button asChild className="md:p-6 rounded-lg">
              <Link href="#experience">
                Experience <Contact className="text-neutral-500" />
              </Link>
            </Button>
            <Button asChild className="md:p-6 rounded-lg ">
              <Link href="#about">More About Me</Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex gap-5 items-center text-neutral-600"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={GITHUB_URL} target="_blank">
                    <Github
                      className="hover:text-green-400 cursor-pointer duration-300"
                      size={18}
                    />
                    <TooltipContent>
                      <p className="border border-neutral-700 rounded-full mb-2 px-1.5">
                        Github
                      </p>
                    </TooltipContent>
                  </Link>
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={LINKEDIN_URL} target="_blank">
                    <Linkedin
                      className="hover:text-green-400 cursor-pointer duration-300"
                      size={18}
                    />
                    <TooltipContent>
                      <p className="border border-neutral-700 rounded-full mb-2 px-1.5">
                        LinkedIn
                      </p>
                    </TooltipContent>
                  </Link>
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={EMAIL_URL} target="_blank">
                    <Mail
                      className="hover:text-green-400 cursor-pointer duration-300"
                      size={18}
                    />
                    <TooltipContent>
                      <p className="border border-neutral-700 rounded-full mb-2 px-1.5">
                        Email
                      </p>
                    </TooltipContent>
                  </Link>
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={RESUME_URL} target="_blank">
                    <FileUser
                      className="hover:text-green-400 cursor-pointer duration-300"
                      size={18}
                    />
                    <TooltipContent>
                      <p className="border border-neutral-700 rounded-full mb-2 px-1.5">
                        Resume
                      </p>
                    </TooltipContent>
                  </Link>
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
            className="flex items-center gap-2 mt-4"
          >
            <div className="h-[2px] w-12 md:w-24 bg-gradient-to-r from-green-400/40 to-transparent" />

            <span className="text-neutral-400 text-xs md:text-sm italic whitespace-nowrap">
              Open to exciting opportunities
            </span>

            <div className="h-[2px] w-12 md:w-24 bg-gradient-to-l from-green-400/40 to-transparent" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
