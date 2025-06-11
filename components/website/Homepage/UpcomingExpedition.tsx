"use client";
import { useRef } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Link from "next/link";
import CardButton from "@/components/ui/CardButton";
import { useExpedition } from "@/context/Expeditions";

type Props = {};

export default function HomeExpedition({}: Props) {
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
    // dots: true,
    // dotsClass: "slick-dots custom-dots", // Add a custom class
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
     
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { expeditions } = useExpedition();

  return (
    <main className="relative w-full bg-nextadv h-[100vh]  bg-cover flex justif-center items-center">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-[0.5]"></div>

      <div className=" overflow-hidden  w-11/12 mx-auto">
        <div className="grid md:grid-cols-8 grid-cols-1 gap-4  md:w-full 3xl:w-8/12 w-11/12 mx-auto h-full">
          <div className="md:col-span-3  relative h-full flex flex-col justify-center">
            <h2 className="uppercase font-extrabold title lg:text-[3em] leading-[1em] sm:text-[1.5em] text-2xl text-white">
              Choose Your next adventure
            </h2>

            <p className="lg:text-md text-sm my-4 desc max-w-[25em] lg:w-full text-white font-medium">
              Whether you're dreaming of a serene escape, a thrilling outdoor
              adventure, or exploring vibrant cultures, we have the perfect trip
              waiting for you.
            </p>

            {/* arrows */}
            <div className="flex text-2xl items-center gap-2 mt-4">
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

          <div className="md:w-[70em] w-full">
            <Slider {...settings} ref={sliderRef}>
              {expeditions.map((item: any, index: number) => (
                <div key={index} className="px-2 group">
                  <div className="bg-white rounded-md max-w-80 md:w-full md:px-2 border p-2 flex flex-col justify-start items-start gap-3 shadow-[rgba(50,50,105,0.15)_0px_2px_5px_0px,rgba(0,0,0,0.05)_0px_1px_1px_0px]">
                    {/* Clickable area for the main card */}
                    <Link href={`/package_detail/${item.slug}`} className="w-full">
                      <>
                        <figure className="relative overflow-hidden rounded-md h-[21vh] w-full">
                          <Image
                            fill
                            src={item.banner || "/tour/nepal.webp"}
                            alt="banner-image"
                            className="w-full h-full object-cover object-bottom group-hover:scale-110 ease-in-out duration-300"
                          />
                        </figure>


                        <div className="flex w-full flex-col gap-2">
                          <span className="text-md title font-semibold tracking-wider whitespace-nowrap">
                            {item.name.slice(0, 50)}
                          </span>
                          <p className="text-sm hidden md:block font-medium h-14 text-secondary-400">
                            {item.subheading.slice(0, 100)}...
                          </p>

                          <div className="flex my-4 justify-between gap-3 text-sm font-semibold">
                            <div className="flex gap-1 items-center">
                              <Icon
                                icon="la:mountain"
                                className="text-primary-600"
                              />
                              <span>Expedition</span>
                            </div>
                            <div className="flex gap-1 items-center">
                              <Icon
                                icon="simple-line-icons:calender"
                                className="text-primary-600"
                              />
                              <span className="font-semibold">{item.duration}</span>
                            </div>
                          </div>
                        </div>
                      </>
                    </Link>


                    <div className="grid grid-cols-2 gap-2 w-full mt-2">
                      <Link 
                        href={`/package_detail/${item.slug}`}
                        className="group-hover:bg-white rounded-md group-hover:border-primary2 border"
                        passHref
                      >
                        <CardButton 
                          asChild
                          className="!w-full !bg-transparent !text-black !shadow-none"
                        >
                          <span>View more</span>
                        </CardButton>
                      </Link>


                      <Link 
                        href={`/package_detail/${item.slug}#date-&-price`} 
                        passHref
                      >
                        <CardButton 
                          asChild
                          className="!w-full"
                        >
                          <span>View Dates</span>
                        </CardButton>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </main>
  );
}
