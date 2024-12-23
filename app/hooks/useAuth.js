import { useEffect, useState } from "react";
import { supabase } from "@/app/utils/supabaseClient";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    async function getInitialSession() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        if (session?.user) {
          const { data } = await supabase
            .from("users")
            .select("role")
            .eq("id", session.user.id)
            .single();
          setRole(data?.role);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data } = await supabase
          .from("users")
          .select("role")
          .eq("id", session.user.id)
          .single();
        setRole(data?.role);
      } else {
        setRole(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // const fetchUserRole = async (userId) => {
  //   const { data, error } = await supabase
  //     .from("users")
  //     .select("role")
  //     .eq("id", userId)
  //     .single();

  //   if (!error && data) {
  //     setRole(data.role);
  //   }
  // };

  return { user, role, loading };
};

export default useAuth;
