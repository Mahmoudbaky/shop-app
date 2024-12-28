"use client";
import Image from "next/image";
import AddProdBtn from "./components/AddProdBtn";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { session, userRole } = useAuth();
  const router = useRouter();

  console.log(userRole);

  useEffect(() => {
    if (!session || userRole !== "admin") {
      router.push("/auth/login"); // Redirect to login if not admin
    }
  }, [session, userRole, router]);

  if (!session || userRole !== "admin") {
    return <div>Redirecting...</div>; // Or a loading indicator
  } // this pease of code will prevent add products page to appear for a sec
  return (
    <div className="flex justify-center items-center h-screen bg-neutral">
      <AddProdBtn />
      <h1>Home Page</h1>
    </div>
  );
}
