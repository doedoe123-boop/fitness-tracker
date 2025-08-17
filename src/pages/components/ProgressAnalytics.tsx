import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFire, FaClock, FaTrophy, FaChartLine, FaCalendarAlt, FaBullseye } from 'react-icons/fa';
import { StatCardSkeleton } from './ui/Skeleton';
import toast from 'react-hot-toast';

interface ProgressData {
  totalWorkouts: number;
  totalMinutes: number;
  caloriesBurned: number;
  currentStreak: number;
  weeklyGoal: number;
  weeklyProgress: number;
  monthlyStats: {
    workouts: number;
    minutes: number;
    calories: number;
  };
}

interface ProgressAnalyticsProps {
  loading?: boolean;
}

export const ProgressAnalytics = ({ loading = false }: ProgressAnalyticsProps) => {
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');

  useEffect(() => {
    // Simulate loading data
    const loadProgressData = async () => {
      // Get data from localStorage or API
      const workoutHistory = JSON.parse(localStorage.getItem('workoutHistory') || '[]');
      
      const mockData: ProgressData = {
        totalWorkouts: workoutHistory.length || 47,
        totalMinutes: workoutHistory.reduce((sum: number, w: any) => sum + (w.duration || 30), 0) || 2340,
        caloriesBurned: workoutHistory.reduce((sum: number, w: any) => sum + (w.caloriesBurned || 150), 0) || 15670,
        currentStreak: 7,
        weeklyGoal: 5,
        weeklyProgress: 4,
        monthlyStats: {
          workouts: 18,
          minutes: 720,
          calories: 4250
        }
      };

      setTimeout(() => {
        setProgressData(mockData);
      }, 1000);
    };

    loadProgressData();
  }, []);

  const handleGoalUpdate = () => {
    toast.success('Goal updated successfully! 🎯', {
      duration: 3000,
      style: {
        borderRadius: '10px',
        background: '#10b981',
        color: '#fff',
      },
    });
  };

  if (loading || !progressData) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <StatCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  const stats = [
    {
      icon: <FaTrophy className="w-6 h-6 text-yellow-500" />,
      label: 'Total Workouts',
      value: progressData.totalWorkouts.toString(),
      subtitle: 'All time',
      color: 'yellow'
    },
    {
      icon: <FaClock className="w-6 h-6 text-blue-500" />,
      label: 'Total Time',
      value: `${Math.floor(progressData.totalMinutes / 60)}h ${progressData.totalMinutes % 60}m`,
      subtitle: 'Exercise time',
      color: 'blue'
    },
    {
      icon: <FaFire className="w-6 h-6 text-red-500" />,
      label: 'Calories Burned',
      value: progressData.caloriesBurned.toLocaleString(),
      subtitle: 'Total calories',
      color: 'red'
    },
    {
      icon: <FaChartLine className="w-6 h-6 text-green-500" />,
      label: 'Current Streak',
      value: `${progressData.currentStreak} days`,
      subtitle: 'Keep it up!',
      color: 'green'
    },
    {
      icon: <FaBullseye className="w-6 h-6 text-purple-500" />,
      label: 'Weekly Goal',
      value: `${progressData.weeklyProgress}/${progressData.weeklyGoal}`,
      subtitle: 'Workouts this week',
      color: 'purple'
    },
    {
      icon: <FaCalendarAlt className="w-6 h-6 text-indigo-500" />,
      label: 'This Month',
      value: progressData.monthlyStats.workouts.toString(),
      subtitle: 'Workouts completed',
      color: 'indigo'
    }
  ];

  const progressPercentage = (progressData.weeklyProgress / progressData.weeklyGoal) * 100;

  return (
    <div className="space-y-8">
      {/* Period Selector */}
      <div className="flex justify-center space-x-2">
        {(['week', 'month', 'year'] as const).map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
              selectedPeriod === period
                ? 'bg-teal-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Weekly Progress Ring */}
      <motion.div
        className="flex justify-center mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200 dark:text-gray-700"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - progressPercentage / 100)}`}
              className="text-teal-500 transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {Math.round(progressPercentage)}%
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Weekly Goal
            </span>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-white dark:bg-dark-secondary p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/30`}>
                {stat.icon}
              </div>
              {stat.label === 'Weekly Goal' && (
                <button
                  onClick={handleGoalUpdate}
                  className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Edit
                </button>
              )}
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                {stat.label}
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {stat.subtitle}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Achievement Badges */}
      <motion.div
        className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 p-6 rounded-xl border border-teal-200 dark:border-teal-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <FaTrophy className="w-5 h-5 text-yellow-500 mr-2" />
          Recent Achievements
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'First Workout', description: 'Complete your first workout' },
            { name: '7-Day Streak', description: 'Workout for 7 consecutive days' },
            { name: 'Early Bird', description: 'Workout before 8 AM' },
            { name: 'Calorie Crusher', description: 'Burn 500+ calories in one session' }
          ].map((achievement) => (
            <div
              key={achievement.name}
              className="text-center p-4 bg-white/60 dark:bg-dark-secondary/60 rounded-lg"
            >
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                <FaTrophy className="w-6 h-6 text-yellow-500" />
              </div>
              <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-1">
                {achievement.name}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProgressAnalytics;
