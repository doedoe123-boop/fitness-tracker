import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ThankYou: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-dark-secondary dark:via-dark-primary dark:to-dark-secondary flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark opacity-[0.015] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-dark-secondary rounded-2xl shadow-xl p-8 w-full max-w-md relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 dark:from-teal-900/20 to-transparent opacity-50" />
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20 
            }}
            className="flex justify-center mb-8"
          >
            <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center">
              <FaCheckCircle className="text-3xl text-teal-600 dark:text-teal-400" />
            </div>
          </motion.div>

          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Thank You for Registering!
          </h1>
          
          <div className="bg-slate-50 dark:bg-dark-accent rounded-xl p-6 mb-8">
            <div className="flex items-center justify-center mb-4">
              <FaEnvelope className="text-2xl text-teal-600 dark:text-teal-400" />
            </div>
            <p className="text-slate-600 dark:text-slate-300 mb-2">
              Please check your email to confirm your registration.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Make sure to check your spam folder if you don't see the email in your inbox.
            </p>
          </div>

          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/login"
                className="block w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 dark:hover:bg-teal-500 transition-colors duration-300"
              >
                Proceed to Login
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/"
                className="block w-full bg-slate-100 dark:bg-dark-accent text-slate-700 dark:text-slate-300 py-3 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700/50 transition-colors duration-300"
              >
                Return to Home
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ThankYou;