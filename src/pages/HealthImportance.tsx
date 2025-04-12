import { motion } from "framer-motion";
import { FaHeart, FaBrain, FaRunning, FaBed, FaAppleAlt, FaSmile } from "react-icons/fa";

const HealthImportance = () => {
  return (
    <div className="min-h-screen bg-white text-slate-800">
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
            Health & Wellness
          </motion.p>
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6 text-slate-900"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            The Importance of <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Health</span>
          </motion.h1>
          <motion.p
            className="text-lg text-slate-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover why maintaining good health is crucial for a fulfilling and productive life
          </motion.p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-slate-900">Key Benefits of Good Health</h2>
            <p className="text-lg text-slate-600">
              Investing in your health today leads to numerous benefits that enhance your quality of life
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaHeart className="text-4xl text-rose-600" />,
                title: "Physical Well-being",
                description: "Maintain optimal body function and prevent chronic diseases through regular exercise and proper nutrition"
              },
              {
                icon: <FaBrain className="text-4xl text-purple-600" />,
                title: "Mental Clarity",
                description: "Experience improved focus, reduced stress, and better cognitive performance"
              },
              {
                icon: <FaRunning className="text-4xl text-emerald-600" />,
                title: "Energy Boost",
                description: "Enjoy increased vitality and stamina throughout your daily activities"
              },
              {
                icon: <FaBed className="text-4xl text-sky-600" />,
                title: "Better Sleep",
                description: "Achieve quality rest and improved sleep patterns for better recovery"
              },
              {
                icon: <FaAppleAlt className="text-4xl text-red-600" />,
                title: "Disease Prevention",
                description: "Strengthen your immune system and reduce the risk of various health conditions"
              },
              {
                icon: <FaSmile className="text-4xl text-amber-600" />,
                title: "Emotional Balance",
                description: "Foster positive mood and better emotional resilience through healthy lifestyle choices"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-6">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-center text-slate-900">{benefit.title}</h3>
                <p className="text-slate-600 text-center">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Action Steps Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            className="bg-white p-12 rounded-2xl shadow-xl relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent opacity-50" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-8 text-center text-slate-900">Take Action Today</h2>
              <div className="space-y-6 max-w-3xl mx-auto">
                <p className="text-lg text-slate-600 text-center mb-8">
                  Start your journey to better health with these simple but effective steps:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">Daily Habits</h3>
                    <ul className="list-disc list-inside text-slate-600 space-y-2">
                      <li>30 minutes of physical activity</li>
                      <li>8 hours of quality sleep</li>
                      <li>Balanced, nutritious meals</li>
                      <li>Proper hydration</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">Mental Wellness</h3>
                    <ul className="list-disc list-inside text-slate-600 space-y-2">
                      <li>Practice mindfulness</li>
                      <li>Take regular breaks</li>
                      <li>Connect with others</li>
                      <li>Maintain work-life balance</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <motion.a
                  href="/fitness-tips"
                  className="inline-block bg-slate-900 text-white px-12 py-4 rounded-lg font-medium text-lg hover:bg-slate-800 transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore Fitness Tips
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HealthImportance;