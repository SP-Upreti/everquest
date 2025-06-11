"use client";
import AllExpMain from "@/components/website/AllExpedition/AllExpMain";
import React, { useEffect } from "react";

type Props = {};

function Page({ params }: any) {
  const { distance } = params;
  useEffect(() => {
    scrollTo(0, 0);
  },[]);
  return (
    <main className="bg-white z-[20] relative">
      <AllExpMain distance={distance} />
    </main>
  );
}

export default Page;
