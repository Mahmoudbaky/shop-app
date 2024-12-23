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
    <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center h-screen">
      {/* /* <!-- Image Column --> */}
      <div className="hidden bg-accent md:block md:w-full md:h-full md:my-8 xl:my-12">
        <div className="flex flex-col items-center justify-center xl:min-w-full md:min-w-full min-h-full gap-8 md:w-[600px] xl:w-[600px]  mx-auto">
          {/* <p className="text-2xl text-white self-start">Welcome to our shop</p> */}
          <img
            src="/images/rb_9090.png"
            alt="image"
            className="w-full h-auto xl:w-[600px] md:w-[600px]"
          />
        </div>
      </div>
      <div className="flex items-center justify-center p-8">
        <form className="space-y-4 w-[350px] mx-auto ">
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

          <div className="mt-6 text-center text-sm">
            Don't have an account?
            <a href="#" className="text-accent  font-medium">
              {" Sign in"}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default login;
