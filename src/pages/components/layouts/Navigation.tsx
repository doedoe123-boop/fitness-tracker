import { Link, useLocation } from "react-router-dom";
import { FaHeartbeat, FaDumbbell, FaAppleAlt, FaBrain, FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from '../ThemeToggle';
import SearchBar from '../SearchBar';

interface NavItem {
  path?: string;
  label: string;
  children?: Array<{
    path: string;
    label: string;
    icon: JSX.Element;
  }>;
  badge?: string;
}

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Add new state for updates badge
  const [hasNewUpdates] = useState(true);

  // Handle scroll events for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems: NavItem[] = [
    { path: "/", label: "Home" },
    { 
      label: "Lifestyle",
      children: [
        { path: "/health-importance", label: "Health Importance", icon: <FaBrain /> },
        { path: "/fitness-tips", label: "Fitness Tips", icon: <FaDumbbell /> },
        { path: "/diet-tips", label: "Diet Tips", icon: <FaAppleAlt /> }
      ]
    },
    { 
      path: "/work-out-now", 
      label: "Start",
      badge: hasNewUpdates ? "New AI Features" : undefined
    },
    { path: "/about", label: "About" }
  ];

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/80 dark:bg-dark-primary/80 backdrop-blur-lg shadow-sm border-b border-slate-200/80 dark:border-slate-700/80' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <FaHeartbeat className="text-2xl text-brand-primary" />
            </motion.div>
            <span className={`text-xl font-semibold transition-colors ${
              scrolled ? 'text-slate-900 dark:text-white' : 'text-slate-900 dark:text-white'
            }`}>
              Fitness Tracker
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              item.children ? (
                <div key={index} className="relative group">
                  <button 
                    className={`flex items-center space-x-1 group text-base ${
                      scrolled 
                        ? 'text-slate-600 dark:text-slate-300 hover:text-brand-primary dark:hover:text-brand-primary' 
                        : 'text-slate-900 dark:text-white hover:text-brand-primary dark:hover:text-brand-primary'
                    }`}
                  >
                    <span>{item.label}</span>
                    <motion.svg 
                      className="w-4 h-4 transition-transform group-hover:rotate-180"
                      animate={{ rotate: 0 }}
                      initial={{ rotate: 0 }}
                      exit={{ rotate: 0 }}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </button>
                  
                  {/* Dropdown Menu with enhanced animations */}
                  <motion.div 
                    className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <div className="py-2 mt-2 bg-white dark:bg-dark-secondary rounded-lg shadow-xl border border-slate-200 dark:border-slate-700">
                      {item.children.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          to={child.path}
                          className={`flex items-center space-x-2 px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-brand-primary dark:hover:text-brand-primary hover:bg-slate-50 dark:hover:bg-dark-accent ${
                            location.pathname === child.path ? 'text-brand-primary bg-slate-50 dark:bg-dark-accent' : ''
                          }`}
                        >
                          {child.icon}
                          <span>{child.label}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ) : (
                <Link
                  key={index}
                  to={item.path || '/'} 
                  className={`text-base transition-colors relative ${
                    location.pathname === item.path 
                      ? 'text-brand-primary' 
                      : scrolled 
                        ? 'text-slate-600 dark:text-slate-300 hover:text-brand-primary dark:hover:text-brand-primary' 
                        : 'text-slate-900 dark:text-white hover:text-brand-primary dark:hover:text-brand-primary'
                  }`}
                >
                  {item.label}
                  {item.badge && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute -top-3 -right-12 px-2 py-0.5 text-xs font-medium bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-100 rounded-full whitespace-nowrap"
                    >
                      {item.badge}
                    </motion.span>
                  )}
                </Link>
              )
            ))}

            {/* Theme Toggle and Search */}
            <div className="flex items-center space-x-3">
              {/* Search Button */}
              <motion.button
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 rounded-lg transition-colors ${
                  scrolled 
                    ? 'text-slate-600 dark:text-slate-300 hover:text-brand-primary dark:hover:text-brand-primary hover:bg-slate-100 dark:hover:bg-dark-accent' 
                    : 'text-slate-900 dark:text-white hover:text-brand-primary dark:hover:text-brand-primary hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Search"
              >
                <FaSearch className="w-4 h-4" />
              </motion.button>
              
              <ThemeToggle />
            </div>

            {/* Enhanced CTA Button with pulse effect */}
            <Link
              to="/sign-up"
              className="relative inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-brand-primary hover:bg-brand-primary-700 transition-colors group"
            >
              <motion.span
                className="absolute -inset-0.5 rounded-lg bg-brand-primary opacity-30"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <span className="relative">Sign up</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-brand-primary dark:hover:text-brand-primary hover:bg-slate-100 dark:hover:bg-dark-accent transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <AnimatePresence>
                  {isMobileMenuOpen ? (
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      exit={{ pathLength: 0 }}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      exit={{ pathLength: 0 }}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </AnimatePresence>
              </svg>
            </motion.button>
          </div>

          {/* Enhanced Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden absolute top-full left-0 right-0 overflow-hidden bg-white dark:bg-dark-secondary border-t border-slate-200 dark:border-slate-700 shadow-lg"
              >
                <div className="px-6 py-6 space-y-6">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-4"
                    >
                      {item.children ? (
                        <div>
                          <div className="text-sm font-medium text-slate-900 dark:text-white uppercase tracking-wide mb-4">
                            {item.label}
                          </div>
                          <div className="grid grid-cols-1 gap-2">
                            {item.children.map((child, childIndex) => (
                              <Link
                                key={childIndex}
                                to={child.path}
                                className={`flex items-center space-x-3 p-3 rounded-lg ${
                                  location.pathname === child.path 
                                    ? 'text-brand-primary bg-brand-primary/5' 
                                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-dark-accent'
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <span className="text-xl">{child.icon}</span>
                                <span>{child.label}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          to={item.path || '/'}
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            location.pathname === item.path 
                              ? 'text-brand-primary bg-brand-primary/5' 
                              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-dark-accent'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className="px-2 py-1 text-xs font-medium bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-100 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      )}
                    </motion.div>
                  ))}

                  <Link
                    to="/login"
                    className="block w-full text-center px-6 py-4 rounded-lg text-white bg-brand-primary hover:bg-brand-primary-700 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Search Bar Component */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
};

export default Navigation;
