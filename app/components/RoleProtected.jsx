import { useEffect } from "react";
import { useAuth } from "@/app/hooks/useAuth.js";
import { useRouter } from "next/navigation";

const RoleProtected = ({ children, allowedRoles }) => {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !allowedRoles.includes(role))) {
      router.push("/unauthorized");
    }
  }, [user, role, loading, router, allowedRoles]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !allowedRoles.includes(role)) {
    return null;
  }

  return children;
};

export default RoleProtected;
