"use client";
import Image from "next/image";
import React from "react";

type Props = {};

export default function OurTeamHero({}: Props) {
  return (
    <div className="w-full h-[50vh] bg-zinc-200 relative  flex justify-center items-center">
      <Image
        width={1000}
        height={1000}
        src="https://images.unsplash.com/photo-1504807959081-3dafd3871909?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="expedition-image"
        className="absolute top-0 left-0 w-full h-[50vh] object-cover object-center"
        loading="lazy"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-[0.5]"></div>
      <h1 className="uppercase text-center lg:text-5xl md:text-4xl sm:text-3xl text-2xl relative tracking-wide mt-10 title font-bold text-secondary-50">
        Our Diverse & <br /> Experienced Team
      </h1>
    </div>
  );
}
