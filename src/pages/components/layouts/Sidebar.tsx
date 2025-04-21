import React from "react";
import { FaHeartbeat, FaDumbbell, FaChartLine, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white dark:bg-dark-secondary shadow-md p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <FaHeartbeat className="text-teal-500 text-2xl" />
        <h1 className="text-xl font-bold">Fitnesses</h1>
      </div>
      <nav className="flex flex-col space-y-4">
        <Link to="/dashboard" className="flex items-center space-x-2 hover:text-teal-500">
          <FaChartLine /> <span>Dashboard</span>
        </Link>
        <Link to="/workouts" className="flex items-center space-x-2 hover:text-teal-500">
          <FaDumbbell /> <span>Workouts</span>
        </Link>
        <Link to="/profile" className="flex items-center space-x-2 hover:text-teal-500">
          <FaUser /> <span>Profile</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
