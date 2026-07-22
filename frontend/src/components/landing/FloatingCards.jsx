import { motion } from "framer-motion";
import {
  HeartPulse,
  ShieldCheck,
  BrainCircuit,
} from "lucide-react";

const cards = [
  {
    icon: HeartPulse,
    title: "Health Awareness",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: ShieldCheck,
    title: "Emergency Support",
    color: "from-green-500 to-emerald-400",
  },
  {
    icon: BrainCircuit,
    title: "AI Assistance",
    color: "from-purple-500 to-pink-500",
  },
];

export default function FloatingCards() {
  return (
    <div className="grid gap-6">

      {cards.map((card, index) => {

        const Icon = card.icon;

        return (

          <motion.div
            key={card.title}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: index * .2,
              duration: .8,
            }}
            whileHover={{
              scale: 1.04,
              y: -8,
            }}
            className="group rounded-3xl border border-white/40 bg-white/25 backdrop-blur-2xl shadow-2xl p-6"
          >

            <div
              className={`w-16 h-16 rounded-2xl bg-linear-to-r ${card.color} flex items-center justify-center text-white`}
            >
              <Icon size={30}/>
            </div>

            <h2 className="font-bold text-xl mt-5">
              {card.title}
            </h2>

            <p className="text-slate-600 mt-2">
              Trusted healthcare powered by AI.
            </p>

          </motion.div>

        );

      })}

    </div>
  );
}