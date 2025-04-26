import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart, FaCode, FaDumbbell, FaBrain, FaUsers, FaMobileAlt } from 'react-icons/fa';
import Team1 from "../assets/team/1.jpg";
import Team2 from "../assets/team/2.jpg";
import Team3 from "../assets/team/3.jpg";

const features = [
  {
    icon: <FaDumbbell className="text-rose-600 dark:text-rose-500" />,
    title: 'Smart Workout Tracking',
    description: 'Advanced AI algorithms help track and optimize your workouts in real-time.'
  },
  {
    icon: <FaBrain className="text-purple-600 dark:text-purple-500" />,
    title: 'AI-Powered Recommendations',
    description: 'Personalized workout and nutrition recommendations based on your goals and progress.'
  },
  {
    icon: <FaUsers className="text-emerald-600 dark:text-emerald-500" />,
    title: 'Community Support',
    description: 'Connect with like-minded individuals and share your fitness journey.'
  },
  {
    icon: <FaMobileAlt className="text-sky-600 dark:text-sky-500" />,
    title: 'Cross-Platform',
    description: 'Access your fitness data seamlessly across all your devices.'
  }
];

const team = [
  {
    name: 'Alex Thompson',
    role: 'Lead Developer',
    image: Team1,
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    name: 'Sarah Chen',
    role: 'UI/UX Designer',
    image: Team2,
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Fitness Expert',
    image: Team3,
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  }
];

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-dark-secondary dark:via-dark-primary dark:to-dark-secondary pt-24">
      <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark opacity-[0.015] pointer-events-none" />
      
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            About Our Mission
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            We're passionate about making fitness tracking smarter, more intuitive, and accessible to everyone.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white dark:bg-dark-secondary p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Team Section */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">
            Meet Our Team
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            A passionate group of individuals dedicated to revolutionizing fitness tracking.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              className="bg-white dark:bg-dark-secondary rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 dark:border-slate-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1 text-slate-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">{member.role}</p>
                <div className="flex space-x-4">
                  {Object.entries(member.social).map(([platform, url]) => (
                    <motion.a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {platform === 'github' && <FaGithub />}
                      {platform === 'linkedin' && <FaLinkedin />}
                      {platform === 'twitter' && <FaTwitter />}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Values Section */}
        <motion.div
          className="bg-white dark:bg-dark-secondary rounded-2xl p-8 shadow-xl border border-slate-100 dark:border-slate-700 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-teal-50 dark:from-teal-900/20 to-transparent opacity-50" />
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-8">
              <FaHeart className="text-4xl text-rose-600 dark:text-rose-500" />
              <FaCode className="text-4xl text-slate-900 dark:text-white mx-4" />
              <FaDumbbell className="text-4xl text-teal-600 dark:text-teal-500" />
            </div>
            <h2 className="text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                'Building innovative solutions for fitness enthusiasts',
                'Creating a supportive and inclusive fitness community',
                'Continuously improving based on user feedback'
              ].map((value, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <p className="text-slate-600 dark:text-slate-300">{value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center max-w-2xl mx-auto mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">
            Join Our Journey
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            Be part of our mission to revolutionize fitness tracking and help people achieve their health goals.
          </p>
          <motion.a
            href="/work-out-now"
            className="inline-block bg-slate-900 dark:bg-slate-800 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Journey
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default About;