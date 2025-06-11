import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import SplitType from "split-type";

type Props = {};

function Banner({}: Props) {
  const bannerContainerRef = useRef(null);
  const aboutTitleRef = useRef<any>(null);
  useGSAP(() => {
    const splitAboutTitle = new SplitType(aboutTitleRef.current);
    // const splitAboutDesc = new SplitType(aboutDescRef.current);
    const tl = gsap.timeline({
      scrollTrigger: {
        start: "top 80%",
        end: "50% 50%",
        trigger: bannerContainerRef.current,
        scrub: 3,
      },
    });
    tl.from(
      ".banner-img",
      {
        translateY: "100px",
        duration: 1,
        // ease: "power4.inOut",
      },
      "banner"
    );
    const t2 = gsap.timeline({
      scrollTrigger: {
        start: "top 80%",
        end: "50% 50%",
        trigger: aboutTitleRef.current,
        scrub: 3,
      },
    });
    t2.from(
      ".banner-title",
      {
        height: "0",
        duration: 3,
        transformOrigin: "bottom",
        // ease: "expo.out",
      },
      "banner"
    );
    t2.from(
      ".banner-desc",
      {
        opacity: 0,
        duration: 3,
      },
      "banner"
    );
  });
  return (
    <div
      ref={bannerContainerRef}
      className="w-full mb-[5rem] relative h-[60vh] flex overflow-hidden  justify-center items-center"
    >
      <Image
        width={1000}
        height={1000}
        src="https://images.unsplash.com/photo-1545787636-35db70ee2e6a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="banner-image"
        className="absolute scale-110 top-0 banner-img left-0 brightness-[0.5] w-full h-full object-cover object-bottom"
      ></Image>
      <div className="relative z-20 w-11/12 md:w-10/12 flex flex-col md:flex-row justify-between items-center gap-5 mx-auto">
        <div className="md:w-[70%] flex items-start justify-start flex-col gap-2">
          <span className="text-sm banner-desc  inline-block   md:text-lg font-medium text-secondary-100">
            Contact Infinity for the best adventure of your life.
          </span>
          <h1
            ref={aboutTitleRef}
            className="flex flex-col   text-3xl md:text-6xl tracking-wide title font-bold text-secondary-50"
          >
            <span className="banner-title inline-block md:h-[60px] h-[36px] overflow-hidden">
              Find Your Trail,
            </span>{" "}
            <span className="banner-title inline-block md:h-[60px] h-[36px] overflow-hidden">
              Start Your Journey!
            </span>
          </h1>
        </div>

        <Link
          href="contact_us"
          className="cursor-pointer w-[8rem] hover:w-[10rem] hover:h-[10rem] duration-300  hover:font-semibold text-primary-50 whitespace-nowrap h-[8rem] p-1 border  border-primary-100 rounded-full flex justify-center items-center text-wrap text-center   text-sm"
        >
          <span>CONTACT US</span>
        </Link>
      </div>
    </div>
  );
}

export default Banner;
