const HealthImportance = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-white p-6">
      <div className="container mx-auto max-w-4xl text-center">
        {/* Title Section */}
        <h1 className="text-5xl font-extrabold text-green-600 mb-6">
          The Importance of Health
        </h1>
        <p className="text-xl text-gray-700 leading-relaxed mb-8">
          Your health is your most valuable asset. It affects your energy, mood,
          productivity, and quality of life. By maintaining good health, you can
          prevent chronic diseases, improve mental well-being, and live life to
          its fullest.
        </p>

        {/* Why Focus on Health Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            Why Focus on Health?
          </h2>
          <ul className="list-disc list-inside text-left text-gray-700 text-lg leading-relaxed">
            <li className="mb-2">
              <strong className="text-green-600">Prevent Illnesses:</strong>{" "}
              Avoid chronic conditions such as diabetes, heart disease, and
              obesity.
            </li>
            <li className="mb-2">
              <strong className="text-green-600">Boost Energy Levels:</strong>{" "}
              Feel more energetic and ready to tackle your daily tasks.
            </li>
            <li className="mb-2">
              <strong className="text-green-600">
                Enhance Mental Clarity:
              </strong>{" "}
              Reduce stress and improve your focus and overall well-being.
            </li>
            <li>
              <strong className="text-green-600">Increase Longevity:</strong>{" "}
              Enjoy a longer, healthier, and more fulfilling life.
            </li>
          </ul>
        </div>

        {/* How to Improve Health Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            How to Improve Your Health?
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Achieving good health doesn’t have to be overwhelming. Start with
            small, consistent habits that lead to big changes over time.
          </p>
          <ul className="list-none grid grid-cols-1 md:grid-cols-2 gap-6">
            <li className="flex items-center space-x-4">
              <div className="bg-green-500 text-white w-12 h-12 flex justify-center items-center rounded-full">
                🏃‍♂️
              </div>
              <p className="text-gray-700">
                <strong className="text-green-600">Stay Active:</strong> Aim for
                at least 30 minutes of physical activity daily.
              </p>
            </li>
            <li className="flex items-center space-x-4">
              <div className="bg-green-500 text-white w-12 h-12 flex justify-center items-center rounded-full">
                🍎
              </div>
              <p className="text-gray-700">
                <strong className="text-green-600">Eat Right:</strong> Maintain
                a balanced diet rich in whole foods, fruits, and vegetables.
              </p>
            </li>
            <li className="flex items-center space-x-4">
              <div className="bg-green-500 text-white w-12 h-12 flex justify-center items-center rounded-full">
                🛌
              </div>
              <p className="text-gray-700">
                <strong className="text-green-600">Sleep Well:</strong> Get 7–9
                hours of quality sleep each night.
              </p>
            </li>
            <li className="flex items-center space-x-4">
              <div className="bg-green-500 text-white w-12 h-12 flex justify-center items-center rounded-full">
                🧘‍♀️
              </div>
              <p className="text-gray-700">
                <strong className="text-green-600">Manage Stress:</strong>{" "}
                Practice mindfulness and relaxation techniques regularly.
              </p>
            </li>
          </ul>
        </div>

        {/* Motivational Call-to-Action */}
        <div className="mt-12">
          <p className="text-xl font-semibold text-gray-800">
            Start your journey to better health today. Make small changes, and
            watch your life transform!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HealthImportance;
