import { ParallaxText } from "@/components/ParallexText";
import { WavyText } from "@/components/wavy-text";
import React from "react";

type Props = {};

function Banner2({ }: Props) {
  return (
    <div className="w-full relative h-screen   flex overflow-hidden justify-center items-center bg-fixed   bg-parallax bg-center bg-cover">
      <div className="absolute inset-0 scale-110 bg-black  opacity-[0.5] w-full h-full object-cover object-center"></div>
      <div className="flex items-center relative justify-center flex-col gap-2">
        <h1 className="flex flex-col relative w-full space-y-4 text justify-center items-center cursor-pointer text-zinc-100 title text-center text-5xl md:text-[6vw]  font-black uppercase">

          <ParallaxText text="Beyong Trials" textStyle="" triggerOnce={false} />
          <ParallaxText text="Beyond Limits·" textStyle="" triggerOnce={false} />
          <ParallaxText text="Beyond Expectations" textStyle="" triggerOnce={false} />
        </h1>
      </div>
    </div>
  );
}

export default Banner2;
