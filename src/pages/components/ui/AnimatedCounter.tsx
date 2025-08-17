import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CounterProps {
  end: number;
  label: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
}

export const AnimatedCounter = ({ 
  end, 
  label, 
  prefix = "", 
  suffix = "", 
  duration = 2, 
  delay = 0 
}: CounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let startTime: number;
      let animationFrame: number;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeOutCubic * end));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [end, duration, delay]);

  return (
    <motion.div
      className="text-center p-6 bg-white/80 dark:bg-dark-secondary/80 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, duration: 0.6 }}
    >
      <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
        {label}
      </div>
    </motion.div>
  );
};

export const StatsGrid = () => {
  const stats = [
    { end: 50000, label: "Active Users", suffix: "+" },
    { end: 2500, label: "Workouts Completed", suffix: "K+" },
    { end: 98, label: "Success Rate", suffix: "%" },
    { end: 150, label: "Expert Trainers", suffix: "+" }
  ];

  return (
    <motion.div
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      {stats.map((stat, index) => (
        <AnimatedCounter
          key={stat.label}
          end={stat.end}
          label={stat.label}
          suffix={stat.suffix}
          delay={1.2 + (index * 0.2)}
          duration={2.5}
        />
      ))}
    </motion.div>
  );
};

export default AnimatedCounter;
