import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./Slider.module.css";
// import { useExpedition } from "@/context/Expeditions";
import Loading from "@/app/loading";
import PartnerHome from "./PartnerHome";
import { ChevronRight, Clock, Mountain } from "lucide-react";
import { heroItems as heroExpeditions } from "@/data/Hero";

interface HeroItem {
  _id: string;
  name: string;
  overview: string;
  height: string;
  banner: StaticImageData | string; // Updated to allow string from fetched data
  expeditionId?: string;
  collections?: { slug: string }; // Added for slug access
  slug?: string; // Added for navigation
  maxElevation?: string; // Added to match fetched data
}

const Slider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(6);
  // const { heroExpeditions, error } = useExpedition();
  const [isLoading, setIsLoading] = useState(true);
  const error = {
    message: "none"
  };

  // Handle responsive thumbnail visibility
  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth >= 1280) {
        setVisibleItems(4);
      } else if (window.innerWidth >= 1024) {
        setVisibleItems(3);
      } else {
        setVisibleItems(0);
      }
    };

    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  // Auto-slide interval
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroExpeditions.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [heroExpeditions.length]);

  // Loading state based on data availability
  useEffect(() => {
    if (heroExpeditions && heroExpeditions.length > 0) {
      setIsLoading(false); // Only set to false whe n data is ready
    }
  }, [heroExpeditions]);

  const handleClick = (index: number) => setActiveIndex(index);
  const handleNext = () =>
    setActiveIndex((prev) => (prev + 1) % heroExpeditions.length);
  const handlePrev = () =>
    setActiveIndex((prev) => (prev - 1 + heroExpeditions.length) % heroExpeditions.length);

  // Show loading until data is fetched
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#1E1E1E]">
        <Loading />
      </div>
    );
  }

  // Handle error state
  if (!error) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#1E1E1E] text-white">
        <p>Error loading expeditions: {error}</p>
      </div>
    );
  }

  return (
    <div className={styles.slider} style={{
      position: "relative"
    }}>



      <div
        className={`${styles.thumbnail} md:flex justify-end  w-full px-10 gap-5   flex-col items-start hidden absolute bottom-[0%] right-[0%] 4xl:right-[0%] z-[11] top-1/2 -translate-y-1/2  h-fit `}
      >
        {heroExpeditions.slice(0, visibleItems).map((item, index) => (
          <div
            key={item._id}
            className={`${styles.item} ${index === activeIndex
              ? ` scale-150 !text-[#DFB6FF ] `
              : "brightness-50"
              } cursor-pointer`}
            onClick={() => handleClick(index)}
          >
            <div className="text-2xl  font-semibold lg:text-2xl flex justify-center items-center"

            >
              <div
                style={{
                  borderColor: index === activeIndex ? "white" : "transparent"
                }}
                className="rounded-full  relative overflow-hidden flex justify-center items-center  size-16">
                <Image
                  src={item.banner}
                  alt={`${item.banner}`}
                  height={200}
                  width={200}
                  className="object-cover flex-shrink-0"
                  style={{
                    width: "400px",
                    height: "200px"
                  }}
                />
              </div>

            </div>
          </div>
        ))}
      </div>

      <div className={styles.list}>
        {heroExpeditions.slice(0, visibleItems).map((item, index) => (
          <div
            key={item._id}
            className={`${styles.item} ${index === activeIndex ? styles.active : ""
              }  `}
          >
            <div className="absolute top-0 left-0  w-full h-[10vh] z-10 bg-gradient-to-b from-[#1E1E1E] to-transparent"></div>
            <Image
              src={item.banner}
              alt={`Slider ${index + 1}`}
              width={1480}
              height={1020}
              objectFit="cover"
              priority
              className="object-cover h-full w-full "
            />
            <div
              className={`${styles.content} text-zinc-50   h-fit  absolute left-[12%] top-1/2 -translate-y-1/2 4xl:left-[9.4%] bottom-[15%] z-[1] max-w-5xl`}
            >
              <div className="flex items-center gap-2 ">
                <p className="w-fit px-4 py-1 relative rounded-full overflow-hidden font-bold text-sm  backdrop-blur-lg border  capitalize">
                  {item.collections?.slug === "trekking"
                    ? "Alpine Trekking"
                    : "Expedition"}
                </p>
              </div>
              <div className="py-4 title font-bold text-[28px]  xs:text-[40px] md:text-[60px]  leading-tight flex flex-col">
                <h1 className="max-w-2xl">{item.name.split(" ")[0]} {item.name.split(" ")[1]}</h1>
                <div className="flex gap-8 items-center my-3">
                  <div className="text-xl flex gap-2 items-center">
                    <Mountain /> {item.maxElevation}
                  </div>
                  <div className="text-xl flex gap-2 items-center">
                    <Clock /> {item?.duration || 7} Hrs Walk
                  </div>
                </div>
              </div>


              <div className="flex items-center gap-4">
                <a href={`/package_detail/${item.slug}`}>
                  <button className="flex gap-4 items-center text-lg font-semibold">Explore now <span className="flex size-8 border rounded-full  justify-center items-center"> <ChevronRight /></span></button>
                </a>

              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Slider;