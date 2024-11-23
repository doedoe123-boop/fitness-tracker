function DietTips() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-white p-6">
      <div className="container mx-auto max-w-4xl text-center">
        {/* Title Section */}
        <h1 className="text-5xl font-extrabold text-green-600 mb-6">
          Healthy Diet Lifestyle
        </h1>
        <p className="text-xl text-gray-700 leading-relaxed mb-8">
          A healthy diet is the foundation of good health. What you eat impacts
          your energy, mood, and overall well-being. Discover simple ways to
          create a balanced diet that fuels your body and mind.
        </p>

        {/* Healthy Eating Principles Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            Key Principles of Healthy Eating
          </h2>
          <ul className="list-none grid grid-cols-1 md:grid-cols-2 gap-6 text-left text-gray-700 text-lg leading-relaxed">
            <li className="flex items-center space-x-4">
              <div className="bg-green-500 text-white w-12 h-12 flex justify-center items-center rounded-full">
                🥦
              </div>
              <p>
                <strong className="text-green-600">Variety:</strong> Eat a range
                of foods to get essential nutrients and vitamins.
              </p>
            </li>
            <li className="flex items-center space-x-4">
              <div className="bg-green-500 text-white w-12 h-12 flex justify-center items-center rounded-full">
                🍭
              </div>
              <p>
                <strong className="text-green-600">
                  Limit Unhealthy Choices:
                </strong>{" "}
                Reduce intake of sugar, salt, and saturated fats.
              </p>
            </li>
            <li className="flex items-center space-x-4">
              <div className="bg-green-500 text-white w-12 h-12 flex justify-center items-center rounded-full">
                💧
              </div>
              <p>
                <strong className="text-green-600">Stay Hydrated:</strong> Drink
                plenty of water throughout the day to support your body.
              </p>
            </li>
            <li className="flex items-center space-x-4">
              <div className="bg-green-500 text-white w-12 h-12 flex justify-center items-center rounded-full">
                🌾
              </div>
              <p>
                <strong className="text-green-600">Natural Choices:</strong>{" "}
                Incorporate fresh fruits, vegetables, and whole grains into your
                meals.
              </p>
            </li>
          </ul>
        </div>

        {/* Quick Meal Tips Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            Quick Meal Tips
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Eating healthy doesn’t have to be complicated. Plan your meals
            ahead, avoid processed foods, and savor every bite by practicing
            mindful eating. Small changes in your diet can lead to significant
            health benefits!
          </p>
          <a
            href="/health-importance"
            className="bg-green-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-green-600 transition"
          >
            Learn More About Health Importance →
          </a>
        </div>
      </div>
    </div>
  );
}

export default DietTips;
