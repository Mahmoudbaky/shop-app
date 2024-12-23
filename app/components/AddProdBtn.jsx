"use client";
import { useRouter } from "next/navigation";
import useAuth from "@/app/hooks/useAuth.js";

const AddProdBtn = () => {
  const { role } = useAuth();
  const router = useRouter();

  console.log(role);

  if (role !== "admin") return null;

  return (
    <button className="btn" onClick={() => router.push("/admin/add-products")}>
      Button
    </button>
  );
};

export default AddProdBtn;
