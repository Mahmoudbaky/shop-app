"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

const page = () => {
  const { session, userRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!session || userRole !== "admin") {
      router.push("/auth/login"); // Redirect to login if not admin
    }
  }, [session, userRole, router]);

  if (!session || userRole !== "admin") {
    return <div>Redirecting...</div>; // Or a loading indicator
  } // this pease of code will prevent add products page to appear for a sec

  return <div>add products page</div>;
};

export default page;
