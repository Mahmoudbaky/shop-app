"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

const page = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  console.log(user);

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

  return <div>add products page</div>;
};

export default page;
