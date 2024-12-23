import { useEffect, useState } from "react";
import { supabase } from "@/app/utils/supabaseClient";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null); // Set the user if session exists or null if not
      if (session?.user) {
        fetchUserRole(session.user.id);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchUserRole(session.user.id);
      } else {
        setRole(null);
      }
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const fetchUserRole = async (userId) => {
    const { data, error } = await supabase
      .from("users")
      .select("role")
      .eq("id", userId)
      .single();

    if (!error && data) {
      setRole(data.role);
    }
  };

  return { user, role, loading };
};

export default useAuth;
