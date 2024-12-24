"use client";

import { useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

const RoleProtected = ({ children, allowedRoles }) => {
  const { role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !allowedRoles.includes(role)) {
      router.push("/unauthorized");
    }
  }, [role, loading, router, allowedRoles]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!allowedRoles.includes(role)) {
    return null;
  }

  return children;
};

export default RoleProtected;
