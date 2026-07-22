import {
  X,
  Activity,
  HeartPulse,
  ShieldAlert,
  Languages,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

export default function HealthDrawer({ open, onClose }) {
  return (
    <AnimatePresence>

      {open && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-end"
        >

          <motion.aside

            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}

            transition={{
              type: "spring",
              stiffness: 280,
              damping: 28,
            }}

            onClick={(e) => e.stopPropagation()}

            className="w-[360px] h-full bg-white/70 backdrop-blur-3xl border-l border-white/40 shadow-2xl p-6 overflow-y-auto"

          >

            <div className="flex items-center justify-between mb-8">

              <div>

                <h2 className="text-2xl font-bold">
                  🩺 Health Dashboard
                </h2>

                <p className="text-slate-500 text-sm">
                  GramHealthAI Assistant
                </p>

              </div>

              <button
                onClick={onClose}
                className="rounded-xl p-2 hover:bg-slate-200 transition"
              >
                <X />
              </button>

            </div>

            <GlassCard
              icon={<Activity className="text-green-500" />}
              title="AI Status"
            >
              🟢 Online
            </GlassCard>

            <GlassCard
              icon={<HeartPulse className="text-red-500" />}
              title="Health Tip"
            >
              Drink enough water today 💧
            </GlassCard>

            <GlassCard
              icon={<ShieldAlert className="text-orange-500" />}
              title="Emergency"
            >
              Contact your nearest hospital if symptoms become severe.
            </GlassCard>

            <GlassCard
              icon={<Languages className="text-blue-500" />}
              title="Language"
            >
              English
            </GlassCard>

          </motion.aside>

        </motion.div>

      )}

    </AnimatePresence>
  );
}

function GlassCard({ icon, title, children }) {
  return (
    <div className="rounded-3xl bg-white/40 backdrop-blur-xl border border-white/30 shadow-lg p-5 mb-5">

      <div className="flex items-center gap-3 font-semibold mb-4">

        {icon}

        {title}

      </div>

      <div className="text-slate-600">

        {children}

      </div>

    </div>
  );
}