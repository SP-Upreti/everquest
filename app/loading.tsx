import Image from "next/image";
import React from "react";

type Props = {};

export default function Loading({ }: Props) {
  return (
    <div className="w-full h-screen  flex  justify-center items-center">
      <div className="absolute  h-16 inset-0 w-full"></div>

      <Image
        src="/logo.png"
        alt="logo"
        width={100}
        height={100}
        className="h-32 w-32 object-contain animate-pulse"
      />
    </div>
  );
}
