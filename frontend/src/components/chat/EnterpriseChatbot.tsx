// Purpose: Provides a polished floating AI concierge that answers general
// questions plus tourism, booking, admin, user, and platform-help questions.
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Bot, Loader2, MessageCircle, Send, Trash2, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { askConciergeWithHistory, type ChatMessage } from "../../api/chatApi";
import { useAuth } from "../../auth/AuthProvider";

const welcomeMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Welcome to Mzansi Grand Tour. I am your AI concierge for South Africa travel.\n\nTell me what you need: safari, Cape Town, Garden Route, wine country, bookings, cancellations, or help using your account."
};

export function EnterpriseChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAuth();
  const location = useLocation();

  const context = useMemo(
    () => ({
      path: location.pathname,
      role: user?.role
    }),
    [location.pathname, user?.role]
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isSending]);

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
      const answer = await askConciergeWithHistory(content, context, [...messages, userMessage]);
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

  function clearChat() {
    setMessages([{ ...welcomeMessage, id: crypto.randomUUID() }]);
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
                <small>South Africa travel and platform assistant</small>
              </span>
            </div>
            <div className="chatbot-header-actions">
              <button className="chatbot-clear-button" type="button" aria-label="Clear chat messages" onClick={clearChat}>
                <Trash2 size={16} />
                Clear
              </button>
              <button type="button" aria-label="Close chat" title="Close chat" onClick={() => setIsOpen(false)}>
                <X size={18} />
              </button>
            </div>
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
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit}>
            <input name="message" placeholder="Ask about South Africa travel, bookings, or your account..." autoComplete="off" />
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
