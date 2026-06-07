// Purpose: Provides a polished floating AI concierge that answers tourism,
// booking, admin, user, and platform-help questions from any route.
import { FormEvent, useMemo, useState } from "react";
import { Bot, Loader2, MessageCircle, Send, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { askConcierge, type ChatMessage } from "../../api/chatApi";
import { useAuth } from "../../auth/AuthProvider";

const starterPrompts = [
  "Help me choose between Cape Town and Kruger",
  "How do I create or cancel a booking?",
  "What can an admin see?",
  "What does MongoDB store here?"
];

export function EnterpriseChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi, I am Mzansi Concierge. I can help with South Africa trips, bookings, cancellations, admin dashboards, user accounts, and how this platform works."
    }
  ]);
  const { user } = useAuth();
  const location = useLocation();

  const context = useMemo(
    () => ({
      path: location.pathname,
      role: user?.role
    }),
    [location.pathname, user?.role]
  );

  async function sendMessage(content: string) {
    if (!content.trim()) {
      return;
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content
    };

    setMessages((current) => [...current, userMessage]);
    setIsSending(true);

    try {
      const answer = await askConcierge(content, context);
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: answer
        }
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: error instanceof Error ? error.message : "I could not respond right now."
        }
      ]);
    } finally {
      setIsSending(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const content = String(form.get("message") || "");
    event.currentTarget.reset();
    void sendMessage(content);
  }

  return (
    <div className="chatbot">
      {isOpen && (
        <section className="chatbot-panel" aria-label="Mzansi Concierge AI assistant">
          <header>
            <div>
              <Bot size={20} />
              <span>
                <strong>Mzansi Concierge</strong>
                <small>AI travel and platform help</small>
              </span>
            </div>
            <button type="button" aria-label="Close chat" onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </header>
          <div className="chatbot-messages">
            {messages.map((message) => (
              <article key={message.id} className={`chatbot-message ${message.role}`}>
                {message.content}
              </article>
            ))}
            {isSending && (
              <article className="chatbot-message assistant">
                <Loader2 className="spin" size={16} />
                Thinking...
              </article>
            )}
          </div>
          <div className="chatbot-prompts">
            {starterPrompts.map((prompt) => (
              <button key={prompt} type="button" onClick={() => sendMessage(prompt)}>
                {prompt}
              </button>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <input name="message" placeholder="Ask about trips, bookings, admin, MongoDB..." autoComplete="off" />
            <button type="submit" aria-label="Send chat message">
              <Send size={17} />
            </button>
          </form>
        </section>
      )}
      <button className="chatbot-launcher" type="button" onClick={() => setIsOpen((current) => !current)}>
        <MessageCircle size={22} />
        AI help
      </button>
    </div>
  );
}
