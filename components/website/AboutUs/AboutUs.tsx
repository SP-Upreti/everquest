"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/button";
type Props = {};

gsap.registerPlugin(ScrollTrigger);
function AboutUs({}: Props) {
  useGSAP(() => {
    const splitAboutTitle = new SplitType(".about-subtitle");
    gsap.from(splitAboutTitle.chars, {
      opacity: 0,
      duration: 1.5,
      stagger: 0.03,
      ease: "power4.inOut",
      scrollTrigger: {
        start: "top 90%",
        end: "50% 50%",
        trigger: ".about-subtitle",
        scrub: 3,
      },
    });
    gsap.from(".about-desc1", {
      opacity: 0,
      duration: 1,
      ease: "power4.inOut",
    });

    gsap.from(".about-desc2", {
      opacity: 0,
      duration: 1.5,
      ease: "power4.inOut",
      scrollTrigger: {
        start: "top 90%",
        end: "50% 50%",
        trigger: ".about-desc2",
        scrub: 3,
      },
    });
  });
  return (
    <>
      <div className="lg:w-11/12 w-11/12 3xl:w-8/12 mx-auto  md:py-[5rem] py-[2rem]   grid lg:grid-cols-2 gap-6 justify-center items-center ">
        {/* about us  */}
        <div className="w-full about-desc1  flex flex-col gap-2 items-start justify-center h-[70%]">
          <h2 className="font-extrabold uppercase lg:text-5xl md:text-4xl sm:text-2xl text-xl title">WHo we are</h2>
          <p className=" py-4 md:text-base text-sm font-md leading-relaxed">
            {`At Infinity, our passion for adventure and the great outdoors drives everything we do. Founded by a team of outdoor enthusiasts, we set out to create a platform that would inspire and empower fellow adventurers worldwide. Whether you're seeking serene hikes amidst nature's beauty or challenging treks to conquer majestic peaks, Infinity is here to guide you every step of the way.
              We believe that adventure is not just about reaching new heights—it's about the journey, the experiences, and the memories you create along the path. Our mission is to connect people with nature and ignite a sense of exploration, offering curated trips that cater to all levels of adventure seekers. From tranquil escapes in lush forests to adrenaline-filled expeditions in remote, rugged terrains, we provide carefully designed itineraries that suit every traveler's needs.
              Infinity doesn’t just offer adventures; we create experiences that enrich your soul. Our expert guides, passionate about the outdoors, ensure that your safety and enjoyment are paramount, allowing you to focus on the magic of discovery. We also champion sustainability, working to preserve the natural beauty we explore, so future generations can enjoy the wonders of the earth..`}
          </p>
          <Link href="/contact_us" className="text-white">
            <Button>Get in touch</Button>
          </Link>
        </div>
        {/* image  */}
        <Image
          className="w-full  object-cover about-desc1 object-center max-h-[70vh] rounded-md"
          width={1000}
          height={1000}
          alt="about-us-img"
          src="/AboutUs/team.webp"
        ></Image>
      </div>
    </>
  );
}

export default AboutUs;
