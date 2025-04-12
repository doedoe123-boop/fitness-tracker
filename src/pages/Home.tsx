import { FaAppleAlt, FaDumbbell, FaClipboardList, FaQuoteLeft, FaQuoteRight, FaUsers, FaHeartbeat, FaLeaf, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

function Home() {
  return (
    <div className="bg-white text-slate-800 min-h-screen">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex flex-col md:flex-row items-center justify-between text-center md:text-left px-6 lg:px-24 py-16 relative overflow-hidden bg-gradient-to-br from-sky-50/70 via-white to-cyan-50/70">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:w-1/2 flex flex-col items-center md:items-start space-y-8 relative z-10 max-w-2xl mx-auto md:mx-0"
        >
          <p className="text-lg font-medium tracking-wide text-teal-700 uppercase">Live N Move</p>
          <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold leading-tight text-slate-900">
            Get Moving, <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Stay Healthy</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
            Elevate your fitness journey with guided workouts, expert tips, and personalized plans to keep you active and energized.
          </p>
          <motion.a
            href="/work-out-now"
            className="bg-slate-900 text-white uppercase px-12 py-4 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl hover:bg-slate-800 transition-all duration-300 group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="md:w-1/2 flex justify-center mt-16 md:mt-0 relative z-10"
        >
          <div className="relative max-w-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-200 to-cyan-200 rounded-2xl blur-3xl opacity-20" />
            <img
              src="/assets/hero/healthier.png"
              alt="Exercise"
              className="relative z-10 w-full rounded-2xl shadow-2xl"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-slate-900">
              Everything you need to succeed
            </h2>
            <p className="text-lg text-slate-600">
              Comprehensive tools and guidance to support your fitness journey every step of the way
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <FaDumbbell className="text-5xl text-amber-600" />, 
                title: "Personalized Workouts", 
                text: "Get customized exercise routines tailored to your goals and fitness level.",
                link: "/health-importance"
              },
              { 
                icon: <FaAppleAlt className="text-5xl text-emerald-600" />, 
                title: "Nutrition Guidance", 
                text: "Discover healthy meal plans, recipes, and expert diet tips.",
                link: "/fitness-tips"
              },
              { 
                icon: <FaClipboardList className="text-5xl text-sky-600" />, 
                title: "Progress Tracking", 
                text: "Monitor your achievements, set goals, and stay motivated with real-time progress updates.",
                link: "/diet-tips"
              }
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden border border-slate-100"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="mb-6">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-4 text-slate-900">{item.title}</h3>
                  <p className="text-slate-600">{item.text}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-slate-900">Real Results, Real People</h2>
            <p className="text-lg text-slate-600">
              Discover how our platform has helped transform lives and achieve fitness goals
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                name: "Sarah M.",
                achievement: "Lost 30lbs in 6 months",
                story: "Following the workout plans and nutrition guides helped me achieve my weight loss goals. The community support was incredible!",
                image: "/assets/hero/healthier.png"
              },
              {
                name: "Mike R.",
                achievement: "Gained muscle mass",
                story: "The personalized strength training programs helped me build the muscle I always wanted. The progress tracking kept me motivated.",
                image: "/assets/hero/healthier.png"
              }
            ].map((story, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 relative">
                    <div className="aspect-square">
                      <img
                        src={story.image}
                        alt={story.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <div className="flex-1 p-8">
                    <h3 className="text-2xl font-semibold mb-2 text-slate-900">{story.name}</h3>
                    <p className="text-teal-600 font-medium mb-4">{story.achievement}</p>
                    <p className="text-slate-600 leading-relaxed">{story.story}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Health Tips Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-slate-900">Expert Health Tips</h2>
            <p className="text-lg text-slate-600">
              Professional guidance to help you maintain a healthy and balanced lifestyle
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaHeartbeat className="text-4xl text-rose-600" />,
                title: "Cardio Health",
                tips: ["30 minutes daily exercise", "Regular heart rate monitoring", "Stress management"]
              },
              {
                icon: <FaLeaf className="text-4xl text-emerald-600" />,
                title: "Nutrition",
                tips: ["Balanced meal planning", "Hydration tracking", "Mindful eating habits"]
              },
              {
                icon: <FaUsers className="text-4xl text-sky-600" />,
                title: "Lifestyle",
                tips: ["Quality sleep patterns", "Work-life balance", "Social activities"]
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="flex items-center justify-center mb-6">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold mb-6 text-center text-slate-900">{category.title}</h3>
                <ul className="space-y-4">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 bg-slate-300"></span>
                      <span className="text-slate-600">{tip}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
            {[
              { number: "10K+", label: "Active Users", icon: <FaUsers className="text-3xl text-sky-600" /> },
              { number: "500+", label: "Workout Plans", icon: <FaDumbbell className="text-3xl text-slate-600" /> },
              { number: "1M+", label: "Calories Burned", icon: <FaHeartbeat className="text-3xl text-rose-600" /> },
              { number: "50K+", label: "Success Stories", icon: <FaLeaf className="text-3xl text-emerald-600" /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <h3 className="text-4xl font-bold text-slate-900 mb-2">{stat.number}</h3>
                <p className="text-slate-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            className="bg-white p-12 rounded-2xl shadow-xl relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative z-10">
              <div className="flex justify-center mb-8">
                <FaEnvelope className="text-5xl text-slate-900" />
              </div>
              <div className="text-center max-w-2xl mx-auto mb-8">
                <h2 className="text-3xl font-bold mb-4 text-slate-900">Stay Updated</h2>
                <p className="text-lg text-slate-600">
                  Get weekly tips, motivation, and exclusive content delivered to your inbox
                </p>
              </div>
              <form className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                />
                <button
                  type="submit"
                  className="px-8 py-3 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition-all duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/public/assets/hero/healthier.png')] opacity-5 bg-cover bg-center mix-blend-overlay" />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="text-center">
            <motion.h2
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Take the First Step
            </motion.h2>
            <motion.p
              className="text-lg mb-12 max-w-2xl mx-auto text-slate-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Start your fitness journey today and build a healthier, stronger you. Join thousands of users who have already transformed their lives.
            </motion.p>
            <motion.a
              href="/about"
              className="inline-block bg-white px-12 py-4 rounded-lg text-slate-900 font-medium text-lg hover:bg-slate-100 transition-all duration-300 group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;