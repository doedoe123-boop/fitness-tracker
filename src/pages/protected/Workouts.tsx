import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter } from 'react-icons/fa';
import DashboardNav from './layouts/ProtectedNav';
import useExercises from '../../hooks/useExercises';

const Workouts: React.FC = () => {
  const { exercises, bodyParts, loading, error, fetchByBodyPart, fetchBodyParts } = useExercises();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>('');

  // Fetch body parts on mount
  useEffect(() => {
    fetchBodyParts();
  }, []);

  // Handle body part selection
  useEffect(() => {
    if (selectedBodyPart) {
      fetchByBodyPart(selectedBodyPart);
    }
  }, [selectedBodyPart]);

  const filteredExercises = exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.bodyPart.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.equipment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex-1 w-full">
        <DashboardNav userEmail={undefined} />
        <main className="p-2 sm:p-4 md:p-6">
          <div className="max-w-7xl mx-auto w-full">
            <div className="mb-6 sm:mb-8">
              <motion.h1 
                className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 text-transparent bg-clip-text"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Exercise Library
              </motion.h1>
              {/* Search and Filter Section */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search exercises..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm sm:text-base"
                    />
                  </div>
                </div>
                <div className="sm:w-64">
                  <div className="relative">
                    <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      value={selectedBodyPart}
                      onChange={(e) => setSelectedBodyPart(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm sm:text-base"
                    >
                      <option value="">All Body Parts</option>
                      {bodyParts.map((part) => (
                        <option key={part} value={part}>{part}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              {/* Exercise Grid */}
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              ) : error ? (
                <div className="text-center text-red-500 dark:text-red-400 p-4">
                  {error}
                </div>
              ) : (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {filteredExercises.map((exercise) => (
                    <motion.div
                      key={exercise.id}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col h-full"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -5 }}
                    >
                      {exercise.gifUrl && (
                        <div className="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
                          <img
                            src={exercise.gifUrl}
                            alt={exercise.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                        <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                          {exercise.name}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-auto">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                            {exercise.bodyPart}
                          </span>
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                            {exercise.target}
                          </span>
                          <span className="px-2 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">
                            {exercise.equipment}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              {!loading && !error && filteredExercises.length === 0 && (
                <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                  No exercises found matching your criteria.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Workouts;