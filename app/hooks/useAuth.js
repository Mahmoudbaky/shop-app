import { useState } from "react";
import { supabase } from "@/app/utils/supabaseClient";

const useAuth = () => {
  const [user, setUser] = useState(null);

  const signUp = async (username, email, password) => {
    const { user, err } = await supabase.auth.signUp({ email, password });
    if (err) {
      throw new Error(err.message);
    }
    setUser(user);
  };

  const signIn = async (email, password) => {
    const { user, err } = await supabase.auth.signIn({ email, password });
    if (err) {
      throw new Error(err.message);
    }
    setUser(user);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
    setUser(null);
  };

  return { user, signIn, signUp, signOut };
};

export default useAuth;
