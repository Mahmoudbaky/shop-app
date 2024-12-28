"use client";
import { createContext, useContext, useEffect, useState } from "react"; // i need to know more about context api (need some study)
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUserRole = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("role")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching user role:", error);
        return null;
      }

      return data?.role;
    } catch (error) {
      console.error("Error in fetchUserRole:", error);
      return null;
    }
  };

  useEffect(() => {
    // getting user id from the session after loging in

    // Fetch the session on initial load
    const initializeUser = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Error fetching session:", error.message);
          setLoading(false);
          return;
        }

        if (session?.user) {
          // Use the role directly from the user object
          setUser(session.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error in initializeUser:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setLoading(true);

      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const value = {
    user,
    loading,
    isAdmin: user?.role === "admin", // Check the built-in role
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// const [session, setSession] = useState(null);
// const [userRole, setUserRole] = useState(null);

// what is this syntax ???!!!!

// supabase.auth.getSession().then(({ data: { session } }) => {
//   // i can't understand this syntax {data:{session}}
//   console.log(session);
//   setSession(session);
//   if (session?.user) {
//     console.log(session.user.id);
//     fetchUserRole(session);
//   } else {
//     setUserRole(null);
//   }
// });

// supabase.auth.onAuthStateChange((_event, session) => {
//   // need to know more about this api onAuthStateChange()
//   setSession(session);
//   if (session?.user) {
//     fetchUserRole(session); /// error here
//   } else {
//     setUserRole(null);
//   }
// });

// const fetchUserRole = (session) => {
//   // console.log(userId);

//   const Role = session.user.role;
//   console.log(Role);
//   // const { data, error } = await supabase
//   //   .from("public.users")
//   //   .select("role")
//   //   .eq("id", userId)
//   //   .single()
//   //   .limit(1);
//   // console.log(data);

//   if (Role) {
//     setUserRole(Role);
//     console.log(Role);
//   } else if (error) {
//     console.error("Error fetching user role:", error); /// error here
//   }
// };
