import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBell, FaUserCircle, FaChevronDown, FaCog, FaUser, FaSignOutAlt } from "react-icons/fa";
import { supabase } from "../../../utils/supabaseClient";
import { ThemeToggle } from "../ThemeToggle";

const DashboardNav: React.FC<{ userEmail?: string }> = ({ userEmail }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const dropdownItems = [
    { label: "Profile", icon: <FaUser />, onClick: () => navigate("/profile") },
    { label: "Settings", icon: <FaCog />, onClick: () => navigate("/settings") },
    { label: "Logout", icon: <FaSignOutAlt />, onClick: handleLogout }
  ];

  return (
    <header className="sticky top-0 z-40 w-full flex justify-between items-center p-4 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg border-b border-blue-100 dark:border-blue-900/30">
      <motion.h2 
        className="text-lg md:text-xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 text-transparent bg-clip-text truncate"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome Back
      </motion.h2>

      <div className="flex items-center space-x-2 md:space-x-6">
        <div className="hidden sm:block">
          <ThemeToggle />
        </div>
        
        <motion.button
          className="relative text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hidden sm:block"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaBell className="text-xl" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
        </motion.button>

        <div className="relative">
          <div 
            className="flex items-center space-x-2 md:space-x-3 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 p-2 rounded-xl transition-colors group"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <FaUserCircle className="text-2xl text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{userEmail?.split('@')[0]}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{userEmail}</span>
            </div>
            <motion.div
              animate={{ rotate: isDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="hidden sm:block"
            >
              <FaChevronDown className="text-sm text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
            </motion.div>
          </div>

          <AnimatePresence>
            {isDropdownOpen && (
              <>
                <motion.div
                  className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40 sm:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsDropdownOpen(false)}
                />
                
                {isMobile ? (
                  <motion.div
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="fixed left-0 right-0 top-[65px] z-50 bg-white dark:bg-gray-800 rounded-b-xl shadow-lg border border-blue-100 dark:border-blue-900/30 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{userEmail?.split('@')[0]}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{userEmail}</p>
                      </div>
                    </div>
                    <div className="py-2">
                      {dropdownItems.map((item, index) => (
                        <motion.button
                          key={item.label}
                          onClick={() => {
                            setIsDropdownOpen(false);
                            item.onClick();
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <span className="text-blue-600 dark:text-blue-400">{item.icon}</span>
                          <span>{item.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-blue-100 dark:border-blue-900/30 z-50"
                  >
                    {dropdownItems.map((item, index) => (
                      <motion.button
                        key={item.label}
                        onClick={() => {
                          setIsDropdownOpen(false);
                          item.onClick();
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        whileHover={{ x: 5 }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="text-blue-600 dark:text-blue-400">{item.icon}</span>
                        <span>{item.label}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default DashboardNav;
