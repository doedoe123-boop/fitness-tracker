import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import Sidebar from './Sidebar';
import { useSidebar } from '../../components/SidebarProvider';

const ProtectedLayout: React.FC = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar Toggle Button for Mobile */}
      <motion.button
        className="md:hidden fixed bottom-6 right-6 z-50 bg-blue-600 dark:bg-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleSidebar}
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
              onClick={toggleSidebar}
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
      <main className="flex-1 min-w-0 relative transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
}

export default ProtectedLayout;