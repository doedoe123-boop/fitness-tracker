import { useEffect, useState, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";
import { Session } from "@supabase/supabase-js";

export default function RedirectIfAuthenticated({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  if (loading) return null;
  return session ? <Navigate to="/dashboard" replace /> : <>{children}</>;
}
