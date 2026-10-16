import type { ChatEvent, ChatTransport, Source } from "./lab-chat";
import { askYeremia } from "./lab";
import { DEFAULT_MODEL_ID, resolveAutoModel } from "./lab-models";

const cannedByQuestion: Record<string, { text: string; sources: Source[] }> = {
  "Has he worked in healthcare?": {
    text: "Yes. He built clinician-facing UI on PrimaKu, a pediatric health app, and shipped FHIR-based clinic flows plus AI-assisted clinical notes on Mazecare.",
    sources: [
      { id: 1, title: "Mazecare", url: "/projects#mazecare" },
      { id: 2, title: "PrimaKu", url: "/projects#primaku" },
    ],
  },
  "What's his tech stack?": {
    text: "His main frontend stack is Next.js, React 19, TypeScript, and Tailwind CSS.",
    sources: [{ id: 1, title: "Experience", url: "/experience" }],
  },
  "Tell me about Mazecare": {
    text: "On Mazecare, he shipped FHIR-based clinic flows and AI-assisted clinical notes for an EMR / HIS product.",
    sources: [{ id: 1, title: "Mazecare", url: "/projects#mazecare" }],
  },
  "What is he learning now?": {
    text: "He is currently learning RAG, embeddings, and AI agents — and documenting that journey in the Lab.",
    sources: [
      { id: 1, title: "Lab", url: "/lab" },
      { id: 2, title: "About", url: "/about" },
    ],
  },
};

export function createMockTransport(
  options: { delayMs?: number } = {},
): ChatTransport {
  const delayMs = options.delayMs ?? 28;

  return {
    async *send({ messages, modelId, signal }): AsyncIterable<ChatEvent> {
      signal.throwIfAborted();

      let question = "";
      for (let i = messages.length - 1; i >= 0; i--) {
        const message = messages[i];
        if (message?.role === "user") {
          question = message.content.trim();
          break;
        }
      }

      if (question === "__mock_error__") {
        throw new Error("Mock responder error");
      }

      let resolvedModelId = modelId;
      if (modelId === DEFAULT_MODEL_ID) {
        const resolved = resolveAutoModel();
        if (!resolved) {
          throw new Error("No enabled model available for Auto");
        }
        resolvedModelId = resolved;
      }
      yield { type: "model", modelId: resolvedModelId };

      const canned = cannedByQuestion[question];
      const text = canned?.text ?? askYeremia.refusalMessage;
      const sources = canned?.sources ?? [];

      for (const part of text.split(/(\s+)/).filter((p) => p.length > 0)) {
        signal.throwIfAborted();
        if (delayMs > 0) {
          await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
        signal.throwIfAborted();
        yield { type: "token", text: part };
      }

      if (sources.length > 0) {
        yield { type: "sources", sources };
      }

      yield { type: "done" };
    },
  };
}

export const mockTransport: ChatTransport = createMockTransport();
