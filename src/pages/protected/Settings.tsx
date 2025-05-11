import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBell, FaCog } from 'react-icons/fa';
import { useTheme } from '../components/ThemeProvider';
import DashboardNav from './layouts/ProtectedNav';
import { supabase } from '../../utils/supabaseClient';

interface UserSettings {
  workout_reminders: boolean;
  email_notifications: boolean;
  dark_mode: boolean;
  language: string;
}

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useState<UserSettings>({
    workout_reminders: true,
    email_notifications: true,
    dark_mode: theme === 'dark',
    language: 'en'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data, error } = await supabase
            .from('user_settings')
            .select('*')
            .eq('user_id', session.user.id)
            .single();

          if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned" error
            throw error;
          }

          if (data) {
            setSettings(prev => ({
              ...prev,
              ...data
            }));
          }
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

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
    } catch (error) {
      console.error('Error updating setting:', error);
      // Revert the setting if update failed
      setSettings(prev => ({
        ...prev,
        [key]: !value
      }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="animate-pulse text-blue-600 dark:text-blue-400">Loading...</div>
      </div>
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
      <DashboardNav />
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
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Settings;