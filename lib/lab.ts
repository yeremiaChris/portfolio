export const labIntro = {
  description:
    "Grounded portfolio chat over Yeremia Chris Saragi’s experience, projects, and writing — with cited sources from this site.",
  emptyStateSummary:
    "It searches my experience, projects, and blog posts for relevant excerpts, then answers with source links when it can.",
} as const;

export const askYeremia = {
  id: "ask-yeremia",
  topBarEyebrow: "Lab · Ask Yeremia",
  title: "Ask Yeremia",
  newChatLabel: "New chat",
  greeting: "What would you like to know about Yeremia?",
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
  usageNotice:
    "Your messages are processed on the server to retrieve portfolio content and generate a reply. Usage is rate-limited per IP so the demo stays available for everyone.",
} as const;
