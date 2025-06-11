import Navbar from "@/components/Navbar";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";
import NavHome from "./NavHome";
import Image from "next/image";
import HeroBg from "@/public/Hero.jpg";

type Props = {};

export default function Try({}: Props) {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".try-container",
        start: "top top",
        end: "300% bottom",
        pin: ".try-container",
        scrub: 1,
        // markers: true,
      },
    });
    tl.from(
      ".animate",
      {
        borderBottomRightRadius: "1.5rem",
        borderTopLeftRadius: "1.5rem",
        width: "30%",
        height: "20%",
        rotate: "1deg",
        ease: "none",
      },
      "same"
    );
    tl.to(
      ".try-title",
      {
        delay: 0.5,
        opacity: 1,
        ease: "sine.out",
        duration: 0.5,
      },
      "same"
    );
  });
  return (
    <div className="w-10/12  pb-[9rem] pt-[5rem] mx-auto relative overflow-hidden try-container h-screen flex justify-center items-center">
      <div className="absolute bottom-4 flex gap-5 items-center">
        <div className="w-[3rem] h-[3rem] overflow-hidden rounded-full border-dotted border-primary-500 p-1 border hover:w-[4rem] hover:h-[4rem] duration-200 cursor-pointer">
          <Image
            src={HeroBg}
            className="w-full h-full object-cover object-center rounded-full"
            alt=""
          ></Image>
        </div>
        <div className="w-[3rem] h-[3rem] overflow-hidden rounded-full border-dotted border-primary-500 p-1 border hover:w-[4rem] hover:h-[4rem] duration-200 cursor-pointer">
          <Image
            src={HeroBg}
            className="w-full h-full object-cover object-center rounded-full"
            alt=""
          ></Image>
        </div>
        <div className="w-[3rem] h-[3rem] overflow-hidden rounded-full border-dotted border-primary-500 p-1 border hover:w-[4rem] hover:h-[4rem] duration-200 cursor-pointer">
          <Image
            src={HeroBg}
            className="w-full h-full object-cover object-center rounded-full"
            alt=""
          ></Image>
        </div>
      </div>
      <video
        className="absolute  animate  w-ful scale-y-95 h-[90%] rotate-0  brightness-[0.3] z-10 object-cover object-center"
        autoPlay
        loop
        muted
      >
        <source src="/HeroBg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="text-center  z-20 title    relative  w-11/12 md:w-10/12 mx-auto flex justify-center items-center flex-col gap-2">
        <h1 className="text-5xl 3xl:text-8xl opacity-0  try-title  tracking-wide font-bold text-secondary-50">
          Unseen Adventures <br /> Await
        </h1>
      </div>
    </div>
  );
}
