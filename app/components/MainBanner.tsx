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
export const MainBanner = () => {
  return (
    <section
      id="banner"
      aria-label="Introduction"
      className="max-w-5xl relative w-full mx-auto text-white"
    >
      <div className="px-5 md:mt-5">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-green-400 tracking-widest"
        >
          <span className="inline-flex">
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
          </span>
        </motion.p>

        <div className="md:px-3 mt-5 flex flex-col md:flex-row">
          <div className="space-y-5">
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="scroll-m-20 text-neutral-200 text-4xl md:text-5xl font-extrabold tracking-tight lg:text-6xl"
            >
              Yeremia Chris Saragi
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="scroll-m-20 text-xl md:text-2xl bg-gradient-to-r from-neutral-700 via-neutral-500 to-neutral-700 text-transparent bg-clip-text bg-300% animate-shine font-extrabold tracking-tight lg:text-3xl"
            >
              Software Engineer
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-5  text-sm md:text-base"
            >
              Passionate Front-End Developer with 3+ years of expertise in
              JavaScript/TypeScript, specializing
              <br className="hidden md:inline" /> in Next.js & Nuxt.js.
              Committed to crafting exceptional digital experiences and driven
              to deliver <br className="hidden md:inline" /> impactful solutions
              as part of your team.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex gap-2 items-center"
            >
              <Button className="md:p-6 rounded-lg">
                Get In Touch <Contact className="text-neutral-500" />
              </Button>
              <Button className="md:p-6 rounded-lg">More About Me</Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex gap-5 items-center text-neutral-600"
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Github
                      className="hover:text-green-400 cursor-pointer duration-300"
                      size={18}
                    />
                    <TooltipContent>
                      <p className="border border-neutral-700 rounded-full mb-2 px-1.5">
                        Github
                      </p>
                    </TooltipContent>
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Linkedin
                      className="hover:text-green-400 cursor-pointer duration-300"
                      size={18}
                    />
                    <TooltipContent>
                      <p className="border border-neutral-700 rounded-full mb-2 px-1.5">
                        LinkedIn
                      </p>
                    </TooltipContent>
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Mail
                      className="hover:text-green-400 cursor-pointer duration-300"
                      size={18}
                    />
                    <TooltipContent>
                      <p className="border border-neutral-700 rounded-full mb-2 px-1.5">
                        Email
                      </p>
                    </TooltipContent>
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <FileUser
                      className="hover:text-green-400 cursor-pointer duration-300"
                      size={18}
                    />
                    <TooltipContent>
                      <p className="border border-neutral-700 rounded-full mb-2 px-1.5">
                        CV
                      </p>
                    </TooltipContent>
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
    </section>
  );
};
