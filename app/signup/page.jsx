"use client";
import { useState } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import { useRouter } from "next/navigation";
// import useAuth from "../hooks/useAuth";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // const { signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (password !== rePassword) {
        throw new Error("Passwords do not match");
      }
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: username,
          },
        },
      });

      if (error) {
        throw error;
      }

      alert("Sign up successful");
      router.push("/login");

      // const { err } = await supabase.from("Users").insert([
      //   {
      //     id: data.user.id, // Use the auth user id as the users table id
      //     username: username,
      //     email: email,
      //     role: "user",
      //     created_at: new Date().toISOString(),
      //   },
      // ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center gap-4 text-black"
    >
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="password"
        value={rePassword}
        onChange={(e) => setRePassword(e.target.value)}
        placeholder="Re enter your Password"
      />
      <button type="submit" className="text-white">
        Sign Up
      </button>
    </form>
  );
};

export default SignUp;

// supabase.auth.signInWithPassword()
