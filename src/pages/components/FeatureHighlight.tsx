import React from 'react';
import { motion } from 'framer-motion';
import { FaDumbbell, FaChartLine, FaHeart, FaBrain } from 'react-icons/fa';

const features = [
  {
    icon: <FaDumbbell className="text-rose-600 dark:text-rose-500" />,
    title: 'Smart Workout Tracking',
    description: 'Track your workouts with intelligent recognition and form analysis.'
  },
  {
    icon: <FaChartLine className="text-emerald-600 dark:text-emerald-500" />,
    title: 'Progress Analytics',
    description: 'Visualize your fitness journey with detailed progress tracking and insights.'
  },
  {
    icon: <FaHeart className="text-purple-600 dark:text-purple-500" />,
    title: 'Health Monitoring',
    description: 'Keep track of vital health metrics and get personalized recommendations.'
  },
  {
    icon: <FaBrain className="text-sky-600 dark:text-sky-500" />,
    title: 'AI-Powered Guidance',
    description: 'Receive intelligent workout suggestions based on your goals and progress.'
  }
];

const FeatureHighlight: React.FC = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-dark-secondary dark:via-dark-primary dark:to-dark-secondary" />
      <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark opacity-[0.015]" />
      
      <div className="container mx-auto px-6 relative">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
            Intelligent Fitness Tracking
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Our AI-powered platform helps you achieve your fitness goals with smart features and personalized guidance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white dark:bg-dark-secondary rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
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
    </section>
  );
};

export default FeatureHighlight;