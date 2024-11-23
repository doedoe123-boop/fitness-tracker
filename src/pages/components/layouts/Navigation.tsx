import { Link, useLocation } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";

const Navigation = () => {
  const location = useLocation();

  // Determine the background color for the navigation
  const getNavBackgroundColor = () => {
    if (location.pathname === "/health-importance") {
      return "bg-gradient-to-b from-green-100 to-green-100 text-green-600";
    }
    if (location.pathname === "/fitness-tips") {
      return "bg-gradient-to-b from-blue-100 to-blue-100 text-blue-600";
    }
    if (location.pathname === "/diet-tips") {
      return "bg-gradient-to-b from-green-100 to-green-100 text-green-600";
    }
    return "bg-gradient-to-r from-green-400 to-blue-500";
  };

  const getTitleColor = () => {
    if (location.pathname === "/health-importance") {
      return " text-green-600";
    }
    if (location.pathname === "/fitness-tips") {
      return " text-blue-600";
    }
    if (location.pathname === "/diet-tips") {
      return " text-green-600";
    }
    return "text-white";
  };

  return (
    <nav
      className={`${getNavBackgroundColor()} text-white px-6 py-4 shadow-md`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <FaHeartbeat className="text-2xl text-red-500" />
          <span
            className={`${getTitleColor()} self-center text-2xl font-semibold whitespace-nowrap`}
          >
            Fitness Tracker
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
            <li>
              <Link
                to="/"
                className={`${getTitleColor()} block py-2 px-3 md:p-0`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <button
                id="dropdownNavbarLink"
                data-dropdown-toggle="dropdownNavbar"
                className={`${getTitleColor()} flex items-center justify-between w-full py-2 px-3 md:p-0 md:w-auto`}
              >
                Lifestyle{" "}
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              <div
                id="dropdownNavbar"
                className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-400"
                  aria-labelledby="dropdownLargeButton"
                >
                  <li>
                    <Link
                      to="/health-importance"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Health Importance
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/fitness-tips"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Fitness Tips
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/diet-tips"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Diet Tips
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <Link
                to="/about"
                className={`${getTitleColor()} block py-2 px-3 md:p-0`}
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to="/login"
                className={`${getTitleColor()} block py-2 px-3 md:p-0`}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
