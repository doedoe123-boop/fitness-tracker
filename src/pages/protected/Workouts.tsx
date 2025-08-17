import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaPlay, FaBookmark } from 'react-icons/fa';
import DashboardNav from './layouts/ProtectedNav';
import useExercises from '../../hooks/useExercises';
import { useNavigate } from 'react-router-dom';
import ErrorState from '../components/ui/ErrorState';
import EmptyState from '../components/ui/EmptyState';
import { ExerciseCardSkeleton } from '../components/ui/Skeleton';
import toast from 'react-hot-toast';

const Workouts: React.FC = () => {
  const { exercises, bodyParts, loading, error, fetchByBodyPart, fetchBodyParts } = useExercises();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>('');
  const [savedExercises, setSavedExercises] = useState<string[]>(() => {
    const saved = localStorage.getItem('savedExercises');
    return saved ? JSON.parse(saved) : [];
  });
  const navigate = useNavigate();

  // Fetch body parts on mount
  useEffect(() => {
    fetchBodyParts();
  }, [fetchBodyParts]);

  // Handle body part selection
  useEffect(() => {
    if (selectedBodyPart) {
      fetchByBodyPart(selectedBodyPart);
    }
  }, [selectedBodyPart, fetchByBodyPart]);

  const filteredExercises = exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.bodyPart.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.equipment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveExercise = (exerciseId: string, exerciseName: string) => {
    const isSaved = savedExercises.includes(exerciseId);
    let newSavedExercises;
    
    if (isSaved) {
      newSavedExercises = savedExercises.filter(id => id !== exerciseId);
      toast.success(`Removed ${exerciseName} from favorites`);
    } else {
      newSavedExercises = [...savedExercises, exerciseId];
      toast.success(`Added ${exerciseName} to favorites`);
    }
    
    setSavedExercises(newSavedExercises);
    localStorage.setItem('savedExercises', JSON.stringify(newSavedExercises));
  };

  const handleStartWorkout = (exerciseName: string) => {
    toast.success(`Starting ${exerciseName} workout! 💪`);
    navigate('/work-out-now');
  };

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
                      aria-label="Filter exercises by body part"
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
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <ExerciseCardSkeleton key={index} />
                  ))}
                </div>
              ) : error ? (
                <ErrorState
                  title="Failed to load exercises"
                  message={error}
                  onRetry={() => window.location.reload()}
                />
              ) : filteredExercises.length === 0 ? (
                <EmptyState
                  title="No exercises found"
                  description="Try adjusting your search or filter criteria to find exercises."
                  action={
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedBodyPart('');
                      }}
                      className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Clear Filters
                    </button>
                  }
                />
              ) : (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {filteredExercises.map((exercise, index) => (
                    <motion.div
                      key={exercise.id}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col h-full"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -5 }}
                    >
                      {exercise.gifUrl && (
                        <div className="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-900 relative group">
                          <img
                            src={exercise.gifUrl}
                            alt={exercise.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          {/* Overlay buttons */}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStartWorkout(exercise.name);
                              }}
                              className="bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-full transition-colors"
                              title="Start workout"
                            >
                              <FaPlay className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSaveExercise(exercise.id, exercise.name);
                              }}
                              className={`p-3 rounded-full transition-colors ${
                                savedExercises.includes(exercise.id)
                                  ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                                  : 'bg-white/20 hover:bg-white/30 text-white'
                              }`}
                              title={savedExercises.includes(exercise.id) ? 'Remove from favorites' : 'Add to favorites'}
                            >
                              <FaBookmark className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                      <div 
                        className="p-3 sm:p-4 flex-1 flex flex-col justify-between cursor-pointer"
                        onClick={() => navigate(`/workouts/${exercise.id}`)}
                      >
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
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Workouts;