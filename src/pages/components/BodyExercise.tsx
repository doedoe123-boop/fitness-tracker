import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { exerciseCategories } from "../data/exercises";
import WorkoutHistory, { WorkoutSession } from "./WorkoutHistory";
import { FitnessGoal } from "./FitnessGoals";

const BodyExercise: React.FC = () => {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [poppingText, setPoppingText] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const [calories, setCalories] = useState(0);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutSession[]>(() => {
    const saved = localStorage.getItem('workoutHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // Add goals state
  const [goals, setGoals] = useState<FitnessGoal[]>(() => {
    const saved = localStorage.getItem('fitnessGoals');
    return saved ? JSON.parse(saved) : [];
  });

  // Save workout history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('workoutHistory', JSON.stringify(workoutHistory));
  }, [workoutHistory]);

  // Update goals in localStorage when they change
  useEffect(() => {
    localStorage.setItem('fitnessGoals', JSON.stringify(goals));
  }, [goals]);

  // Calories burned per minute for each exercise (estimated values)
  const caloriesPerMinute: { [key: string]: number } = {
    Running: 10,
    "Jumping Jacks": 8,
    Cycling: 7,
    "Push-ups": 6,
    Squats: 5,
    Lunges: 5,
    Yoga: 3,
    Stretching: 2,
    Pilates: 4,
  };

  useEffect(() => {
    let timer: number;
    if (isWorkoutActive && selectedExercise) {
      timer = window.setInterval(() => {
        setDuration(prev => prev + 1);
        setCalories(prev => prev + (caloriesPerMinute[selectedExercise] / 60));
      }, 1000);
    }
    return () => window.clearInterval(timer);
  }, [isWorkoutActive, selectedExercise]);

  const updateGoals = (duration: number, calories: number) => {
    setGoals(prevGoals => 
      prevGoals.map(goal => {
        const currentDate = new Date();
        const deadline = new Date(goal.deadline);
        
        // Only update goals that haven't expired
        if (currentDate <= deadline) {
          switch (goal.type) {
            case 'calories':
              return { ...goal, current: goal.current + calories };
            case 'duration':
              return { ...goal, current: goal.current + Math.floor(duration / 60) };
            case 'frequency':
              // For frequency goals, increment by 1 workout
              return { ...goal, current: goal.current + 1 };
            default:
              return goal;
          }
        }
        return goal;
      })
    );
  };

  const handleStopWorkout = () => {
    if (selectedExercise && duration > 0) {
      const newSession: WorkoutSession = {
        id: Date.now().toString(),
        exercise: selectedExercise,
        duration,
        caloriesBurned: calories,
        date: new Date().toLocaleDateString(),
      };
      setWorkoutHistory(prev => [newSession, ...prev]);

      // Update goals
      updateGoals(duration, calories);
    }
    setIsWorkoutActive(false);
  };

  const motivationalTexts: { [key: string]: string } = {
    Running: "Yeah! Keep running, you can do it! 🏃‍♂️",
    "Jumping Jacks": "Jump higher! Feel the energy! ⚡",
    Cycling: "Pedal your way to greatness! 🚴‍♂️",
    "Push-ups": "Push it to the limit! 💪",
    Squats: "Feel the burn! Strong legs incoming! 🔥",
    Lunges: "Step up your game! 👊",
    Yoga: "Breathe and find your balance! 🧘‍♀️",
    Stretching: "Stretch it out, you're doing great! 🌟",
    Pilates: "Core strength for the win! 💫",
  };

  const handleExerciseClick = (exercise: string) => {
    if (selectedExercise !== exercise) {
      setSelectedExercise(exercise);
      setIsWorkoutActive(false);
      setDuration(0);
      setCalories(0);
    }
    setPoppingText(motivationalTexts[exercise] || "You're doing amazing! 🎯");
    setTimeout(() => setPoppingText(null), 2000);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const exerciseMedia: { [key: string]: string } = {
    Running: "/assets/exercises/running.gif",
    "Jumping Jacks": "/assets/exercises/rope.gif",
    Cycling: "/assets/exercises/cycling.gif",
    "Push-ups": "/assets/exercises/push-ups.gif",
    Squats: "/assets/exercises/squats.gif",
    Lunges: "/assets/exercises/lunges.gif",
    Yoga: "/assets/exercises/yoga.gif",
    Stretching: "/assets/exercises/stretching.gif",
    Pilates: "/assets/exercises/pilates.gif",
  };

  return (
    <div className="font-sans">
      {/* Exercise Categories */}
      <div className="space-y-12">
        {exerciseCategories.map((category, index) => (
          <motion.div
            key={index}
            className="exercise-category"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.3 },
              },
            }}
          >
            <h2 className="text-2xl font-bold mb-6 text-slate-900">{category.category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {category.exercises.map((exercise, idx) => (
                <motion.div
                  key={idx}
                  className="exercise-item bg-white p-6 rounded-xl shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 border border-slate-100 group"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  onClick={() => handleExerciseClick(exercise)}
                  whileHover={{ y: -5 }}
                >
                  <span className="text-lg font-medium text-slate-900">{exercise}</span>
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selected Exercise Display */}
      {selectedExercise && (
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-slate-900">
            Now Performing: <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">{selectedExercise}</span>
          </h3>

          {/* Workout Controls */}
          <div className="flex justify-center gap-4 mb-8">
            <motion.button
              className={`px-6 py-3 rounded-lg font-medium text-white transition-all duration-300 ${
                isWorkoutActive ? 'bg-red-600 hover:bg-red-700' : 'bg-teal-600 hover:bg-teal-700'
              }`}
              onClick={() => isWorkoutActive ? handleStopWorkout() : setIsWorkoutActive(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isWorkoutActive ? 'Stop Workout' : 'Start Workout'}
            </motion.button>
            {isWorkoutActive && (
              <motion.button
                className="px-6 py-3 rounded-lg font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all duration-300"
                onClick={() => {
                  setDuration(0);
                  setCalories(0);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset
              </motion.button>
            )}
          </div>

          {/* Workout Stats */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-600 mb-1">Duration</p>
              <p className="text-2xl font-bold text-slate-900">{formatTime(duration)}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-600 mb-1">Calories Burned</p>
              <p className="text-2xl font-bold text-slate-900">{Math.round(calories)}</p>
            </div>
          </div>

          <div className="flex justify-center items-center">
            {exerciseMedia[selectedExercise] ? (
              <motion.div
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-200 to-cyan-200 rounded-2xl blur-3xl opacity-20" />
                <img
                  src={exerciseMedia[selectedExercise]}
                  alt={selectedExercise}
                  className="relative z-10 max-w-md rounded-2xl shadow-2xl"
                />
              </motion.div>
            ) : (
              <div className="text-slate-500">No media available</div>
            )}
          </div>
        </motion.div>
      )}

      {/* Workout History */}
      <WorkoutHistory history={workoutHistory} />

      {/* Motivational Popup */}
      {poppingText && (
        <motion.div
          className="fixed top-1/3 left-1/2 transform -translate-x-1/2 bg-white px-8 py-4 rounded-xl shadow-2xl border border-slate-100 text-slate-900 font-medium"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {poppingText}
        </motion.div>
      )}

      {/* Motivational Quote */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-lg text-slate-600 italic">
          "The body achieves what the mind believes. Keep pushing, and you'll reach your goals! 💫"
        </p>
      </motion.div>
    </div>
  );
};

export default BodyExercise;