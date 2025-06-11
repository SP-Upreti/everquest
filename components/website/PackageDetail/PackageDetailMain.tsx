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
import RelatedExpedition from "@/components/ui/RelatedExpedition";
import Loading from "@/app/loading";
import { BadgeCheck, Calendar, DollarSign, Users, XCircle } from "lucide-react";
import ExpertGuide from "@/components/ui/expert-guide";
import PackageReview from "./package-review";
import Modal from "react-modal"; // Import react-modal
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

type DepartureItem = {
  id: string;
  startDate: string;
  endDate: string;
  totalQuantity: number;
  soldQuantity: number;
  groupSize: number;
  price: number;
};

type DepartureTableProps = {
  departures: DepartureItem[];
};

function PackageDetailMain({ slug }: { slug: string }) {
  const {
    fetchExpedition,
    expedition,
    attractions,
    itinerary,
    costIncludes,
    costExcludes,
    medias,
    fixedDates,
    isLoading,
  } = useExpedition();

  const [departure, setDeparture] = useState<any>([]);
  const [requirements, setRequirements] = useState<any[]>([]); // Added state

  const fetchUsers = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groupDeparture`
    );
    if (!response.ok) {
      throw new Error("HTTP error! status: " + response.status);
    }

    const data = await response.json();
    const datas = data?.data?.filter(
      (item: { expedition: { _id: string | undefined } }) =>
        item?.expedition?._id === expedition?._id
    );

    setDeparture(datas);
  };

  const fetchRequirements = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/requirement?expedition=${expedition?.expeditionId}`
      );
      if (!response.ok) {
        throw new Error("HTTP error! status: " + response.status);
      }
      const data = await response.json();
      setRequirements(data); // No filter needed if API filters by expedition ID
    } catch (error) {
      console.error("Error fetching requirements:", error);
    }
  };

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpengallery, setIsOpengallery] = useState(false); // For controlling the modal visibility
  const [currentIndex, setCurrentIndex] = useState(0); // To track the current image index
  const [offset, setOffset] = useState(-40);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // State to store the list of reviews
  const [reviews, setReviews] = useState<Review[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
    fetchRequirements(); // Added fetchRequirements call
  }, [expedition]);

  useEffect(() => {
    const updateOffset = () => {
      if (window.innerWidth < 768) {
        setOffset(-150); // Offset for mobile screens
      } else {
        setOffset(-40); // Offset for larger screens
      }
    };
    updateOffset();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchExpedition(slug); // Wait for fetchExpedition to complete
    };

    fetchData();
  }, [slug]);

  const openPDF = () => {
    window.open("/files/demo.pdf", "_blank");
  };

  // Open the modal and set the current image index
  const openModalgallery = (index: number) => {
    setCurrentIndex(index);
    setIsOpengallery(true);
  };

  // Close the modal
  const closeModalgallery = () => {
    setIsOpengallery(false);
  };

  // Show the previous image
  const showPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? medias.length - 1 : prevIndex - 1
    );
  };

  // Show the next image
  const showNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === medias.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Open modal form
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close modal form
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  // Scroll to the target element when the page is loaded and the URL has a hash from expediiton page
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

  //change color of button when coressponding title is reached
  useEffect(() => {
    const sections = document.querySelectorAll("div[id]");
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Adjust this value to trigger earlier or later
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  interface Review {
    name: string;
    review: string;
    email: string;
    rating: any;
    file: File | null; // File is optional, so it can be null
  }
  // State to store review form data
  const [reviewData, setReviewData] = useState<Review>({
    name: "",
    rating: "",
    email: "",
    review: "",
    file: null,
  });

  // Retrieve reviews from localStorage when the component mounts
  useEffect(() => {
    const storedReviews = localStorage.getItem("customerReviews");
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Set image URL for preview
      };
      reader.readAsDataURL(file); // Read the file
    }
  };

  // review form handling
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Add the new review to the list of reviews
    const updatedReviews = [...reviews, reviewData];
    setReviews(updatedReviews);
    // Save the updated reviews to localStorage
    localStorage.setItem("customerReviews", JSON.stringify(updatedReviews));

    // Add the new review to the list of reviews
    setReviews([...reviews, reviewData]);

    // Clear the form
    setReviewData({ name: "", email: "", review: "", rating: "", file: null });

    setIsModalOpen(false);
  };

  // to scroll down when clicking on book now button
  const targetRef = useRef<any>(null);

  const scrollToSection = () => {
    targetRef.current.scrollIntoView({ behavior: "smooth" });
  };

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

  const getAvailabilityStatus = (total: number, sold: number) => {
    // If sold equals or exceeds total, mark as "Sold Out"
    if (sold >= total) {
      return {
        status: "Sold Out",
        color: "text-red-500",
        icon: <XCircle className="w-5 h-5" />,
      };
    }

    // Calculate percentage sold only if sold < total
    const percentageSold = (sold / total) * 100;

    if (percentageSold >= 80) {
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

  const [isModalOpens, setModalOpens] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const openModals = (image: any) => {
    setSelectedImage(image);
    setModalOpens(true);
  };

  const closeModals = () => {
    setModalOpens(false);
    setSelectedImage("");
  };

  const buttonLabels = [
    { id: 1, label: "Major Attractions", img: "/icons/photography.png" },
    { id: 2, label: "Overview", img: "/icons/eye.png" },
    { id: 3, label: "Requirements", img: "/icons/requirement.png" },
    { id: 4, label: "Itinerary", img: "/icons/route.png" },
    { id: 5, label: "Route map", img: "/icons/chart.png" },
    { id: 6, label: "Cost Includes", img: "/icons/greentick.png" },
    { id: 7, label: "Cost Excludes", img: "/icons/cross.png" },
    { id: 8, label: "Gallery", img: "/icons/picture.png" },
    { id: 9, label: "Essential Information", img: "/icons/information.png" },
    { id: 10, label: "Date & Price", img: "/icons/calendar.png" },
    { id: 11, label: "Download Sources", img: "/icons/attachment.png" },
    { id: 12, label: "Reviews", img: "/icons/reviews.png" },
  ].filter((item) => {
    switch (item.label) {
      case "Major Attractions":
        return attractions && attractions.length > 0;
      case "Itinerary":
        return itinerary && itinerary.length > 0;
      case "Cost Includes":
        return costIncludes && costIncludes.length > 0;
      case "Cost Excludes":
        return costExcludes && costExcludes.length > 0;
      case "Gallery":
        return medias && medias.length > 0;
      case "Date & Price":
        return departure && departure.length > 0;
      case "Requirements":
        return requirements && requirements.length > 0;
      default:
        return true;
    }
  });

  return (
    <>
      {expedition ? (
        <div className="w-full h-full  text-secondary-500 relative">
          <div className="w-full h-screen relative  flex justify-center items-center">
            <Image
              width={1000}
              height={1000}
              src={expedition?.banner || "/placeholder.jpg"}
              alt="expedition-image"
              className="absolute top-0 left-0 w-full h-full object-cover object-top"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-[0.5]"></div>

            <div className="absolute bottom-20 lg:left-20 md:left-10 left-6">
              <p className=" md:text-2xl text-md uppercase title rounded-md text-primary2 font-extrabold ">
                {expedition?.category?.name} Peaks
              </p>

              <div className="lg:py-8 md:py-6 sm:py-4 ">
                <Title
                  text={`${expedition.name}`}
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

          {/* icons */}
          <div className=" max-w-[90em] md:pl-10 pl-4 py-10  mt-10 gap-x-8 gap-y-14 mx-auto grid lg:grid-cols-4 grid-cols-2 lg:place-items-start sm:place-items-center">
            {iconData.map((item, index) => (
              <div
                key={`icon-${item.title}-${index}`}
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

          {/* divider line */}
          <div className="w-full h-2 bg-primary2/20 mt-6"></div>

          {/* this is main content */}
          <div className="md:py-[5rem] w-11/12 3xl:w-10/12 grid lg:grid-cols-12 grid-cols-1 gap-4 relative items-start mx-auto">
            {/* tab  link  */}
            <div className="mx-auto col-span-9 lg:col-span-2 z-[100] bg-white  w-full  flex-col gap-8 sticky  top-[4rem]  overflow-x-scroll md:overflow-x-visible  left-0  flex justify-start  font-medium ">
              <div className="w-full py-1 overflow-x-scroll md:overflow-x-visible  grid grid-cols-11 lg:grid-cols-1 gap-2 font-medium">
                {buttonLabels.map((item) => (
                  <ScrollLink
                    key={`btn-${item.id}`}
                    activeClass="active"
                    to={item.label.replace(/\s+/g, "-").toLowerCase()}
                    smooth={true}
                    duration={500}
                    spy={true}
                    offset={offset}
                    className={`cursor-pointer w-full flex items-center gap-2 text-nowrap  text-secondary-500 hover:scale-105 duration-300  md:px-4 py-3 text-sm ]`}
                  >
                    <Image
                      src={item.img}
                      alt="icons"
                      width={1000}
                      height={1000}
                      className="md:w-6 md:h-6 w-5 h-5 object-cover object-center"
                    />
                    <h2 className="lg:block hidden xl:text-sm lg:text-[10px] font-bold">
                      {" "}
                      {item.label}
                    </h2>{" "}
                  </ScrollLink>
                ))}
              </div>
            </div>
            {/* main-detail  */}
            <div className="lg:col-span-7 col-span-9 bg-white flex flex-col gap-2">
              {attractions && attractions.length > 0 && (
                <Element id="major-attractions" name="major-attractions">
                  <div className=" w-full mx-auto p-3 md:p-10  border rounded-lg">
                    {/* <h2 className="text-2xl relative title tracking-wide font-semibold text-secondary-500">
                  Major Attractions
                </h2> */}

                    <Title
                      text="Major Attractions"
                      fontSize=" !text-xl"
                      textalign="text-left"
                    />

                    <div className="w-full h-full flex flex-col md:gap-2 mt-4">
                      {attractions.map((item) => (
                        <div
                          key={`attraction-${item.title}`}
                          className="w-full py-4 md:py-2 overflow-hidden flex justify-center items-center"
                        >
                          <div className=" w-full flex justify-start gap-5">
                            {/* day */}
                            <Image
                              src="/icons/photography.png"
                              alt="binoculars"
                              width={1000}
                              height={1000}
                              className="w-6 h-6 object-cover object-center"
                            />
                            {/* title */}
                            <div className="font-medium">
                              <span className="font-bold text-md">
                                {item.title}:
                              </span>{" "}
                              <span className="text-secondary-400 font-semibold text-sm ">
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

              <Element id="overview" name="overview">
                <div className="mt-8 w-full mx-auto p-3 md:p-10   bg-primary-50/20 border  rounded-lg">
                  <Title
                    text="Overview"
                    fontSize=" !text-xl"
                    textalign="text-left"
                  />

                  <div>
                    <div className="my-4 font-medium leading-relaxed text-sm md:text-base">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: expedition.overview,
                        }}
                        className="prose prose-sm max-w-none ease-in-out duration-700"
                      />
                    </div>
                  </div>
                </div>
              </Element>

              {/* requirements */}
              {requirements && requirements.length > 0 && (
                <Element id="requirements" name="requirements">
                  <div className="mt-8 w-full mx-auto p-3 md:p-10 bg-primary-50/20 border rounded-lg">
                    <Title
                      text="Climbing, Expedition & skill Requirements"
                      fontSize="!text-xl"
                      textalign="text-left"
                    />
                    <div className="mt-4 w-full h-full flex flex-col md:gap-2">
                      {requirements.length > 0 ? (
                        requirements.map((item) => (
                          <div
                            key={`requirement-${
                              item._id || item.desc?.substring(0, 20)
                            }`}
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
                                <span className="md:text-base text-sm">
                                  {item.desc}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">
                          No requirements available.
                        </p>
                      )}
                    </div>
                  </div>
                </Element>
              )}
              {/* iternary  */}
              {itinerary && itinerary.length > 0 && (
                <Element id="itinerary" name="itinerary">
                  <div className="w-full mt-8 mx-auto p-3 md:p-10   bg-primary-50/20 border  rounded-lg">
                    {/* tile  */}
                    <Title
                      text="Itenary"
                      fontSize=" !text-xl"
                      textalign="text-left"
                    />

                    {itinerary.map((item, itemIndex) => (
                      <div
                        key={`itinerary-${item.day}-${item.title}`}
                        className="shadow-sm transition-all ease-in-out duration-300"
                        style={{
                          maxHeight:
                            activeIndex === itemIndex
                              ? "800px"
                              : "100px md:70px", // Define max height based on active state
                          overflow: "hidden",
                        }}
                      >
                        <div
                          className="flex justify-between items-center cursor-pointer"
                          onClick={() => toggleFAQ(itemIndex)}
                        >
                          <div className="flex items-center gap-4">
                            <h2 className="font-medium flex gap-2 items-end">
                              <span className="cursor-pointer font-bold text-xl px-2 py-2 whitespace-nowrap rounded-md bg-primary2/80 text-black">
                                {item.day}
                              </span>
                            </h2>
                            <div className=" py-8">
                              <h2 className=" md:text-base text-sm font-semibold ">
                                {item.title}
                              </h2>

                              <section className="flex md:gap-16 gap-10">
                                {" "}
                                <div className="flex items-center md:gap-4 gap-2 ">
                                  {item?.shortDescription?.length > 0 && (
                                    <>
                                      {" "}
                                      <Image
                                        src="/icons/bld.png"
                                        alt="arrow"
                                        width={1000}
                                        height={1000}
                                        className="w-6 h-6 object-cover "
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
                            {activeIndex === itemIndex ? (
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
                            activeIndex === itemIndex
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                          style={{
                            maxHeight:
                              activeIndex === itemIndex ? "800px" : "0px", // Dynamically set height
                          }}
                        >
                          <div className="flex flex-col gap-4">
                            {isModalOpens && (
                              <div
                                id="modalBackdrop"
                                className="fixed inset-0 bg-black/70 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 flex items-center justify-center z-[200] animate-fadeIn"
                                onClick={closeModals}
                              >
                                <div className="relative bg-white rounded-lg md:w-[50vw] w-[80vw] h-[75vh] animate-scaleIn">
                                  <button
                                    className="absolute -top-6 -right-6  text-red-400  hover:text-red-500 z-10"
                                    onClick={() => setModalOpens(false)}
                                  >
                                    <Icon
                                      icon="material-symbols:cancel-rounded"
                                      width="24"
                                      height="24"
                                    />
                                  </button>
                                  <Image
                                    src={selectedImage}
                                    alt="Selected"
                                    fill
                                    className="object-contain rounded-md"
                                  />
                                </div>
                              </div>
                            )}

                            <div className="flex gap-4">
                              {item.images.map((image, imgIndex) => (
                                <div
                                  key={`image-${itemIndex}-${imgIndex}`}
                                  className="w-52 h-28 object-cover object-center rounded-md relative group"
                                >
                                  <Image
                                    src={image}
                                    alt="icons"
                                    width={200}
                                    height={200}
                                    className="w-full h-full object-cover object-center rounded-md"
                                  />
                                  <div
                                    className=" hidden absolute top-0 group-hover:flex items-center justify-center bg-black/30 text-white w-full h-full rounded-md hover:cursor-pointer transition-all"
                                    onClick={() => openModals(image)}
                                  >
                                    View
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div
                              className=" font-medium md:text-sm text-xs text-light"
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
                                className=" h-[50vh] object-cover rounded-md"
                              />
                            )}
                          </figure>
                        </div>
                      </div>
                    ))}
                  </div>
                </Element>
              )}

              <Element id="route-map" name="route-map">
                <div className="w-full my-8 mx-auto p-3 md:p-10 border rounded-lg">
                  <Title
                    text="Route-Map"
                    fontSize="!text-2xl"
                    textalign="text-left"
                  />

                  {/* Image with click handler */}
                  <Image
                    width={1000}
                    height={1000}
                    src={
                      expedition?.routeMap ||
                      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    className="mt-4 mx-auto max-h-[60vh] object-contain w-full rounded-md object-center cursor-pointer"
                    alt="Route Map"
                    onClick={openModal} // Trigger modal on click
                  />

                  {/* Modal */}
                  <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    className="flex items-center justify-center h-full outline-none"
                    overlayClassName="fixed backdrop-blur-sm backdrop-filter  inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[999]"
                  >
                    <div className="relative max-w-5xl w-full mx-4">
                      <button
                        onClick={closeModal}
                        className="absolute -top-6 -right-4 text-white  rounded-full p-1 bg-red-600"
                      >
                        <Icon icon="ix:cancel" style={{ color: "white" }} />
                      </button>

                      {/* Full-size image in modal */}
                      <TransformWrapper>
                        <TransformComponent>
                          <Image
                            width={1200}
                            height={1200}
                            src={
                              expedition?.routeMap ||
                              "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            }
                            className="w-full h-auto max-h-[90vh] object-contain rounded-md"
                            alt="Route Map Full"
                          />
                        </TransformComponent>
                      </TransformWrapper>
                    </div>
                  </Modal>
                </div>
              </Element>

              {/* inclusions */}
              {costIncludes && costIncludes.length > 0 && (
                <Element id="cost-includes" name="cost-includes">
                  <div className="mt-8 w-full mx-auto p-3 md:p-10   bg-primary-50/20 border  rounded-lg">
                    <Title
                      text="Cost Includes"
                      fontSize="!text-xl"
                      textalign="text-left"
                    />
                    <div className="mt-4 w-full h-full flex flex-col md:gap-2">
                      {[...costIncludes].reverse().map((item) => (
                        <div
                          key={`include-${item.title}-${item.description}`}
                          className="w-full md:py-4 py-2 overflow-hidden flex justify-center items-center"
                        >
                          <div className=" w-full flex justify-start gap-2">
                            {/* day */}
                            <Image
                              src="/icons/greentick.png"
                              alt="tick"
                              width={1000}
                              height={1000}
                              className="w-6 h-6 object-cover object-center"
                            />
                            {/* title */}
                            <div className="font-medium text-[15px]">
                              <span className="font-bold text-lg  ">
                                {item.title}:
                              </span>{" "}
                              <span className=" md:text-base text-sm">
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

              {costExcludes && costExcludes.length > 0 && (
                <Element id="cost-excludes" name="cost-excludes">
                  <div className="mt-8 w-full mx-auto p-3 md:p-10   bg-primary-50/20 border  rounded-lg ">
                    <Title
                      text="Cost Excludes"
                      fontSize=" !text-xl"
                      textalign="text-left"
                    />
                    <div className="mt-4 w-full h-full flex flex-col md:gap-2">
                      {[...costExcludes].reverse().map((item) => (
                        <div
                          key={`exclude-${item.title}-${item.description}`}
                          className="w-full py-2 md:py-4 overflow-hidden flex justify-center items-center"
                        >
                          <div className=" w-full flex justify-start gap-4">
                            {/* day */}
                            <Image
                              src="/icons/cross.png"
                              alt="tick"
                              width={1000}
                              height={1000}
                              className="w-6 h-6 object-cover object-center"
                            />

                            {/* title */}
                            <div className="font-medium text-[15px]">
                              <span className="font-bold text-lg">
                                {item.title}:
                              </span>{" "}
                              <span className=" md:text-base text-sm">
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

              {/* gallery */}
              {medias && medias.length > 0 && (
                <Element id="gallery" name="gallery">
                  <div className="mt-8 w-full mx-auto p-3 md:p-10   bg-primary-50/20 border  rounded-lg">
                    <Title
                      text="Gallery"
                      fontSize=" !text-xl"
                      textalign="text-left"
                    />

                    <div className="grid lg:grid-cols-4 grid-cols-2 gap-4  my-8">
                      {medias.map((item, index) => (
                        <div
                          key={`gallery-${item.media}`}
                          onClick={() => openModalgallery(index)}
                          className="relative group"
                        >
                          <Image
                            src={item.media}
                            width={1000}
                            height={1000}
                            alt="img"
                            className="w-full h-full object-cover cursor-pointer group-hover:brightness-50 rounded-md ease-in-out duration-300 "
                          />
                          <div
                            className={`group-hover:block hidden absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-semibold text-2xl cursor-pointer uppercase`}
                          >
                            <Icon
                              icon="mdi:magnify"
                              style={{ color: "white" }}
                            />
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
                          className="z-[200] fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm backdrop-filter  bg-black bg-opacity-80"
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

              {
                <Element
                  id="essential-information"
                  name="essential-information"
                >
                  <div className="mt-8 w-full mx-auto p-3 md:p-10   bg-primary-50/20 border  rounded-lg">
                    <Title
                      text="Essential Information"
                      fontSize=" !text-xl"
                      textalign="text-left"
                    />

                    <div
                      className="mt-8 space-y-5"
                      dangerouslySetInnerHTML={{
                        __html: expedition.essentialInformation,
                      }}
                    ></div>
                  </div>
                </Element>
              }

              {/* fixed dates */}
              {departure && departure.length > 0 && (
                <div>
                  <Element id="date-&-price" name="date-&-price">
                    <div
                      className="mt-8 w-full mx-auto p-3 md:p-10   bg-primary-50/20 border  rounded-lg"
                      ref={targetRef}
                    >
                      <Title
                        text="Fixed Dates"
                        fontSize=" !text-xl"
                        textalign="text-left"
                      />
                      <div className="w-full h-full flex flex-col gap-2 mt-8">
                        <div className="w-full space-y-4">
                          {departure.map((item: any, index: number) => (
                            <div
                              key={index}
                              className="bg-white rounded-lg border p-4"
                            >
                              {/* Desktop Table */}
                              <div className="hidden md:block overflow-x-hidden">
                                <table className="w-full">
                                  <thead>
                                    <tr className="bg-gray-50 text-sm">
                                      <th className="px-6 py-4 text-left font-semibold text-gray-700">
                                        Dates
                                      </th>
                                      <th className="px-6 py-4 text-left font-semibold text-gray-700">
                                        Availability
                                      </th>
                                      <th className="px-6 py-4 text-left font-semibold text-gray-700">
                                        Price
                                      </th>
                                      <th className="px-6 py-4 text-left font-semibold text-gray-700">
                                        Status
                                      </th>
                                      <th className="px-6 py-4 text-left font-semibold text-gray-700">
                                        Book
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="border-t text-sm">
                                      <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                          <div className="text-gray-900 flex gap-2 whitespace-nowrap">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <span className="font-medium ">
                                              Start:
                                            </span>{" "}
                                            {item.startDate}
                                          </div>
                                          <div className="text-gray-900 flex gap-2">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <span className="font-medium">
                                              End:
                                            </span>{" "}
                                            {item.endDate}
                                          </div>
                                        </div>
                                      </td>
                                      <td className="px-6 py-4 flex items-center gap-2">
                                        <Users className="w-4 h-4 text-gray-400" />
                                        {item.totalQuantity -
                                          item.soldQuantity >
                                        0
                                          ? item.totalQuantity -
                                            item.soldQuantity
                                          : item.totalQuantity}
                                        / {item.totalQuantity}
                                      </td>
                                      <td className="px-6 py-4 text-lg font-bold text-primary2">
                                        ${item.price.toLocaleString()}
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
                                      <td className="px-6 py-4">
                                        <Link
                                          href={{
                                            pathname: "/booking",
                                            query: {
                                              groupDepartureId: item._id,
                                              slug: expedition.slug,
                                            },
                                          }}
                                          className="px-4 py-2 text-sm font-bold whitespace-nowrap text-white shadow-xl bg-primary2 rounded-lg"
                                        >
                                          Book Now
                                        </Link>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>

                              {/* Mobile View: Cards Layout */}
                              <div className="md:hidden flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                  <Calendar className="w-5 h-5 text-gray-400" />
                                  <div className="text-sm">
                                    <p className="font-medium text-gray-700">
                                      Start: {item.startDate}
                                    </p>
                                    <p className="font-medium text-gray-700">
                                      End: {item.endDate}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Users className="w-5 h-5 text-gray-400" />
                                  <span className="text-sm text-gray-700">
                                    {item.totalQuantity - item.soldQuantity} /{" "}
                                    {item.totalQuantity} Seats Available
                                  </span>
                                </div>
                                <div className="text-lg font-bold text-primary2">
                                  ${item.price.toLocaleString()}
                                </div>
                                <div className="flex items-center gap-2">
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
                                </div>
                                <div className="flex justify-center">
                                  <Link
                                    href={{
                                      pathname: "/booking",
                                      query: {
                                        groupDepartureId: item._id,
                                        slug: expedition.slug,
                                      },
                                    }}
                                    className="w-full text-center px-4 py-2 text-sm font-bold text-white shadow-xl bg-primary2 rounded-lg"
                                  >
                                    Book Now
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Link
                        href="/booking"
                        className={`cursor-pointer  flex justify-start  text-nowrap  text-secondary-50   duration-200 md:flex  h-[2.5rem] text-sm`}
                      >
                        <div className="flex justify-start">d</div>
                      </Link>
                    </div>
                  </Element>
                </div>
              )}

              {/* Download Sources */}
              <Element id="download-sources" name="download-sources">
                <div className="mt-8 w-full mx-auto p-3 md:p-10   bg-primary-50/20 border  rounded-lg">
                  <Title
                    text="Download Sources"
                    fontSize=" !text-xl"
                    textalign="text-left"
                  />
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 my-4">
                    <div className="bg-zinc-100 rounded-md p-3 cursor-pointer flex items-center  gap-4 mt-6  pb-2 ">
                      <Image
                        src="/icons/download.png"
                        alt="download-image"
                        width={1000}
                        height={1000}
                        className="h-10 w-10"
                      />
                      <div>
                        <h2 className="font-bold lg:text-lg text-md ">
                          Gear Guide Book
                        </h2>

                        <a
                          href={expedition.gearList}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500  font-bold underline italic"
                        >
                          Get PDF
                        </a>
                      </div>
                    </div>
                    <div className="bg-zinc-100 rounded-md p-3 cursor-pointer flex items-center  gap-4 mt-6  pb-2 ">
                      <Image
                        src="/icons/download.png"
                        alt="download-image"
                        width={1000}
                        height={1000}
                        className="h-10 w-10"
                      />
                      <div>
                        <h2 className="font-bold  lg:text-lg text-md">
                          Equipment Checklist
                        </h2>

                        <a
                          href={expedition.equipmentList}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500  font-bold underline italic"
                        >
                          Get PDF
                        </a>
                      </div>
                    </div>
                    <div className="bg-zinc-100 rounded-md p-3 cursor-pointer flex items-center  gap-4 mt-6  pb-2 ">
                      <Image
                        src="/icons/download.png"
                        alt="download-image"
                        width={1000}
                        height={1000}
                        className="h-10 w-10"
                      />
                      <div>
                        <h2 className="font-bold  lg:text-lg text-md">
                          Trip Brochure
                        </h2>

                        <a
                          href={expedition.tripBrochure}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500  font-bold underline italic"
                        >
                          Get PDF
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Element>
              <Element id="reviews" name="reviews">
                <div
                  // id="reviews"
                  className="w-full mx-auto p-3 md:p-10   bg-primary-50/20 border rounded-md  "
                >
                  {/* <Title title="CLient Reviews" /> */}
                  <PackageReview expeditionId={expedition._id} />
                </div>
              </Element>

              {/* drop review section */}
            </div>{" "}
            {/* third right side column data */}
            <div className="md:col-span-3 col-span-9 sticky top-[5rem] pl-2">
              {(expedition?.price?.adult?.pricePerAdult ||
                expedition.price?.adult?.discountsA?.length > 0) && (
                <div className="py-2 bg-zinc-100 rounded-md lg:px-4 px-2">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <h3 className="title font-bold text-sm">Starting from </h3>
                    <h2 className="title lg:text-3xl md:text-2xl text-xl font-extrabold text-primary2">
                      US${expedition?.price?.adult?.pricePerAdult}
                    </h2>
                  </div>
                  <hr />
                  <p className="lg:text-md text-xs leading-none my-4 font-medium text-secondary-400">
                    We only offer discounts based on your group size. We don’t
                    add extra people to your group.
                  </p>

                  {/* table */}
                  <table className="w-full my-2 bg-white rounded-md">
                    <thead className="">
                      <tr className="h-14 text-sm border-b">
                        <th>No. of persons</th>
                        <th>Price per Pax</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {expedition?.price?.adult?.discountsA?.map(
                        (row, index) => (
                          <tr
                            key={`discount-${row.minQuantity}-${row.maxQuantity}-${index}`}
                            className="h-10"
                          >
                            <td className="text-center font-medium">
                              {row.minQuantity}-{row.maxQuantity}
                            </td>
                            <td className="text-center font-bold lg:text-xl text-sm">
                              {row.price}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                  <div
                    className="flex items-center  cursor-pointer group  ease-in-out duration-200"
                    onClick={scrollToSection}
                  >
                    <div className="border rounded-full p-2 text-2xl ">
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
              )}

              {/* Recommendation */}
              <ExpertGuide />
            </div>
          </div>

          {/* related expeditions */}
          <div className="w-11/12 3xl:w-10/12 mx-auto mt-20">
            <RelatedExpedition name={expedition?.collections?.slug} />
          </div>
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </>
  );
}

export default PackageDetailMain;
