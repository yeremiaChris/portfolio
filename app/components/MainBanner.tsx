"use client";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Contact,
  FileUser,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
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
      <Button className="p-4 rounded-lg text-sm md:text-lg" size="lg">
        <span>💅</span>
        <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-shine">
          Software Engineer
        </span>
      </Button>

      <div className="mt-5 flex flex-col md:flex-row">
        <div className="space-y-7">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-neutral-200 text-4xl md:text-5xl font-extrabold tracking-tight lg:text-6xl"
          >
            Hi, I&apos;m Yeremia
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-5 text-gray-300 font-normal text-sm md:text-lg"
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
            <Button
              asChild
              className="p-4 rounded-lg text-sm md:text-lg"
              size="lg"
            >
              <Link href="/experience" className="gap-3.5">
                <Briefcase className="text-neutral-500" size={20} />
                Experience
              </Link>
            </Button>
            <Button
              asChild
              className="p-4 rounded-lg text-sm md:text-lg"
              size="lg"
            >
              <Link href="/about" className="gap-3.5">
                <Contact className="text-neutral-500" />
                More about me
              </Link>
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
