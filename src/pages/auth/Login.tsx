import { motion } from "framer-motion";
import { FaDownload, FaMobileAlt, FaRocket, FaUserPlus } from "react-icons/fa";
import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sky-50/70 via-white to-cyan-50/70 py-16 min-h-screen flex items-center">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center md:text-left"
              >
                <motion.p
                  className="text-lg font-medium tracking-wide text-teal-700 uppercase mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Download Our App
                </motion.p>
                <motion.h1
                  className="text-4xl md:text-5xl font-bold mb-6 text-slate-900"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  Start Your <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Fitness Journey</span>
                </motion.h1>
                <motion.p
                  className="text-lg text-slate-600 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Join thousands of users who are transforming their lives with our comprehensive fitness tracking platform.
                </motion.p>
                
                {/* Features */}
                <motion.div
                  className="space-y-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  {[
                    { icon: <FaMobileAlt />, text: "Available on iOS and Android" },
                    { icon: <FaRocket />, text: "Real-time progress tracking" },
                    { icon: <FaUserPlus />, text: "Join a supportive community" },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 text-slate-600">
                      <span className="text-teal-600">{feature.icon}</span>
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </motion.div>

                {/* CTAs */}
                <motion.div
                  className="flex flex-col sm:flex-row items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <motion.a
                    href="#"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white rounded-lg font-medium text-lg hover:bg-slate-800 transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaDownload className="mr-2" />
                    Download Now
                    <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                  </motion.a>
                  <motion.a
                    href="#"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-2 border-slate-200 text-slate-900 rounded-lg font-medium text-lg hover:bg-slate-50 transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Learn More
                    <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                  </motion.a>
                </motion.div>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                className="relative hidden md:block"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-200 to-cyan-200 rounded-2xl blur-3xl opacity-20" />
                <img
                  src="/assets/hero/healthier.png"
                  alt="Fitness App Preview"
                  className="relative z-10 w-full rounded-2xl shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
