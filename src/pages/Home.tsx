import { FaAppleAlt, FaDumbbell, FaClipboardList, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { motion } from "framer-motion";

function Home() {
  return (
    <div className="bg-[#2b1821] text-white min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-between text-center md:text-left px-6 md:px-20 py-16 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:w-1/2 flex flex-col items-center md:items-start space-y-6"
        >
          <p className="text-xl font-semibold tracking-wide text-gray-300">Live N Move</p>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Get Moving, Stay Healthy
          </h1>
          <p className="text-lg max-w-md font-light text-gray-300">
            Elevate your fitness journey with guided workouts, expert tips, and personalized plans to keep you active and energized.
          </p>
          <motion.a
            href="/work-out-now"
            className="bg-gradient-to-r from-pink-600 to-purple-700 text-white uppercase px-12 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Get Started
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="md:w-1/2 flex justify-center mt-10 md:mt-0"
        >
          <img
            src="/assets/hero/healthier.png"
            alt="Exercise"
            className="w-full max-w-md md:max-w-lg rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
          />
        </motion.div>
      </section>

   {/* Features Section */}
      <section className="py-20 bg-[#3a222d]">
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold mb-12 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            What You'll Get
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6">
            {[
              { 
                icon: <FaDumbbell className="text-5xl text-yellow-500 mx-auto mb-6" />, 
                title: "Personalized Workouts", 
                text: "Get customized exercise routines tailored to your goals and fitness level.",
                link: "/health-importance" 
              },
              { 
                icon: <FaAppleAlt className="text-5xl text-green-500 mx-auto mb-6" />, 
                title: "Nutrition Guidance", 
                text: "Discover healthy meal plans, recipes, and expert diet tips.",
                link: "/fitness-tips" 
              },
              { 
                icon: <FaClipboardList className="text-5xl text-blue-500 mx-auto mb-6" />, 
                title: "Progress Tracking", 
                text: "Monitor your achievements, set goals, and stay motivated with real-time progress updates.",
                link: "/diet-tips" 
              }
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.link} // Link to the specified route
                className="block bg-[#2b1821] p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 no-underline text-white"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                {item.icon}
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-300">{item.text}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#2b1821]">
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold mb-12 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            What Our Users Say
          </motion.h2>
          <motion.div
            className="max-w-3xl mx-auto bg-[#3a222d] p-8 rounded-xl shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <FaQuoteLeft className="text-2xl text-gray-400 mb-4 mx-auto" />
            <p className="text-lg italic text-gray-300">
              “This app transformed my lifestyle! The workouts and tracking tools keep me motivated every day. I’ve never felt better!”
            </p>
            <FaQuoteRight className="text-2xl text-gray-400 mt-4 mx-auto" />
            <p className="mt-4 font-semibold text-pink-400">– John D.</p>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-purple-700 text-white">
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Take the First Step
          </motion.h2>
          <motion.p
            className="text-lg mb-6 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Start your fitness journey today and build a healthier, stronger you. Join thousands of users who have already transformed their lives.
          </motion.p>
          <motion.a
            href="/about"
            className="bg-white text-pink-600 px-10 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Get Started
          </motion.a>
        </div>
      </section>
    </div>
  );
}

export default Home;