import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaAppleAlt, FaClock, FaWater, FaWeight, FaLeaf, FaShoppingBasket } from 'react-icons/fa';

interface DietTip {
  icon: JSX.Element;
  title: string;
  description: string;
  foodSuggestions: string[];
  mealPlan: { time: string; meal: string }[];
  category: 'nutrition' | 'timing' | 'planning';
}

const dietTips: DietTip[] = [
  {
    icon: <FaAppleAlt className="text-red-600 dark:text-red-500" />,
    title: 'Balanced Nutrition',
    description: 'Focus on eating a variety of whole foods to get all essential nutrients.',
    foodSuggestions: [
      'Lean proteins (chicken, fish, tofu)',
      'Complex carbs (quinoa, brown rice)',
      'Healthy fats (avocado, nuts)',
      'Colorful vegetables'
    ],
    mealPlan: [
      { time: '7:00 AM', meal: 'Oatmeal with berries and nuts' },
      { time: '10:00 AM', meal: 'Greek yogurt with honey' },
      { time: '1:00 PM', meal: 'Grilled chicken salad' },
      { time: '4:00 PM', meal: 'Apple with almond butter' },
      { time: '7:00 PM', meal: 'Salmon with quinoa' }
    ],
    category: 'nutrition'
  },
  {
    icon: <FaClock className="text-amber-600 dark:text-amber-500" />,
    title: 'Meal Timing',
    description: 'Optimize your meal timing to support your workout schedule and energy levels.',
    foodSuggestions: [
      'Pre-workout snacks',
      'Post-workout protein',
      'Slow-digesting evening meals',
      'Quick energy foods'
    ],
    mealPlan: [
      { time: '6:00 AM', meal: 'Banana with peanut butter' },
      { time: '9:00 AM', meal: 'Protein smoothie' },
      { time: '12:00 PM', meal: 'Turkey wrap' },
      { time: '3:00 PM', meal: 'Trail mix' },
      { time: '6:00 PM', meal: 'Lean protein with vegetables' }
    ],
    category: 'timing'
  },
  {
    icon: <FaWater className="text-sky-600 dark:text-sky-500" />,
    title: 'Hydration',
    description: 'Stay properly hydrated throughout the day to support workout performance.',
    foodSuggestions: [
      'Water-rich fruits',
      'Coconut water',
      'Herbal teas',
      'Electrolyte drinks'
    ],
    mealPlan: [
      { time: 'Morning', meal: '500ml water with lemon' },
      { time: 'Pre-workout', meal: '300ml water' },
      { time: 'During workout', meal: 'Sips as needed' },
      { time: 'Post-workout', meal: '500ml water' },
      { time: 'Throughout day', meal: '2L water' }
    ],
    category: 'planning'
  },
  {
    icon: <FaWeight className="text-purple-600 dark:text-purple-500" />,
    title: 'Portion Control',
    description: 'Learn to manage portion sizes to support your fitness goals effectively.',
    foodSuggestions: [
      'Palm-sized protein portions',
      'Fist-sized carb portions',
      'Thumb-sized fat portions',
      'Cup-sized veggie portions'
    ],
    mealPlan: [
      { time: 'Breakfast', meal: '1 protein + 1 carb + 1 fruit' },
      { time: 'Lunch', meal: '1 protein + 1 carb + 2 veggies' },
      { time: 'Snack', meal: '1 protein or fruit + 1 fat' },
      { time: 'Dinner', meal: '1 protein + 1 carb + 2 veggies' }
    ],
    category: 'planning'
  },
  {
    icon: <FaLeaf className="text-emerald-600 dark:text-emerald-500" />,
    title: 'Clean Eating',
    description: 'Focus on whole, unprocessed foods to fuel your body optimally.',
    foodSuggestions: [
      'Fresh fruits and vegetables',
      'Whole grains',
      'Lean proteins',
      'Healthy fats'
    ],
    mealPlan: [
      { time: 'Breakfast', meal: 'Veggie omelet with whole grain toast' },
      { time: 'Snack', meal: 'Fresh fruit and nuts' },
      { time: 'Lunch', meal: 'Buddha bowl with quinoa' },
      { time: 'Snack', meal: 'Hummus with vegetables' },
      { time: 'Dinner', meal: 'Grilled fish with roasted vegetables' }
    ],
    category: 'nutrition'
  },
  {
    icon: <FaShoppingBasket className="text-orange-600 dark:text-orange-500" />,
    title: 'Meal Prep',
    description: 'Plan and prepare your meals in advance for consistent healthy eating.',
    foodSuggestions: [
      'Batch-cooked proteins',
      'Pre-cut vegetables',
      'Portioned snacks',
      'Ready-to-blend smoothie packs'
    ],
    mealPlan: [
      { time: 'Sunday', meal: 'Prep proteins and vegetables' },
      { time: 'Sunday', meal: 'Portion out snacks' },
      { time: 'Wednesday', meal: 'Mid-week prep refresh' },
      { time: 'Daily', meal: 'Pack prepared meals' }
    ],
    category: 'planning'
  }
];

const DietTips: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'nutrition' | 'timing' | 'planning'>('all');
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  const filteredTips = selectedCategory === 'all' 
    ? dietTips 
    : dietTips.filter(tip => tip.category === selectedCategory);

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
            Diet & Nutrition Tips
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Fuel your fitness journey with expert nutrition guidance and meal planning tips.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['all', 'nutrition', 'timing', 'planning'].map((category) => (
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
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-3xl">{tip.icon}</div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {tip.title}
                  </h3>
                </div>
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
                      <div className="mt-4 space-y-4">
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white mb-2">
                            Recommended Foods:
                          </h4>
                          <ul className="space-y-2">
                            {tip.foodSuggestions.map((food, idx) => (
                              <motion.li
                                key={idx}
                                className="flex items-start space-x-2 text-slate-600 dark:text-slate-300"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                              >
                                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 bg-teal-600 dark:bg-teal-400" />
                                <span>{food}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white mb-2">
                            Sample Schedule:
                          </h4>
                          <ul className="space-y-2">
                            {tip.mealPlan.map((meal, idx) => (
                              <motion.li
                                key={idx}
                                className="flex items-start justify-between text-slate-600 dark:text-slate-300"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                              >
                                <span className="font-medium">{meal.time}</span>
                                <span className="text-right">{meal.meal}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
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
            Ready to Transform Your Diet?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            Start implementing these nutrition tips alongside your workout routine for optimal results.
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

export default DietTips;