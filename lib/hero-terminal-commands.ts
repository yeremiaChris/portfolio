import { aboutIntro } from "@/lib/about";
import { heroCtas } from "@/lib/hero";
import { site } from "@/lib/site";

export const HERO_TERMINAL_COMMAND_NAMES = [
  "help",
  "about",
  "projects",
  "contact",
  "clear",
] as const;

export type HeroTerminalCommandName =
  (typeof HERO_TERMINAL_COMMAND_NAMES)[number];

export type TerminalSegment =
  | { kind: "text"; text: string }
  | { kind: "link"; href: string; label: string };

export type HeroTerminalCommandResult =
  | { kind: "clear" }
  | { kind: "unknown"; command: string }
  | { kind: "output"; lines: TerminalSegment[][] };

export function parseHeroTerminalCommand(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) {
    return "";
  }
  return trimmed.toLowerCase().split(/\s+/)[0] ?? "";
}

export function runHeroTerminalCommand(raw: string): HeroTerminalCommandResult {
  const command = parseHeroTerminalCommand(raw);
  if (!command) {
    return { kind: "unknown", command: "" };
  }

  switch (command) {
    case "clear":
      return { kind: "clear" };
    case "help":
      return {
        kind: "output",
        lines: [
          [{ kind: "text", text: "Available commands:" }],
          [{ kind: "text", text: "  help     — list commands" }],
          [{ kind: "text", text: "  about    — short bio" }],
          [{ kind: "text", text: "  projects — selected work" }],
          [{ kind: "text", text: "  contact  — reach me" }],
          [{ kind: "text", text: "  clear    — reset terminal" }],
        ],
      };
    case "about":
      return {
        kind: "output",
        lines: [[{ kind: "text", text: aboutIntro.description }]],
      };
    case "projects":
      return {
        kind: "output",
        lines: site.proof.map((item) => [
          { kind: "text", text: "• " },
          { kind: "link", href: item.href, label: item.label },
          { kind: "text", text: ` — ${item.meta}` },
        ]),
      };
    case "contact":
      return {
        kind: "output",
        lines: [
          [{ kind: "text", text: site.availability }],
          [
            { kind: "text", text: "Email: " },
            {
              kind: "link",
              href: heroCtas.primary.href,
              label: site.links.emailLabel,
            },
          ],
          [
            { kind: "text", text: "WhatsApp: " },
            {
              kind: "link",
              href: site.links.whatsapp,
              label: site.links.whatsappLabel,
            },
          ],
          [
            { kind: "text", text: "LinkedIn: " },
            {
              kind: "link",
              href: site.links.linkedin,
              label: "yeremia-chris-saragi",
            },
          ],
          [
            { kind: "text", text: "CV: " },
            { kind: "link", href: heroCtas.resume.href, label: "CV (PDF)" },
          ],
        ],
      };
    default:
      return { kind: "unknown", command };
  }
}

export function formatUnknownCommand(command: string): TerminalSegment[][] {
  const label = command || "∅";
  return [
    [
      {
        kind: "text",
        text: `Command not found: "${label}". Type "help" for commands.`,
      },
    ],
  ];
}
