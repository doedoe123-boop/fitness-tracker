import React from "react";
import { TbError404 } from "react-icons/tb";
import { FaDumbbell, FaRunning, FaHeartbeat } from "react-icons/fa";
import { motion } from "framer-motion";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50/70 via-white to-cyan-50/70">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] pointer-events-none" />
      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* 404 Display with Animation */}
          <motion.div
            className="relative"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-teal-200 to-cyan-200 rounded-full blur-3xl opacity-20" />
            <TbError404 className="text-9xl mx-auto mb-6 text-slate-900 relative z-10" />
          </motion.div>

          {/* Title with Animation */}
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 text-slate-900"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Page Not Found
            <span className="block text-2xl mt-4 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Time to Switch Up Your Routine!
            </span>
          </motion.h1>

          {/* Message with Animation */}
          <motion.p
            className="text-xl mb-12 text-slate-600"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Looks like you've wandered off track! Don't worry, even the best workouts need adjustments.
            Let's get you back to your fitness journey.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.a
              href="/"
              className="inline-block bg-slate-900 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-slate-800 transition-all duration-300 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Back to Homepage
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
            </motion.a>
            <motion.a
              href="/work-out-now"
              className="inline-block bg-white border-2 border-slate-200 text-slate-900 px-8 py-4 rounded-lg font-medium text-lg hover:bg-slate-50 transition-all duration-300 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Working Out
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
            </motion.a>
          </motion.div>

          {/* Floating Fitness Icons */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            {[FaDumbbell, FaRunning, FaHeartbeat].map((Icon, index) => (
              Array(4).fill(0).map((_, i) => (
                <motion.div
                  key={`${index}-${i}`}
                  className="absolute text-slate-200"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    fontSize: `${Math.random() * 20 + 20}px`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 0.3,
                    scale: 1,
                    y: [0, -30, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: Math.random() * 2,
                  }}
                >
                  <Icon />
                </motion.div>
              ))
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;