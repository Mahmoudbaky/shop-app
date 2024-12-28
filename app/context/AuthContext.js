"use client";
import { createContext, useContext, useEffect, useState } from "react"; // i need to know more about context api (need some study)
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // getting user id from the session after loging in

    // Fetch the session on initial load
    const initializeUser = async () => {
      const { data, error } = supabase.auth.getSession();
      console.log("Data:", data);
      console.log("Error:", error);

      if (error) {
        console.error("Error fetching session:", error.message);
        setLoading(false);
        return;
      }

      // if (!data || !data.session) {
      //   console.log("No active session found");
      //   return router.push("/auth/login"); // Redirect to login or handle accordingly
      // }

      console.log(data);
      setUser(data?.session?.user || null);
      setLoading(false);
    };

    // Listen to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    initializeUser();

    return subscription.unsubscribe();
  }, []);

  const value = { user, loading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
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
