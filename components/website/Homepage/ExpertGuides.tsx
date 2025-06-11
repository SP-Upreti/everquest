import React, { useRef } from "react";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Icon } from "@iconify/react/dist/iconify.js";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ParallaxText } from "@/components/ParallexText";

type Props = {};

export default function ExpertGuides({ }: Props) {
  const sliderRef = useRef<Slider>(null);

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 4000,
    arrows: false,
    // pauseOnHover: false,
  };

  return (
    <div className="w-full bg-guides py-32 flex justify-center items-center bg-cover bg-center bg-opacity-80 bg-black bg-blend-overlay">
      <div className="lg:w-11/12 w-11/12 3xl:w-8/12 mx-auto">
        <div className="w-full mx-auto">

          <h2 className="text-3xl md:text-4xl space-y-3 lg:text-5xl xl:text-6xl font-bold  text-[#DFB6FF]" >
            <ParallaxText triggerOnce={false} text="Meet Our Expert Guides" />
          </h2>
          <p className="max-w-xl text-white lg:text-lg md:text-md text-sm leading-relaxed pt-8">
            Meet the folks behind the scenes, experts in making your adventure
            dreams come true with their skills and passion.
          </p>
        </div>

        {/* Team Section */}
        <div className="lg:block hidden mx-auto   justify-center  items-center md:my-14 my-6">
          <div className="grid xl:grid-cols-4 grid-cols-2 gap-6">
            {teamdata.map((item, index) => (
              <BlurFade key={index} delay={0.25 + index * 0.2} inView>

                <div key={index} className="h-[25em]  w-[19em] relative  mx-auto rounded-xl overflow-hidden">
                  <Image
                    src={item.img}
                    alt="images"
                    fill
                    className="  object-cover z-0"
                  />
                  <div className="absolute top-0 left-0 h-full w-full z-[99] bg-black/30 p-4 flex flex-col justify-end">
                    <h2 className="  font-bold mt-4 text-2xl">
                      {item.name}
                    </h2>
                    <h2 className="  font-semibold text-sm">
                      {item.desc}
                    </h2>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>

        {/* Slider Section which is visible on mobile */}
        <div className="relative lg:hidden  mt-10 flex justify-center  items-center">
          <div className="w-[20em] ">
            <Slider {...settings} ref={sliderRef}>
              {teamdata.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center px-2"
                >
                  <figure className="flex items-center justify-center">
                    <Image
                      src={item.img}
                      alt="images"
                      width={1000}
                      height={1000}
                      className="rounded-full h-[15em] object-cover object-center w-[15em]"
                    />
                  </figure>
                  <h2 className="text-center text-white font-semibold mt-4 text-xl">
                    {item.name}
                  </h2>
                  <h2 className="text-center text-white font-semibold text-sm">
                    {item.desc}
                  </h2>
                </div>
              ))}
            </Slider>
          </div>

          <div className="absolute top-28">
            <div className="flex text-sm items-center gap-64 md:mt-4">
              <button
                onClick={handlePrev}
                className="cursor-pointer outline-none border rounded-full bg-black  hover:scale-95 ease-in-out duration-200 shadow-sm p-2"
              >
                <Icon
                  icon="iconamoon:arrow-left-2"
                  style={{ color: "white" }}
                />
              </button>
              <button
                onClick={handleNext}
                className="cursor-pointer outline-none border rounded-full bg-black  hover:scale-95  ease-in-out duration-200 shadow-sm p-2"
              >
                <Icon
                  icon="iconamoon:arrow-right-2"
                  style={{ color: "white" }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

const teamdata = [
  {
    img: "/Guides/Guide.jpg",
    name: "Prem Gurung",
    desc: "IFMGA Guide Nepal & Founder",
  },
  {
    img: "/Guides/guide2.webp",

    name: "Ivan Pegorari",
    desc: "IFMGA Guide Italy",
  },

  {
    img: "/Guides/guide3.webp",
    name: "Sonam Lama",
    desc: "Expert Mountaineering Guide",
  },
  {
    img: "/Guides/guide1.webp",

    name: "Pemba Sherpa",
    desc: "Professional Trekking Guide",
  },
];
