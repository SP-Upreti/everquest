"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React from "react";
import SplitType from "split-type";

type Props = {};

export default function AboutUsHero({}: Props) {
  useGSAP(() => {
    const splitHeroTitle = new SplitType(".about-title");
    gsap.from(splitHeroTitle.chars, {
      opacity: 0,
      duration: 1.5,
      stagger: 0.03,
      ease: "power4.inOut",
    });
  });
  return (
    <>
      <div className="w-full h-[55vh] bg-zinc-200 relative  flex justify-center items-center">
        <Image
          width={1000}
          height={1000}
          src="/Hero/Makalu.jpg"
          alt="expedition-image"
          className="absolute top-0 left-0 w-full h-[55vh] object-cover"
          loading="lazy"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-[0.5]"></div>
        <h1 className="uppercase text-center lg:text-5xl md:text-4xl sm:text-3xl text-2xl relative tracking-wide mt-10 title font-bold text-secondary-50">
          ABOUT US
        </h1>
      </div>
    </>
  );
}
