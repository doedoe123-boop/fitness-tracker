import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserCircle, FaEnvelope, FaCalendar, FaWeight, FaRuler, FaTrophy, FaEdit, FaCheck } from 'react-icons/fa';
import { supabase } from '../../utils/supabaseClient';
import DashboardNav from './layouts/ProtectedNav';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorState from '../components/ui/ErrorState';
import toast from 'react-hot-toast';

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
  const [error, setError] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    const getProfile = async () => {
      try {
        setError('');
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        if (session?.user) {
          setUserEmail(session.user.email || '');
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
            throw error;
          }
          
          const profileData = {
            id: session.user.id,
            ...data
          };
          
          setUser(profileData);
          setFormData(profileData);
        }
      } catch (error: any) {
        console.error('Error fetching profile:', error);
        setError(error.message || 'Failed to load profile');
        toast.error('Failed to load profile');
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
      [name]: name === 'height' || name === 'weight' ? Number(value) || undefined : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          ...formData,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      
      setUser(prev => ({ ...prev!, ...formData }));
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const calculateAge = (birthdate: string) => {
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const calculateBMI = (weight?: number, height?: number) => {
    if (!weight || !height) return null;
    const heightInM = height / 100;
    return (weight / (heightInM * heightInM)).toFixed(1);
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

  if (error && !user) {
    return (
      <>
        <DashboardNav userEmail={userEmail} />
        <div className="p-4 md:p-8 max-w-4xl mx-auto">
          <ErrorState
            title="Failed to load profile"
            message={error}
            onRetry={() => window.location.reload()}
          />
        </div>
      </>
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
                      placeholder="Enter your full name"
                      aria-label="Full name"
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
                      aria-label="Birthdate"
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
                      placeholder="Enter height in cm"
                      aria-label="Height in centimeters"
                      min="50"
                      max="300"
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
                      placeholder="Enter weight in kg"
                      aria-label="Weight in kilograms"
                      min="20"
                      max="500"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <motion.button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData(user || {});
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white transition-colors"
                    disabled={saving}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: saving ? 1 : 1.05 }}
                    whileTap={{ scale: saving ? 1 : 0.95 }}
                    className="px-6 py-2 rounded-lg bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <FaCheck />
                        <span>Save Changes</span>
                      </>
                    )}
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
                    <p className="text-sm text-gray-600 dark:text-gray-400">Age</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {user?.birthdate ? `${calculateAge(user.birthdate)} years old` : 'Not set'}
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

                {/* BMI Card */}
                {user?.weight && user?.height && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center space-x-3 p-4 rounded-xl bg-teal-50 dark:bg-teal-900/20"
                  >
                    <div className="text-xl text-teal-600 dark:text-teal-400">⚖️</div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">BMI</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {calculateBMI(user.weight, user.height)}
                      </p>
                    </div>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className={`flex items-center space-x-3 p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 ${!user?.weight || !user?.height ? 'md:col-span-2' : ''}`}
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