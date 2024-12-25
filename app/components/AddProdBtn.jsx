"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

const AddProdBtn = () => {
  // const { isAdmin } = useAuth();
  const router = useRouter();

  // console.log(isAdmin);

  // if (!isAdmin) return null;

  return (
    <button
      onClick={() => router.push("/admin/add-products")}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Add New Product
    </button>
  );
};

export default AddProdBtn;
