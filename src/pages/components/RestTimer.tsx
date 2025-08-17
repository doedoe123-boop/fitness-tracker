import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaStop, FaRedo } from 'react-icons/fa';
import toast from 'react-hot-toast';

interface RestTimerProps {
  isVisible: boolean;
  onClose: () => void;
  defaultTime?: number; // in seconds
}

export const RestTimer = ({ isVisible, onClose, defaultTime = 60 }: RestTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(defaultTime);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTime, setSelectedTime] = useState(defaultTime);

  const presetTimes = [30, 60, 90, 120, 180]; // seconds

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            toast.success('Rest time is over! Time for your next set! 🔥', {
              duration: 4000,
              style: {
                borderRadius: '10px',
                background: '#f59e0b',
                color: '#fff',
              },
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    if (timeLeft === 0) {
      setTimeLeft(selectedTime);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(selectedTime);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTimeLeft(0);
    onClose();
  };

  const getCircleProgress = () => {
    const progress = (selectedTime - timeLeft) / selectedTime;
    const circumference = 2 * Math.PI * 45; // radius = 45
    return circumference * progress;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            className="bg-white dark:bg-dark-secondary rounded-2xl p-8 w-full max-w-md mx-auto shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Rest Timer
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Take a break between your sets
              </p>
            </div>

            {/* Circular Progress Timer */}
            <div className="relative flex items-center justify-center mb-8">
              <svg width="120" height="120" className="transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-gray-200 dark:text-gray-700"
                />
                {/* Progress circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 - getCircleProgress()}`}
                  className={`transition-all duration-1000 ${
                    timeLeft <= 10 ? 'text-red-500' : 'text-teal-500'
                  }`}
                  strokeLinecap="round"
                />
              </svg>
              
              {/* Time display */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-3xl font-bold ${
                  timeLeft <= 10 ? 'text-red-500' : 'text-gray-900 dark:text-white'
                }`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>

            {/* Preset Time Buttons */}
            <div className="grid grid-cols-5 gap-2 mb-6">
              {presetTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => {
                    setSelectedTime(time);
                    if (!isRunning) {
                      setTimeLeft(time);
                    }
                  }}
                  className={`py-2 px-1 text-sm rounded-lg transition-colors ${
                    selectedTime === time
                      ? 'bg-teal-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {time}s
                </button>
              ))}
            </div>

            {/* Control Buttons */}
            <div className="flex justify-center space-x-4 mb-6">
              {!isRunning ? (
                <motion.button
                  onClick={handleStart}
                  className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPlay className="w-4 h-4" />
                  <span>Start</span>
                </motion.button>
              ) : (
                <motion.button
                  onClick={handlePause}
                  className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPause className="w-4 h-4" />
                  <span>Pause</span>
                </motion.button>
              )}

              <motion.button
                onClick={handleReset}
                className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaRedo className="w-4 h-4" />
              </motion.button>

              <motion.button
                onClick={handleStop}
                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaStop className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-full py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Close Timer
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RestTimer;
