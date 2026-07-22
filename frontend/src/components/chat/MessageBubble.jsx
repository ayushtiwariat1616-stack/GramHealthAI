import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import {
  User,
  HeartPulse,
  Copy,
  Check,
  RotateCcw,
  Volume2,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

export default function MessageBubble({
  message,
  messages,
  index,
  onRegenerate,
}) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  function speak() {
    if (!("speechSynthesis" in window)) return;

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(
      message.content
    );

    utterance.rate = 1;
    utterance.pitch = 1;

    speechSynthesis.speak(utterance);
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(message.content);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }
  async function handleRegenerate() {
    if (!messages || !onRegenerate) return;

    // Find the previous user message
    for (let i = index - 1; i >= 0; i--) {
      if (messages[i].role === "user") {
        onRegenerate(messages[i].content);
        return;
      }
    }
  }

  const time = message.time
    ? new Date(message.time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
    : "";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
      layout
      className={`flex gap-4 mb-8 ${isUser ? "justify-end" : "justify-start"
        }`}
    >
      {!isUser && (
        <motion.div
          whileHover={{
            rotate: 8,
            scale: 1.08,
          }}
          className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-xl flex items-center justify-center text-white shrink-0"
        >
          <HeartPulse size={22} />
        </motion.div>
      )}

      <motion.div
        whileHover={{
          y: -2,
        }}
        transition={{
          duration: 0.2,
        }}
        className={`max-w-3xl rounded-3xl px-6 py-5 shadow-xl border backdrop-blur-xl ${isUser
          ? "bg-gradient-to-br from-blue-600 to-blue-500 text-white border-blue-400"
          : "bg-white/75 border-white/60"
          }`}
      >
        {!isUser && (
          <div className="flex justify-between items-center mb-4">
            <div className="font-bold text-blue-700 flex items-center gap-2">
              🩺 GramHealthAI
            </div>

            <div className="text-xs text-slate-400">
              {time}
            </div>
          </div>
        )}

        {isUser && (
          <div className="text-right text-xs opacity-70 mb-2">
            {time}
          </div>
        )}

        <div
          className={`prose prose-sm max-w-none ${isUser ? "prose-invert" : ""
            }`}
        >
          {message.streaming ? (
            <div className="whitespace-pre-wrap leading-8">
              {message.content}
              <span className="animate-pulse">▋</span>
            </div>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold mt-6 mb-4">
                    {children}
                  </h1>
                ),

                h2: ({ children }) => (
                  <h2 className="text-2xl font-semibold mt-5 mb-3">
                    {children}
                  </h2>
                ),

                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold mt-4 mb-2">
                    {children}
                  </h3>
                ),

                p: ({ children }) => (
                  <p className="leading-8 mb-4">
                    {children}
                  </p>
                ),

                ul: ({ children }) => (
                  <ul className="list-disc ml-6 space-y-2 mb-4">
                    {children}
                  </ul>
                ),

                ol: ({ children }) => (
                  <ol className="list-decimal ml-6 space-y-2 mb-4">
                    {children}
                  </ol>
                ),

                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-blue-500 bg-blue-50 rounded-r-xl px-4 py-3 italic my-4">
                    {children}
                  </blockquote>
                ),

                code({ inline, className, children, ...props }) {
                  return inline ? (
                    <code className="bg-slate-200 px-1.5 py-0.5 rounded text-sm">
                      {children}
                    </code>
                  ) : (
                    <pre className="rounded-2xl bg-slate-900 text-white p-5 overflow-x-auto my-5">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  );
                },

                table: ({ children }) => (
                  <div className="overflow-x-auto my-5">
                    <table className="w-full border rounded-xl overflow-hidden">
                      {children}
                    </table>
                  </div>
                ),

                th: ({ children }) => (
                  <th className="bg-slate-100 border px-4 py-2 text-left">
                    {children}
                  </th>
                ),

                td: ({ children }) => (
                  <td className="border px-4 py-2">
                    {children}
                  </td>
                ),

                a: ({ children, href }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>

        {!isUser &&
          message.sources &&
          message.sources.length > 0 && (
            <>
              <div className="h-px bg-slate-200 my-5" />

              <div className="font-semibold mb-3 flex items-center gap-2">
                📚 Sources
              </div>

              <div className="flex flex-wrap gap-2">
                {message.sources.map((source) => (
                  <div
                    key={source}
                    className="rounded-full bg-blue-50 border border-blue-100 px-4 py-2 text-sm"
                  >
                    📄{" "}
                    {source.replace(
                      "knowledge_base/basic_health.txt",
                      "Basic Health KB"
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

        {!isUser && (

          <div className="flex flex-wrap items-center gap-3 mt-6">

            <button
              onClick={() => {
                setLiked(true);
                setDisliked(false);
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition ${liked
                ? "bg-green-100 text-green-700"
                : "hover:bg-slate-100 text-slate-500"
                }`}
            >

              <ThumbsUp size={17} />

              Helpful

            </button>

            <button
              onClick={() => {
                setDisliked(true);
                setLiked(false);
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition ${disliked
                ? "bg-red-100 text-red-700"
                : "hover:bg-slate-100 text-slate-500"
                }`}
            >

              <ThumbsDown size={17} />

              Not Helpful

            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 transition"
            >

              {copied ? (

                <>

                  <Check
                    size={17}
                    className="text-green-600"
                  />

                  Copied

                </>

              ) : (

                <>

                  <Copy size={17} />

                  Copy

                </>

              )}

            </button>

            <button
              onClick={handleRegenerate}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 transition"
            >

              <RotateCcw size={17} />

              Regenerate

            </button>

            <button
              onClick={speak}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 transition"
            >

              <Volume2 size={17} />

              Listen

            </button>

          </div>

        )}
      </motion.div>

      {isUser && (
        <motion.div
          whileHover={{
            rotate: -8,
            scale: 1.08,
          }}
          className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 shadow-xl flex items-center justify-center text-white shrink-0"
        >
          <User size={22} />
        </motion.div>
      )}
    </motion.div>
  );
}