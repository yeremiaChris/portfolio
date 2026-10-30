export const labIntro = {
  description:
    "Ask Yeremia is a grounded chat over this portfolio — experience, projects, and writing — with cited sources.",
} as const;

/** Home-page promo linking to /lab. */
export const labHomeCta = {
  id: "ask-yeremia",
  href: "/lab",
  eyebrow: "Lab · Ask Yeremia",
  title: "Ask my portfolio anything",
  description:
    "Grounded answers over experience, projects, and writing — with cited sources.",
  ctaLabel: "Ask Yeremia",
} as const;

export const askYeremia = {
  id: "ask-yeremia",
  topBarEyebrow: "Lab · Ask Yeremia",
  title: "Ask Yeremia",
  newChatLabel: "New chat",
  greeting: "What would you like to know about Yeremia?",
  greetingSubline:
    "Ask about experience, projects, stack, or what I’m learning.",
  placeholder: "Ask anything about Yeremia...",
  sendLabel: "Send",
  stopLabel: "Stop",
  copyLabel: "Copy",
  copiedLabel: "Copied",
  regenerateLabel: "Regenerate",
  thinkingLabel: "thinking...",
  stoppedLabel: "Stopped",
  retryLabel: "Retry",
  charLimit: 500,
  suggestions: [
    "Has he worked in healthcare?",
    "What's his tech stack?",
    "Tell me about Mazecare",
    "What is he learning now?",
  ],
  errorMessage: "Something went wrong. You can retry that question.",
  refusalMessage:
    "I don't have that in my portfolio yet. Feel free to contact me directly!",
  disclaimer: "AI answers from my portfolio content and can make mistakes.",
} as const;
