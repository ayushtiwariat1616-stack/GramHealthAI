import FloatingCards from "./FloatingCards";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function Hero({ onStart }) {
  return (
    <section className="max-w-7xl mx-auto px-8 pt-20 pb-32">

      <div className="grid lg:grid-cols-2 gap-20 items-center">

        {/* Left */}

        <div>

          <motion.div

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            transition={{ delay: .4 }}

            className="inline-flex items-center gap-2 rounded-full bg-white/40 backdrop-blur-xl border border-white px-5 py-2 shadow-lg"

          >

            <Sparkles size={18} />

            AI Powered Rural Healthcare

          </motion.div>

          <motion.h1

            initial={{
              opacity: 0,
              y: 80,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 1,
            }}

            className="mt-8 text-6xl font-black leading-tight"

          >

            Smart Healthcare

            <span className="block text-blue-700">

              For Every Village

            </span>

          </motion.h1>

          <motion.p

            initial={{
              opacity: 0,
              y: 40,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: .3,
            }}

            className="mt-8 text-xl text-slate-600 leading-9"

          >

            GramHealthAI empowers rural communities with trusted AI-based
            health awareness, disease prevention, emergency guidance and
            multilingual assistance.

          </motion.p>

          <motion.div

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            transition={{
              delay: .8,
            }}

            className="flex gap-5 mt-12"

          >

            <button

              onClick={onStart}

              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl flex items-center gap-2 shadow-xl"

            >

              Start Now

              <ArrowRight size={20} />

            </button>

            <button className="backdrop-blur-xl bg-white/40 border border-white px-8 py-4 rounded-2xl shadow-lg">

              Learn More

            </button>

          </motion.div>

        </div>

        {/* Right */}

        <motion.div

          initial={{
            opacity: 0,
            scale: .8,
          }}

          animate={{
            opacity: 1,
            scale: 1,
          }}

          transition={{
            duration: 1,
          }}

          className="relative"

        >

          <div className="rounded-[40px] bg-white/30 backdrop-blur-3xl border border-white shadow-2xl p-10">

            <FloatingCards/>

          </div>

        </motion.div>

      </div>

    </section>
  );
}