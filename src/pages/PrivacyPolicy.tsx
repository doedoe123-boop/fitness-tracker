import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-dark-secondary dark:via-dark-primary dark:to-dark-secondary flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark opacity-[0.015] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-dark-secondary rounded-2xl shadow-xl p-8 w-full max-w-3xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 dark:from-teal-900/20 to-transparent opacity-50" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            Privacy Policy
          </h1>
          <div className="space-y-5 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            <p>
              This Privacy Policy outlines how we collect, use, and protect your personal data.
            </p>
            <p>
              We collect data such as your email, name, and fitness progress only to provide and improve our services.
            </p>
            <p>
              All data is encrypted and stored securely. We never sell your information to third parties.
            </p>
            <p>
              You may request to review or delete your personal information by contacting us at <a href="mailto:support@fitnesses.lifestyle" className="text-teal-600">support@fitnesses.lifestyle</a>.
            </p>
            <p>
              By using our services, you consent to the terms of this privacy policy.
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link to="/login" className="text-teal-600 hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
