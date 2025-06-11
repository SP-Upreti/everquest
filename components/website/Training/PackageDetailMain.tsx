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
import { usePathname } from "next/navigation";
import ExpertGuide from "@/components/ui/expert-guide";

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

  console.log("slug in page : ", slug);

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

    const datas = data.data.filter(
      (item: { expedition: { _id: string | undefined } }) =>
        item.expedition._id === expedition?._id
    );

    setDeparture(datas);
    // console.log("expedition of the data is : ", expedition?.expeditionId)
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
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(-40);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // State to store the list of reviews
  const [reviews, setReviews] = useState<Review[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const path = usePathname();
  console.log("path", path);

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

  const getAvailabilityStatus = (total: number, sold: number) => {
    console.log("total : ", total);
    console.log("sold : ", sold);
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

  return (
    <>
      {expedition ? (
        <div className="w-full h-full  text-secondary-500 relative">
          <div className="w-full h-screen relative  flex justify-center items-center">
            <Image
              width={1000}
              height={1000}
              src="/courses.jpeg"
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

          {/* this is main content */}
          <div className="md:py-[5rem] w-11/12 3xl:w-10/12 grid lg:grid-cols-12 grid-cols-1 gap-4 relative items-start mx-auto">
            {/* tab  link  */}
            <div className="mx-auto col-span-9 lg:col-span-2 z-[100] bg-white  w-full  flex-col gap-8 sticky  lg:top-[5rem] top-[4rem]  overflow-x-scroll md:overflow-x-visible  left-0  flex justify-start  font-medium ">
              <div className="w-full py-1 overflow-x-scroll md:overflow-x-visible  grid grid-cols-11 lg:grid-cols-1 gap-2 font-medium">
                {buttonLabels.map((item, index) => (
                  <ScrollLink
                    key={index}
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
              <Element id="overview" name="overview">
                <div className=" w-full mx-auto p-3 md:p-10   bg-primary-50/20 border  rounded-lg">
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

              {/* iternary  */}
              <Element id="itinerary" name="itinerary">
                <div className="w-full mt-8 mx-auto p-3 md:p-10   bg-primary-50/20 border  rounded-lg">
                  {/* tile  */}
                  <Title
                    text="Itenary"
                    fontSize=" !text-xl"
                    textalign="text-left"
                  />

                  {itinerary.map((item, index) => (
                    <div
                      key={index}
                      className=" shadow-sm  transition-all ease-in-out duration-300"
                      style={{
                        maxHeight:
                          activeIndex === index ? "800px" : "100px md:70px", // Define max height based on active state
                        overflow: "hidden",
                      }}
                    >
                      <div
                        className="flex justify-between  items-center cursor-pointer"
                        onClick={() => toggleFAQ(index)}
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
                          maxHeight: activeIndex === index ? "800px" : "0px", // Dynamically set height
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
                                  className="object-cover rounded-md"
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

              {/* gallery */}
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
                        key={index}
                        onClick={() => openModalgallery(index)}
                        className="relative group "
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

              {/* fixed dates */}
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
                        {departure?.map((item: any) => (
                          <div
                            key={item.id}
                            className="bg-white rounded-lg shadow-md p-4"
                          >
                            {/* Desktop Table */}
                            <div className="hidden md:block overflow-x-auto">
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
                                        <div className="text-gray-900 flex gap-2">
                                          <Calendar className="w-4 h-4 text-gray-400" />
                                          <span className="font-medium">
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
                                      {item.totalQuantity - item.soldQuantity >
                                      0
                                        ? item.totalQuantity - item.soldQuantity
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

              {/* drop review section */}
              <Element id="reviews" name="reviews">
                <div className="mt-8 w-full mx-auto p-3 md:p-10   bg-primary-50/20 border  rounded-lg">
                  <Title
                    text="Drop your review"
                    fontSize=" !text-xl"
                    textalign="text-left"
                  />
                  {/* Button to open the popup */}
                  <Button
                    onClick={openModal}
                    className="my-4 !px-4 !py-4 !font-sans !text-white !font-bold !shadow-xl"
                  >
                    Write Review
                  </Button>
                  {/* Popup Modal */}
                  <AnimatePresence>
                    <div className="relative">
                      {isModalOpen && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="fixed inset-0 bg-black bg-opacity-50  backdrop-filter backdrop-blur-sm flex justify-center items-center z-[900]"
                        >
                          <form
                            onSubmit={handleSubmit}
                            className="mt-6 space-y-4 md:max-w-[30em] max-w-[20em] bg-white p-6 rounded-lg z-[200] relative"
                          >
                            <button
                              onClick={closeModal}
                              className="absolute right-3 top-2 text-2xl"
                            >
                              <Icon
                                icon="mdi:cancel-circle"
                                style={{ color: "red" }}
                              />{" "}
                            </button>
                            {/* Name Input */}
                            <div className="flex flex-col">
                              {/* <label
                        htmlFor="name"
                        className="text-secondary-500 font-medium"
                      >
                        Your Name
                      </label> */}
                              <input
                                type="text"
                                id="name"
                                name="name"
                                value={reviewData.name}
                                onChange={handleInputChange}
                                className="mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                placeholder="Enter your name"
                                required
                              />
                            </div>

                            {/* Name Input */}
                            <div className="flex flex-col">
                              {/* <label
                        htmlFor="name"
                        className="text-secondary-500 font-medium"
                      >
                        Your Name
                      </label> */}
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={reviewData.email}
                                onChange={handleInputChange}
                                className="mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                placeholder="Enter your mail"
                                required
                              />
                            </div>

                            {/* Star Rating */}
                            <div className="flex flex-col">
                              <label
                                htmlFor="rating"
                                className="text-secondary-500 font-medium text-sm"
                              >
                                Your Rating
                              </label>
                              <div className="flex space-x-1 mt-2">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                  <label key={rating}>
                                    <input
                                      type="radio"
                                      name="rating"
                                      value={rating}
                                      onChange={handleInputChange}
                                      className="hidden"
                                      required
                                    />
                                    <svg
                                      className={`w-6 h-6 ${
                                        reviewData.rating >= rating
                                          ? "text-yellow-400"
                                          : "text-gray-300"
                                      } cursor-pointer`}
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927a.5.5 0 01.902 0l1.651 3.651 4.085.579a.5.5 0 01.277.851l-2.95 2.795.696 4.075a.5.5 0 01-.726.527L10 13.187l-3.651 1.919a.5.5 0 01-.726-.527l.696-4.075L3.37 8.007a.5.5 0 01.277-.851l4.085-.579L9.049 2.927z" />
                                    </svg>
                                  </label>
                                ))}
                              </div>
                            </div>

                            {/* File Upload */}
                            <div className="flex flex-col">
                              <label
                                htmlFor="file-upload"
                                className="text-secondary-500 font-medium text-sm"
                              >
                                Upload an Image or File
                              </label>
                              <input
                                type="file"
                                id="file-upload"
                                onChange={handleFileChange}
                                className="mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
                              />
                            </div>

                            {/* Image Preview */}
                            <div>
                              {imagePreview && (
                                <div className="mt-4">
                                  <Image
                                    src={imagePreview}
                                    alt="Image preview"
                                    height={1000}
                                    width={1000}
                                    className="mt-2 w-16 h-16 object-cover border rounded-lg"
                                  />
                                </div>
                              )}
                            </div>

                            {/* Review Textarea */}
                            <div className="flex flex-col">
                              {/* <label
                        htmlFor="review"
                        className="text-secondary-500 font-medium"
                      >
                        Your Review
                      </label> */}
                              <textarea
                                id="review"
                                name="review"
                                value={reviewData.review}
                                onChange={handleInputChange}
                                className="mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                placeholder="Write your review here"
                                required
                              />
                            </div>

                            {/* Submit Button */}
                            <Button
                              type="submit"
                              className=" !ml-2 !px-4 !py-2 !font-sans !text-white !font-bold !shadow-xl"
                            >
                              Submit Review
                            </Button>
                          </form>
                        </motion.div>
                      )}
                    </div>
                  </AnimatePresence>

                  {/* Displaying Submitted Reviews */}
                  <div className="mt-10">
                    <Title
                      text="Hear What Our Customers Are Saying"
                      fontSize=" !text-lg"
                      textalign="text-left"
                    />

                    {/* Reviews List */}
                    {reviews.length > 0 ? (
                      <div className="space-y-6 mt-6">
                        {reviews.map((review, index) => (
                          <div key={index} className="">
                            <div className="flex gap-4">
                              <Image
                                src="/Team/Guide.jpg"
                                alt="review-image"
                                width={1000}
                                height={1000}
                                className="w-16 h-16 rounded-full"
                              />
                              <div>
                                <h2 className="font-bold">{review.name}</h2>
                                <div className="flex space-x-1">
                                  {Array(5)
                                    .fill(0)
                                    .map((_, index) => (
                                      <Icon
                                        key={index}
                                        icon="mdi:star"
                                        style={{ color: "#fa8108" }}
                                      />
                                    ))}
                                </div>
                                <p className="mt-4">{review.review}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 mt-6">
                        No reviews yet. Be the first to leave a review!
                      </p>
                    )}
                  </div>
                </div>
              </Element>
            </div>

            {/* third right side column data */}
            <div className="md:col-span-3 col-span-9 sticky top-[5rem] pl-2">
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

const buttonLabels = [
  { id: 1, label: "Overview", img: "/icons/eye.png" },
  { id: 2, label: "Itinerary", img: "/icons/route.png" },
  { id: 3, label: "Gallery", img: "/icons/picture.png" },
  { id: 4, label: "Date & Price", img: "/icons/calendar.png" },
  { id: 5, label: "Reviews", img: "/icons/attachment.png" },
];
