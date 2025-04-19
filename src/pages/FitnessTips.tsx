import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDumbbell, FaHeart, FaClock, FaLeaf, FaRunning, FaBrain } from 'react-icons/fa';

interface Tip {
  icon: JSX.Element;
  title: string;
  description: string;
  details: string[];
  category: 'beginner' | 'intermediate' | 'advanced';
}

const fitnessTips: Tip[] = [
  {
    icon: <FaDumbbell className="text-amber-600 dark:text-amber-500" />,
    title: 'Proper Form',
    description: 'Master the basics of proper exercise form to maximize results and prevent injuries.',
    details: [
      'Keep your back straight during lifts',
      'Engage your core muscles',
      'Control your breathing',
      'Start with lighter weights to perfect form'
    ],
    category: 'beginner'
  },
  {
    icon: <FaHeart className="text-rose-600 dark:text-rose-500" />,
    title: 'Recovery Time',
    description: 'Allow adequate rest between workouts for optimal muscle recovery and growth.',
    details: [
      'Sleep 7-9 hours per night',
      'Take rest days between intense workouts',
      'Stay hydrated during recovery',
      'Consider active recovery activities'
    ],
    category: 'intermediate'
  },
  {
    icon: <FaClock className="text-sky-600 dark:text-sky-500" />,
    title: 'Workout Timing',
    description: 'Plan your workouts at optimal times to maximize your energy and results.',
    details: [
      'Morning workouts boost metabolism',
      'Evening workouts can improve strength',
      'Stay consistent with your schedule',
      'Allow 2-3 hours after meals'
    ],
    category: 'beginner'
  },
  {
    icon: <FaLeaf className="text-emerald-600 dark:text-emerald-500" />,
    title: 'Nutrition',
    description: 'Fuel your body properly before and after workouts for better performance.',
    details: [
      'Eat protein within 30 minutes post-workout',
      'Stay hydrated throughout the day',
      'Plan pre-workout meals carefully',
      'Consider healthy supplements'
    ],
    category: 'intermediate'
  },
  {
    icon: <FaRunning className="text-indigo-600 dark:text-indigo-500" />,
    title: 'Progressive Overload',
    description: 'Gradually increase workout intensity to continue seeing improvements.',
    details: [
      'Increase weights systematically',
      'Add more repetitions over time',
      'Vary exercise intensity',
      'Track your progress'
    ],
    category: 'advanced'
  },
  {
    icon: <FaBrain className="text-purple-600 dark:text-purple-500" />,
    title: 'Mind-Body Connection',
    description: 'Focus on the mind-muscle connection to enhance workout effectiveness.',
    details: [
      'Practice mindful exercise',
      'Visualize your movements',
      'Stay focused during workouts',
      'Set clear intentions'
    ],
    category: 'advanced'
  }
];

const FitnessTips: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  const filteredTips = selectedCategory === 'all' 
    ? fitnessTips 
    : fitnessTips.filter(tip => tip.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'beginner':
        return 'text-emerald-600 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20';
      case 'intermediate':
        return 'text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-900/20';
      case 'advanced':
        return 'text-rose-600 dark:text-rose-500 bg-rose-50 dark:bg-rose-900/20';
      default:
        return 'text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800';
    }
  };

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
            Essential Fitness Tips
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Expert guidance to help you achieve your fitness goals safely and effectively.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['all', 'beginner', 'intermediate', 'advanced'].map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category as any)}
              className={`px-6 py-2 rounded-lg font-medium capitalize transition-colors ${
                selectedCategory === category
                  ? 'bg-slate-900 dark:bg-slate-800 text-white'
                  : 'bg-white dark:bg-dark-secondary text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-dark-accent'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTips.map((tip, index) => (
            <motion.div
              key={tip.title}
              className="bg-white dark:bg-dark-secondary rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 dark:border-slate-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{tip.icon}</div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${getCategoryColor(tip.category)}`}>
                    {tip.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">
                  {tip.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  {tip.description}
                </p>
                <motion.button
                  onClick={() => setExpandedTip(expandedTip === tip.title ? null : tip.title)}
                  className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium text-sm"
                  whileTap={{ scale: 0.95 }}
                >
                  {expandedTip === tip.title ? 'Show Less' : 'Learn More'}
                </motion.button>

                <AnimatePresence>
                  {expandedTip === tip.title && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-4 space-y-2">
                        {tip.details.map((detail, index) => (
                          <motion.li
                            key={index}
                            className="flex items-start space-x-2 text-slate-600 dark:text-slate-300"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 bg-teal-600 dark:bg-teal-400" />
                            <span>{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center max-w-2xl mx-auto mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">
            Ready to Put These Tips into Action?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            Start applying these fitness tips today and track your progress with our comprehensive tools.
          </p>
          <motion.a
            href="/work-out-now"
            className="inline-block bg-slate-900 dark:bg-slate-800 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Workout
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default FitnessTips;