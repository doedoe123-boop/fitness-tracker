import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaDumbbell, FaChartLine, FaHistory, FaTrophy, FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  color: string;
  description: string;
}

export const QuickActionsFAB = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const quickActions: QuickAction[] = [
    {
      id: 'workout',
      label: 'Start Workout',
      icon: <FaDumbbell className="w-5 h-5" />,
      path: '/work-out-now',
      color: 'bg-green-500 hover:bg-green-600',
      description: 'Begin your fitness session'
    },
    {
      id: 'progress',
      label: 'View Progress',
      icon: <FaChartLine className="w-5 h-5" />,
      path: '/dashboard',
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'Check your statistics'
    },
    {
      id: 'history',
      label: 'Workout History',
      icon: <FaHistory className="w-5 h-5" />,
      path: '/history',
      color: 'bg-purple-500 hover:bg-purple-600',
      description: 'Review past workouts'
    },
    {
      id: 'goals',
      label: 'Set Goals',
      icon: <FaTrophy className="w-5 h-5" />,
      path: '/goals',
      color: 'bg-yellow-500 hover:bg-yellow-600',
      description: 'Define your targets'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <FaCog className="w-5 h-5" />,
      path: '/settings',
      color: 'bg-gray-500 hover:bg-gray-600',
      description: 'Manage preferences'
    }
  ];

  const handleActionClick = (action: QuickAction) => {
    setIsOpen(false);
    
    // Show a quick toast
    toast.success(`Opening ${action.label}...`, {
      duration: 2000,
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
    
    // Navigate to the path
    navigate(action.path);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {/* Quick Action Buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="flex flex-col space-y-3 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {quickActions.map((action, index) => (
              <motion.button
                key={action.id}
                onClick={() => handleActionClick(action)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-full text-white shadow-lg transition-all duration-200 group ${action.color}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, x: 10 }}
                whileTap={{ scale: 0.95 }}
                title={action.description}
              >
                <span className="flex-shrink-0">{action.icon}</span>
                <span className="font-medium whitespace-nowrap">{action.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600 rotate-45' 
            : 'bg-teal-500 hover:bg-teal-600'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isOpen ? 'Close quick actions' : 'Open quick actions'}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FaPlus className="w-6 h-6" />
        </motion.div>
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuickActionsFAB;
