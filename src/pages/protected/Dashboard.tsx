import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';
import Sidebar from '../components/layouts/Sidebar';
import DashboardNav from '../components/layouts/ProtectedNav';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error fetching session:', error);
      } else if (session && session.user) {
        setUser(session.user);
      } else {
        navigate('/login');
      }
      setLoading(false);
    };

    getUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-800 dark:text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-dark-primary text-slate-800 dark:text-white">
      <Sidebar />
      <main className="flex-1 p-8">
        <DashboardNav userEmail={user?.email} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white dark:bg-dark-secondary p-6 rounded-2xl shadow">
            <h3 className="text-lg font-medium mb-2">Calories Burned</h3>
            <p className="text-2xl font-bold">530 kcal</p>
          </div>
          <div className="bg-white dark:bg-dark-secondary p-6 rounded-2xl shadow">
            <h3 className="text-lg font-medium mb-2">Steps Today</h3>
            <p className="text-2xl font-bold">7,832</p>
          </div>
          <div className="bg-white dark:bg-dark-secondary p-6 rounded-2xl shadow">
            <h3 className="text-lg font-medium mb-2">Active Time</h3>
            <p className="text-2xl font-bold">1h 45m</p>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-secondary p-6 rounded-2xl shadow text-center">
          <p className="text-slate-500 dark:text-slate-400">Charts and analytics coming soon...</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
