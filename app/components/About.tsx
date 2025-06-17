"use client";
import { Button } from "@/components/ui/button";

import { motion } from "framer-motion";
import { Home, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Title } from "./ui/Title";

const defaultMotionProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: {
    duration: 0.5,
    ease: [0.4, 0, 0.2, 1],
  },
} as const;

export const About = () => {
  return (
    <motion.section
      {...defaultMotionProps}
      id="about"
      className="max-w-6xl pt-20 mb-10 relative self-center space-y-5 px-5 mx-auto text-white"
    >
      <Title
        title="About"
        description="A glimpse into my life as a Software Engineer"
      />
      <div className="grid w-full gap-12 items-start justify-center md:grid-cols-3">
        <div className="md:col-span-2">
          <motion.div
            {...defaultMotionProps}
            transition={{
              duration: 0.5,
              delay: 0.3,
            }}
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
            </h2>
            <p className="text-sm bg-gradient-to-r from-neutral-700 via-neutral-500 to-neutral-700 text-transparent bg-clip-text bg-300% animate-shine font-medium">
              Crafting digital experiences with passion and purpose
            </p>
          </motion.div>

          <motion.p
            {...defaultMotionProps}
            transition={{
              duration: 0.5,
              delay: 0.4,
            }}
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
            transition={{
              duration: 0.5,
              delay: 0.5,
            }}
            className="space-y-2 mt-10"
          >
            <h2 className="md:text-5xl mb-4 text-3xl font-bold">
              My Daily Uses
            </h2>
          </motion.div>

          <motion.ul
            {...defaultMotionProps}
            transition={{
              duration: 0.5,
              delay: 0.6,
            }}
            className="space-y-2 list-disc list-outside px-7 mt-9"
          >
            <li>
              <strong>Text Editor:</strong> I utilize{" "}
              <Link
                className="border-b italic"
                href="https://code.visualstudio.com/"
              >
                Visual Studio Code (VSCode)
              </Link>{" "}
              as my primary text editor, leveraging its robust features and
              versatility to enhance my workflow. I use
            </li>
            <li>
              <strong>Terminal:</strong> I rely on{" "}
              <Link className="border-b italic" href="https://iterm2.com/">
                ITerm2
              </Link>
              , iTerm2 is a replacement for Terminal and the successor to iTerm.
              It works on Macs with macOS 10.14 or newer. iTerm2 brings the
              terminal into the modern age with features you never knew you
              always wanted.
            </li>
            <li>
              <strong>Web Browser:</strong> I currently use the latest version
              of{" "}
              <Link
                className="border-b italic"
                href="https://www.mozilla.org/en-US/firefox/new/"
              >
                Mozilla Firefox
              </Link>{" "}
              as my primary browser, appreciating its speed, lightweight design,
              and performance.
            </li>
            <li>
              <strong>Laptop:</strong> I work on an{" "}
              <Link
                className="border-b italic"
                href="https://ibox.co.id/product/macbook-air-m3-13-6-inci-2024-s8100027788?utm_source=googlesearch&utm_medium=paid&utm_campaign=ibox-ads-sem-trf-iboxing-week-macbook-air-m3-mar25&gad_source=1&gclid=Cj0KCQjwy46_BhDOARIsAIvmcwMEyzMEwnQVfLMYIweFcp-al8hRVGNtOsJwZRum1OGd6dFLQsY8obIaAn2AEALw_wcB"
              >
                MacBook Air M3 16/512
              </Link>{" "}
              , which serves as my reliable and capable computing device.
            </li>
            <li>
              <strong>Keyboard:</strong> I use the{" "}
              <Link
                className="border-b italic"
                href="https://www.tokopedia.com/goodgamingshop/keychron-k8-tkl-80-l-missing-ayout-non-backlight-hot-swappable-aluminum-frame-red-sw-9fb80?extParam=ivf%3Dfalse%26keyword%3Dkeychron+k8%26search_id%3D202502241751318413E2FD12D2E920ES20%26src%3Dsearch"
              >
                Keychron K8 Tenkeyless (TKL) 80% keyboard
              </Link>{" "}
              , valued for its ergonomic design and responsive performance.
            </li>
          </motion.ul>

          <motion.div
            {...defaultMotionProps}
            transition={{
              duration: 0.5,
              delay: 0.7,
            }}
            className="space-y-2 mt-10"
          >
            <h2 className="md:text-5xl mb-4 text-3xl font-bold">
              Want to work together?
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: 0.8,
            }}
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
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.2,
                      delay: 0.9 + index * 0.02,
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            {...defaultMotionProps}
            transition={{
              duration: 0.5,
              delay: 1.0,
            }}
          >
            <Button className="mt-4" asChild>
              <Link href="mailto:yeremia997@gmail.com">
                <Mail /> Send me an email
              </Link>
            </Button>

            <p className="text-sm mt-3">
              Or copy this email manually: yeremia997@gmail.com
            </p>
          </motion.div>
        </div>

        <motion.div
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="px-5 md:sticky md:top-20 md:mt-14 transition-all duration-300"
        >
          <div className="relative group">
            {/* Modern gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />

            {/* Glowing border effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/30 via-blue-400/30 to-purple-400/30 rounded-3xl p-[2px]">
              <div className="bg-black/90 backdrop-blur-sm rounded-3xl h-full w-full" />
            </div>

            {/* Main image container */}
            <div className="relative aspect-square rounded-3xl overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full animate-pulse z-10" />
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse z-10" />

              {/* Image with modern styling */}
              <Image
                src="/yeremia-1.JPG"
                alt="Yeremia Chris Saragi"
                fill
                className="object-cover rounded-3xl group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 400px"
              />

              {/* Overlay gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-3xl" />

              {/* Status indicator */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-white/80 font-medium">
                  Available
                </span>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg rotate-12 opacity-80 group-hover:rotate-0 transition-transform duration-300" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg -rotate-12 opacity-80 group-hover:rotate-0 transition-transform duration-300" />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
