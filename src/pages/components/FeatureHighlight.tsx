import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';

interface Feature {
  id: string;
  title: string;
  description: string;
  date: string;
}

const FeatureHighlight: React.FC = () => {
  const [showHighlight, setShowHighlight] = useState(true);
  const [features] = useState<Feature[]>([
    {
      id: '1',
      title: 'New AI-Powered Workout Recommendations',
      description: 'Get personalized workout suggestions based on your fitness goals and history',
      date: '2025-04-14'
    }
  ]);

  useEffect(() => {
    const hasSeenFeatures = localStorage.getItem('hasSeenFeatures');
    if (hasSeenFeatures) {
      setShowHighlight(false);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('hasSeenFeatures', 'true');
    setShowHighlight(false);
  };

  return (
    <AnimatePresence>
      {showHighlight && features.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div className="bg-white p-6 rounded-xl shadow-xl border border-slate-200 max-w-md">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-slate-900">🎉 New Features</h3>
              <button
                onClick={handleDismiss}
                className="text-slate-400 hover:text-slate-600"
              >
                ×
              </button>
            </div>
            {features.map((feature) => (
              <div key={feature.id} className="mb-4">
                <h4 className="font-medium text-slate-900">{feature.title}</h4>
                <p className="text-sm text-slate-600 mt-1">{feature.description}</p>
                <p className="text-xs text-slate-400 mt-2">Added {new Date(feature.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FeatureHighlight;