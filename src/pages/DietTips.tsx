import { motion } from "framer-motion";

function DietTips() {
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
          Healthy Diet Lifestyle
        </motion.h1>
        <motion.p
          className="text-xl text-gray-300 leading-relaxed mb-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          A healthy diet is the foundation of good health. What you eat impacts
          your energy, mood, and overall well-being. Discover simple ways to
          create a balanced diet that fuels your body and mind.
        </motion.p>

        {/* Healthy Eating Principles Section */}
        <motion.div
          className="bg-[#3a222d] rounded-lg shadow-lg p-8 mb-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
            Key Principles of Healthy Eating
          </h2>
          <ul className="list-none grid grid-cols-1 md:grid-cols-2 gap-6 text-left text-gray-300 text-lg leading-relaxed">
            <motion.li
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-pink-500 text-white w-12 h-12 flex justify-center items-center rounded-full">
                🥦
              </div>
              <p>
                <strong className="text-pink-400">Variety:</strong> Eat a range
                of foods to get essential nutrients and vitamins.
              </p>
            </motion.li>
            <motion.li
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-pink-500 text-white w-12 h-12 flex justify-center items-center rounded-full">
                🍭
              </div>
              <p>
                <strong className="text-pink-400">Limit Unhealthy Choices:</strong>{" "}
                Reduce intake of sugar, salt, and saturated fats.
              </p>
            </motion.li>
            <motion.li
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="bg-pink-500 text-white w-12 h-12 flex justify-center items-center rounded-full">
                💧
              </div>
              <p>
                <strong className="text-pink-400">Stay Hydrated:</strong> Drink
                plenty of water throughout the day to support your body.
              </p>
            </motion.li>
            <motion.li
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="bg-pink-500 text-white w-12 h-12 flex justify-center items-center rounded-full">
                🌾
              </div>
              <p>
                <strong className="text-pink-400">Natural Choices:</strong>{" "}
                Incorporate fresh fruits, vegetables, and whole grains into your
                meals.
              </p>
            </motion.li>
          </ul>
        </motion.div>

        {/* Quick Meal Tips Section */}
        <motion.div
          className="bg-[#3a222d] rounded-lg shadow-lg p-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
            Quick Meal Tips
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Eating healthy doesn’t have to be complicated. Plan your meals
            ahead, avoid processed foods, and savor every bite by practicing
            mindful eating. Small changes in your diet can lead to significant
            health benefits!
          </p>
          <motion.a
            href="/health-importance"
            className="bg-gradient-to-r from-pink-600 to-purple-700 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Learn More About Health Importance →
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}

export default DietTips;