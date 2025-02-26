"use client";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink } from "lucide-react";
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
import { Title } from "./ui/Title";

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
  year: number;
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
        <CardDescription title={props.description} className="text-white">
          {props.description}
        </CardDescription>
      </CardContent>

      <CardFooter className="px-0 pb-3 mt-1 items-center flex justify-between">
        <div className="flex items-center gap-3">
          <Calendar width={15} />#{props.year}
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
      "An annual program by PrimaKu that supports parents with free and paid classes from trusted doctors, plus opportunities to win prizes like cash, vouchers, and children's product hampers through point collection.",
    tools: "NextJs, NextUi, Typescript, Swiper, React Hook Form, Valibot",
    imageSrc: "/projects/parenthood.jpg",
    imageAlt: "parenthood",
    link: "https://www.primaku.com/parenthood-institute",
    badge: "work",
    year: 2025,
  },
  {
    title: "PrimaCare",
    description:
      "PrimaCare.ai is a web-based clinic management app from PrimaKu that simplifies medical records, integrates with SatuSehat for compliance, and provides easy access for doctors and staff with no maintenance costs and regular updates.",
    tools: "NextJs, NextUi, Typescript, React Hook Form, Valibot",
    imageSrc: "/projects/primacare.jpg",
    imageAlt: "primacare",
    link: "https://www.primacare.ai",
    badge: "work",
    year: 2024,
  },
  {
    title: "BuildingBots AI (Agigtech)",
    description:
      "This is the official landing page for BuildingBots.AI, a software agency offering tailored AI solutions to transform businesses, showcasing their mission, vision, values, and expertise in cutting-edge AI technologies and digital services.",
    tools: "NuxtJs, Supabase, TailwindCss, NuxtUI",
    imageSrc: "/projects/buildingbots.png",
    imageAlt: "building bots",
    link: "https://buildingbots.ai",
    badge: "work",
    year: 2024,
  },
  {
    title: "KiriminAja",
    description:
      "KiriminAja is a shipping aggregator platform that simplifies logistics for businesses, offering regular, instant, cargo, and bulk shipments, plus fulfillment and warehousing, trusted by over 200,000 users with mobile and web access.",
    tools: "NuxtJs, Typescript, Swiper, GrapesJs, Firebase",
    imageSrc: "/projects/kiriminaja.jpg",
    imageAlt: "kiriminaja",
    link: "https://app.kiriminaja.com",
    badge: "work",
    year: 2023,
  },
  {
    title: "CDIC",
    description:
      "CDIC makes managing your child's health easy, with a webview app that tracks diabetes using Accu Check, connecting your device for a detailed health diary. Simplify pediatric care today.",
    tools: "NuxtJs, TailwindCss",
    imageSrc: "/projects/cdic.jpg",
    imageAlt: "dashboard-purity",
    link: "",
    badge: "work",
    year: 2023,
  },
  {
    title: "Flou Cloud",
    description:
      "Flou Cloud's landing page highlights its locally-owned, high-performance, and secure cloud services for businesses, with a customizable CMS for full control over content, pages, and menus.",
    tools: "NuxtJs, TailwindCss",
    imageSrc: "/projects/floucloud.jpg",
    imageAlt: "floucloud",
    link: "https://www.floucloud.id",
    badge: "work",
    year: 2023,
  },
  {
    title: "Telkom Infra",
    description:
      "Telkom Infra, a top Telkom subsidiary, provides telecom infrastructure services and outsourcing solutions to improve operations and customer experience, with a customizable CMS landing page showcasing its vision, values, and contact info.",
    tools: "NuxtJs, TailwindCss",
    imageSrc: "/projects/telkom-infra.png",
    imageAlt: "telkom-infra",
    link: "https://telkominfra.co.id",
    badge: "work",
    year: 2022,
  },

  {
    title: "Dashboard Purity",
    description:
      "A site built with Nuxt.js and Tailwind CSS, featuring a stylish, pixel-perfect dashboard UI with charts and summaries for a seamless user experience.",
    tools: "NuxtJs, TailwindCss",
    imageSrc: "/projects/dashboard-purity.png",
    imageAlt: "dashboard-purity",
    link: "https://slicing-ui-purity.netlify.app/",
    badge: "personal",
    year: 2022,
  },
];

export const Projects = () => {
  return (
    <section
      id="projects"
      className="text-white relative mt-20 max-w-6xl mx-auto px-5 pb-10"
    >
      <Title
        title="Projects"
        description="Showcasing my featured projects and work"
      />

      <div className="grid md:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <ProjectItemV2 key={project.title} {...project} index={index} />
        ))}
      </div>
    </section>
  );
};
