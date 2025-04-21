import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../utils/supabaseClient";

const DashboardNav: React.FC<{ userEmail?: string }> = ({ userEmail }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="w-full flex justify-between items-center p-4 bg-white dark:bg-dark-secondary shadow mb-6">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-slate-600 dark:text-slate-300">{userEmail}</span>
        <button
          onClick={handleLogout}
          className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardNav;
