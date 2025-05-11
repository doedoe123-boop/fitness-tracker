import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaFire, FaClock, FaChartBar, FaFilter } from 'react-icons/fa';
import DashboardNav from './layouts/ProtectedNav';

interface WorkoutSession {
  id: string;
  exercise: string;
  duration: number;
  caloriesBurned: number;
  date: string;
}

const History: React.FC = () => {
  const [history, setHistory] = useState<WorkoutSession[]>(() => {
    const saved = localStorage.getItem('workoutHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'week' | 'month'>('all');

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateStats = () => {
    if (history.length === 0) return { total: 0, average: 0, calories: 0 };
    
    const totalDuration = history.reduce((acc, session) => acc + session.duration, 0);
    const totalCalories = history.reduce((acc, session) => acc + session.caloriesBurned, 0);
    
    return {
      total: totalDuration,
      average: Math.round(totalDuration / history.length),
      calories: Math.round(totalCalories)
    };
  };

  const filterHistory = (filter: 'all' | 'week' | 'month') => {
    const saved = localStorage.getItem('workoutHistory');
    const allHistory = saved ? JSON.parse(saved) : [];
    
    if (filter === 'all') return allHistory;

    const now = new Date();
    const cutoff = new Date();
    if (filter === 'week') {
      cutoff.setDate(now.getDate() - 7);
    } else if (filter === 'month') {
      cutoff.setMonth(now.getMonth() - 1);
    }

    return allHistory.filter((session: WorkoutSession) => {
      const sessionDate = new Date(session.date);
      return sessionDate >= cutoff;
    });
  };

  useEffect(() => {
    setHistory(filterHistory(selectedFilter));
  }, [selectedFilter]);

  const stats = calculateStats();

  return (
    <>
      <DashboardNav />
      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 text-transparent bg-clip-text">
            Workout History
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your fitness journey and see your progress over time
          </p>
        </div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-2">
              <FaClock className="text-blue-600 dark:text-blue-400" />
              <h3 className="text-gray-600 dark:text-gray-400">Total Time</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatTime(stats.total)}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-2">
              <FaChartBar className="text-purple-600 dark:text-purple-400" />
              <h3 className="text-gray-600 dark:text-gray-400">Average Session</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatTime(stats.average)}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-2">
              <FaFire className="text-orange-600 dark:text-orange-400" />
              <h3 className="text-gray-600 dark:text-gray-400">Total Calories</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.calories}
            </p>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center space-x-2">
            <FaFilter className="text-gray-500 dark:text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">Filter:</span>
          </div>
          {(['all', 'week', 'month'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Workout History List */}
        <div className="space-y-4">
          {history.length > 0 ? (
            history.map((session) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-3">
                    <FaCalendar className="text-teal-600 dark:text-teal-400" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{session.exercise}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{session.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaClock className="text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{formatTime(session.duration)}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaFire className="text-orange-600 dark:text-orange-400" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{Math.round(session.caloriesBurned)}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Calories</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 dark:text-gray-400 mb-4">No workout history found for this period</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Start a new workout to begin tracking your progress
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default History;