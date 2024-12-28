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
  const router = useRouter();

  console.log("Current user and role:", user);

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  // Show loading state while we're checking auth
  if (loading) {
    return <div>Loading...</div>;
  }

  // Only show the page content if user is admin
  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-neutral">
      <NavBar />
      <h1>Home Page</h1>
    </div>
  );
}
