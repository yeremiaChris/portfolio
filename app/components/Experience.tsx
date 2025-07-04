"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Title } from "./ui/Title";

const defaultMotionProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: {
    duration: 0.6,
    ease: [0.4, 0, 0.2, 1],
  },
} as const;

interface ExperienceItemProps {
  date: string;
  title: string;
  company: {
    name: string;
    url: string;
  };
  location: string;
  description: string;
  responsibilities: string[];
}

const ExperienceItem = ({
  date,
  title,
  company,
  location,
  description,
  responsibilities,
  index,
}: ExperienceItemProps & { index: number }) => (
  <motion.div
    {...defaultMotionProps}
    transition={{
      duration: 0.6,
      delay: 0.3 + index * 0.2, // Staggered animation for each experience
    }}
    className="flex flex-col md:grid md:grid-cols-4 gap-5 md:gap-10"
  >
    <motion.div
      {...defaultMotionProps}
      transition={{
        duration: 0.6,
        delay: 0.4 + index * 0.2,
      }}
      className="md:col-span-1"
    >
      <h2 className="text-neutral-500 uppercase text-sm font-medium">{date}</h2>
    </motion.div>
    <motion.div
      {...defaultMotionProps}
      transition={{
        duration: 0.6,
        delay: 0.5 + index * 0.2,
      }}
      className="col-span-3"
    >
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="flex gap-1 items-start text-neutral-500">
        <Link
          href={company.url}
          target="_blank"
          className="text-blue-400 underline hover:text-blue-300 transition-colors duration-200"
        >
          {company.name}
        </Link>
        <span>-</span>
        <span>{location}</span>
      </div>
      <p className="mt-2 text-white text-sm leading-relaxed">{description}</p>

      <div className="mt-5 space-y-3 [&>ul]:list-disc [&>ul]:list-outside [&>ul]:space-y-1.5 [&>ul]:pl-3">
        <ul className="space-y-3 text-white text-sm">
          {responsibilities.map((responsibility, respIndex) => (
            <motion.li
              key={respIndex}
              {...defaultMotionProps}
              transition={{
                duration: 0.5,
                delay: 0.6 + index * 0.2 + respIndex * 0.1, // Staggered within each experience
              }}
              className="leading-relaxed"
            >
              {responsibility}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  </motion.div>
);

export const Experience = () => {
  const experiences: ExperienceItemProps[] = [
    {
      date: "Dec 2022 — PRESENT",
      title: "Frontend Web Developer",
      company: {
        name: "PrimaKu",
        url: "https://primaku.com",
      },
      location: "Jakarta, Indonesia, Remote",
      description:
        "PT Cipta Medika Informasi (PrimaKu) is a company focused on children's healthcare services, collaborating exclusively with the Indonesian Pediatric Society (IDAI). Through technology, PrimaKu supports parents and pediatricians in monitoring children's growth and health. Dr. Piprim Basarah Yanuarso, Chairman of IDAI, endorses this initiative as it helps expand access to children's healthcare across Indonesia.",
      responsibilities: [
        "Led development of multiple web applications using React.js and Next.js, ensuring high performance and maintainability",
        "Implemented pixel-perfect UI components from Figma designs while maintaining responsive design principles",
        "Integrated RESTful APIs and third-party services to create seamless user experiences",
        "Collaborated effectively in an agile team environment, participating in code reviews and technical discussions",
        "Actively participated in agile ceremonies including sprint planning, daily standups, and retrospectives using both Scrum and Kanban methodologies",
      ],
    },
    {
      date: "Jan 2023 — Apr 2024",
      title: "Frontend Web Developer",
      company: {
        name: "KiriminAja",
        url: "https://kiriminaja.com",
      },
      location: "Yogyakarta, Indonesia, Onsite",
      description:
        "PT Selalu Siap Solusi (KiriminAja) is a logistics technology company specializing in shipping service aggregation. Based in Yogyakarta, KiriminAja provides efficient and effective delivery solutions for businesses, including regular, instant, cargo, and bulk shipments. With mobile and web platforms, KiriminAja simplifies logistics management, helping businesses optimize their shipping processes.",
      responsibilities: [
        "Led development of multiple web applications using VueJS and NuxtJS, ensuring high performance and maintainability",
        "Implemented pixel-perfect UI components from Figma designs while maintaining responsive design principles",
        "Integrated RESTful APIs and third-party services to create seamless user experiences",
        "Collaborated effectively in an agile team environment, participating in code reviews and technical discussions",
        "Actively participated in agile ceremonies including sprint planning, daily standups, and retrospectives using both Scrum and Kanban methodologies",
      ],
    },
    {
      date: "Jan 2022 — May 2023",
      title: "Frontend Web Developer",
      company: {
        name: "iCreativeLabs",
        url: "https://icreativelabs.com/",
      },
      location: "Bandung, Indonesia, Hybrid",
      description:
        "PT Idekreatif Menusa Teknologi (iCreativeLabs) is a digital transformation company that bridges business vision with innovative technology. With over 13 years of experience, we have completed 150+ projects for 70+ clients, delivering impactful IT solutions. Committed to excellence, innovation, and customer satisfaction, we help businesses grow through cutting-edge digital strategies.",
      responsibilities: [
        "Led development of multiple web applications using React.js, VueJs, Next.js, NuxtJs, React Native, ensuring high performance and maintainability",
        "Implemented pixel-perfect UI components from Figma designs while maintaining responsive design principles",
        "Integrated RESTful APIs and third-party services to create seamless user experiences",
        "Collaborated effectively in an agile team environment, participating in code reviews and technical discussions",
      ],
    },
  ];

  return (
    <motion.section
      {...defaultMotionProps}
      id="experience"
      className="text-white relative max-w-6xl mx-auto px-5 pb-10 pt-20 mb-10"
    >
      <Title
        title="Experience"
        description="Showcasing my professional journey"
      />

      <motion.div
        {...defaultMotionProps}
        transition={{
          duration: 0.6,
          delay: 0.3, // Start after title animation
        }}
        className="space-y-14"
      >
        {experiences.map((experience, index) => (
          <ExperienceItem
            key={experience.company.name}
            {...experience}
            index={index}
          />
        ))}
      </motion.div>
    </motion.section>
  );
};
