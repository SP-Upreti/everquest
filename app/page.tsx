"use client";
import HomeMain from "@/components/website/Homepage/HomeMain";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);
  return (

    <main>
      <HomeMain />
    </main>

  );
}
