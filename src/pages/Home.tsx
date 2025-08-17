import { FaAppleAlt, FaDumbbell, FaClipboardList, FaUsers, FaHeartbeat, FaLeaf, FaEnvelope, FaArrowRight, FaPlayCircle, FaStar, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import Testimonials from './components/Testimonials';
import { StatsGrid } from './components/ui/AnimatedCounter';
import Testimonial1 from "../assets/testimonial/1.jpg";
import Testimonial2 from "../assets/testimonial/2.jpg";
import Running from "../assets/exercises/running.gif";
import Yoga from "../assets/exercises/yoga.gif";
import PushUp from "../assets/exercises/push-ups.gif";
import Healthier from "../assets/hero/healthier.png";

function Home() {
  const [showVideo, setShowVideo] = useState(false);
 // const [email, setEmail] = useState("");
  //const [subscriptionStatus, setSubscriptionStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // const handleSubscribe = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setSubscriptionStatus("loading");
    
  //   // Simulate API call
  //   await new Promise(resolve => setTimeout(resolve, 1000));
    
  //   // For demo, always succeed
  //   setSubscriptionStatus("success");
  //   setEmail("");
  // };

  return (
    <div className="bg-white dark:bg-dark-primary text-slate-800 dark:text-slate-200">
      {/* Hero Section - US001 */}
      <section className="min-h-[90vh] md:min-h-[100vh] flex flex-col md:flex-row items-center justify-between px-4 md:px-6 lg:px-24 pt-24 md:py-16 relative overflow-hidden bg-gradient-to-br from-sky-50/70 via-white to-cyan-50/70 dark:from-dark-secondary dark:via-dark-primary dark:to-dark-secondary">
        <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark opacity-[0.015] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 flex flex-col items-center md:items-start space-y-8 relative z-10 max-w-2xl mx-auto md:mx-0"
        >
          <div className="bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 px-4 py-2 rounded-full text-sm font-medium inline-flex items-center">
            <FaHeartbeat className="mr-2" />
            Your Complete Fitness & Health Platform
          </div>
          
          <motion.p
            className="text-lg font-medium tracking-wide text-teal-700 dark:text-teal-400 uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Track, Train, Transform
          </motion.p>

          <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold leading-tight text-slate-900 dark:text-white text-center md:text-left">
            Transform Your Body, <span className="bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-500 dark:to-cyan-500 bg-clip-text text-transparent">Master Your Health</span>
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed text-center md:text-left">
            Achieve your fitness goals with personalized workouts, nutrition tracking, and expert guidance. Join thousands of users who have transformed their lives with our comprehensive fitness platform.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              "AI-Powered Workout Plans",
              "Real-Time Progress Tracking",
              "Nutrition & Diet Guidance",
              "Expert Health Tips"
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-2 text-slate-700 dark:text-slate-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (index * 0.1) }}
              >
                <FaCheckCircle className="text-teal-600 dark:text-teal-500 flex-shrink-0" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              href="/work-out-now"
              className="bg-slate-900 dark:bg-slate-800 text-white px-8 py-4 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl hover:bg-slate-800 dark:hover:bg-slate-700 transition-all duration-300 text-center group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Your Journey
              <FaArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            
            <motion.button
              onClick={() => setShowVideo(true)}
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-lg hover:bg-slate-50 dark:hover:bg-dark-accent transition-all duration-300 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaPlayCircle className="mr-2" />
              Watch Demo
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="md:w-1/2 flex justify-center mt-16 md:mt-0 relative"
        >
          <div className="relative max-w-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-200 to-cyan-200 rounded-2xl blur-3xl opacity-20" />
            <img
              src={Healthier}
              alt="Fitness App Interface"
              className="relative z-10 w-full rounded-2xl shadow-2xl"
            />
          </div>
        </motion.div>

        {/* Demo Video Modal - US002 */}
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full aspect-video relative"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-white bg-slate-900/50 rounded-full p-2 hover:bg-slate-900 transition-colors"
                onClick={() => setShowVideo(false)}
              >
                ✕
              </button>
              <iframe
                src="#"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Fitness App Demo Video"
              />
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-dark-secondary dark:to-dark-primary">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Trusted by Fitness Enthusiasts Worldwide
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Join thousands of users who have achieved their fitness goals
            </p>
          </motion.div>
          <StatsGrid />
        </div>
      </section>

      {/* What's New Section */}
      <motion.div 
        className="relative -mt-8 md:-mt-12 mb-16 md:mb-24 px-4 md:px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-lg rounded-xl border border-slate-200/80 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center space-x-4 w-full sm:w-auto">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-teal-100 text-teal-600 flex-shrink-0">
                <FaStar className="w-5 h-5" />
              </span>
              <div>
                <span className="text-sm font-medium text-teal-600 block sm:inline">What's New</span>
                <p className="text-slate-700 mt-1 sm:mt-0 sm:ml-2">New AI-powered workout recommendations and improved progress tracking!</p>
              </div>
            </div>
            <motion.a
              href="/work-out-now"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium bg-slate-50 hover:bg-slate-100 text-slate-900 rounded-lg transition-colors flex items-center justify-center"
            >
              Learn More <span className="ml-2">→</span>
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Insert Testimonials section before Features */}
      <Testimonials />

      {/* Quick Feature Overview - US004 */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Everything you need to succeed
            </h2>
            <p className="text-lg">
              Simple, powerful tools to track your fitness journey
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaDumbbell className="text-5xl text-amber-600" />,
                title: "Smart Workout Tracking",
                text: "Track exercises, sets, reps, and weight with our intuitive interface",
                link: "/work-out-now"
              },
              {
                icon: <FaHeartbeat className="text-5xl text-rose-600" />,
                title: "Progress Analytics",
                text: "Visual insights into your fitness journey with detailed charts and metrics",
                link: "/health-importance"
              },
              {
                icon: <FaUsers className="text-5xl text-emerald-600" />,
                title: "Community Support",
                text: "Join a community of fitness enthusiasts and share your achievements",
                link: "/about"
              }
            ].map((feature, index) => (
              <motion.a
                key={index}
                href={feature.link}
                className="group p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative z-10">
                  <div className="mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">{feature.text}</p>
                  <span className="text-teal-600 font-medium inline-flex items-center group-hover:translate-x-2 transition-transform">
                    Learn more <FaArrowRight className="ml-2" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* App Screenshots - US002 */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">See it in Action</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Take a peek at the intuitive interface and powerful features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { src: Running, title: "Workout Tracking" },
              { src: Yoga, title: "Guided Exercises" },
              { src: PushUp, title: "Form Guidance" }
            ].map((screenshot, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="aspect-video rounded-xl overflow-hidden">
                  <img
                    src={screenshot.src}
                    alt={screenshot.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium mt-4 text-center text-slate-600 dark:text-slate-400">
                  {screenshot.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section - US003 */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('src/assets/hero/healthier.png')] opacity-5 bg-cover bg-center mix-blend-overlay" />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">Coming Soon to Fitnesses</h2>
            <p className="text-lg mb-12 max-w-2xl mx-auto text-slate-300">
              We’re building tools to keep you motivated, consistent, and progressing.
              Here’s what’s next:
            </p>

            <div className="grid md:grid-cols-3 gap-8 text-left text-slate-200">
              {[
                {
                  title: "AI Workout Planner",
                  desc: "Get personalized workouts tailored to your goals and schedule."
                },
                {
                  title: "Progress Tracker",
                  desc: "Visually track your consistency, weight, and strength gains."
                },
                {
                  title: "Community Challenges",
                  desc: "Join monthly challenges and compete with friends or strangers."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 rounded-xl p-6 border border-white/10"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Everything you need to succeed
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
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
                className="group p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden border border-slate-400 dark:border-slate-700"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="mb-6">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{item.text}</p>
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
            <h2 className="text-4xl font-bold mb-6">Real Results, Real People</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Discover how our platform has helped transform lives and achieve fitness goals
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                name: "Sarah J.",
                achievement: "Lost 30lbs in 6 months",
                story: "Following the workout plans and nutrition guides helped me achieve my weight loss goals. The community support was incredible!",
                image: Testimonial1
              },
              {
                name: "Shen R.",
                achievement: "Gained muscle mass",
                story: "The personalized strength training programs helped me build the muscle I always wanted. The progress tracking kept me motivated.",
                image: Testimonial2
              }
            ].map((story, index) => (
              <motion.div
                key={index}
                className="rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-slate-200 dark:border-slate-700"
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
                    <h3 className="text-2xl font-semibold mb-2">{story.name}</h3>
                    <p className="font-medium mb-4">{story.achievement}</p>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{story.story}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Health Tips Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">Expert Health Tips</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
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
                className="p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="flex items-center justify-center mb-6">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold mb-6 text-center">{category.title}</h3>
                <ul className="space-y-4">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 bg-slate-300 dark:bg-slate-600"></span>
                      <span className="text-slate-600 dark:text-slate-400">{tip}</span>
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
                <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-4xl ">
          <motion.div
            className="p-12 rounded-2xl shadow-xl relative overflow-hidden border border-slate-300 dark:border-slate-700"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative z-10">
              <div className="flex justify-center mb-8">
                <FaEnvelope className="text-5xl text-slate-900 dark:text-slate-700" />
              </div>
              <div className="text-center max-w-2xl mx-auto mb-8">
                <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Get weekly tips, motivation, and exclusive content delivered to your inbox
                </p>
              </div>
              <form className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-lg border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                />
                <button
                  type="submit"
                  className="px-8 py-3 rounded-lg bg-slate-900 dark:bg-slate-800 text-white font-medium hover:bg-slate-800 transition-all duration-300"
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
        <div className="absolute inset-0 bg-[url('/publicsrc/assets/hero/healthier.png')] opacity-5 bg-cover bg-center mix-blend-overlay" />
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