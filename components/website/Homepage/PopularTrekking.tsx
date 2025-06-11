"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { Icon } from "@iconify/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./swiper.css";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// data
import TrekData from "@/data/TrekkingData";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type Props = {};

function PopularTrekking({}: Props) {
  const swiperRef = useRef<any>();

  useGSAP(() => {
    gsap.from(".title-trek", {
      y: "100px",
      opacity: 0.5,
      ease: "sine.out",
      scrollTrigger: {
        start: "top 90%",
        end: "50% 50%",
        // markers: true,
        scrub: 1,
        trigger: ".title-trek",
      },
    });

    gsap.from(".card-trek", {
      y: "100px",
      opacity: 0.5,
      ease: "sine.out",
      scrollTrigger: {
        start: "top 90%",
        end: "50% 50%",
        // markers: true,
        scrub: 1,
        trigger: ".card-trek",
      },
    });
  });
  return (
    <div className="w-full h-screen flex justify-center items-center relative">
      {/* image  */}
      <div className="w-full h-screen bg-parallex2 bg-fixed bg-cover   overflow-hidden absolute top-0 left-0 flex justify-center items-center">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-[0.5]"></div>
      </div>

      {/* CARDS  */}
      <div className="w-11/12 md:w-9/12 mx-auto   flex flex-col gap-5  justify-center relative items-center">
        <h1 className="text-3xl title-trek  md:text-6xl mb-6 relative tracking-wide title font-bold  text-secondary-50">
          TRENDING TREKKING
        </h1>

        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          autoplay={{ delay: 2000 }}
          breakpoints={{
            924: {
              slidesPerView: 2,
              spaceBetween: 10,
            },

            1256: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1576: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
          speed={500}
          loop={true}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode]}
          className="mySwiper card-trek"
        >
          {TrekData.map((item, index) => (
            <SwiperSlide key={index}>
              <Link href="/package_detail">
                <div className="bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] flex flex-col gap-3 h-auto max-h-[60vh] p-2">
                  <div className="relative">
                    <div className="px-4 text-secondary-50 z-10 text-sm py-1 text- bg-primary-600 absolute top-[3%] left-[3%]">
                      $120
                    </div>
                    {/* MASK  */}
                    <div className="bg-black absolute top-0 left-0 w-full h-full opacity-[0.2]"></div>
                    <Image
                      width={1000}
                      height={1000}
                      src={item.heroImg}
                      alt="expedition-image"
                      className="w-full h-[30vh] object-cover object-center"
                    />
                  </div>
                  <div className="w-full flex relative flex-col gap-2">
                    {/* distanc days  */}
                    <div className="w-full absolute top-[-10%]  left-0 translate-y-[-50%] flex justify-center items-center">
                      <div className="w-[70%] h-[2rem] text-sm font-medium  px-[10%] text-secondary-400  bg-secondary-100 flex justify-between items-center">
                        <span className="flex  items-center gap-1">
                          <Icon icon="carbon:time" /> <span>5 days</span>
                        </span>
                        <span>|</span>
                        <span>259km</span>
                      </div>
                    </div>
                    <span className="title text-xl pt-[1.5rem] text-secondary-500 tracking-wide">
                      {item.name}
                    </span>
                    <p className="text-sm text-secondary-400">{item.intro}</p>

                    <div className="w-full flex pb-2 justify-between">
                      <span className="text-sm  py-2 ">View details</span>
                      <span className="flex justify-center items-center  text-primary-600">
                        <Icon icon="material-symbols:star" />
                        <Icon icon="material-symbols:star" />
                        <Icon icon="material-symbols:star" />
                        <Icon icon="material-symbols:star" />
                        <Icon icon="material-symbols:star" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex gap-5 items-center">
          <div
            onClick={() => {
              if (swiperRef.current) {
                swiperRef.current.slidePrev();
              }
            }}
            className="w-[2rem]  md:w-[2.5rem] h-[2rem] md:h-[2.5rem] hover:scale-105 duration-300 cursor-pointer overflow-hidden  text-secondary-50 hover:text-secondary-100"
          >
            <Icon
              icon="mynaui:fat-arrow-left"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div
            onClick={() => {
              if (swiperRef.current) {
                swiperRef.current.slideNext();
              }
            }}
            className="w-[2rem]  md:w-[2.5rem] h-[2rem] md:h-[2.5rem] hover:scale-105 duration-300 cursor-pointer overflow-hidden  text-secondary-50 hover:text-secondary-100"
          >
            <Icon
              icon="mynaui:fat-arrow-right"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularTrekking;
