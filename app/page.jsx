"use client";
import Image from "next/image";
import AddProdBtn from "./components/AddProdBtn";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import NavBar from "./components/NavBar";
import { AuthProvider } from "@/app/context/AuthContext";

export default function Home() {
  const { user, loading } = useAuth();
  console.log(user);
  const router = useRouter();

  // console.log(userRole);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/auth/login"); // Redirect to login if not admin
    }
  }, [user, loading, router]);

  // if (loading) {
  //   return <div>Redirecting...</div>; // Or a loading indicator
  // } // this pease of code will prevent add products page to appear for a sec

  return (
    <div className="flex justify-center items-center h-screen bg-neutral">
      <NavBar />
      <h1>Home Page</h1>
    </div>
  );
}
