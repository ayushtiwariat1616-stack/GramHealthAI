import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-cyan-50 to-sky-200" />

      {/* Blur Circles */}

      <motion.div
        animate={{
          x: [0, 120, 0],
          y: [0, -100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[500px] h-[500px] rounded-full bg-cyan-400/30 blur-[120px] top-0 left-0"
      />

      <motion.div
        animate={{
          x: [0, -150, 0],
          y: [0, 100, 0],
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[450px] h-[450px] rounded-full bg-blue-500/20 blur-[120px] bottom-0 right-0"
      />

      <motion.div
        animate={{
          y: [0, -120, 0],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
        }}
        className="absolute w-[350px] h-[350px] rounded-full bg-teal-300/20 blur-[100px] bottom-20 left-1/2"
      />
    </div>
  );
}