"use client";
import Image from "next/image";
import React, { useRef } from "react";

import Service1 from "@/public/ServiceImage/service1.png";
import Service2 from "@/public/ServiceImage/service2.png";
import Service3 from "@/public/ServiceImage/service3.png";
import Service4 from "@/public/ServiceImage/service4.png";
import Service5 from "@/public/ServiceImage/service5.png";
import Service6 from "@/public/ServiceImage/service6.png";

import Adventure from "@/public/ServiceImage/ImageMain/adventure.avif";
import Camp from "@/public/ServiceImage/ImageMain/camp.avif";
import Guide from "@/public/ServiceImage/ImageMain/guide.avif";
import Culture from "@/public/ServiceImage/ImageMain/culture.avif";
import Trek from "@/public/ServiceImage/ImageMain/trek.avif";
import Wildlife from "@/public/ServiceImage/ImageMain/wildlife.avif";

type Props = {};

function Services({}: Props) {
  const serviceContainerRef = useRef(null);
  const serviceCardContainerRef = useRef(null);
  const serviceTitleRef = useRef<any>(null);

  return (
    <div ref={serviceContainerRef} className="py-[5rem]">
      {/* title  */}
      <h1
        ref={serviceTitleRef}
        className="title uppercase text-center font-extrabold mb-20 lg:text-4xl md:text-3xl text-xl text-secondary-500 tracking-wide"
      >
        What we are offering ?
      </h1>
      <div
        ref={serviceCardContainerRef}
        className="lg:w-11/12 w-11/12 3xl:w-8/12 mx-auto  grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-x-5 gap-y-20  h-full"
      >
        {/* map services  */}
        {ServicesData.map((item) => (
          <div
            key={item.id}
            className="w-full serviceCardRef group flex justify-start cursor-pointer items-start p-4 border-2 border-primary2/50 rounded-md shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] flex-col gap-3   text-start"
          >
            {/* IMG */}
            {/* <div className="relative w-full h-[25vh] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-[0.2] z-10"></div>
              <Image
                className="w-full h-full group-hover:scale-105 duration-300 object-cover rounded-md"
                src={item.img}
                alt={item.name}
                width={500}
                height={300}
              />
            </div> */}

            <div className="w-full flex  flex-col relative gap-1">
              {/* ICON  */}
              <div className="w-full absolute top-[-5%]  left-0 translate-y-[-50%] flex justify-center items-center">
                <div className="w-[4rem] h-[4rem] p-3 bg-secondary-100   rounded-full flex justify-center items-center">
                  <Image
                    src={item.icon}
                    alt="service-icon"
                    className="w-full h-full object-center object-cover"
                  ></Image>
                </div>
              </div>
              {/* NAME */}
              <span className="title group-hover:text-primary2 font-semibold duration-300 mt-[3rem] text-xl uppercase text-secondary-500 tracking-wide">
                {item.name}
              </span>
              {/* DESC */}
              <span className="text-sm font-medium text-secondary-400 leading-relaxed">
                {item.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;

const ServicesData = [
  {
    id: 1,
    img: Trek,
    icon: Service1,
    name: "Mountain Trekking",
    desc: "Experience the thrill of mountain trekking with our expert guides and customized routes. Traverse challenging terrains, enjoy breathtaking views, and conquer peaks with personalized support at every step. Perfect for both seasoned trekkers and beginners, our trekking adventures promise memories that will last a lifetime.",
  },
  {
    id: 2,
    icon: Service2,
    img: Camp,
    name: "Peak Climbing and Mountaineering",
    desc: "Experience the thrill of peak climbing and mountaineering with our expert guides and customized routes. Traverse challenging terrains, enjoy breathtaking views, and conquer peaks with personalized support at every step. Perfect for both seasoned climbers and beginners, our mountaineering adventures promise memories that will last a lifetime.",
  },
  {
    id: 3,
    icon: Service3,
    img: Guide,
    name: "Guided Tours",
    desc: "Join our guided tours to explore the most breathtaking locations with local experts. Discover hidden gems, learn fascinating stories, and gain insights that only locals know. Ideal for travelers who want an enriching experience, our tours take you beyond the usual tourist spots for a truly unique journey.",
  },
  {
    id: 4,
    icon: Service4,
    img: Wildlife,
    name: "Wildlife Safaris",
    desc: "Witness the beauty of wildlife in their natural habitat with our thrilling safari adventures. Spot exotic animals, experience close encounters, and learn about conservation efforts from knowledgeable guides. Our safaris provide an immersive experience in some of the world’s most pristine natural reserves.",
  },
  {
    id: 5,
    icon: Service5,
    img: Culture,
    name: "Cultural Tours",
    desc: "Immerse yourself in the local culture and traditions with our curated cultural tours. From tasting authentic cuisine to participating in local festivals, our tours provide a deep dive into the region’s rich heritage. Gain a new perspective as you connect with local communities and understand their way of life.",
  },
  {
    id: 6,
    icon: Service6,
    img: Adventure,
    name: "Adventure Sports",
    desc: "Get your adrenaline pumping with our range of adventure sports activities. Whether it’s rock climbing, rafting, or paragliding, we offer exhilarating experiences for thrill-seekers of all levels. Safety is our top priority, with expert instructors and top-notch equipment to ensure a fun and safe adventure.",
  },
];
