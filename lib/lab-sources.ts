import {
  aboutIntro,
  aboutProfile,
  aboutProfileMetrics,
  aboutStoryEras,
  aboutStoryIntro,
  aboutWorkflowBeats,
  aboutWorkflowClosing,
  aboutWorkflowIntro,
  aboutWorkflowToolLink,
} from "./about";
import { getAllPosts } from "./blog";
import { cleanMarkdownSource } from "./lab-clean";
import {
  experienceDisciplines,
  experienceDisciplinesIntro,
  experienceIntro,
  experienceRoles,
} from "./experience";
import { projects, projectsIntro } from "./projects";

export type LabSourceDocument = {
  slug: string;
  sourceTitle: string;
  url: string;
  markdown: string;
};

/** Published portfolio content only — drafts are always skipped. */
export function collectLabSources(): LabSourceDocument[] {
  return [
    ...collectBlogSources(),
    collectAboutSource(),
    collectProjectsSource(),
    collectExperienceSource(),
  ];
}

function collectBlogSources(): LabSourceDocument[] {
  return getAllPosts()
    .filter((post) => !post.draft)
    .map((post) => ({
      slug: `blog-${post.slug}`,
      sourceTitle: post.title,
      url: `/blog/${post.slug}`,
      markdown: cleanMarkdownSource(
        [`## Summary`, post.description, "", post.content].join("\n"),
      ),
    }));
}

function collectAboutSource(): LabSourceDocument {
  const lines = [
    "## Profile",
    aboutIntro.description,
    aboutProfile.intent,
    aboutProfile.location,
    "",
    ...aboutProfileMetrics.map(
      (metric) => `- ${metric.label}: ${metric.value}`,
    ),
    "",
    `## ${aboutStoryIntro.title}`,
    ...aboutStoryEras.flatMap((era) => [
      `### ${era.title}`,
      `${era.label} · ${era.period}`,
      era.body,
      "",
    ]),
    `## ${aboutWorkflowIntro.title}`,
    aboutWorkflowIntro.description,
    "",
    `- ${aboutWorkflowToolLink.name}: ${aboutWorkflowToolLink.href}`,
    "",
    ...aboutWorkflowBeats.flatMap((beat) => [
      `### ${beat.title}`,
      beat.description,
      beat.footer,
      "",
    ]),
    aboutWorkflowClosing,
    "",
  ];

  return {
    slug: "about",
    sourceTitle: aboutIntro.title,
    url: "/about",
    markdown: cleanMarkdownSource(lines.join("\n")),
  };
}

function collectProjectsSource(): LabSourceDocument {
  const lines = [
    "## Overview",
    projectsIntro.description,
    "",
    ...projects.flatMap((project) => [
      `### ${project.title}`,
      `${project.tag} · ${project.year}`,
      project.summary,
      `Tools: ${project.tools.join(", ")}`,
      "",
    ]),
  ];

  return {
    slug: "projects",
    sourceTitle: projectsIntro.title,
    url: "/projects",
    markdown: cleanMarkdownSource(lines.join("\n")),
  };
}

function collectExperienceSource(): LabSourceDocument {
  const lines = [
    "## Overview",
    experienceIntro.description,
    "",
    ...experienceRoles.flatMap((role) => [
      `### ${role.title} at ${role.company}`,
      role.locationPeriod,
      role.summary,
      ...role.highlights.map((item) => `- ${item}`),
      `Stack: ${role.stack.join(", ")}`,
      "",
    ]),
    `## ${experienceDisciplinesIntro.title}`,
    "",
    ...experienceDisciplines.flatMap((discipline) => [
      `### ${discipline.title}`,
      discipline.description,
      discipline.footer,
      "",
    ]),
  ];

  return {
    slug: "experience",
    sourceTitle: experienceIntro.title,
    url: "/experience",
    markdown: cleanMarkdownSource(lines.join("\n")),
  };
}
