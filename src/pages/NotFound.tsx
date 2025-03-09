import React from "react";
import { TbError404 } from "react-icons/tb";
import { motion } from "framer-motion";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#2b1821] text-white">
      <div className="text-center">
        {/* 404 Icon with Animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <TbError404 className="text-9xl mx-auto mb-6 text-pink-500" />
        </motion.div>

        {/* Title with Animation */}
        <motion.h1
          className="text-6xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Oops!
        </motion.h1>

        {/* Message with Animation */}
        <motion.p
          className="text-xl mb-8 text-gray-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          We can't seem to find the page you're looking for.
        </motion.p>

        {/* Go Home Link with Animation */}
        <motion.a
          href="/"
          className="inline-block text-lg font-semibold bg-gradient-to-r from-pink-600 to-purple-700 text-white py-3 px-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Go Back Home
        </motion.a>

        {/* Additional Visual Element (Floating Particles) */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-pink-500 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;