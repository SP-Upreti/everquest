import Image from "next/image";
import React from "react";
import TrekData from "@/data/TrekData";
import Leaf from "./leaf";
type Props = {};

export default function AllTrekHero({ region }: any) {
  if (!region) {
    // Handle case where activity data is not found
    return <div>Activity not found</div>;
  }
  const data: any = TrekData.find((obj) => obj.route == region);
  console.log(data);
  const { name } = data;
  return (
    <>
      <div className="w-full h-[50vh] bg-zinc-200  overflow-hidden relative  flex justify-center items-center">
        <Leaf />
        <Image
          width={1000}
          height={1000}
          src="https://images.unsplash.com/photo-1611154046036-cd91e50978be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="expedition-image"
          className="absolute top-0 left-0 w-full h-[50vh] object-cover object-center"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-[0.3]"></div>
        <h1 className="text-3xl md:text-6xl relative tracking-wide mt-10 title font-bold text-secondary-50">
          {name}
        </h1>
      </div>
    </>
  );
}
