import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBell, FaCog, FaLock, FaSignOutAlt, FaTrash } from 'react-icons/fa';
import { useTheme } from '../components/ThemeProvider';
import DashboardNav from './layouts/ProtectedNav';
import { supabase } from '../../utils/supabaseClient';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorState from '../components/ui/ErrorState';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface UserSettings {
  workout_reminders: boolean;
  email_notifications: boolean;
  dark_mode: boolean;
  language: string;
}

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [settings, setSettings] = useState<UserSettings>({
    workout_reminders: true,
    email_notifications: true,
    dark_mode: theme === 'dark',
    language: 'en'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setError('');
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUserEmail(session.user.email || '');
          const { data, error } = await supabase
            .from('user_settings')
            .select('*')
            .eq('user_id', session.user.id)
            .single();

          if (error && error.code !== 'PGRST116') {
            throw error;
          }

          if (data) {
            setSettings(prev => ({
              ...prev,
              ...data,
              dark_mode: theme === 'dark'
            }));
          }
        }
      } catch (error: any) {
        console.error('Error loading settings:', error);
        setError(error.message || 'Failed to load settings');
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, [theme]);

  const handleSettingChange = async (key: keyof UserSettings, value: boolean | string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session');

      if (key === 'dark_mode') {
        toggleTheme();
      }

      setSettings(prev => ({
        ...prev,
        [key]: value
      }));

      const { error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: session.user.id,
          [key]: value,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      
      toast.success('Setting updated successfully!');
    } catch (error: any) {
      console.error('Error updating setting:', error);
      toast.error(error.message || 'Failed to update setting');
      
      // Revert the setting if update failed
      setSettings(prev => ({
        ...prev,
        [key]: typeof value === 'boolean' ? !value : prev[key]
      }));
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success('Signed out successfully');
      navigate('/login');
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session');

      // Delete user data
      await Promise.all([
        supabase.from('profiles').delete().eq('id', session.user.id),
        supabase.from('user_settings').delete().eq('user_id', session.user.id),
        supabase.from('workout_history').delete().eq('user_id', session.user.id)
      ]);

      // Sign out
      await supabase.auth.signOut();
      
      toast.success('Account deleted successfully');
      navigate('/');
    } catch (error: any) {
      console.error('Error deleting account:', error);
      toast.error('Failed to delete account');
    }
  };

  if (loading) {
    return (
      <>
        <DashboardNav userEmail={userEmail} />
        <div className="p-4 md:p-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <LoadingSpinner />
          </div>
        </div>
      </>
    );
  }

  if (error && !settings) {
    return (
      <>
        <DashboardNav userEmail={userEmail} />
        <div className="p-4 md:p-8 max-w-4xl mx-auto">
          <ErrorState
            title="Failed to load settings"
            message={error}
            onRetry={() => window.location.reload()}
          />
        </div>
      </>
    );
  }

  const settingSections = [
    {
      title: 'Preferences',
      icon: <FaCog className="text-blue-600 dark:text-blue-400" />,
      settings: [
        {
          key: 'dark_mode',
          label: 'Dark Mode',
          description: 'Enable dark mode for a better night experience',
          value: theme === 'dark',
          type: 'toggle'
        },
        {
          key: 'language',
          label: 'Language',
          description: 'Choose your preferred language',
          value: settings.language,
          type: 'select',
          options: [
            { value: 'en', label: 'English' },
            { value: 'es', label: 'Español' },
            { value: 'fr', label: 'Français' }
          ]
        }
      ]
    },
    {
      title: 'Notifications',
      icon: <FaBell className="text-purple-600 dark:text-purple-400" />,
      settings: [
        {
          key: 'workout_reminders',
          label: 'Workout Reminders',
          description: 'Get reminded about your scheduled workouts',
          value: settings.workout_reminders,
          type: 'toggle'
        },
        {
          key: 'email_notifications',
          label: 'Email Notifications',
          description: 'Receive updates and newsletters via email',
          value: settings.email_notifications,
          type: 'toggle'
        }
      ]
    }
  ];

  return (
    <>
      <DashboardNav userEmail={userEmail} />
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100 dark:border-blue-900/30"
        >
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>

            <div className="space-y-8">
              {settingSections.map((section) => (
                <div key={section.title}>
                  <div className="flex items-center space-x-2 mb-4">
                    {section.icon}
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {section.title}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {section.settings.map((setting) => (
                      <div
                        key={setting.key}
                        className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                      >
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {setting.label}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {setting.description}
                          </p>
                        </div>

                        {setting.type === 'toggle' ? (
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSettingChange(setting.key as keyof UserSettings, !setting.value)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              setting.value 
                                ? 'bg-blue-600 dark:bg-blue-500' 
                                : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                          >
                            <motion.span
                              layout
                              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                                setting.value ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </motion.button>
                        ) : setting.type === 'select' && setting.options ? (
                          <select
                            value={setting.value}
                            onChange={(e) => handleSettingChange(setting.key as keyof UserSettings, e.target.value)}
                            aria-label={setting.label}
                            className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2"
                          >
                            {setting.options.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Account Management Section */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <FaLock className="text-red-600 dark:text-red-400" />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Account Management
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Sign Out
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Sign out of your account on this device
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSignOut}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition-colors"
                    >
                      <FaSignOutAlt />
                      <span>Sign Out</span>
                    </motion.button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Delete Account
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDeleteAccount}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                    >
                      <FaTrash />
                      <span>Delete Account</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Settings;