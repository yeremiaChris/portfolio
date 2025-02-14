"use client";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

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
}

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

export const Projects = () => {
  const projects: ProjectItemProps[] = [
    {
      title: "Parenthood Institute",
      description:
        "Parenthood Institute is an annual program by PrimaKu designed to support parents in their child's growth and development. It offers free classes (Regular Class) and exclusive paid classes (SuperClass) with trusted doctors. In addition to learning, participants can also win exciting prizes such as cash, vouchers, and children's product hampers by collecting points!",
      tools: "NextJs, NextUi, Typescript, Swiper, React Hook Form, Valibot",
      imageSrc: "/projects/parenthood.jpg",
      imageAlt: "parenthood",
      link: "https://www.primaku.com/parenthood-institute",
    },
    {
      title: "PrimaCare",
      description:
        "PrimaCare.ai is a comprehensive clinic management application from PrimaKu, designed to streamline medical records and administrative processes. It integrates seamlessly with SatuSehat, ensuring compliance with Indonesian healthcare regulations. With a web-based platform, PrimaCare eliminates maintenance costs and offers regular updates. Ideal for clinics and independent practices, it provides user-friendly access for doctors, front-office staff, and management, supporting patient data migration and training.",
      tools: "NextJs, NextUi, Typescript, React Hook Form, Valibot",
      imageSrc: "/projects/primacare.jpg",
      imageAlt: "primacare",
      link: "https://www.primacare.ai",
    },
    {
      title: "KiriminAja",
      description:
        "KiriminAja is a shipping aggregator platform that helps businesses manage logistics more easily and cost-effectively. The KiriminAja app supports regular, instant, cargo, and bulk shipments, along with additional services such as fulfillment and warehousing. Available on mobile apps and a web dashboard, KiriminAja has been trusted by over 200,000 users.",
      tools: "NuxtJs, Typescript, Swiper, GrapesJs, Firebase",
      imageSrc: "/projects/kiriminaja.jpg",
      imageAlt: "kiriminaja",
      link: "https://app.kiriminaja.com",
    },
    {
      title: "Flou Cloud",
      description:
        "Flou Cloud's landing page showcases its locally-owned cloud services, offering high-performance and secure solutions for businesses. The page is fully customizable with a CMS, allowing complete control over content, including new pages and custom menus.",
      tools: "NuxtJs, TailwindCss",
      imageSrc: "/projects/floucloud.jpg",
      imageAlt: "floucloud",
      link: "https://www.floucloud.id",
    },
  ];

  return (
    <section
      id="projects"
      className="text-white mt-10 max-w-6xl mx-auto px-5 pb-10 scroll-mt-24"
    >
      <motion.div
        {...defaultMotionProps}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-8 space-y-2"
      >
        <h2 className="md:text-5xl text-3xl font-bold">
          Proje<span className="text-green-400">cts</span>
        </h2>

        <p className="text-sm bg-gradient-to-r from-neutral-700 via-neutral-500 to-neutral-700 text-transparent bg-clip-text bg-300% animate-shine font-medium">
          Showcasing my featured projects and work
        </p>
      </motion.div>

      <div className="space-y-14">
        {projects.map((project, index) => (
          <ProjectItem key={project.title} {...project} index={index} />
        ))}
      </div>
    </section>
  );
};
