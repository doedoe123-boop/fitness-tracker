import { motion } from "framer-motion";

function FitnessTips() {
  return (
    <div className="min-h-screen bg-[#2b1821] text-white p-6">
      <div className="container mx-auto max-w-4xl text-center">
        {/* Title Section */}
        <motion.h1
          className="text-5xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Fitness Tips
        </motion.h1>
        <motion.p
          className="text-xl text-gray-300 leading-relaxed mb-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Fitness is more than just hitting the gym—it's about staying active,
          maintaining a routine, and making physical activity enjoyable. Start
          small, stay consistent, and enjoy the journey to better health.
        </motion.p>

        {/* Fitness Tips Section */}
        <motion.div
          className="bg-[#3a222d] rounded-lg shadow-lg p-8 mb-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
            Practical Fitness Tips
          </h2>
          <ul className="list-none grid grid-cols-1 md:grid-cols-2 gap-6 text-left text-gray-300 text-lg leading-relaxed">
            <motion.li
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-pink-500 text-white w-12 h-12 flex justify-center items-center rounded-full">
                🎯
              </div>
              <p>
                <strong className="text-pink-400">Set Realistic Goals:</strong>{" "}
                Begin with achievable targets to build confidence and maintain
                momentum.
              </p>
            </motion.li>
            <motion.li
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-pink-500 text-white w-12 h-12 flex justify-center items-center rounded-full">
                🕒
              </div>
              <p>
                <strong className="text-pink-400">Stay Consistent Daily:</strong>{" "}
                Dedicate at least 30 minutes to physical activity, whether it’s
                walking, jogging, or yoga.
              </p>
            </motion.li>
            <motion.li
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="bg-pink-500 text-white w-12 h-12 flex justify-center items-center rounded-full">
                💪
              </div>
              <p>
                <strong className="text-pink-400">Balance Workouts:</strong> Mix
                strength training and cardio to enhance overall fitness.
              </p>
            </motion.li>
            <motion.li
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="bg-pink-500 text-white w-12 h-12 flex justify-center items-center rounded-full">
                🤸‍♀️
              </div>
              <p>
                <strong className="text-pink-400">Stretch Regularly:</strong>{" "}
                Stretch before and after workouts to improve flexibility and
                prevent injuries.
              </p>
            </motion.li>
          </ul>
        </motion.div>

        {/* Motivational Call-to-Action */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-lg font-semibold text-gray-300 mb-4">
            Remember, consistency is key. Start small, track your progress, and
            celebrate your milestones along the way!
          </p>
          <motion.a
            href="/diet-tips"
            className="bg-gradient-to-r from-pink-600 to-purple-700 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Explore Healthy Diet Tips →
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}

export default FitnessTips;