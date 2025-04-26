import React from "react";
import { FaHeartbeat, FaDumbbell, FaChartLine, FaUser, FaHistory, FaCog } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: "/dashboard", icon: <FaChartLine />, label: "Dashboard" },
    { path: "/workouts", icon: <FaDumbbell />, label: "Workouts" },
    { path: "/history", icon: <FaHistory />, label: "History" },
    { path: "/profile", icon: <FaUser />, label: "Profile" },
    { path: "/settings", icon: <FaCog />, label: "Settings" }
  ];

  return (
    <aside className="w-[280px] md:w-64 h-screen overflow-y-auto bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm p-6 space-y-8 border-r border-blue-100 dark:border-blue-900/30 flex flex-col">
      <motion.div 
        className="flex items-center space-x-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <FaHeartbeat className="text-2xl text-blue-600 dark:text-blue-400" />
        </motion.div>
        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 text-transparent bg-clip-text">
          Fitnesses
        </span>
      </motion.div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group
                ${location.pathname === item.path 
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
            >
              <span className="text-lg transition-transform group-hover:scale-110">
                {item.icon}
              </span>
              <span className="font-medium">{item.label}</span>
            </Link>
          </motion.div>
        ))}
      </nav>

      <div className="pt-6 mt-auto border-t border-blue-100 dark:border-blue-900/30">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
          <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
            Quick Stats
          </h3>
          <div className="space-y-2">
            <div className="text-gray-600 dark:text-gray-300 text-sm">
              🎯 Today's Goal: 78% achieved
            </div>
            <div className="text-gray-600 dark:text-gray-300 text-sm">
              🔥 530 calories burned
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
