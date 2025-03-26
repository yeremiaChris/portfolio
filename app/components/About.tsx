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
  viewport: { once: true },
  transition: { duration: 0.8 },
};

export const About = () => {
  return (
    <motion.section
      {...defaultMotionProps}
      id="about"
      className="max-w-6xl mt-20 mb-10 relative self-center space-y-5 px-5 mx-auto text-white"
    >
      <Title
        title="About"
        description="A glimpse into my life as a Software Engineer"
      />
      <div className="grid w-full gap-12 items-start justify-center md:grid-cols-3">
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
            </h2>
            <p className="text-sm bg-gradient-to-r from-neutral-700 via-neutral-500 to-neutral-700 text-transparent bg-clip-text bg-300% animate-shine font-medium">
              Crafting digital experiences with passion and purpose
            </p>
          </motion.div>

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
              My Daily Uses
            </h2>
          </motion.div>

          <motion.ul
            {...defaultMotionProps}
            transition={{ duration: 0.8, delay: 0.2 }}
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
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-2 mt-10"
          >
            <h2 className="md:text-5xl mb-4 text-3xl font-bold">
              Want to work together?
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

        <div className="px-5 md:sticky md:top-20 md:mt-14 transition-all duration-300">
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
    </motion.section>
  );
};
