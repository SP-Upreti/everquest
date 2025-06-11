"use client";
import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/button";
import { Link as ScrollLink, Element } from "react-scroll";
import Title from "@/components/ui/Title";
import { AnimatePresence, motion } from "framer-motion";
import { useExpedition } from "@/context/Expeditions";
import Loading from "@/app/loading";
import { BadgeCheck, Calendar, Users, XCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import PackageReview from "@/components/website/PackageDetail/package-review";

function PackageDetailMain({ params }: any) {
  const {
    fetchExpedition,
    expedition,
    attractions,
    itinerary,
    costIncludes,
    costExcludes,
    medias,
  } = useExpedition();

  const [departure, setDeparture] = useState<any>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isOpengallery, setIsOpengallery] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offset, setOffset] = useState(-40);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const path = usePathname();
  const targetRef = useRef<any>(null);
  const [isModalOpens, setModalOpens] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  interface Review {
    name: string;
    review: string;
    email: string;
    rating: any;
    file: File | null;
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groupDeparture`
      );
      if (!response.ok) {
        throw new Error("HTTP error! status: " + response.status);
      }
      const data = await response.json();
      const datas = data.data.filter(
        (item: { expedition: { _id: string | undefined } }) =>
          item.expedition._id === expedition?._id
      );
      setDeparture(datas);
    } catch (error) {
      console.error("Error fetching departures:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [expedition]);

  useEffect(() => {
    const updateOffset = () => {
      setOffset(window.innerWidth < 768 ? -150 : -40);
    };
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchExpedition(params.slug);
    };
    fetchData();
  }, [params.slug]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const hash = url.hash;
    if (hash === "#date-&-price" && targetRef.current) {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("div[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    const storedReviews = localStorage.getItem("customerReviews");
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, []);

  const openModalgallery = (index: number) => {
    setCurrentIndex(index);
    setIsOpengallery(true);
  };

  const closeModalgallery = () => {
    setIsOpengallery(false);
  };

  const showPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? medias.length - 1 : prevIndex - 1
    );
  };

  const showNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === medias.length - 1 ? 0 : prevIndex + 1
    );
  };

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const scrollToSection = () => {
    targetRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const openModals = (image: any) => {
    setSelectedImage(image);
    setModalOpens(true);
  };

  const closeModals = () => {
    setModalOpens(false);
    setSelectedImage("");
  };

  const getAvailabilityStatus = (total: number, sold: number) => {
    const available = total - sold;
    const percentageSold = (sold / total) * 100;

    if (available === 0) {
      return {
        status: "Sold Out",
        color: "text-red-500",
        icon: <XCircle className="w-5 h-5" />,
      };
    } else if (percentageSold >= 80) {
      return {
        status: "Almost Full",
        color: "text-orange-500",
        icon: <BadgeCheck className="w-5 h-5" />,
      };
    } else {
      return {
        status: "Available",
        color: "text-green-500",
        icon: <BadgeCheck className="w-5 h-5" />,
      };
    }
  };

  const buttonLabels = [
    { 
      id: 1, 
      label: "Major Attractions", 
      img: "/icons/photography.png",
      condition: attractions?.length > 0
    },
    { 
      id: 2, 
      label: "Overview", 
      img: "/icons/eye.png",
      condition: expedition?.overview?.length !== undefined && expedition?.overview?.length > 0
    },
    { 
      id: 3, 
      label: "Itinerary", 
      img: "/icons/route.png",
      condition: itinerary?.length > 0
    },
    { 
      id: 4, 
      label: "Route map", 
      img: "/icons/chart.png",
      condition: expedition?.routeMap && expedition.collections?.slug !== "services"
    },
    { 
      id: 5, 
      label: "Cost Includes", 
      img: "/icons/greentick.png",
      condition: costIncludes?.length > 0
    },
    { 
      id: 6, 
      label: "Cost Excludes", 
      img: "/icons/cross.png",
      condition: costExcludes?.length > 0
    },
    { 
      id: 7, 
      label: "Gallery", 
      img: "/icons/picture.png",
      condition: medias?.length > 0
    },
    { 
      id: 8, 
      label: "Essential Information", 
      img: "/icons/information.png",
      condition: expedition?.essentialInformation?.length !== undefined && expedition?.essentialInformation?.length > 0
    },
    { 
      id: 9, 
      label: "Date & Price", 
      img: "/icons/calendar.png",
      condition: departure?.length > 0
    },
    { 
      id: 10, 
      label: "Download Sources", 
      img: "/icons/attachment.png",
      condition: expedition?.gearList || expedition?.equipmentList
    },
    { 
      id: 11, 
      label: "Reviews", 
      img: "/icons/reviews.png",
      condition: true
    },
  ];

  const iconData = [
    {
      icon: "/infoicon/group (2).png",
      title: "Group-size",
      value: `${expedition?.groupSize} People`,
    },
    {
      icon: "/infoicon/timer.png",
      title: "Trip Duration",
      value: `${expedition?.duration} Days`,
    },
    {
      icon: "/infoicon/mountains.png",
      title: "Mountain Ragne",
      value: `${expedition?.mountainRange}`,
    },
    {
      icon: "/infoicon/mountain.png",
      title: "Max Altitude",
      value: `${expedition?.maxElevation}m`,
    },
    {
      icon: "/infoicon/seasonal.png",
      title: "Best Seasons",
      value: `${expedition?.season}`,
    },
    {
      icon: "/infoicon/image.png",
      title: "Activities",
      value: `${expedition?.activity}`,
    },
    {
      icon: "/infoicon/difficulty.png",
      title: "Difficulties",
      value: `${expedition?.physical}`,
    },
    {
      icon: "/infoicon/accomodations.png",
      title: "Accomodations",
      value: `${expedition?.accomodation}`,
    },
  ];

  if (!expedition) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full text-secondary-500 relative">
      {/* Hero Section */}
      <div className="w-full h-screen relative flex justify-center items-center">
        <Image
          width={1000}
          height={1000}
          src={expedition?.banner}
          alt="expedition-image"
          className="absolute top-0 left-0 w-full h-full object-cover object-top"
          priority
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-[0.5]"></div>

        <div className="absolute bottom-20 lg:left-20 md:left-10 left-6">
          <p className="md:text-2xl text-md uppercase title rounded-md text-primary2 font-extrabold">
            {expedition?.category?.name}
          </p>
          
          <div className="lg:py-8 md:py-6 sm:py-4">
            <Title
              text={`${expedition.name} Expedition`}
              fontSize="lg:text-[4.3vw] sm:py-0 py-4 text-[2em]"
              textalign="text-left"
              color="text-white"
            />
          </div>
          <p className="text-white lg:w-[60%] lg:text-2xl sm:text-2xl text-md font-semibold">
            {expedition.subheading}
          </p>

          <div className="md:mt-16 mt-10" onClick={scrollToSection}>
            <Button className="">Book Now</Button>
          </div>
        </div>
      </div>

      {/* Info Icons */}
      {expedition.collections?.slug !== "services" && (
        <>
          <div className="max-w-[90em] md:pl-10 pl-4 py-10 mt-10 gap-x-8 gap-y-14 mx-auto grid lg:grid-cols-4 grid-cols-2 lg:place-items-start sm:place-items-center">
            {iconData.map((item, index) => (
              <div
                key={index}
                className="flex items-center lg:gap-4 gap-2 h-10 p-2 border-l-2 border-primary2"
              >
                <Image
                  src={item.icon}
                  alt="info-image"
                  width={1000}
                  height={1000}
                  className="md:w-12 md:h-12 w-8 h-8 object-cover object-center"
                />
                <div>
                  <h2 className="font-bold md:text-base text-sm">
                    {item.title}
                  </h2>
                  <h2 className="font-semibold md:text-sm text-xs italic">
                    {item.value}
                  </h2>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full h-2 bg-primary2/20 mt-6"></div>
        </>
      )}

      {/* Main Content */}
      <div className="md:py-[5rem] w-11/12 3xl:w-10/12 grid md:grid-cols-12 grid-cols-1 gap-4 relative items-start mx-auto">
        {/* Navigation Sidebar */}
        <div className="mx-auto col-span-9 md:col-span-2 z-[100] bg-white w-full flex-col gap-8 sticky top-[4rem] overflow-x-scroll md:overflow-x-visible md:top-[6rem] left-0 flex justify-start font-medium">
          <div className="w-full py-1 overflow-x-scroll md:overflow-x-visible grid grid-cols-10 md:grid-cols-1 gap-2 font-medium">
            {buttonLabels
              .filter(item => item.condition)
              .map((item, index) => (
                <ScrollLink
                  key={index}
                  activeClass="active"
                  to={item.label.replace(/\s+/g, "-").toLowerCase()}
                  smooth={true}
                  duration={500}
                  spy={true}
                  offset={offset}
                  className="cursor-pointer w-full flex items-center gap-2 text-nowrap text-secondary-500 hover:scale-105 duration-300 md:px-5 py-3 text-sm"
                >
                  <Image
                    src={item.img}
                    alt="icons"
                    width={1000}
                    height={1000}
                    className="md:w-6 md:h-6 w-5 h-5 object-cover object-center"
                  />
                  <h2 className="lg:block hidden xl:text-sm lg:text-[10px] font-bold">
                    {item.label}
                  </h2>
                </ScrollLink>
              ))}
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="md:col-span-7 col-span-9 bg-white flex flex-col gap-2">
          {/* Major Attractions */}
          {attractions?.length > 0 && (
            <Element id="major-attractions" name="major-attractions">
              <div className="w-full mx-auto p-3 md:p-10 border rounded-lg">
                <Title
                  text="Major Attractions"
                  fontSize="!text-xl"
                  textalign="text-left"
                />
                <div className="w-full h-full flex flex-col md:gap-2 mt-4">
                  {attractions.map((item, index) => (
                    <div
                      key={index}
                      className="w-full py-4 md:py-2 overflow-hidden flex justify-center items-center"
                    >
                      <div className="w-full flex justify-start gap-5">
                        <Image
                          src="/icons/photography.png"
                          alt="binoculars"
                          width={1000}
                          height={1000}
                          className="w-6 h-6 object-cover object-center"
                        />
                        <div className="font-medium">
                          <span className="font-bold text-lg">
                            {item.title}:
                          </span>{" "}
                          <span className="text-secondary-400 font-semibold text-sm">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                              className="prose prose-sm max-w-none"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Element>
          )}

          {/* Overview */}
          {expedition?.overview?.length > 0 && (
            <Element id="overview" name="overview">
              <div className="mt-8 w-full mx-auto p-3 md:p-10 bg-primary-50/20 border rounded-lg">
                <Title
                  text="Overview"
                  fontSize="!text-xl"
                  textalign="text-left"
                />
                <div>
                  <div className="my-4 font-medium leading-relaxed text-sm md:text-base">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: isExpanded
                          ? expedition.overview
                          : expedition.overview.substring(0, 500) + "...",
                      }}
                      className="prose prose-sm max-w-none ease-in-out duration-700"
                    />
                    <p
                      className="my-4 font-semibold italic text-primary2 cursor-pointer"
                      onClick={handleReadMore}
                    >
                      {isExpanded ? "Read less" : "Read more"}
                    </p>
                  </div>
                </div>
              </div>
            </Element>
          )}

          {/* Itinerary */}
          {itinerary?.length > 0 && (
            <Element id="itinerary" name="itinerary">
              <div className="w-full mt-8 mx-auto p-3 md:p-10 bg-primary-50/20 border rounded-lg">
                <Title
                  text="Itenary"
                  fontSize="!text-xl"
                  textalign="text-left"
                />
                {itinerary.map((item, index) => (
                  <div
                    key={index}
                    className="shadow-sm transition-all ease-in-out duration-300"
                    style={{
                      maxHeight: activeIndex === index ? "800px" : "100px md:70px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleFAQ(index)}
                    >
                      <div className="flex items-center gap-4">
                        <h2 className="font-medium flex gap-2 items-end">
                          <span className="cursor-pointer font-bold text-xl px-2 py-2 whitespace-nowrap rounded-md bg-primary2/80 text-black">
                            {item.day}
                          </span>
                        </h2>
                        <div className="py-8">
                          <h2 className="md:text-base text-sm font-semibold">
                            {item.title}
                          </h2>
                          <section className="flex md:gap-16 gap-10">
                            <div className="flex items-center md:gap-4 gap-2">
                              {item?.shortDescription?.length > 0 && (
                                <>
                                  <Image
                                    src="/icons/bld.png"
                                    alt="arrow"
                                    width={1000}
                                    height={1000}
                                    className="w-6 h-6 object-cover object-center"
                                  />
                                  <h2 className="font-bold text-primary2 text-sm whitespace-nowrap">
                                    {item.shortDescription}
                                  </h2>
                                </>
                              )}
                            </div>
                            <div className="flex items-center md:gap-4 gap-2">
                              {item?.hotel?.length > 1 && (
                                <>
                                  <Image
                                    src="/infoicon/accomodations.png"
                                    alt="arrow"
                                    width={1000}
                                    height={1000}
                                    className="w-6 h-6 object-cover object-center"
                                  />
                                  <h2 className="font-bold text-primary2 md:text-sm text-xs xs:whitespace-nowrap">
                                    {item.hotel}
                                  </h2>
                                </>
                              )}
                            </div>
                          </section>
                        </div>
                      </div>
                      <div className="text-3xl">
                        {activeIndex === index ? (
                          <Icon
                            icon="iconamoon:arrow-up-2-duotone"
                            style={{ color: "#fe8b03" }}
                          />
                        ) : (
                          <Icon
                            icon="iconamoon:arrow-down-2"
                            style={{ color: "#fe8b03" }}
                          />
                        )}
                      </div>
                    </div>

                    <div
                      className={`transition-all ease-in-out duration-500 ${
                        activeIndex === index ? "opacity-100" : "opacity-0"
                      }`}
                      style={{
                        maxHeight: activeIndex === index ? "800px" : "0px",
                      }}
                    >
                      <div className="flex flex-col gap-4">
                        {isModalOpens && (
                          <div
                            id="modalBackdrop"
                            className="fixed inset-0 bg-black/70 flex items-center justify-center z-[200] animate-fadeIn"
                            onClick={closeModals}
                          >
                            <div className="relative bg-white rounded-lg w-[80vw] h-[80vh] overflow-hidden animate-scaleIn">
                              <button
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 z-10"
                                onClick={() => setModalOpens(false)}
                              >
                                ✕
                              </button>
                              <Image
                                src={selectedImage}
                                alt="Selected"
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                        )}
                        <div className="flex gap-4">
                          {item.images.map((image, index) => (
                            <div
                              key={index}
                              className="w-52 h-28 object-cover object-center rounded-md relative group"
                            >
                              <Image
                                src={image}
                                alt="icons"
                                width={1000}
                                height={1000}
                                className="w-52 h-28 object-cover object-center rounded-md"
                              />
                              <div
                                className="hidden absolute top-0 group-hover:flex items-center justify-center bg-black/30 text-white w-full h-full rounded-md hover:cursor-pointer transition-all"
                                onClick={() => openModals(image)}
                              >
                                View
                              </div>
                            </div>
                          ))}
                        </div>
                        <div
                          className="font-medium md:text-sm text-xs text-light"
                          dangerouslySetInnerHTML={{
                            __html: item.description,
                          }}
                        />
                      </div>

                      <figure className="my-4">
                        {item.images.length > 0 && (
                          <Image
                            src={item.images[0]}
                            alt="arrow"
                            width={1000}
                            height={1000}
                            className="h-[50vh] object-cover rounded-md"
                          />
                        )}
                      </figure>
                    </div>
                  </div>
                ))}
              </div>
            </Element>
          )}

          {/* Route Map */}
          {expedition?.routeMap && expedition.collections?.slug !== "services" && (
            <Element id="route-map" name="route-map">
              <div className="w-full my-8 mx-auto p-3 md:p-10 border rounded-lg">
                <Title
                  text="Route-Map"
                  fontSize="!text-2xl"
                  textalign="text-left"
                />
                <Image
                  width={1000}
                  height={1000}
                  src={
                    expedition?.routeMap ||
                    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  className="mt-4 overflow-hidded w-full max-h-[60vh] object-cover rounded-md object-center"
                  alt=""
                />
              </div>
            </Element>
          )}

          {/* Cost Includes */}
          {costIncludes?.length > 0 && (
            <Element id="cost-includes" name="cost-includes">
              <div className="mt-8 w-full mx-auto p-3 md:p-10 bg-primary-50/20 border rounded-lg">
                <Title
                  text="Cost Includes"
                  fontSize="!text-xl"
                  textalign="text-left"
                />
                <div className="mt-4 w-full h-full flex flex-col md:gap-2">
                  {[...costIncludes].reverse().map((item, index) => (
                    <div
                      key={index}
                      className="w-full md:py-4 py-2 overflow-hidden flex justify-center items-center"
                    >
                      <div className="w-full flex justify-start gap-2">
                        <Image
                          src="/icons/greentick.png"
                          alt="tick"
                          width={1000}
                          height={1000}
                          className="w-6 h-6 object-cover object-center"
                        />
                        <div className="font-medium text-[15px]">
                          <span className="font-bold text-lg">
                            {item.title}:
                          </span>{" "}
                          <span className="text-secondary-400 md:text-base text-sm">
                            {item.description}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Element>
          )}

          {/* Cost Excludes */}
          {costExcludes?.length > 0 && (
            <Element id="cost-excludes" name="cost-excludes">
              <div className="mt-8 w-full mx-auto p-3 md:p-10 bg-primary-50/20 border rounded-lg">
                <Title
                  text="Cost Excludes"
                  fontSize="!text-xl"
                  textalign="text-left"
                />
                <div className="mt-4 w-full h-full flex flex-col md:gap-2">
                  {[...costExcludes].reverse().map((item, index) => (
                    <div
                      key={index}
                      className="w-full py-2 md:py-4 overflow-hidden flex justify-center items-center"
                    >
                      <div className="w-full flex justify-start gap-4">
                        <Image
                          src="/icons/cross.png"
                          alt="tick"
                          width={1000}
                          height={1000}
                          className="w-6 h-6 object-cover object-center"
                        />
                        <div className="font-medium text-[15px]">
                          <span className="font-bold text-lg">
                            {item.title}:
                          </span>{" "}
                          <span className="text-secondary-400 md:text-base text-sm">
                            {item.description}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Element>
          )}

          {/* Gallery */}
          {medias?.length > 0 && (
            <Element id="gallery" name="gallery">
              <div className="mt-8 w-full mx-auto p-3 md:p-10 bg-primary-50/20 border rounded-lg">
                <Title
                  text="Gallery"
                  fontSize="!text-xl"
                  textalign="text-left"
                />
                <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 my-8">
                  {medias.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => openModalgallery(index)}
                      className="relative group"
                    >
                      <Image
                        src={item.media}
                        width={1000}
                        height={1000}
                        alt="img"
                        className="w-full h-full object-cover cursor-pointer group-hover:brightness-50 rounded-md ease-in-out duration-300"
                      />
                      <div
                        className={`group-hover:block hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-semibold text-2xl cursor-pointer uppercase`}
                      >
                        <Icon icon="mdi:magnify" style={{ color: "white" }} />
                      </div>
                    </div>
                  ))}
                </div>

                <AnimatePresence>
                  {isOpengallery && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="z-[200] fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm backdrop-filter bg-black bg-opacity-80"
                    >
                      <button
                        className="absolute sm:right-[3em] right-[0.5em] xs:top-20 top-40 text-white text-2xl"
                        onClick={closeModalgallery}
                      >
                        <Icon icon="ix:cancel" style={{ color: "white" }} />
                      </button>
                      <div className="relative w-5/6 h-3/4">
                        <Image
                          src={medias[currentIndex].media}
                          layout="fill"
                          objectFit="contain"
                          alt={`img-${currentIndex}`}
                          className="rounded-md"
                        />
                        <button
                          className="absolute left-5 top-1/2 -translate-y-1/2 text-black text-md bg-white outline-none p-2 rounded-full"
                          onClick={showPrev}
                        >
                          <Icon
                            icon="iconamoon:arrow-left-2"
                            style={{ color: "black" }}
                          />{" "}
                        </button>
                        <button
                          className="absolute right-5 top-1/2 -translate-y-1/2 text-black text-md bg-white outline-none p-2 rounded-full"
                          onClick={showNext}
                        >
                          <Icon
                            icon="iconamoon:arrow-right-2"
                            style={{ color: "black" }}
                          />{" "}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Element>
          )}

          {/* Essential Information */}
          {expedition?.essentialInformation?.length > 0 && (
            <Element id="essential-information" name="essential-information">
              <div className="mt-8 w-full mx-auto p-3 md:p-10 bg-primary-50/20 border rounded-lg">
                <Title
                  text="Essential Information"
                  fontSize="!text-xl"
                  textalign="text-left"
                />
                <div
                  className="mt-8 space-y-8"
                  dangerouslySetInnerHTML={{
                    __html: expedition.essentialInformation,
                  }}
                ></div>
              </div>
            </Element>
          )}

          {/* Fixed Dates */}
          {departure?.length > 0 && (
            <Element id="date-&-price" name="date-&-price">
              <div
                className="mt-8 w-full mx-auto p-3 md:p-10 bg-primary-50/20 border rounded-lg"
                ref={targetRef}
              >
                <Title
                  text="Fixed Dates"
                  fontSize="!text-xl"
                  textalign="text-left"
                />
                <div className="w-full h-full flex flex-col gap-2 mt-8">
                  <div className="w-full space-y-4">
                    {departure.map((item: any) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                      >
                        <table className="w-full">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                Dates
                              </th>
                              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                Availability
                              </th>
                              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                Price
                              </th>
                              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                Status
                              </th>
                              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                Book
                              </th>
                            </tr>
                          </thead>
                          <tbody className="w-full justify-center items-center">
                            <tr className="border-t">
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                  <div className="space-y-1">
                                    <div className="text-sm text-gray-900 flex gap-2">
                                      <Calendar className="w-4 h-4 text-gray-400" />
                                      <span className="font-medium">
                                        Start:
                                      </span>
                                      {item.startDate}
                                    </div>
                                    <div className="text-sm text-gray-900 flex gap-2">
                                      <Calendar className="w-4 h-4 text-gray-400" />
                                      <span className="font-medium">End: </span>
                                      {item.endDate}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                  <Users className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm text-gray-900">
                                    {item.totalQuantity - item.soldQuantity} /{" "}
                                    {item.totalQuantity}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                  <span className="text-xl font-bold text-primary2">
                                    ${item.price.toLocaleString()}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                {(() => {
                                  const { status, color, icon } =
                                    getAvailabilityStatus(
                                      item.totalQuantity,
                                      item.soldQuantity
                                    );
                                  return (
                                    <div
                                      className={`flex items-center space-x-1 ${color}`}
                                    >
                                      {icon}
                                      <span className="font-medium">
                                        {status}
                                      </span>
                                    </div>
                                  );
                                })()}
                              </td>
                              <td>
                                <div className="p-2 flex justify-center items-center">
                                  <Link
                                    href={{
                                      pathname: "/booking",
                                      query: {
                                        groupDepartureId: item._id,
                                        slug: expedition.slug,
                                      },
                                    }}
                                    className="!px-4 !py-2 !font-sans !text-white !font-bold !shadow-xl bg-primary2 flex justify-center items-center rounded-lg"
                                  >
                                    Book Now
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Element>
          )}

          {/* Download Sources */}
          {(expedition?.gearList || expedition?.equipmentList) && (
            <Element id="download-sources" name="download-sources">
              <div className="mt-8 w-full mx-auto p-3 md:p-10 bg-primary-50/20 border rounded-lg">
                <Title
                  text="Download Sources"
                  fontSize="!text-xl"
                  textalign="text-left"
                />
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 my-4">
                  {expedition.gearList && (
                    <div className="bg-zinc-100 rounded-md p-3 cursor-pointer flex items-center gap-4 mt-6 pb-2">
                      <Image
                        src="/icons/download.png"
                        alt="download-image"
                        width={1000}
                        height={1000}
                        className="h-10 w-10"
                      />
                      <div>
                        <h2 className="font-bold lg:text-lg text-md">
                          Gear Guide Book
                        </h2>
                        <a
                          href={expedition.gearList}
                          download
                          className="text-blue-500 font-bold underline italic"
                        >
                          Get PDF
                        </a>
                      </div>
                    </div>
                  )}
                  {expedition.equipmentList && (
                    <div className="bg-zinc-100 rounded-md p-3 cursor-pointer flex items-center gap-4 mt-6 pb-2">
                      <Image
                        src="/icons/download.png"
                        alt="download-image"
                        width={1000}
                        height={1000}
                        className="h-10 w-10"
                      />
                      <div>
                        <h2 className="font-bold lg:text-lg text-md">
                          Equipment Checklist
                        </h2>
                        <a
                          href={expedition.equipmentList}
                          download
                          className="text-blue-500 font-bold underline italic"
                        >
                          Get PDF
                        </a>
                      </div>
                    </div>
                  )}
                  <div className="bg-zinc-100 rounded-md p-3 cursor-pointer flex items-center gap-4 mt-6 pb-2">
                    <Image
                      src="/icons/download.png"
                      alt="download-image"
                      width={1000}
                      height={1000}
                      className="h-10 w-10"
                    />
                    <div>
                      <h2 className="font-bold lg:text-lg text-md">
                        Trip Brochure
                      </h2>
                      <a
                        href="/files/demo.pdf"
                        download
                        className="text-blue-500 font-bold underline italic"
                      >
                        Get PDF
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Element>
          )}

          {/* Reviews */}
          <Element id="reviews" name="reviews">
            <div className="w-full mx-auto p-3 md:p-10 bg-primary-50/20 border rounded-md">
              <PackageReview expeditionId={expedition._id} />
            </div>
          </Element>
        </div>

        {/* Right Sidebar */}
        <div className="md:col-span-3 col-span-9 sticky top-[5rem] pl-2">
          <div className="py-2 bg-zinc-100 rounded-md lg:px-4 px-2">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h3 className="title font-bold text-sm">Starting from </h3>
              <h2 className="title lg:text-3xl md:text-2xl text-xl font-extrabold text-primary2">
                ${expedition?.price?.adult?.pricePerAdult}
              </h2>
            </div>
            <hr />
            <p className="lg:text-md text-xs leading-none my-4 font-medium text-secondary-400">
              We only offer discounts based on your group size. We don't add
              extra people to your group.
            </p>

            {/* Price Table */}
            <table className="w-full my-2 bg-white rounded-md">
              <thead>
                <tr className="h-14 text-sm border-b">
                  <th>No. of persons</th>
                  <th>Price per Pax</th>
                </tr>
              </thead>
              <tbody>
                {expedition.price.adult.discountsA.map((row, index) => (
                  <tr key={index} className="h-10">
                    <td className="text-center font-medium">
                      {row.minQuantity}-{row.maxQuantity}
                    </td>
                    <td className="text-center font-bold lg:text-xl text-sm">
                      {row.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              className="flex items-center cursor-pointer group ease-in-out duration-200"
              onClick={scrollToSection}
            >
              <div className="border rounded-full p-2 text-2xl">
                <Image
                  src="/icons/calendar.png"
                  alt="calendar"
                  width={1000}
                  height={1000}
                  className="w-6 h-6 object-cover object-center"
                />
              </div>
              <h2 className="font-semibold text-sm desc py-2 group-hover:text-primary2 ease-in-out duration-200">
                Choose your date
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageDetailMain;