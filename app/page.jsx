"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import NavBar from "./components/NavBar";
import HeroSlider from "./components/HeroSlider";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  return (
    <>
      <NavBar />
      <HeroSlider />
    </>
  );
}
