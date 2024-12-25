"use client";
import { createContext, useContext, useEffect, useState } from "react"; // i need to know more about context api (need some study)
import { supabase } from "../utils/supabaseClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // getting user id from the session after loging in
    supabase.auth.getSession().then(({ data: { session } }) => {
      // i can't understand this syntax {data:{session}}
      setSession(session);
      if (session?.user) {
        fetchUserRole(session.user.id);
      } else {
        setUserRole(null);
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      // need to know more about this api onAuthStateChange()
      setSession(session);
      if (session?.user) {
        fetchUserRole(session.user.id);
      } else {
        setUserRole(null);
      }
    });
  }, []);

  const fetchUserRole = async (userId) => {
    const { data, error } = await supabase
      .from("auth.users")
      .select("role")
      .eq("id", userId)
      .single();

    if (data) {
      setUserRole(data.role);
    } else if (error) {
      console.error("Error fetching user role:", error);
    }
  };

  const value = { session, userRole };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
