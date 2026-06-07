// Purpose: Calls the backend AI concierge endpoint without exposing the OpenAI
// API key to the browser.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
}

interface ChatResponse {
  data: {
    answer: string;
    mode: "openai" | "local-fallback";
  };
}

export async function askConcierge(message: string, context: { path: string; role?: string }): Promise<string> {
  return askConciergeWithHistory(message, context, []);
}

export async function askConciergeWithHistory(
  message: string,
  context: { path: string; role?: string },
  messages: ChatMessage[]
): Promise<string> {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      context,
      messages: messages.slice(-8).map((item) => ({
        role: item.role,
        content: item.content
      }))
    })
  });

  if (!response.ok) {
    throw new Error("The AI concierge could not respond right now.");
  }

  const payload = (await response.json()) as ChatResponse;
  return payload.data.answer;
}
