import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";
import { Session } from "@supabase/supabase-js"; 

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSessionData(session);
      setLoading(false);
    });
  }, []);

  if (loading) return null;

  if (!sessionData) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
