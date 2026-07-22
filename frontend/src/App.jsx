import LandingPage from "./pages/LandingPage";
import { useState } from "react";
import ChatArea from "./components/chat/ChatArea";
import ChatInput from "./components/chat/ChatInput";
import ChatLayout from "./components/layout/ChatLayout";
import { useLanguage } from "./context/LanguageContext";
import { sendMessage } from "./services/chatService";

export default function App() {
  const { language } = useLanguage();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);

  async function handleSend(text) {
    if (!text.trim()) return;

    const userMessage = {
      role: "user",
      content: text,
      time: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await sendMessage(text, language);

      const assistantIndex = messages.length + 1;

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "",
          sources: response.sources,
          streaming: true,
          time: new Date(),
        },
      ]);

      const fullText = response.answer;

      let current = "";

      for (const char of fullText) {
        current += char;

        await new Promise((resolve) =>
          setTimeout(resolve, 12)
        );

        setMessages((prev) => {
          const updated = [...prev];

          updated[assistantIndex] = {
            ...updated[assistantIndex],
            content: current,
          };

          return updated;
        });
      }

      // Final update after streaming finishes
      setMessages((prev) => {
        const updated = [...prev];

        updated[assistantIndex] = {
          ...updated[assistantIndex],
          content: fullText,
          streaming: false,
        };

        return updated;
      });

      setLoading(false);

    } catch {
      setLoading(false);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Unable to contact server.",
          streaming: false,
        },
      ]);
    }
  }

  if (!started) {
    return (
      <LandingPage
        onStart={() => setStarted(true)}
      />
    );
  }

  return (
    <ChatLayout>
      <ChatArea
        messages={messages}
        loading={loading}
        onQuestion={handleSend}
        onRegenerate={handleSend}
      />

      <ChatInput
        onSend={handleSend}
      />
    </ChatLayout>
  );
}