import { motion } from "framer-motion";
import { FaDumbbell, FaRunning, FaHeartbeat, FaBrain, FaStopwatch, FaChartLine } from "react-icons/fa";

function FitnessTips() {
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
            Expert Guidance
          </motion.p>
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6 text-slate-900"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Professional <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Fitness Tips</span>
          </motion.h1>
          <motion.p
            className="text-lg text-slate-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Learn the best practices and strategies to maximize your workouts and achieve sustainable results
          </motion.p>
        </div>
      </section>

      {/* Core Principles Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-slate-900">Core Fitness Principles</h2>
            <p className="text-lg text-slate-600">
              Master these fundamental aspects to build a strong foundation for your fitness journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaStopwatch className="text-4xl text-amber-600" />,
                title: "Consistency",
                description: "Maintain regular workout schedules and stick to your fitness routine"
              },
              {
                icon: <FaHeartbeat className="text-4xl text-rose-600" />,
                title: "Cardiovascular Health",
                description: "Include aerobic exercises to improve heart health and endurance"
              },
              {
                icon: <FaDumbbell className="text-4xl text-slate-600" />,
                title: "Strength Training",
                description: "Build muscle and increase metabolism through resistance exercises"
              },
              {
                icon: <FaRunning className="text-4xl text-emerald-600" />,
                title: "Active Lifestyle",
                description: "Incorporate movement throughout your day, not just during workouts"
              },
              {
                icon: <FaBrain className="text-4xl text-purple-600" />,
                title: "Mental Focus",
                description: "Develop mind-muscle connection and maintain proper form"
              },
              {
                icon: <FaChartLine className="text-4xl text-sky-600" />,
                title: "Progressive Overload",
                description: "Gradually increase intensity to continually challenge your body"
              }
            ].map((principle, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-6">{principle.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-center text-slate-900">{principle.title}</h3>
                <p className="text-slate-600 text-center">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Tips Section */}
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
              <h2 className="text-3xl font-bold mb-8 text-center text-slate-900">Advanced Training Tips</h2>
              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">Pre-Workout</h3>
                    <ul className="list-disc list-inside text-slate-600 space-y-2">
                      <li>Warm up properly for 5-10 minutes</li>
                      <li>Stay hydrated before exercises</li>
                      <li>Plan your workout routine</li>
                      <li>Get adequate rest between sessions</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">During Workout</h3>
                    <ul className="list-disc list-inside text-slate-600 space-y-2">
                      <li>Focus on proper form</li>
                      <li>Control your breathing</li>
                      <li>Stay within your limits</li>
                      <li>Track your progress</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <motion.a
                  href="/work-out-now"
                  className="inline-block bg-slate-900 text-white px-12 py-4 rounded-lg font-medium text-lg hover:bg-slate-800 transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Working Out
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default FitnessTips;