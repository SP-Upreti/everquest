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
              trigger: maincontainer.current,
              start: "top center",
              end: "bottom center",
              scrub: 2,
              onLeave: () => gsap.to(btn, { scale: 1, duration: 0.3 }),
              onLeaveBack: () => gsap.to(btn, { scale: 1, duration: 0.3 }),
            },
            stagger: 3
          });
      }
    });
  }, []);

  const travelPackages = useMemo(() => [
    {
      id: 1,
      title: "Ice Climbing",
      image: "https://images.pexels.com/photos/5779255/pexels-photo-5779255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Adventure Sports",
      activities: [
        "Climb frozen waterfalls and icy cliffs.",
        "Experience vertical ascents in harsh conditions.",
        "Led by certified ice-climbing guides.",
        "Challenge your limits in the heart of winter.",
      ],
    },
    {
      id: 2,
      title: "Rock Climbing",
      image: "https://images.pexels.com/photos/27992636/pexels-photo-27992636/free-photo-of-a-stack-of-rocks-on-top-of-a-mountain-with-snow-capped-mountains-in-the-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Adventure Sports",
      activities: [
        "Scale natural rock faces in scenic spots.",
        "Choose routes from beginner to expert level.",
        "Learn techniques from pro climbers.",
        "Strengthen both body and mind outdoors.",
      ],
    },
    {
      id: 3,
      title: "Heli Tour",
      image: "https://images.pexels.com/photos/12995176/pexels-photo-12995176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Aerial Adventure",
      activities: [
        "Soar over Everest, Annapurna & Langtang.",
        "Land near high-altitude base camps.",
        "Capture bird’s-eye views of glacial valleys.",
        "Perfect for luxury and short-time travelers.",
      ],
    },
    {
      id: 4,
      title: "Bungee & Paragliding",
      image: "https://images.pexels.com/photos/28153230/pexels-photo-28153230/free-photo-of-sky-diving.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Extreme Thrill",
      activities: [
        "Leap from Nepal’s iconic suspension bridges.",
        "Glide over Pokhara’s lakes and valleys.",
        "Adrenaline-pumping and scenic in one ride.",
        "International-standard safety ensured.",
      ],
    },
    {
      id: 5,
      title: "Jungle Safari",
      image: "https://images.pexels.com/photos/9206628/pexels-photo-9206628.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Wildlife & Nature",
      activities: [
        "Track tigers, rhinos & elephants in Chitwan.",
        "Explore national parks via jeep or canoe.",
        "Birdwatching in lush biodiversity hotspots.",
        "Experience Tharu culture & eco-resorts.",
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

            ref={el => {
              if (el) {
                buttonRefs.current[idx] = el
              }
            }}

            className={`py-3 items-center  pl-10 pr-3 flex overflow-hidden max-w-7xl mx-auto   border border-white/10 relative rounded-full`} key={idx}>


            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent z-10" />

            <div className="absolute top-0 left-0 h-full w-[50%]">
              <div className="relative h-full blend-right-gradient">
                <Image src={data.image} fill alt={data.title} className="object-cover" />
              </div>
            </div>


            <div className=" justify-between  w-full items-center z-[99] grid grid-cols-3">
              <div className=""></div>
              <div className="flex text-[30px]   text-left">
                <h2 className=" font-semibold">{data.title}</h2>

              </div>
              <div className=" flex justify-end items-center">
                <button

                  className="text-white/50 text-white z-[999] flex gap-2 border border-white/20 text-lg h-20 w-32 rounded-full justify-center items-center">
                  View <ArrowRight fill="#121212" />
                </button>
              </div>
            </div>


          </motion.div>
        ))}
      </div>
    </main>
  );
});

export default ServicesHome;
