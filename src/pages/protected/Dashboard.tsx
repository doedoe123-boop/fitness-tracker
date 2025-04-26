import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { supabase } from '../../utils/supabaseClient';
import Sidebar from '../components/layouts/Sidebar';
import DashboardNav from '../components/layouts/ProtectedNav';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error fetching session:', error);
      } else if (session && session.user) {
        setUser(session.user);
      } else {
        navigate('/login');
      }
      setLoading(false);
    };

    getUser();

    // Handle sidebar on window resize
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="animate-pulse text-blue-600 dark:text-blue-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar Toggle Button for Mobile */}
      <motion.button
        className="md:hidden fixed bottom-6 right-6 z-50 bg-blue-600 dark:bg-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
      </motion.button>

      {/* Sidebar with Animation */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <>
            {/* Overlay for mobile */}
            <motion.div
              className="fixed inset-0 bg-black/20 dark:bg-black/40 z-20 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
            />
            
            {/* Sidebar */}
            <motion.div
              className="fixed md:sticky top-0 h-screen z-30"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <Sidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={`flex-1 min-w-0 relative transition-all duration-300`}>
        <DashboardNav userEmail={user?.email} />
        
        {/* Dashboard Grid */}
        <div className="p-4 md:p-8 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 dark:border-blue-900">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Calories Burned</h3>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold mt-4 text-blue-600 dark:text-blue-400">530 kcal</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">+12% from yesterday</p>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 dark:border-blue-900">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Steps Today</h3>
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold mt-4 text-green-600 dark:text-green-400">7,832</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">78% of daily goal</p>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 dark:border-blue-900">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Active Time</h3>
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold mt-4 text-purple-600 dark:text-purple-400">1h 45m</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Daily target: 2h</p>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-blue-100 dark:border-blue-900">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Workout Progress</h3>
              <div className="h-64 flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Charts coming soon...</p>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-blue-100 dark:border-blue-900">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Recent Activities</h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">Morning Yoga</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">30 minutes • 120 kcal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
