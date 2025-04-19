import React from 'react';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaBrain, FaRunning, FaAppleAlt, FaMoon, FaChartLine } from 'react-icons/fa';

const healthBenefits = [
  {
    icon: <FaHeartbeat className="text-rose-600 dark:text-rose-500" />,
    title: 'Cardiovascular Health',
    description: 'Regular exercise strengthens your heart and improves blood circulation, reducing the risk of heart disease.'
  },
  {
    icon: <FaBrain className="text-purple-600 dark:text-purple-500" />,
    title: 'Mental Well-being',
    description: 'Physical activity boosts mood, reduces stress, and improves cognitive function and memory.'
  },
  {
    icon: <FaRunning className="text-emerald-600 dark:text-emerald-500" />,
    title: 'Physical Fitness',
    description: 'Exercise improves strength, endurance, and flexibility, enhancing overall physical performance.'
  },
  {
    icon: <FaAppleAlt className="text-red-600 dark:text-red-500" />,
    title: 'Weight Management',
    description: 'Regular workouts help maintain a healthy weight by burning calories and boosting metabolism.'
  },
  {
    icon: <FaMoon className="text-indigo-600 dark:text-indigo-500" />,
    title: 'Better Sleep',
    description: 'Physical activity can improve sleep quality and help maintain a healthy sleep schedule.'
  },
  {
    icon: <FaChartLine className="text-sky-600 dark:text-sky-500" />,
    title: 'Disease Prevention',
    description: 'Regular exercise reduces the risk of various chronic diseases and strengthens the immune system.'
  }
];

const HealthImportance: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-dark-secondary dark:via-dark-primary dark:to-dark-secondary pt-24">
      <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark opacity-[0.015] pointer-events-none" />
      
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Why Health and Fitness Matter
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Discover the transformative power of regular exercise and healthy living on your physical and mental well-being.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {healthBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-dark-secondary p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="text-3xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">
                {benefit.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Statistics Section */}
        <motion.div
          className="bg-white dark:bg-dark-secondary rounded-2xl p-8 shadow-xl border border-slate-100 dark:border-slate-700 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-8 text-center text-slate-900 dark:text-white">
            The Impact of Regular Exercise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: '30%', label: 'Reduced Risk of Heart Disease' },
              { value: '50%', label: 'Improved Mental Well-being' },
              { value: '40%', label: 'Better Sleep Quality' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <p className="text-slate-600 dark:text-slate-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">
            Start Your Journey Today
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            Join thousands of others who have transformed their lives through regular exercise and healthy living.
          </p>
          <motion.a
            href="/work-out-now"
            className="inline-block bg-slate-900 dark:bg-slate-800 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Begin Your Fitness Journey
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default HealthImportance;