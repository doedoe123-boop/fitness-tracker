import { motion } from "framer-motion";
import { FaAppleAlt, FaCarrot, FaWineGlassAlt, FaClock } from "react-icons/fa";

function DietTips() {
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
            Nutrition Guide
          </motion.p>
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6 text-slate-900"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Healthy <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Diet Lifestyle</span>
          </motion.h1>
          <motion.p
            className="text-lg text-slate-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover simple ways to create a balanced diet that fuels your body and mind for optimal performance
          </motion.p>
        </div>
      </section>

      {/* Key Principles Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-slate-900">Key Principles of Healthy Eating</h2>
            <p className="text-lg text-slate-600">
              Build a foundation of good health with these essential nutrition principles
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaAppleAlt className="text-4xl text-emerald-600" />,
                title: "Variety",
                description: "Eat a range of foods to get essential nutrients and vitamins"
              },
              {
                icon: <FaCarrot className="text-4xl text-orange-600" />,
                title: "Natural Choices",
                description: "Focus on fresh fruits, vegetables, and whole grains"
              },
              {
                icon: <FaWineGlassAlt className="text-4xl text-rose-600" />,
                title: "Limit Unhealthy",
                description: "Reduce intake of sugar, salt, and saturated fats"
              },
              {
                icon: <FaClock className="text-4xl text-sky-600" />,
                title: "Timing Matters",
                description: "Regular meal times and proper portion control"
              }
            ].map((principle, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
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

      {/* Tips Section */}
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
              <h2 className="text-3xl font-bold mb-8 text-center text-slate-900">Quick Meal Tips</h2>
              <div className="space-y-6 max-w-3xl mx-auto text-slate-600">
                <p className="leading-relaxed">
                  Eating healthy doesn't have to be complicated. Plan your meals ahead, avoid processed foods, 
                  and savor every bite by practicing mindful eating. Small changes in your diet can lead to 
                  significant health benefits!
                </p>
                <ul className="list-disc list-inside space-y-3">
                  <li>Prepare meals in advance to avoid unhealthy food choices</li>
                  <li>Include protein with every meal to stay fuller longer</li>
                  <li>Eat slowly and mindfully to better recognize fullness</li>
                  <li>Stay hydrated throughout the day</li>
                </ul>
              </div>
              
              <div className="mt-12 text-center">
                <motion.a
                  href="/health-importance"
                  className="inline-block bg-slate-900 text-white px-12 py-4 rounded-lg font-medium text-lg hover:bg-slate-800 transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Learn More About Health
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

export default DietTips;