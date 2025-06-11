"use client";
import CertificatesMain from "@/components/website/Certificates/CertificatesMain";
import React, { useEffect } from "react";

type Props = {};

function Page({}: Props) {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);
  return (
    <main className="bg-white z-[20] relative">
      <CertificatesMain />
    </main>
  );
}

export default Page;
