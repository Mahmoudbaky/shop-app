"use client";
import { useState } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

const login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log(data);
      if (error) throw error;

      // router.push("/dashboard"); // Redirect to dashboard after successful login
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen ">
      {/* <div className="bg-neutral xl:w-[600px] md:w-[500px] h-full"></div> */}
      <form className="space-y-4 w-[350px] ">
        <div className=" flex flex-col gap-2">
          <h1 className="text-2xl font-bold"> Sgin in </h1>
          <p className="">Enter your email and password to sign in!</p>
        </div>

        <button className="w-full btn  border-gray-400">
          <FcGoogle className="text-2xl" />
          <span> Google</span>
        </button>
        <hr className="text-red-900" />

        <label className="input input-bordered flex items-center gap-2 border-gray-400">
          Name
          <input type="text" className="grow " placeholder="Daisy" />
        </label>
        <label className="input input-bordered flex items-center gap-2 border-gray-400">
          Email
          <input type="text" className="grow" placeholder="daisy@site.com" />
        </label>

        <button className="w-full btn border-gray-400">
          <span>Sign in</span>
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        Don't have an account?
        <a
          href="#"
          className="text-indigo-600 hover:text-indigo-500 font-medium"
        >
          {" Sign in"}
        </a>
      </div>
    </div>
  );
};

export default login;
