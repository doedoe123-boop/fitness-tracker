import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaBullseye, FaFire, FaClock } from 'react-icons/fa';

export interface FitnessGoal {
  id: string;
  type: 'calories' | 'duration' | 'frequency';
  target: number;
  current: number;
  deadline: string;
  createdAt: string;
}

const FitnessGoals: React.FC = () => {
  const [goals, setGoals] = useState<FitnessGoal[]>(() => {
    const saved = localStorage.getItem('fitnessGoals');
    return saved ? JSON.parse(saved) : [];
  });
  const [newGoal, setNewGoal] = useState({
    type: 'calories',
    target: 0,
    deadline: '',
  });

  useEffect(() => {
    localStorage.setItem('fitnessGoals', JSON.stringify(goals));
  }, [goals]);

  const handleAddGoal = () => {
    if (newGoal.target > 0 && newGoal.deadline) {
      const goal: FitnessGoal = {
        id: Date.now().toString(),
        type: newGoal.type as 'calories' | 'duration' | 'frequency',
        target: newGoal.target,
        current: 0,
        deadline: newGoal.deadline,
        createdAt: new Date().toISOString(),
      };
      setGoals(prev => [...prev, goal]);
      setNewGoal({ type: 'calories', target: 0, deadline: '' });
    }
  };

  const getProgressPercentage = (goal: FitnessGoal) => {
    return Math.min((goal.current / goal.target) * 100, 100);
  };

  const getGoalIcon = (type: string) => {
    switch (type) {
      case 'calories':
        return <FaFire className="text-orange-600" />;
      case 'duration':
        return <FaClock className="text-sky-600" />;
      case 'frequency':
        return <FaBullseye className="text-emerald-600" />;
      default:
        return null;
    }
  };

  const formatGoalType = (type: string) => {
    switch (type) {
      case 'calories':
        return 'Calories to Burn';
      case 'duration':
        return 'Minutes of Exercise';
      case 'frequency':
        return 'Workouts per Week';
      default:
        return type;
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-slate-900">Fitness Goals</h2>
      
      {/* Add New Goal Form */}
      <motion.div 
        className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-slate-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Goal Type</label>
            <select
              value={newGoal.type}
              onChange={(e) => setNewGoal({ ...newGoal, type: e.target.value })}
              className="w-full rounded-lg border-slate-200 focus:border-teal-500 focus:ring-teal-500"
            >
              <option value="calories">Calories to Burn</option>
              <option value="duration">Minutes of Exercise</option>
              <option value="frequency">Workouts per Week</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Target</label>
            <input
              type="number"
              value={newGoal.target || ''}
              onChange={(e) => setNewGoal({ ...newGoal, target: parseInt(e.target.value) })}
              className="w-full rounded-lg border-slate-200 focus:border-teal-500 focus:ring-teal-500"
              placeholder="Enter target value"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Deadline</label>
            <input
              type="date"
              value={newGoal.deadline}
              onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
              className="w-full rounded-lg border-slate-200 focus:border-teal-500 focus:ring-teal-500"
            />
          </div>
          <div className="flex items-end">
            <motion.button
              onClick={handleAddGoal}
              className="w-full bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add Goal
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => (
          <motion.div
            key={goal.id}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getGoalIcon(goal.type)}
                <h3 className="text-lg font-semibold text-slate-900">
                  {formatGoalType(goal.type)}
                </h3>
              </div>
              {getProgressPercentage(goal) >= 100 && (
                <FaCheckCircle className="text-emerald-500 text-xl" />
              )}
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Progress: {Math.round(goal.current)} / {goal.target}</span>
                <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
              </div>
              
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-slate-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${getProgressPercentage(goal)}%` }}
                    transition={{ duration: 0.5 }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-600"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {goals.length === 0 && (
          <div className="text-center text-slate-500 py-8">
            No goals set yet. Start by adding a new goal!
          </div>
        )}
      </div>
    </div>
  );
};

export default FitnessGoals;