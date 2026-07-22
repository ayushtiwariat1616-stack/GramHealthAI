import { motion } from "framer-motion";

const stats = [
  { number: "98%", label: "Accuracy" },
  { number: "24/7", label: "Available" },
  { number: "150+", label: "Health Topics" },
  { number: "3", label: "Languages" },
];

export default function Stats() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-20">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.15,
              duration: 0.6,
            }}
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            className="rounded-3xl border border-white/30 bg-white/30 backdrop-blur-xl shadow-xl p-8 text-center"
          >
            <h2 className="text-5xl font-black text-blue-700">
              {stat.number}
            </h2>

            <p className="mt-3 text-slate-600 font-medium">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}