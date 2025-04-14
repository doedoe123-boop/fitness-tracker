import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaFire, FaClock } from 'react-icons/fa';

export interface WorkoutSession {
  id: string;
  exercise: string;
  duration: number;
  caloriesBurned: number;
  date: string;
}

interface WorkoutHistoryProps {
  history: WorkoutSession[];
}

const WorkoutHistory: React.FC<WorkoutHistoryProps> = ({ history }) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-slate-900">Workout History</h2>
      <div className="space-y-4">
        {history.map((session) => (
          <motion.div
            key={session.id}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3">
                <FaCalendar className="text-teal-600" />
                <span className="text-slate-600">{session.exercise}</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaClock className="text-sky-600" />
                <span className="text-slate-600">{formatTime(session.duration)}</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaFire className="text-orange-600" />
                <span className="text-slate-600">{Math.round(session.caloriesBurned)} calories</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-slate-400 text-sm">{session.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
        {history.length === 0 && (
          <div className="text-center text-slate-500 py-8">
            No workout history yet. Start your first workout!
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutHistory;