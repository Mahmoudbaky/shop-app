"use client";
import { useState } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center h-screen">
      {/* /* <!-- Image Column --> */}
      <div className="hidden bg-accent md:block md:w-full md:h-full md:my-8 xl:my-12">
        <div className="flex flex-col items-center justify-center xl:min-w-full md:min-w-full min-h-full gap-8 md:w-[600px] xl:w-[600px]  mx-auto">
          <img
            src="/images/rb_9090.png"
            alt="image"
            className="w-full h-auto xl:w-[600px] md:w-[600px]"
          />
        </div>
      </div>
      <div className="flex items-center justify-center p-8">
        <form className="space-y-4 w-[350px] mx-auto " onSubmit={handleSubmit}>
          <div className=" flex flex-col gap-2">
            <h1 className="text-2xl font-bold"> Sgin up </h1>
            <p className="">Enter your information to Sign up!</p>
          </div>

          <button className="w-full btn  border-gray-400">
            <FcGoogle className="text-2xl" />
            <span> Google</span>
          </button>
          <hr className="text-red-900" />

          <label
            htmlFor="username"
            className="input input-bordered flex items-center gap-2 border-gray-400"
          >
            Username
            <input
              type="text"
              name="username"
              value={username}
              className="grow "
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label
            htmlFor="email"
            className="input input-bordered flex items-center gap-2 border-gray-400"
          >
            Email
            <input
              type="text"
              name="email"
              value={email}
              className="grow"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label
            htmlFor="password"
            className="input input-bordered flex items-center gap-2 border-gray-400"
          >
            password
            <input
              type="password"
              name="password"
              value={password}
              className="grow"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label
            htmlFor="repassword"
            className="input input-bordered flex items-center gap-2 border-gray-400"
          >
            password confirm
            <input
              type="password"
              name="repassword"
              value={rePassword}
              className="grow"
              placeholder=""
              onChange={(e) => setRePassword(e.target.value)}
            />
          </label>

          <button type="submit" className="w-full btn border-gray-400">
            <span>Sign up</span>
          </button>

          <div className="mt-6 text-center text-sm">
            You already a customer?
            <Link href="/auth/login" className="text-accent  font-medium">
              {" Sign in"}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
