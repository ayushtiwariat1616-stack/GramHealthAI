import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import {
  Send,
  Mic,
  Languages,
} from "lucide-react";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  const { language, setLanguage } = useLanguage();
  const [showLanguages, setShowLanguages] = useState(false);

  const languages = [
    "English",
    "हिन्दी",
    "Hinglish",
  ];

  function submit() {
    if (!text.trim()) return;

    onSend(text);
    setText("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "56px";
    }
  }

  function handleChange(e) {
    setText(e.target.value);

    e.target.style.height = "56px";
    e.target.style.height = e.target.scrollHeight + "px";
  }

  return (
    <div className="sticky bottom-0 bg-gradient-to-t from-slate-100 via-slate-100 to-transparent px-8 py-6">

      <div className="max-w-5xl mx-auto">

        <div className="flex items-end gap-3 rounded-3xl border border-white/50 bg-white/70 backdrop-blur-2xl shadow-2xl p-3">

          {/* Voice Button */}

          <button
            className="w-12 h-12 rounded-2xl bg-white hover:bg-blue-50 flex items-center justify-center shadow transition"
          >
            <Mic size={20} className="text-blue-600" />
          </button>

          {/* Language */}

          <div className="relative">

            <button
              onClick={() =>
                setShowLanguages(!showLanguages)
              }
              className="w-12 h-12 rounded-2xl bg-white hover:bg-blue-50 flex items-center justify-center shadow transition"
            >
              <Languages
                size={20}
                className="text-blue-600"
              />
            </button>

            {showLanguages && (

              <div className="absolute bottom-16 left-0 w-40 rounded-2xl bg-white shadow-2xl border overflow-hidden z-50">

                {languages.map((lang) => (

                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setShowLanguages(false);
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition ${language === lang
                      ? "bg-blue-100 font-semibold"
                      : ""
                      }`}
                  >
                    {lang}
                  </button>

                ))}

              </div>

            )}

          </div>

          {/* Input */}

          <textarea
            ref={textareaRef}
            rows={1}
            value={text}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            placeholder={`Ask GramHealthAI anything about health in ${language}...`}
            className="flex-1 resize-none bg-transparent outline-none px-3 py-4 max-h-40"
          />

          {/* Send */}

          <button
            onClick={submit}
            disabled={!text.trim()}
            className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition disabled:opacity-40 disabled:hover:scale-100"
          >
            <Send size={22} />
          </button>

        </div>

        <p className="text-center text-xs text-slate-500 mt-3">

          Press <b>Enter</b> to send • <b>Shift + Enter</b> for new line

        </p>

      </div>

    </div>
  );
}