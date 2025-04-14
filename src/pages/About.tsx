import { motion } from "framer-motion";
import {
  FaDumbbell,
  FaHeartbeat,
  FaUsers,
  FaAppleAlt,
  FaChartLine,
  FaStar,
  FaReact,
  FaGithub,
  FaNpm
} from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiVite,
  SiFramer,
  SiVercel
} from "react-icons/si";

function About() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Hero Section */}
      <motion.div
        className="relative bg-gradient-to-br from-sky-50/70 via-white to-cyan-50/70 min-h-[60vh] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] pointer-events-none" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.p
            className="text-lg font-medium tracking-wide text-teal-700 uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About Us
          </motion.p>
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 text-slate-900"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Empowering Your <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Fitness Journey</span>
          </motion.h1>
          <motion.p
            className="text-xl leading-relaxed max-w-3xl mx-auto text-slate-600"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your trusted partner in achieving a healthier, stronger, and more active
            lifestyle. Track progress, get expert guidance, and unlock your full potential.
          </motion.p>
        </div>
      </motion.div>

      {/* Mission Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-slate-900">Our Mission</h2>
            <p className="text-lg text-slate-600">
              We believe in making fitness accessible, enjoyable, and sustainable for everyone.
              Through innovative tools and supportive community, we help you build lasting healthy habits.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaHeartbeat className="text-5xl text-rose-600" />,
                title: "Personalized Approach",
                description: "Customized workout and nutrition plans tailored to your unique goals and preferences."
              },
              {
                icon: <FaUsers className="text-5xl text-sky-600" />,
                title: "Expert Guidance",
                description: "Access to certified trainers and nutritionists for professional advice and support."
              },
              {
                icon: <FaChartLine className="text-5xl text-emerald-600" />,
                title: "Progress Tracking",
                description: "Comprehensive tools to monitor your achievements and celebrate milestones."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-center text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-slate-900">What Sets Us Apart</h2>
              <p className="text-lg text-slate-600">
                We combine cutting-edge technology with proven fitness methodologies to deliver
                an exceptional experience that helps you achieve your health and fitness goals.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: <FaDumbbell className="text-amber-600" />, text: "Science-backed workout programs" },
                  { icon: <FaAppleAlt className="text-emerald-600" />, text: "Nutritionist-designed meal plans" },
                  { icon: <FaUsers className="text-sky-600" />, text: "Supportive community environment" },
                  { icon: <FaStar className="text-yellow-600" />, text: "Premium quality resources" }
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    <span className="text-slate-600">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-200 to-cyan-200 rounded-2xl blur-3xl opacity-20" />
              <img
                src="/assets/hero/healthier.png"
                alt="Fitness Journey"
                className="relative z-10 w-full rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section - US005 */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-slate-900">Built with Modern Tech</h2>
            <p className="text-lg text-slate-600">
              Leveraging cutting-edge technologies to deliver a seamless fitness experience
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <FaReact className="text-[#61DAFB]" />, name: "React", desc: "UI Library" },
              { icon: <SiTypescript className="text-[#3178C6]" />, name: "TypeScript", desc: "Type-Safe Code" },
              { icon: <SiTailwindcss className="text-[#06B6D4]" />, name: "Tailwind CSS", desc: "Styling" },
              { icon: <SiVite className="text-[#646CFF]" />, name: "Vite", desc: "Build Tool" },
              { icon: <SiFramer className="text-[#BB4B96]" />, name: "Framer Motion", desc: "Animations" },
              { icon: <FaGithub className="text-slate-900" />, name: "GitHub", desc: "Version Control" },
              { icon: <FaNpm className="text-[#CB3837]" />, name: "NPM", desc: "Package Manager" },
              { icon: <SiVercel className="text-slate-900" />, name: "Vercel", desc: "Deployment" }
            ].map((tech, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4 flex justify-center">{tech.icon}</div>
                <h3 className="font-semibold text-slate-900">{tech.name}</h3>
                <p className="text-sm text-slate-600">{tech.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* GitHub Stats */}
          <motion.div
            className="mt-16 bg-white p-8 rounded-xl shadow-sm border border-slate-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Open Source", value: "MIT License" },
                { label: "Latest Release", value: "v1.0.0" },
                { label: "Last Updated", value: "April 2025" },
                { label: "Contributors", value: "5+" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                  <p className="text-lg font-semibold text-slate-900">{stat.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Developer Call to Action */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="https://github.com/yourusername/fitness-tracker"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors duration-300"
            >
              <FaGithub className="mr-2" />
              View on GitHub
            </a>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/public/assets/hero/healthier.png')] opacity-5 bg-cover bg-center mix-blend-overlay" />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="text-center">
            <motion.h2 
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Start Your Fitness Journey Today
            </motion.h2>
            <motion.p
              className="text-lg mb-12 max-w-2xl mx-auto text-slate-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Join thousands of others who have transformed their lives through our comprehensive
              fitness platform. Your journey to a healthier lifestyle starts here.
            </motion.p>
            <motion.a
              href="/work-out-now"
              className="inline-block bg-white px-12 py-4 rounded-lg text-slate-900 font-medium text-lg hover:bg-slate-100 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started Now
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;