import type { SimpleIcon } from "simple-icons";
import {
  siCloudflare,
  siCypress,
  siDocker,
  siGithubactions,
  siGo,
  siGraphql,
  siHeroui,
  siMysql,
  siNestjs,
  siNetlify,
  siNodedotjs,
  siReact,
  siReacthookform,
  siRedux,
  siShadcnui,
  siSqlite,
  siSupabase,
  siTailwindcss,
  siTanstack,
  siTypescript,
  siVercel,
  siVuedotjs,
} from "simple-icons";

export const coreToolIcons: Record<string, SimpleIcon> = {
  "react-next": siReact,
  "vue-nuxt": siVuedotjs,
  typescript: siTypescript,
  tailwind: siTailwindcss,
  apis: siGraphql,
};

const chipIconByLabel: Partial<Record<string, SimpleIcon>> = {
  Redux: siRedux,
  "Zustand / TanStack Query": siTanstack,
  "React Hook Form": siReacthookform,
  "shadcn/ui": siShadcnui,
  HeroUI: siHeroui,
  NestJS: siNestjs,
  "Node.js": siNodedotjs,
  Go: siGo,
  MySQL: siMysql,
  SQLite: siSqlite,
  Supabase: siSupabase,
  Docker: siDocker,
  "GitHub Actions CI/CD": siGithubactions,
  Cypress: siCypress,
  Vercel: siVercel,
  Netlify: siNetlify,
  "Cloudflare Edge": siCloudflare,
};

export function getCoreToolIcon(toolId: string): SimpleIcon | null {
  return coreToolIcons[toolId] ?? null;
}

export function getTechChipIcon(label: string): SimpleIcon | null {
  return chipIconByLabel[label] ?? null;
}
