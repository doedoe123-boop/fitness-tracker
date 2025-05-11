import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaDumbbell, FaRunning, FaUser } from 'react-icons/fa';
import useExercises, { Exercise } from '../../../hooks/useExercises';
import DashboardNav from '../layouts/ProtectedNav';

const ExerciseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchById, loading, error } = useExercises();
  const [exercise, setExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    const loadExercise = async () => {
      if (id) {
        const data = await fetchById(id);
        setExercise(data);
      }
    };
    loadExercise();
  }, [id, fetchById]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !exercise) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 dark:text-red-400 mb-4">
          {error || 'Exercise not found'}
        </p>
        <button
          onClick={() => navigate('/workouts')}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Back to Workouts
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <DashboardNav userEmail={undefined} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.button
            onClick={() => navigate('/workouts')}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 mb-6"
            whileHover={{ x: -4 }}
          >
            <FaArrowLeft />
            <span>Back to Workouts</span>
          </motion.button>

          {/* Exercise Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Exercise Image */}
            {exercise.gifUrl && (
              <div className="w-full h-96 bg-gray-100 dark:bg-gray-900">
                <img
                  src={exercise.gifUrl}
                  alt={exercise.name}
                  className="w-full h-full object-contain"
                />
              </div>
            )}

            {/* Exercise Info */}
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {exercise.name}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div
                  className="flex items-center space-x-3 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <FaUser className="text-2xl text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Body Part</p>
                    <p className="font-semibold text-gray-900 dark:text-white capitalize">
                      {exercise.bodyPart}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center space-x-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <FaRunning className="text-2xl text-green-600 dark:text-green-400" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Target Muscle</p>
                    <p className="font-semibold text-gray-900 dark:text-white capitalize">
                      {exercise.target}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center space-x-3 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <FaDumbbell className="text-2xl text-purple-600 dark:text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Equipment</p>
                    <p className="font-semibold text-gray-900 dark:text-white capitalize">
                      {exercise.equipment}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Instructions would go here if available in the API */}
              <div className="mt-6">
                <motion.button
                  onClick={() => navigate(`/workouts/start/${exercise.id}`)}
                  className="w-full md:w-auto px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Exercise
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetails;