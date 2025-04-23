import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../utils/supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import googleLogo from '../../../public/assets/social/google.svg'
import facebookLogo from '../../../public/assets/social/facebook.svg'
import githubLogo from '../../../public/assets/social/github.svg'
import { FaEnvelope, FaLock } from 'react-icons/fa';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        navigate('/dashboard');
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        alert('Check your email for confirmation link');
        setIsLogin(true);
      }
    }
  };

  type Provider = {
    icon: JSX.Element;
    label: string;
    provider: OAuthProvider;
    color: string;
    disabled?: boolean;
  };
  

  type OAuthProvider = 'google' | 'facebook' | 'github';

  const providers: Provider[] = [
    {
      icon: <img src={googleLogo} alt="Google" className="w-6 h-6" />,
      label: 'Google',
      provider: 'google',
      color: 'text-red-600 dark:text-red-500',
    },
    {
      icon: <img src={facebookLogo} alt="Google" className="w-6 h-6" />,
      label: 'Google',
      provider: 'google',
      color: 'text-blue-600 dark:text-blue-500',
      disabled: true,
    },
    {
      icon: <img src={githubLogo} alt="Google" className="w-6 h-6" />,
      label: 'Google',
      provider: 'google',
      color: 'text-slate-900 dark:text-white',
      disabled: true,
    }
  ] as const;
  
  const socialLogin = async (provider: OAuthProvider) => {
    const redirectTo = import.meta.env.VITE_SUPABASE_REDIRECT_URL;
  
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
      },
    });
  
    if (error) {
      console.error(`${provider} login error:`, error.message);
      return;
    }
  
    console.log(`${provider} login successful!`);
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
              {isLogin ? 'Welcome Back!' : 'Create Account'}
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              {isLogin 
                ? 'Enter your credentials to access your account'
                : 'Join us and start your fitness journey today'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 dark:bg-dark-accent dark:text-white"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 dark:bg-dark-accent dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 dark:border-slate-600 text-teal-600 focus:ring-teal-500 dark:focus:ring-teal-400"
                  />
                  <span className="ml-2 text-slate-600 dark:text-slate-400">Remember me</span>
                </label>
                <a
                  href="#"
                  className="text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
                >
                  Forgot password?
                </a>
              </div>
            )}

            <motion.button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 dark:hover:bg-teal-500 transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </motion.button>
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
          </form>

          <div className="my-6 flex items-center justify-center">
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
            <span className="px-4 text-sm text-slate-500 dark:text-slate-400">Or continue with</span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {providers.map((provider) => (
                <motion.button
                key={provider.label}
                onClick={!provider.disabled ? () => socialLogin(provider.provider) : undefined} 
                className={`flex items-center justify-center p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-dark-accent transition-colors ${provider.disabled ? 'cursor-not-allowed opacity-50' : ''}`} // Apply styles to disable button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={provider.disabled}
              >
                <span className={provider.color}>{provider.icon}</span>
              </motion.button>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
            Don't have an account? {' '}
           <Link
              to="/sign-up"
              className="text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
