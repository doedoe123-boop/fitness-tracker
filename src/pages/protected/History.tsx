import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaFire, FaClock, FaChartBar, FaFilter, FaTrash, FaTrophy, FaDownload } from 'react-icons/fa';
import DashboardNav from './layouts/ProtectedNav';
import { supabase } from '../../utils/supabaseClient';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';
import toast from 'react-hot-toast';
import AnimatedCounter from '../components/ui/AnimatedCounter';

interface WorkoutSession {
  id: string;
  exercise: string;
  duration: number;
  caloriesBurned: number;
  date: string;
}

const History: React.FC = () => {
  const [history, setHistory] = useState<WorkoutSession[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'week' | 'month'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    const loadWorkoutHistory = async () => {
      try {
        setError('');
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUserEmail(session.user.email || '');
          
          // Try to load from database first
          const { data, error: dbError } = await supabase
            .from('workout_history')
            .select('*')
            .eq('user_id', session.user.id)
            .order('created_at', { ascending: false });

          if (dbError && dbError.code !== 'PGRST116') {
            throw dbError;
          }

          if (data && data.length > 0) {
            const formattedHistory = data.map(item => ({
              id: item.id,
              exercise: item.exercise_name,
              duration: item.duration_seconds,
              caloriesBurned: item.calories_burned,
              date: new Date(item.created_at).toLocaleDateString()
            }));
            setHistory(formattedHistory);
          } else {
            // Fallback to localStorage
            const saved = localStorage.getItem('workoutHistory');
            const localHistory = saved ? JSON.parse(saved) : [];
            setHistory(localHistory);
          }
        }
      } catch (error: any) {
        console.error('Error loading workout history:', error);
        setError(error.message || 'Failed to load workout history');
        
        // Fallback to localStorage on error
        const saved = localStorage.getItem('workoutHistory');
        const localHistory = saved ? JSON.parse(saved) : [];
        setHistory(localHistory);
        
        // Only show toast if no local history exists
        if (localHistory.length === 0) {
          console.warn('No workout history found in database or localStorage');
        }
      } finally {
        setLoading(false);
      }
    };

    loadWorkoutHistory();
  }, []);

  const deleteWorkout = async (workoutId: string) => {
    if (!window.confirm('Are you sure you want to delete this workout?')) {
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { error } = await supabase
          .from('workout_history')
          .delete()
          .eq('id', workoutId)
          .eq('user_id', session.user.id);

        if (error) throw error;
      }

      // Update local state
      setHistory(prev => prev.filter(workout => workout.id !== workoutId));
      
      // Update localStorage
      const updated = history.filter(workout => workout.id !== workoutId);
      localStorage.setItem('workoutHistory', JSON.stringify(updated));
      
      toast.success('Workout deleted successfully');
    } catch (error: any) {
      console.error('Error deleting workout:', error);
      toast.error('Failed to delete workout');
    }
  };

  const exportData = () => {
    if (history.length === 0) {
      toast.error('No workout data to export');
      return;
    }

    const csvContent = [
      ['Date', 'Exercise', 'Duration (min)', 'Calories Burned'].join(','),
      ...history.map(session => [
        session.date,
        session.exercise,
        Math.round(session.duration / 60),
        Math.round(session.caloriesBurned)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `workout-history-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
    
    toast.success('Workout history exported successfully');
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateStats = (workoutData: WorkoutSession[]) => {
    if (workoutData.length === 0) return { total: 0, average: 0, calories: 0, sessions: 0 };
    
    const totalDuration = workoutData.reduce((acc, session) => acc + session.duration, 0);
    const totalCalories = workoutData.reduce((acc, session) => acc + session.caloriesBurned, 0);
    
    return {
      total: totalDuration,
      average: Math.round(totalDuration / workoutData.length),
      calories: Math.round(totalCalories),
      sessions: workoutData.length
    };
  };

  const getFilteredHistory = () => {
    if (selectedFilter === 'all') return history;

    const now = new Date();
    const cutoff = new Date();
    if (selectedFilter === 'week') {
      cutoff.setDate(now.getDate() - 7);
    } else if (selectedFilter === 'month') {
      cutoff.setMonth(now.getMonth() - 1);
    }

    return history.filter((session: WorkoutSession) => {
      const sessionDate = new Date(session.date);
      return sessionDate >= cutoff;
    });
  };

  const filteredHistory = getFilteredHistory();
  const stats = calculateStats(filteredHistory);

  if (loading) {
    return (
      <>
        <DashboardNav userEmail={userEmail} />
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <LoadingSpinner />
          </div>
        </div>
      </>
    );
  }

  if (error && history.length === 0) {
    return (
      <>
        <DashboardNav userEmail={userEmail} />
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          <ErrorState
            title="Failed to load workout history"
            message={error}
            onRetry={() => window.location.reload()}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <DashboardNav userEmail={userEmail} />
      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 text-transparent bg-clip-text">
              Workout History
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track your fitness journey and see your progress over time
            </p>
          </div>
          {filteredHistory.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={exportData}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors"
            >
              <FaDownload />
              <span>Export CSV</span>
            </motion.button>
          )}
        </div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 md:space-x-3 mb-2">
              <FaTrophy className="text-yellow-600 dark:text-yellow-400 text-lg md:text-xl" />
              <h3 className="text-gray-600 dark:text-gray-400 text-sm md:text-base">Sessions</h3>
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              <AnimatedCounter end={stats.sessions} label="" />
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 md:space-x-3 mb-2">
              <FaClock className="text-blue-600 dark:text-blue-400 text-lg md:text-xl" />
              <h3 className="text-gray-600 dark:text-gray-400 text-sm md:text-base">Total Time</h3>
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              {formatTime(stats.total)}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 md:space-x-3 mb-2">
              <FaChartBar className="text-purple-600 dark:text-purple-400 text-lg md:text-xl" />
              <h3 className="text-gray-600 dark:text-gray-400 text-sm md:text-base">Average</h3>
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              {formatTime(stats.average)}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 md:space-x-3 mb-2">
              <FaFire className="text-orange-600 dark:text-orange-400 text-lg md:text-xl" />
              <h3 className="text-gray-600 dark:text-gray-400 text-sm md:text-base">Calories</h3>
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              <AnimatedCounter end={stats.calories} label="" />
            </p>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
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
          {filteredHistory.length > 0 ? (
            filteredHistory.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -2 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
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
                  <div className="text-center">
                    <div className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                      Completed
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteWorkout(session.id)}
                      className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      title="Delete workout"
                    >
                      <FaTrash />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <EmptyState
              title="No workout history found"
              description={selectedFilter === 'all' 
                ? "Start your first workout to begin tracking your progress"
                : `No workouts found for the selected ${selectedFilter} period`
              }
              action={
                selectedFilter !== 'all' ? (
                  <button
                    onClick={() => setSelectedFilter('all')}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Show All History
                  </button>
                ) : undefined
              }
            />
          )}
        </div>
      </div>
    </>
  );
};

export default History;