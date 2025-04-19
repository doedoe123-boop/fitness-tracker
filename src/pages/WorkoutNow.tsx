import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaClock, FaFire, FaChartLine, FaHistory, FaTrophy, FaDumbbell } from 'react-icons/fa';
import WorkoutHistory from './components/WorkoutHistory';
import type { WorkoutSession } from './components/WorkoutHistory';
import BodyExercise from './components/BodyExercise';
import { exerciseCategories } from './data/exercises';
import FitnessGoals from './components/FitnessGoals';

interface ExerciseCategory {
  category: string;
  exercises: string[];
}

const WorkoutNow: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'workout' | 'history' | 'goals'>('workout');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [workoutStartTime, setWorkoutStartTime] = useState<Date | null>(null);
  const [caloriesBurned, setCaloriesBurned] = useState<number>(0);
  const [workoutDuration, setWorkoutDuration] = useState<number>(0);
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutSession[]>(() => {
    const saved = localStorage.getItem('workoutHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (workoutStartTime) {
      timer = setInterval(() => {
        const duration = Math.floor((Date.now() - workoutStartTime.getTime()) / 1000);
        setWorkoutDuration(duration);
        // Estimate calories burned (simplified calculation)
        setCaloriesBurned(Math.floor(duration * 0.1));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [workoutStartTime]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-dark-secondary dark:via-dark-primary dark:to-dark-secondary pt-24">
      <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark opacity-[0.015] pointer-events-none" />
      
      <div className="container mx-auto px-6 py-12">
        {/* Page Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Work Out Now
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Choose your workout category and start your fitness journey today.
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          {[
            { id: 'workout', label: 'Workout', icon: <FaDumbbell /> },
            { id: 'history', label: 'History', icon: <FaHistory /> },
            { id: 'goals', label: 'Goals', icon: <FaTrophy /> }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-slate-900 dark:bg-slate-800 text-white'
                  : 'bg-white dark:bg-dark-secondary text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-dark-accent'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Active Workout Stats */}
        {workoutStartTime && activeTab === 'workout' && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {[
              { icon: <FaClock className="text-sky-600 dark:text-sky-500" />, label: 'Duration', value: formatTime(workoutDuration) },
              { icon: <FaFire className="text-orange-600 dark:text-orange-500" />, label: 'Calories', value: `${caloriesBurned} kcal` },
              { icon: <FaChartLine className="text-emerald-600 dark:text-emerald-500" />, label: 'Intensity', value: 'Moderate' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-white dark:bg-dark-secondary p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="text-2xl">{stat.icon}</div>
                  <div className="text-right">
                    <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'workout' && (
            <motion.div
              key="workout"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Category Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {exerciseCategories.map((category: ExerciseCategory, index) => (
                  <motion.button
                    key={category.category}
                    onClick={() => setSelectedCategory(
                      selectedCategory === category.category ? null : category.category
                    )}
                    className={`p-6 rounded-xl text-left transition-all ${
                      selectedCategory === category.category
                        ? 'bg-slate-900 dark:bg-slate-800 text-white'
                        : 'bg-white dark:bg-dark-secondary text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-dark-accent'
                    } border border-slate-100 dark:border-slate-700`}
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h3 className="text-xl font-semibold mb-2">{category.category}</h3>
                    <p className={`text-sm ${
                      selectedCategory === category.category
                        ? 'text-slate-300 dark:text-slate-400'
                        : 'text-slate-600 dark:text-slate-300'
                    }`}>
                      {category.category} exercises
                    </p>
                  </motion.button>
                ))}
              </div>

              {/* Exercise List */}
              {selectedCategory && (
                <BodyExercise
                  exercises={exerciseCategories.find(cat => cat.category === selectedCategory)?.exercises || []}
                  category={selectedCategory}
                />
              )}

              {/* Workout Controls */}
              <motion.div
                className="fixed bottom-8 right-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <motion.button
                  onClick={() => {
                    if (workoutStartTime) {
                      // Save workout session when ending
                      const newSession: WorkoutSession = {
                        id: Date.now().toString(),
                        exercise: selectedCategory || 'General Workout',
                        duration: workoutDuration,
                        caloriesBurned: caloriesBurned,
                        date: new Date().toLocaleDateString()
                      };
                      const updatedHistory = [...workoutHistory, newSession];
                      setWorkoutHistory(updatedHistory);
                      localStorage.setItem('workoutHistory', JSON.stringify(updatedHistory));
                      setWorkoutStartTime(null);
                    } else {
                      setWorkoutStartTime(new Date());
                    }
                  }}
                  className={`px-8 py-4 rounded-full font-medium text-white shadow-lg ${
                    workoutStartTime
                      ? 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600'
                      : 'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {workoutStartTime ? 'End Workout' : 'Start Workout'}
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <WorkoutHistory history={workoutHistory} />
            </motion.div>
          )}

          {activeTab === 'goals' && (
            <motion.div
              key="goals"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <FitnessGoals />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WorkoutNow;
