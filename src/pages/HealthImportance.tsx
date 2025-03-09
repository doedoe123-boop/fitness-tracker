import { motion } from "framer-motion";

const HealthImportance = () => {
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
          The Importance of Health
        </motion.h1>
        <motion.p
          className="text-xl text-gray-300 leading-relaxed mb-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Your health is your most valuable asset. It affects your energy, mood,
          productivity, and quality of life. By maintaining good health, you can
          prevent chronic diseases, improve mental well-being, and live life to
          its fullest.
        </motion.p>

        {/* Why Focus on Health Section */}
        <motion.div
          className="bg-[#3a222d] rounded-lg shadow-lg p-8 mb-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
            Why Focus on Health?
          </h2>
          <ul className="list-disc list-inside text-left text-gray-300 text-lg leading-relaxed">
            <li className="mb-2">
              <strong className="text-pink-400">Prevent Illnesses:</strong>{" "}
              Avoid chronic conditions such as diabetes, heart disease, and
              obesity.
            </li>
            <li className="mb-2">
              <strong className="text-pink-400">Boost Energy Levels:</strong>{" "}
              Feel more energetic and ready to tackle your daily tasks.
            </li>
            <li className="mb-2">
              <strong className="text-pink-400">Enhance Mental Clarity:</strong>{" "}
              Reduce stress and improve your focus and overall well-being.
            </li>
            <li>
              <strong className="text-pink-400">Increase Longevity:</strong>{" "}
              Enjoy a longer, healthier, and more fulfilling life.
            </li>
          </ul>
        </motion.div>

        {/* How to Improve Health Section */}
        <motion.div
          className="bg-[#3a222d] rounded-lg shadow-lg p-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
            How to Improve Your Health?
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Achieving good health doesn’t have to be overwhelming. Start with
            small, consistent habits that lead to big changes over time.
          </p>
          <ul className="list-none grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.li
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-pink-500 text-white w-12 h-12 flex justify-center items-center rounded-full">
                🏃‍♂️
              </div>
              <p className="text-gray-300">
                <strong className="text-pink-400">Stay Active:</strong> Aim for
                at least 30 minutes of physical activity daily.
              </p>
            </motion.li>
            <motion.li
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-pink-500 text-white w-12 h-12 flex justify-center items-center rounded-full">
                🍎
              </div>
              <p className="text-gray-300">
                <strong className="text-pink-400">Eat Right:</strong> Maintain
                a balanced diet rich in whole foods, fruits, and vegetables.
              </p>
            </motion.li>
            <motion.li
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="bg-pink-500 text-white w-12 h-12 flex justify-center items-center rounded-full">
                🛌
              </div>
              <p className="text-gray-300">
                <strong className="text-pink-400">Sleep Well:</strong> Get 7–9
                hours of quality sleep each night.
              </p>
            </motion.li>
            <motion.li
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="bg-pink-500 text-white w-12 h-12 flex justify-center items-center rounded-full">
                🧘‍♀️
              </div>
              <p className="text-gray-300">
                <strong className="text-pink-400">Manage Stress:</strong>{" "}
                Practice mindfulness and relaxation techniques regularly.
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
          <p className="text-xl font-semibold text-gray-300">
            Start your journey to better health today. Make small changes, and
            watch your life transform!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HealthImportance;