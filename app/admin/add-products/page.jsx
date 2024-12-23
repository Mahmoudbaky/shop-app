"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import { useRouter } from "next/navigation";

const page = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  return <div>page</div>;
};

export default page;
