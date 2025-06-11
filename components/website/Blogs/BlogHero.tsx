import Image from "next/image";
import React from "react";

type Props = {};

export default function BlogHero({}: Props) {
  return (
    <div className="w-full h-[50vh] bg-zinc-200 relative  flex justify-center items-center">
      <Image
        width={1000}
        height={1000}
        src="/blogs.jpg"
        alt="expedition-image"
        className="absolute top-0 left-0 w-full h-[50vh] object-cover object-center"
        loading="lazy"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-[0.5]"></div>
      <h1 className="uppercase text-center lg:text-5xl md:text-4xl sm:text-3xl text-2xl relative tracking-wide mt-10 title font-bold text-secondary-50">
        Explore Our Articles
      </h1>
    </div>
  );
}
