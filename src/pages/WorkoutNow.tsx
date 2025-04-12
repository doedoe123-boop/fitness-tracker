import React from "react";
import { motion } from "framer-motion";
import BodyExercise from "./components/BodyExercise";

const WorkOutNow: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sky-50/70 via-white to-cyan-50/70 py-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] pointer-events-none" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.p
            className="text-lg font-medium tracking-wide text-teal-700 uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Start Your Workout
          </motion.p>
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6 text-slate-900"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Choose Your <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Exercise</span>
          </motion.h1>
          <motion.p
            className="text-lg text-slate-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Select from our curated collection of exercises designed to help you achieve your fitness goals
          </motion.p>
        </div>
      </section>

      {/* Exercise Component */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <BodyExercise />
        </div>
      </section>
    </div>
  );
};

export default WorkOutNow;
