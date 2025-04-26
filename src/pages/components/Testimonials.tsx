import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import Testimonial1 from "../../assets/testimonial/1.jpg";
import Testimonial2 from "../../assets/testimonial/2.jpg";
import Testimonial4 from "../../assets/testimonial/4.jpg";


interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
  achievement: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Fitness Enthusiast",
    avatar: Testimonial1,
    comment: "The AI-powered workout recommendations have completely transformed my fitness journey. I've seen more progress in 3 months than I did in a year of working out on my own.",
    rating: 5,
    achievement: "Lost 30 lbs in 3 months"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Software Developer",
    avatar: Testimonial4,
    comment: "As someone with a busy schedule, the flexible workout plans and progress tracking features have made it easy to stay consistent with my fitness goals.",
    rating: 5,
    achievement: "Gained 15 lbs muscle mass"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marathon Runner",
    avatar: Testimonial2,
    comment: "The nutrition guidance and workout tracking have helped me optimize my training. I've improved my marathon time by 15 minutes!",
    rating: 5,
    achievement: "Improved endurance by 40%"
  }
];

const Testimonials: React.FC = () => {
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
            Success Stories
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Discover how our app has helped people achieve their fitness goals and transform their lives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white dark:bg-dark-secondary rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 relative border border-slate-100 dark:border-slate-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FaQuoteLeft className="text-2xl text-teal-600/20 dark:text-teal-400/20 absolute top-6 right-6" />
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <motion.div
                    className="absolute -bottom-2 -right-2 bg-teal-600 dark:bg-teal-500 text-white text-xs px-2 py-1 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    ★ {testimonial.rating}.0
                  </motion.div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-slate-600 dark:text-slate-300 italic">
                  "{testimonial.comment}"
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex space-x-1">
                  {Array(testimonial.rating).fill(null).map((_, i) => (
                    <FaStar key={i} className="text-amber-400 dark:text-amber-500" />
                  ))}
                </div>
                <div className="text-sm font-medium text-teal-600 dark:text-teal-400">
                  {testimonial.achievement}
                </div>
              </div>

              <div className="absolute -bottom-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-teal-600/20 dark:via-teal-400/20 to-transparent" />
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
            href="/about"
            className="inline-flex items-center space-x-2 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium"
            whileHover={{ x: 5 }}
          >
            <span>Read More Success Stories</span>
            <span>→</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;