import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    const { email, password, fullName } = formData;
  
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName } // custom user meta
      }
    });
  
    if (error) {
      console.error('Signup error:', error.message);
      alert(error.message);
      return;
    }
  
    console.log('User created:', data);
    navigate('/thank-you');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-dark-secondary dark:via-dark-primary dark:to-dark-secondary flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark opacity-[0.015] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-dark-secondary rounded-2xl shadow-xl p-8 w-full max-w-md relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 dark:from-teal-900/20 to-transparent opacity-50" />
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Create Account
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Join us and start your fitness journey today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <FaUser />
                </span>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 dark:bg-dark-accent dark:text-white"
                  placeholder="John Doe"
                  required
                />
              </div>
              {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 dark:bg-dark-accent dark:text-white"
                  placeholder="you@example.com"
                  required
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <FaLock />
                </span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 dark:bg-dark-accent dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <FaLock />
                </span>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 dark:bg-dark-accent dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>

            <motion.button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 dark:hover:bg-teal-500 transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Create Account
            </motion.button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Registration;