import { useEffect } from "react";
import { useAuth } from "@/app/hooks/useAuth.js";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login"); // Redirect to login page if user is not logged in
    }
  }, [user, router]);

  if (!user) {
    return <p>Loading...</p>; // Don't render anything while checking user's login status
  }

  return children;
};

export default ProtectedRoute;
