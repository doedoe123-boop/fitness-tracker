import { FaDownload } from "react-icons/fa";

function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white flex flex-col items-center justify-center">
      {/* Hero Section */}
      <div className="text-center px-6 max-w-3xl">
        <h1 className="text-5xl font-bold mb-6">Sign Up Today</h1>
        <p className="text-lg leading-relaxed mb-8">
          Join thousands of users who are tracking their fitness goals and
          achieving amazing results. Start your fitness journey with us today!
        </p>

        {/* App Download Call-to-Action */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <a
            href="#"
            className="bg-white text-green-500 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition"
          >
            Sign Up Now
          </a>
          <a
            href="#"
            className="bg-black text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-800 transition flex items-center space-x-2"
          >
            <FaDownload className="text-1xl text-green-500 mx-auto" />
            <span>Download App</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
