import { useEffect, useRef } from "react";
import WelcomeScreen from "./WelcomeScreen";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

export default function ChatArea({
  messages,
  loading,
  onQuestion,
  onRegenerate,
}) {
  const bottomRef = useRef(null);
  const previousLength = useRef(0);

  useEffect(() => {
    // Only scroll when a NEW message is added
    if (messages.length !== previousLength.current) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });

      previousLength.current = messages.length;
    }
  }, [messages]);

  useEffect(() => {
    // Scroll once when typing indicator appears/disappears
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [loading]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-50 via-blue-50 to-cyan-50">
        <div className="max-w-5xl mx-auto w-full px-8 py-8">
          <WelcomeScreen onQuestion={onQuestion} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-50 via-blue-50 to-cyan-50">
      <div className="max-w-5xl mx-auto w-full px-8 py-8">

        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            index={index}
            messages={messages}
            message={message}
            onRegenerate={onRegenerate}
          />
        ))}

        {loading && <TypingIndicator />}

        <div ref={bottomRef} />

      </div>
    </div>
  );
}