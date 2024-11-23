import { FaHeartbeat, FaAppleAlt, FaRunning } from "react-icons/fa";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-400 to-blue-500 text-white min-h-screen flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Track Your Fitness Journey
        </h1>
        <p className="text-lg mb-8 px-4 md:px-0">
          Start your journey toward a healthier and happier life today.
        </p>
        <a
          href="/login"
          className="bg-white text-green-500 px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-gray-100 transition"
        >
          Get Started
        </a>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Why Fitness Matters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <a
              href="/health-importance"
              className="bg-white shadow-md p-6 rounded-lg hover:shadow-xl transition"
            >
              <FaHeartbeat className="text-5xl text-red-500 mx-auto mb-4" />
              <h3 className="text-xl md:text-2xl font-bold mb-2">
                Importance of Health
              </h3>
              <p>
                Discover why maintaining good health is essential for living a
                longer, more fulfilling life. Learn how it impacts every aspect
                of your daily routine and overall well-being.
              </p>
              <p className="text-blue-500 font-semibold mt-4">Learn more →</p>
            </a>

            {/* Card 2 */}
            <a
              href="/fitness-tips"
              className="bg-white shadow-md p-6 rounded-lg hover:shadow-xl transition"
            >
              <FaRunning className="text-5xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl md:text-2xl font-bold mb-2">
                How to Maintain Fitness
              </h3>
              <p>
                Stay active with practical tips for exercise and physical
                activity. Learn how small daily habits can lead to big
                improvements in your fitness level.
              </p>
              <p className="text-blue-500 font-semibold mt-4">Learn more →</p>
            </a>

            {/* Card 3 */}
            <a
              href="/diet-tips"
              className="bg-white shadow-md p-6 rounded-lg hover:shadow-xl transition"
            >
              <FaAppleAlt className="text-5xl text-green-500 mx-auto mb-4" />
              <h3 className="text-xl md:text-2xl font-bold mb-2">
                Healthy Diet Lifestyle
              </h3>
              <p>
                Find out how proper nutrition can transform your life. Explore
                tips for building a balanced diet and avoiding unhealthy food
                choices.
              </p>
              <p className="text-blue-500 font-semibold mt-4">Learn more →</p>
            </a>
          </div>
        </div>
      </section>

      {/* Why Health is Important Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Is Health Important?
          </h2>
          <p className="text-lg leading-relaxed mx-auto max-w-3xl px-4">
            Maintaining good health allows you to live a life full of energy,
            achieve your goals, and reduce the risk of chronic diseases. It's
            your most valuable asset—take care of it!
          </p>
        </div>
      </section>

      {/* Action Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-green-400 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Take the First Step
          </h2>
          <p className="text-lg mb-6 px-4 md:px-0">
            Begin your fitness journey today and transform your lifestyle.
          </p>
          <a
            href="/login"
            className="bg-white text-green-500 px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-gray-100 transition"
          >
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
}

export default Home;
