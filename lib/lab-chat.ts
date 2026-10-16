export interface Source {
  id: number;
  title: string;
  url: string;
}

export type MessageStatus =
  "thinking" | "streaming" | "done" | "error" | "stopped";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  modelId?: string;
  status: MessageStatus;
}

export type ChatEvent =
  | { type: "model"; modelId: string }
  | { type: "token"; text: string }
  | { type: "sources"; sources: Source[] }
  | { type: "done" };

export interface ChatTransport {
  send(input: {
    messages: Message[];
    modelId: string;
    signal: AbortSignal;
  }): AsyncIterable<ChatEvent>;
}

/**
 * Trim the trailing assistant turn(s) and the last user message so a new
 * assistant run can replay that question (retry error or regenerate).
 */
export function historyForRegenerate(
  messages: Message[],
): { history: Message[]; question: string } | null {
  const history = [...messages];

  while (
    history.length > 0 &&
    history[history.length - 1]?.role === "assistant"
  ) {
    history.pop();
  }

  const lastUser = history[history.length - 1];
  if (!lastUser || lastUser.role !== "user") return null;

  history.pop();
  return { history, question: lastUser.content };
}
