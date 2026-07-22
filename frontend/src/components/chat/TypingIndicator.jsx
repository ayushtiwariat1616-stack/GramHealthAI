import { HeartPulse } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex gap-3 mb-6">

      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
        <HeartPulse size={20} />
      </div>

      <div className="bg-white border rounded-2xl px-5 py-4 shadow">
        <div className="flex gap-2">
          <span className="animate-bounce">●</span>
          <span
            className="animate-bounce"
            style={{ animationDelay: ".2s" }}
          >
            ●
          </span>
          <span
            className="animate-bounce"
            style={{ animationDelay: ".4s" }}
          >
            ●
          </span>
        </div>
      </div>

    </div>
  );
}