import React, { useState } from "react";
import { motion } from "framer-motion";
import { exerciseCategories } from "../data/exercises";

const BodyExercise: React.FC = () => {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [poppingText, setPoppingText] = useState<string | null>(null);

  const motivationalTexts: { [key: string]: string } = {
    Running: "Yeah! Keep running, you can do it!",
    "Jumping Jacks": "Jump higher! Feel the energy!",
    Cycling: "Pedal your way to greatness!",
    "Push-ups": "Push it to the limit!",
    Squats: "Feel the burn! Strong legs incoming!",
    Lunges: "Step up your game!",
    Yoga: "Breathe and find your balance!",
    Stretching: "Stretch it out, you're doing great!",
    Pilates: "Core strength for the win!",
  };

  const handleExerciseClick = (exercise: string) => {
    setSelectedExercise(exercise);

    // Set popping text with a message
    setPoppingText(motivationalTexts[exercise] || "You're doing amazing!");

    // Remove the popping text after a short delay
    setTimeout(() => {
      setPoppingText(null);
    }, 2000);
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
    Pilates: "/assets/exercises/leg.gif",
  };

  return (
    <div className="p-6 font-sans">
      {/* Display Exercise Categories */}
      <div className="space-y-8">
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
            <h2 className="text-2xl font-bold mb-4">{category.category}</h2>
            <div className="flex flex-wrap gap-4">
              {category.exercises.map((exercise, idx) => (
                <motion.div
                  key={idx}
                  className="exercise-item bg-gray-100 p-4 rounded-lg shadow-lg hover:bg-gray-200 cursor-pointer transition"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  onClick={() => handleExerciseClick(exercise)}
                >
                  {exercise}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Display Selected Exercise */}
      {selectedExercise && (
        <div className="mt-10 text-center">
          <h3 className="text-xl font-semibold mb-4">
            You selected:{" "}
            <span className="text-blue-500">{selectedExercise}</span>
          </h3>
          <div className="flex justify-center items-center">
            {exerciseMedia[selectedExercise] ? (
              <motion.img
                src={exerciseMedia[selectedExercise]}
                alt={selectedExercise}
                className="h-auto w-80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            ) : (
              <div className="text-gray-500">No media available</div>
            )}
          </div>
        </div>
      )}

      {/* Display Popping Text */}
      {poppingText && (
        <motion.div
          className="fixed top-1/3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {poppingText}
        </motion.div>
      )}
    </div>
  );
};

export default BodyExercise;
