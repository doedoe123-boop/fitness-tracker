import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../../utils/supabaseClient';
import DashboardNav from './layouts/ProtectedNav';
import ProgressAnalytics from '../components/ProgressAnalytics';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorState from '../components/ui/ErrorState';
import { FaDumbbell, FaChartLine, FaCalendarAlt, FaTrophy, FaFire, FaClock } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'activities'>('overview');
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          throw new Error(error.message);
        } else if (session && session.user) {
          setUser(session.user);
          // Only show welcome toast on first visit, not on every component mount
          const hasShownWelcome = sessionStorage.getItem('welcomeShown');
          if (!hasShownWelcome) {
            toast.success(`Welcome back, ${session.user.email?.split('@')[0]}! 👋`, {
              duration: 3000,
            });
            sessionStorage.setItem('welcomeShown', 'true');
          }
        } else {
          navigate('/login');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard');
        console.error('Error fetching session:', err);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [navigate]);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading your dashboard..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorState
          title="Failed to load dashboard"
          message={error}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  const quickStats = [
    {
      icon: <FaFire className="w-6 h-6 text-red-500" />,
      label: "Calories Burned",
      value: "530",
      unit: "kcal",
      change: "+12%",
      changeType: "positive" as const,
      color: "red"
    },
    {
      icon: <FaClock className="w-6 h-6 text-blue-500" />,
      label: "Active Time",
      value: "1h 45m",
      unit: "",
      change: "Daily target: 2h",
      changeType: "neutral" as const,
      color: "blue"
    },
    {
      icon: <FaDumbbell className="w-6 h-6 text-purple-500" />,
      label: "Workouts",
      value: "4",
      unit: "this week",
      change: "+2 from last week",
      changeType: "positive" as const,
      color: "purple"
    },
    {
      icon: <FaTrophy className="w-6 h-6 text-yellow-500" />,
      label: "Streak",
      value: "7",
      unit: "days",
      change: "Keep it up!",
      changeType: "positive" as const,
      color: "yellow"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      name: "Morning Yoga",
      duration: "30 minutes",
      calories: 120,
      time: "Today 7:00 AM",
      icon: <FaDumbbell className="w-5 h-5 text-purple-500" />
    },
    {
      id: 2,
      name: "Cardio Workout",
      duration: "45 minutes",
      calories: 280,
      time: "Yesterday 6:30 PM",
      icon: <FaFire className="w-5 h-5 text-red-500" />
    },
    {
      id: 3,
      name: "Strength Training",
      duration: "60 minutes",
      calories: 350,
      time: "Yesterday 9:00 AM",
      icon: <FaDumbbell className="w-5 h-5 text-blue-500" />
    }
  ];

  return (
    <>
      <DashboardNav userEmail={user?.email} />
      
      {/* Dashboard Content */}
      <div className="p-4 md:p-8 space-y-8">
        {/* Welcome Header */}
        <motion.div
          className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-6 md:p-8 rounded-2xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Welcome back, {user?.email?.split('@')[0]}! 🎯
              </h1>
              <p className="text-teal-100 text-lg">
                You're doing great! Let's keep up the momentum.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <motion.button
                onClick={() => navigate('/work-out-now')}
                className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Workout
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
          {[
            { id: 'overview', label: 'Overview', icon: <FaChartLine /> },
            { id: 'analytics', label: 'Analytics', icon: <FaTrophy /> },
            { id: 'activities', label: 'Activities', icon: <FaCalendarAlt /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-700 text-teal-600 dark:text-teal-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <span className="text-sm">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {quickStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-lg`}>
                      {stat.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      {stat.label}
                    </h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {stat.value} <span className="text-sm font-normal">{stat.unit}</span>
                    </p>
                    <p className={`text-xs ${
                      stat.changeType === 'positive' ? 'text-green-600 dark:text-green-400' :
                      'text-gray-500 dark:text-gray-400'
                    }`}>
                      {stat.change}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activities */}
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activities</h3>
                <button
                  onClick={() => navigate('/history')}
                  className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium text-sm"
                >
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    whileHover={{ x: 4 }}
                  >
                    <div className="p-2 bg-white dark:bg-gray-800 rounded-lg mr-4 shadow-sm">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{activity.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activity.duration} • {activity.calories} kcal • {activity.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProgressAnalytics />
          </motion.div>
        )}

        {activeTab === 'activities' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="text-center">
              <FaCalendarAlt className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Activity Calendar
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Coming soon! Track your daily activities and see patterns.
              </p>
              <button
                onClick={() => navigate('/work-out-now')}
                className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Start New Activity
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
