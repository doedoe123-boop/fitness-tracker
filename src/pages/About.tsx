function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-400 to-blue-500 text-white min-h-[40vh] flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-5xl font-bold mb-4">About Fitness Tracker</h1>
          <p className="text-xl leading-relaxed max-w-3xl mx-auto">
            Your partner in achieving a healthier, fitter, and more active
            lifestyle. Track progress, get tips, and unlock your full potential.
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-4xl font-bold text-green-600 mb-6">
          Why Choose Us?
        </h2>
        <p className="text-lg leading-relaxed mb-8 text-gray-700">
          Fitness Tracker is designed to empower you to take charge of your
          health and fitness. Whether you're a beginner or a fitness enthusiast,
          our tools and resources are tailored to help you achieve your goals.
        </p>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-bold text-green-600 mb-4">
              Track Workouts
            </h3>
            <p className="text-gray-700">
              Easily monitor your workout routines and keep track of your
              progress.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">
              Balanced Diet
            </h3>
            <p className="text-gray-700">
              Get tips and advice on maintaining a balanced and nutritious diet.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-bold text-red-600 mb-4">
              Stay Motivated
            </h3>
            <p className="text-gray-700">
              Discover strategies to stay motivated and consistent on your
              fitness journey.
            </p>
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="mt-12">
          <a
            href="/login"
            className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-green-500 transition"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;
