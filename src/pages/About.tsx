import { motion } from "framer-motion";

function About() {
  return (
    <div className="min-h-screen bg-[#2b1821] text-white">
      {/* Hero Section */}
      <motion.div
        className="relative bg-gradient-to-r from-pink-600 to-purple-700 min-h-[40vh] flex items-center justify-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center px-6">
          <motion.h1
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About Fitness Tracker
          </motion.h1>
          <motion.p
            className="text-xl leading-relaxed max-w-3xl mx-auto text-gray-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your partner in achieving a healthier, fitter, and more active
            lifestyle. Track progress, get tips, and unlock your full potential.
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content Section */}
      <div className="container mx-auto px-6 py-12 text-center">
        <motion.h2
          className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Why Choose Us?
        </motion.h2>
        <motion.p
          className="text-lg leading-relaxed mb-8 text-gray-300"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Fitness Tracker is designed to empower you to take charge of your
          health and fitness. Whether you're a beginner or a fitness enthusiast,
          our tools and resources are tailored to help you achieve your goals.
        </motion.p>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Track Workouts",
              description:
                "Easily monitor your workout routines and keep track of your progress with detailed analytics.",
              icon: "🏋️‍♂️",
              color: "text-pink-400",
            },
            {
              title: "Balanced Diet",
              description:
                "Get personalized meal plans, recipes, and expert advice on maintaining a balanced and nutritious diet.",
              icon: "🥗",
              color: "text-purple-400",
            },
            {
              title: "Stay Motivated",
              description:
                "Discover strategies, challenges, and community support to stay motivated and consistent on your fitness journey.",
              icon: "💪",
              color: "text-pink-400",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-[#3a222d] rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className={`text-5xl mb-4 ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Additional Content Section */}
        <motion.div
          className="mt-12 bg-[#3a222d] rounded-lg shadow-lg p-8 text-left"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
            Our Mission
          </h2>
          <p className="text-lg leading-relaxed text-gray-300 mb-6">
            At Fitness Tracker, our mission is to make fitness accessible,
            enjoyable, and sustainable for everyone. We believe that small,
            consistent steps lead to big transformations. Our platform provides
            the tools, guidance, and community support you need to succeed.
          </p>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
            What We Offer
          </h3>
          <ul className="list-disc list-inside text-gray-300 text-lg leading-relaxed">
            <li className="mb-2">
              <strong className="text-pink-400">Personalized Plans:</strong>{" "}
              Tailored workout and meal plans based on your goals and preferences.
            </li>
            <li className="mb-2">
              <strong className="text-pink-400">Expert Guidance:</strong> Access
              to certified trainers and nutritionists for professional advice.
            </li>
            <li className="mb-2">
              <strong className="text-pink-400">Community Support:</strong> Join
              a vibrant community of fitness enthusiasts for motivation and
              accountability.
            </li>
            <li>
              <strong className="text-pink-400">Progress Tracking:</strong>{" "}
              Monitor your achievements and celebrate milestones along the way.
            </li>
          </ul>
        </motion.div>

        {/* Call-to-Action */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-lg font-semibold text-gray-300 mb-6">
            Ready to take the first step toward a healthier you? Join Fitness
            Tracker today and start your journey!
          </p>
          <motion.a
            href="#"
            className="bg-gradient-to-r from-pink-600 to-purple-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Get Started Today
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}

export default About;