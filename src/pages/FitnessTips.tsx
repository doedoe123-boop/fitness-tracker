function FitnessTips() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-6">
      <div className="container mx-auto max-w-4xl text-center">
        {/* Title Section */}
        <h1 className="text-5xl font-extrabold text-blue-600 mb-6">
          Fitness Tips
        </h1>
        <p className="text-xl text-gray-700 leading-relaxed mb-8">
          Fitness is more than just hitting the gym—it's about staying active,
          maintaining a routine, and making physical activity enjoyable. Start
          small, stay consistent, and enjoy the journey to better health.
        </p>

        {/* Fitness Tips Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            Practical Fitness Tips
          </h2>
          <ul className="list-none grid grid-cols-1 md:grid-cols-2 gap-6 text-left text-gray-700 text-lg leading-relaxed">
            <li className="flex items-center space-x-4">
              <div className="bg-blue-500 text-white w-12 h-12 flex justify-center items-center rounded-full">
                🎯
              </div>
              <p>
                <strong className="text-blue-600">Set Realistic Goals:</strong>{" "}
                Begin with achievable targets to build confidence and maintain
                momentum.
              </p>
            </li>
            <li className="flex items-center space-x-4">
              <div className="bg-blue-500 text-white w-12 h-12 flex justify-center items-center rounded-full">
                🕒
              </div>
              <p>
                <strong className="text-blue-600">
                  Stay Consistent Daily:
                </strong>{" "}
                Dedicate at least 30 minutes to physical activity, whether it’s
                walking, jogging, or yoga.
              </p>
            </li>
            <li className="flex items-center space-x-4">
              <div className="bg-blue-500 text-white w-12 h-12 flex justify-center items-center rounded-full">
                💪
              </div>
              <p>
                <strong className="text-blue-600">Balance Workouts:</strong> Mix
                strength training and cardio to enhance overall fitness.
              </p>
            </li>
            <li className="flex items-center space-x-4">
              <div className="bg-blue-500 text-white w-12 h-12 flex justify-center items-center rounded-full">
                🤸‍♀️
              </div>
              <p>
                <strong className="text-blue-600">Stretch Regularly:</strong>{" "}
                Stretch before and after workouts to improve flexibility and
                prevent injuries.
              </p>
            </li>
          </ul>
        </div>

        {/* Motivational Call-to-Action */}
        <div className="mt-12">
          <p className="text-lg font-semibold text-gray-700 mb-4">
            Remember, consistency is key. Start small, track your progress, and
            celebrate your milestones along the way!
          </p>
          <a
            href="/diet-tips"
            className="bg-blue-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-blue-600 transition"
          >
            Explore Healthy Diet Tips →
          </a>
        </div>
      </div>
    </div>
  );
}

export default FitnessTips;
