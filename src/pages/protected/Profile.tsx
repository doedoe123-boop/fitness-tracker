import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserCircle, FaEnvelope, FaCalendar, FaWeight, FaRuler, FaTrophy, FaEdit } from 'react-icons/fa';
import { supabase } from '../../utils/supabaseClient';
import DashboardNav from './layouts/ProtectedNav';

interface UserProfile {
  id: string;
  full_name?: string;
  height?: number;
  weight?: number;
  birthdate?: string;
  goals_achieved?: number;
  profile_image_url?: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const [userEmail, setUserEmail] = useState<string>(''); // Changed to string with empty default

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        if (session?.user) {
          setUserEmail(session.user.email || ''); // Handle undefined case
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (error) throw error;
          
          setUser({
            id: session.user.id,
            ...data
          });
          setFormData({
            id: session.user.id,
            ...data
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          ...formData
        });

      if (error) throw error;
      
      setUser(prev => ({ ...prev!, ...formData }));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="animate-pulse text-blue-600 dark:text-blue-400">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <DashboardNav userEmail={userEmail} />
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100 dark:border-blue-900/30 overflow-hidden"
        >
          {/* Profile Header */}
          <div className="relative h-32 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-500 dark:to-cyan-500">
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-800">
                {user?.profile_image_url ? (
                  <img
                    src={user.profile_image_url}
                    alt={user.full_name || 'Profile'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="w-full h-full text-gray-400 dark:text-gray-600" />
                )}
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 px-8 pb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user?.full_name || 'Update your profile'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">{userEmail}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                <FaEdit />
                <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
              </motion.button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Birthdate
                    </label>
                    <input
                      type="date"
                      name="birthdate"
                      value={formData.birthdate || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 rounded-lg bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                  >
                    Save Changes
                  </motion.button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20"
                >
                  <FaEnvelope className="text-xl text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                    <p className="font-medium text-gray-900 dark:text-white">{userEmail}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center space-x-3 p-4 rounded-xl bg-green-50 dark:bg-green-900/20"
                >
                  <FaCalendar className="text-xl text-green-600 dark:text-green-400" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Birthdate</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {user?.birthdate ? new Date(user.birthdate).toLocaleDateString() : 'Not set'}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center space-x-3 p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20"
                >
                  <FaWeight className="text-xl text-purple-600 dark:text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Weight</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {user?.weight ? `${user.weight} kg` : 'Not set'}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center space-x-3 p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20"
                >
                  <FaRuler className="text-xl text-yellow-600 dark:text-yellow-400" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Height</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {user?.height ? `${user.height} cm` : 'Not set'}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center space-x-3 p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 md:col-span-2"
                >
                  <FaTrophy className="text-xl text-rose-600 dark:text-rose-400" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Goals Achieved</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {user?.goals_achieved || 0} goals completed
                    </p>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Profile;