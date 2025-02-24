"use client";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink, Home } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const defaultMotionProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

const contentAnimationProps = {
  initial: { opacity: 0, x: -20 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay: 0.4 },
};

const imageAnimationProps = {
  initial: { opacity: 0, x: 20 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay: 0.4 },
};

interface ProjectItemProps {
  title: string;
  description: string;
  tools: string;
  imageSrc: string;
  imageAlt: string;
  link: string;
  badge: string;
}

// depricated
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProjectItem = ({
  title,
  description,
  tools,
  imageSrc,
  imageAlt,
  link,
  index,
}: ProjectItemProps & { index?: number }) => {
  const isEven = (index ?? 0) % 2 === 0;

  return (
    <div className="grid grid-cols-1 border border-dashed rounded-xl p-5 border-neutral-700 justify-center md:grid-cols-2 gap-10">
      {/* Mobile Image (always shows on top for mobile) */}
      <motion.div
        {...imageAnimationProps}
        className="relative rounded-lg border border-neutral-900 border-dashed overflow-hidden w-full h-72 md:hidden"
      >
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
      </motion.div>

      {/* Desktop Layout - Conditionally order content and image */}
      {isEven ? (
        <>
          <motion.div {...contentAnimationProps} className="space-y-5">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-sm text-white">{description}</p>
            <p className="text-neutral-400 text-sm">Tools: {tools}</p>
            <Button asChild>
              <Link href={link} target="_blank">
                View Project <ExternalLink />
              </Link>
            </Button>
          </motion.div>
          <motion.div
            {...imageAnimationProps}
            style={{
              aspectRatio: "2.8 / 1",
            }}
            className="hidden md:block relative rounded-lg overflow-hidden w-full h-full group border border-neutral-900 hover:border-green-400/50 transition-colors duration-300"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="transition-all duration-300 brightness-90 group-hover:brightness-110 group-hover:contrast-110 group-hover:scale-105"
            />
          </motion.div>
        </>
      ) : (
        <>
          <motion.div
            {...imageAnimationProps}
            style={{
              aspectRatio: "2.8 / 1",
            }}
            className="hidden md:block relative rounded-lg overflow-hidden w-full h-full group border border-neutral-900 hover:border-green-400/50 transition-colors duration-300"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="transition-all duration-300 brightness-90 group-hover:brightness-110 group-hover:contrast-110 group-hover:scale-105"
            />
          </motion.div>
          <motion.div {...contentAnimationProps} className="space-y-5">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-sm text-white">{description}</p>
            <p className="text-neutral-400 text-sm">Tool: {tools}</p>
            <Button asChild>
              <Link href={link} target="_blank">
                View Project <ExternalLink />
              </Link>
            </Button>
          </motion.div>
        </>
      )}
    </div>
  );
};

const ProjectItemV2 = (props: ProjectItemProps & { index?: number }) => {
  return (
    <Card className="bg-transparent rounded-2xl p-0 text-white border-none overflow-hidden">
      <CardHeader className="p-3 rounded-2xl bg-neutral-900">
        <Link
          href={props.link}
          className="relative hover:scale-110 transition-all duration-300 h-44 overflow-hidden"
        >
          <Image
            src={props.imageSrc}
            fill
            alt={props.imageAlt}
            className={cn(
              "rounded-lg transition-all duration-300 brightness-90 group-hover:brightness-110 group-hover:contrast-110 group-hover:scale-105",
              props?.title?.toLowerCase() === "cdic" && "object-contain"
            )}
          />
        </Link>
      </CardHeader>

      <CardContent className="px-0 mt-3 space-y-2 pb-3">
        <CardTitle className="text-lg space-x-3">
          <span>{props.title}</span>
          <Badge className="text-white" variant="outline">
            #{props.badge}
          </Badge>
        </CardTitle>
        <CardDescription
          title={props.description}
          className="text-white line-clamp-3"
        >
          {props.description}
        </CardDescription>
      </CardContent>

      <CardFooter className="px-0 pb-3 mt-1 items-center flex justify-between">
        <div className="flex items-center gap-3">
          <Calendar width={15} />
          #2025
        </div>
        {props.link ? (
          <Button asChild>
            <Link href={props.link} target="_blank">
              Open Site <ExternalLink />
            </Link>
          </Button>
        ) : (
          <Link
            className="border-b"
            href="https://play.google.com/store/apps/details?id=com.primaku.app&hl=id"
            target="_blank"
          >
            Webview
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};
const projects: ProjectItemProps[] = [
  {
    title: "Parenthood Institute",
    description:
      "Parenthood Institute is an annual program by PrimaKu designed to support parents in their child's growth and development. It offers free classes (Regular Class) and exclusive paid classes (SuperClass) with trusted doctors. In addition to learning, participants can also win exciting prizes such as cash, vouchers, and children's product hampers by collecting points!",
    tools: "NextJs, NextUi, Typescript, Swiper, React Hook Form, Valibot",
    imageSrc: "/projects/parenthood.jpg",
    imageAlt: "parenthood",
    link: "https://www.primaku.com/parenthood-institute",
    badge: "work",
  },
  {
    title: "PrimaCare",
    description:
      "PrimaCare.ai is a comprehensive clinic management application from PrimaKu, designed to streamline medical records and administrative processes. It integrates seamlessly with SatuSehat, ensuring compliance with Indonesian healthcare regulations. With a web-based platform, PrimaCare eliminates maintenance costs and offers regular updates. Ideal for clinics and independent practices, it provides user-friendly access for doctors, front-office staff, and management, supporting patient data migration and training.",
    tools: "NextJs, NextUi, Typescript, React Hook Form, Valibot",
    imageSrc: "/projects/primacare.jpg",
    imageAlt: "primacare",
    link: "https://www.primacare.ai",
    badge: "work",
  },
  {
    title: "KiriminAja",
    description:
      "KiriminAja is a shipping aggregator platform that helps businesses manage logistics more easily and cost-effectively. The KiriminAja app supports regular, instant, cargo, and bulk shipments, along with additional services such as fulfillment and warehousing. Available on mobile apps and a web dashboard, KiriminAja has been trusted by over 200,000 users.",
    tools: "NuxtJs, Typescript, Swiper, GrapesJs, Firebase",
    imageSrc: "/projects/kiriminaja.jpg",
    imageAlt: "kiriminaja",
    link: "https://app.kiriminaja.com",
    badge: "work",
  },
  {
    title: "Flou Cloud",
    description:
      "Flou Cloud's landing page showcases its locally-owned cloud services, offering high-performance and secure solutions for businesses. The page is fully customizable with a CMS, allowing complete control over content, including new pages and custom menus.",
    tools: "NuxtJs, TailwindCss",
    imageSrc: "/projects/floucloud.jpg",
    imageAlt: "floucloud",
    link: "https://www.floucloud.id",
    badge: "work",
  },
  {
    title: "Dashboard Purity",
    description:
      "I developed this site using Nuxt.js and Tailwind CSS. It features a variety of aesthetically pleasing user interfaces for dashboard utilities, including charts and summaries. The dashboard UI is meticulously sliced from design to code, ensuring pixel-perfect implementation and a seamless user experience.",
    tools: "NuxtJs, TailwindCss",
    imageSrc: "/projects/dashboard-purity.png",
    imageAlt: "dashboard-purity",
    link: "https://slicing-ui-purity.netlify.app/",
    badge: "personal",
  },
  {
    title: "CDIC",
    description:
      "With CDIC, managing your child's health is easier than ever. The webview app lets you track diabetes using the Accu Check feature, connecting your device to keep a detailed health diary. Simplify pediatric care with CDIC today.",
    tools: "NuxtJs, TailwindCss",
    imageSrc: "/projects/cdic.jpg",
    imageAlt: "dashboard-purity",
    link: "",
    badge: "work",
  },
];

export const Projects = () => {
  return (
    <section
      id="projects"
      className="text-white relative mt-20 max-w-6xl mx-auto px-5 pb-10 scroll-mt-24"
    >
      <motion.div
        {...defaultMotionProps}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-8 space-y-2"
      >
        <Button size="sm" asChild>
          <Link href="/">
            <Home />
            Home
          </Link>
        </Button>
        <h2 className="md:text-5xl text-3xl font-bold">
          Proje<span className="text-green-400">cts</span>
        </h2>

        <p className="text-sm bg-gradient-to-r from-neutral-700 via-neutral-500 to-neutral-700 text-transparent bg-clip-text bg-300% animate-shine font-medium">
          Showcasing my featured projects and work
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <ProjectItemV2 key={project.title} {...project} index={index} />
        ))}
      </div>
    </section>
  );
};
