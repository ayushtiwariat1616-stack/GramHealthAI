import { HeartPulse } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar({ onStart }) {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: .8 }}
      className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center"
    >
      <div className="flex items-center gap-4">

        <div className="w-14 h-14 rounded-2xl bg-white/30 backdrop-blur-xl border border-white/40 flex items-center justify-center shadow-xl">

          <HeartPulse
            size={28}
            className="text-blue-700"
          />

        </div>

        <div>

          <h1 className="font-bold text-2xl">
            GramHealthAI
          </h1>

          <p className="text-slate-600">
            AI Healthcare Platform
          </p>

        </div>

      </div>

      <button
        onClick={onStart}
        className="rounded-2xl bg-blue-600 px-6 py-3 text-white shadow-xl hover:scale-105 transition"
      >
        Start Chat
      </button>
    </motion.nav>
  );
}