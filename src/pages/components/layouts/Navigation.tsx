import { Link, useLocation } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <FaHeartbeat className="text-2xl text-teal-600" />
            <span className="text-xl font-semibold text-slate-900">
              Fitness Tracker
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-slate-600 hover:text-teal-600 transition-colors ${
                location.pathname === "/" ? "text-teal-600" : ""
              }`}
            >
              Home
            </Link>
            
            {/* Lifestyle Dropdown */}
            <div className="relative group">
              <button className="text-slate-600 hover:text-teal-600 transition-colors inline-flex items-center">
                Lifestyle
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  to="/health-importance"
                  className="block px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-teal-600"
                >
                  Health Importance
                </Link>
                <Link
                  to="/fitness-tips"
                  className="block px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-teal-600"
                >
                  Fitness Tips
                </Link>
                <Link
                  to="/diet-tips"
                  className="block px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-teal-600"
                >
                  Diet Tips
                </Link>
              </div>
            </div>

            <Link
              to="/work-out-now"
              className={`text-slate-600 hover:text-teal-600 transition-colors ${
                location.pathname === "/work-out-now" ? "text-teal-600" : ""
              }`}
            >
              Start
            </Link>
            
            <Link
              to="/about"
              className={`text-slate-600 hover:text-teal-600 transition-colors ${
                location.pathname === "/about" ? "text-teal-600" : ""
              }`}
            >
              About
            </Link>

            <Link
              to="/download"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 transition-colors"
            >
              Download App
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-teal-600 hover:bg-slate-100 transition-colors"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="space-y-2">
              <Link
                to="/"
                className="block px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-teal-600 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <div className="space-y-1">
                <div className="px-4 py-2 text-sm font-medium text-slate-900">
                  Lifestyle
                </div>
                <Link
                  to="/health-importance"
                  className="block px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-teal-600 pl-8 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Health Importance
                </Link>
                <Link
                  to="/fitness-tips"
                  className="block px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-teal-600 pl-8 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Fitness Tips
                </Link>
                <Link
                  to="/diet-tips"
                  className="block px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-teal-600 pl-8 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Diet Tips
                </Link>
              </div>
              <Link
                to="/work-out-now"
                className="block px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-teal-600 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start
              </Link>
              <Link
                to="/about"
                className="block px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-teal-600 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/download"
                className="block px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-teal-600 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Download App
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
