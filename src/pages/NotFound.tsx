import React from "react";
import { TbError404 } from "react-icons/tb";

const NotFoundPage: React.FC = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white"
    >
      <div className="text-center">
        {/* 404 Icon */}
        <TbError404 className="text-9xl mx-auto mb-6" />

        {/* Title */}
        <h1 className="text-6xl font-bold mb-4">Oops!</h1>

        {/* Message */}
        <p className="text-xl mb-8">
          We can't seem to find the page you're looking for.
        </p>

        {/* Go Home Link */}
        <a
          href="/"
          className="text-lg font-semibold bg-white text-green-600 py-3 px-6 rounded-lg shadow-lg hover:opacity-90 transition"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
``
