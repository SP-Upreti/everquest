import React, { useRef, useMemo, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react"
import { ParallaxText } from "@/components/ParallexText";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Props = {};

const ServicesHome = React.memo(function ServicesHome({ }: Props) {
  const maincontainer = useRef<any>();
  const animatepackage = useRef<any>();

  const buttonRefs = useRef<(any | null)[]>([]);

  // Run animation on mount
  useEffect(() => {
    buttonRefs.current.forEach((btn, index) => {
      if (btn) {
        gsap.fromTo(btn,
          { scale: 1 },
          {
            scale: 1.1,
            scrollTrigger: {
              trigger: btn,
              start: "top center",
              end: "bottom center",
              scrub: true,
              onLeave: () => gsap.to(btn, { scale: 1, duration: 0.3 }),
              onLeaveBack: () => gsap.to(btn, { scale: 1, duration: 0.3 }),
            }
          });
      }
    });
  }, []);

  const travelPackages = useMemo(() => [
    {
      id: 1,
      title: "Explore Mountains",
      image: "/ExpeditionPackage/Exp1.png",
      category: "Mountaineering",
      activities: [
        "Summit world-famous peaks with seasoned guides.",
        "Experience high-altitude challenges safely.",
        "Discover Nepal’s rugged alpine beauty.",
        "Create stories that echo in the Himalayas.",
      ],
    },
    {
      id: 2,
      title: "Trek the Trails",
      image: "/ExpeditionPackage/Exp2.png",
      category: "Trekking",
      activities: [
        "Walk through rhododendron forests and villages.",
        "Meet locals and understand Himalayan lifestyles.",
        "Trek to iconic destinations like Everest Base Camp.",
        "Experience both challenge and peace on trails.",
      ],
    },
    {
      id: 3,
      title: "Discover Culture & Nature",
      image: "/ExpeditionPackage/Exp3.png",
      category: "Cultural Tours & Nature",
      activities: [
        "Visit heritage sites in Kathmandu Valley.",
        "Explore Chitwan’s wildlife and jungle safari.",
        "Enjoy peaceful boat rides in Pokhara.",
        "Immerse in Nepal’s vibrant festivals and traditions.",
      ],
    },
  ], []);

  return (
    <main ref={maincontainer} className="relative ">


      <div className="p-24 px-16 space-y-14">
        <div className="space-y-4 -2 bg-[#121212]">
          <h2 className="text-2xl xl:text-5xl font-semibold text-center">
            <ParallaxText text="Choose Your Next Adventure" triggerOnce={false} />
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-center py-4">
            Explore curated adventures across Nepal ——— from majestic mountains to serene trails, every package promises unforgettable memories , purpose-driven travel.
          </p>
        </div>

        {travelPackages.map((data, idx) => (
          <motion.div

            transition={{ duration: 0.1 }}
            whileHover={{
              scale: 1.01
            }}

            className={`py-3 items-center  pl-10 pr-3 flex overflow-hidden max-w-7xl mx-auto   border border-white/10 relative rounded-full`} key={idx}>


            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent z-10" />

            <div className="absolute top-0 left-0 h-full w-[50%]">
              <div className="relative h-full blend-right-gradient">
                <Image src={data.image} fill alt={data.title} className="object-cover" />
              </div>
            </div>


            <div className="flex justify-between  w-full items-center z-[99]">
              <div className="flex text-[40px]">
                <h1 className=" font-semibold">Package</h1>
                <span className=" px-2">:</span>
                <h2 className=" font-semibold">{data.title}</h2>
                <div className=" flex flex-col border-l border-white text-base mx-8 justify-center  pl-4 gap-1">
                  <h1>First information sentence</h1>
                  <h1>FiSecond  information sentence</h1>
                </div>
              </div>
              <button
                ref={el => {
                  if (el) {
                    buttonRefs.current[idx] = el
                  }
                }}
                className="text-white/50 text-white z-[999] flex gap-2 border text-lg h-20 w-32 rounded-full justify-center items-center">
                View <ArrowRight />
              </button>
            </div>


          </motion.div>
        ))}
      </div>
    </main>
  );
});

export default ServicesHome;
