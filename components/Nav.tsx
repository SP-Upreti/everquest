"use client";
import { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BestSeller1 from "@/public/BestSellers/Best1.jpg";
import BestSeller2 from "@/public/BestSellers/best2.webp";
import BestSeller3 from "@/public/BestSellers/best3.jpg";
import BestSeller5 from "@/public/BestSellers/best2.jpg";
import Paragliding1 from "@/public/OtherActivities/Paragliding/paragliding1.avif";
import Paragliding3 from "@/public/OtherActivities/Paragliding/paragliding3.avif";
import Paragliding4 from "@/public/OtherActivities/Paragliding/paragliding4.avif";
import Paragliding5 from "@/public/OtherActivities/Paragliding/paragliding5.avif";
import Profile from "@/public/solo-traveller.png";
import { Icon } from "@iconify/react";
import Image from "next/image";
import OtherActivitiesData from "@/data/OtherActivitiesData";
import { usePathname } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import TrekkingData from "@/data/TrekkingData";
import ExpeditionData from "@/data/ExpeditionData";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";
type Props = { navData: any; other: any };

export default function Nav2({ navData, other }: Props) {
  const currentRoute = usePathname();
  const [openMenu, setOpenMenu] = useState(false);
  const [navHover, setNavhover] = useState(false);
  const [openCompany, setOpenCompany] = useState(false);
  const [hoveredData, setHoveredData] = useState<any>([]);
  const [hoveredPackage, setHoveredPackage] = useState("");
  const [openPackage, setOpenPackage] = useState<any>(null);
  const [packageName, setPackageName] = useState<any>(null);
  const [hoveredLink, setHoveredLink] = useState("");
  const [currentOpen, setCurrentOpen] = useState<any>(null);
  const [currentCol, setCurrentCol] = useState<any>(null);
  const [currentName, setCurrentName] = useState<any>("");
  const router = useRouter();

  // HOVER NAV LINK
  const handleHoverLink = (link: string) => {
    setNavhover(true);
    setHoveredLink(link);
    if (
      link === "Company" ||
      link === "Other Activities" ||
      currentRoute === "about_us" ||
      currentRoute === "message_from_ceo" ||
      currentRoute === "our_team"
    ) {
      setOpenCompany(true);
      setOpenMenu(false);
    } else {
      setOpenMenu(true);
      setOpenCompany(false);
    }

    switch (link) {
      case "Mountaineering":
        return setHoveredData(ExpeditionData);
      case "Trekking":
        // Render trekking related content
        return setHoveredData(TrekkingData);
      case "Other Activities":
        return setHoveredData(OtherActivitiesData);
      case "Training":
        // Render training related content
        return setHoveredData(trainingData);

      default:
        return null;
    }
  };

  // get the hovered package
  const defaultPackage =
    hoveredData && hoveredData.length > 0 ? hoveredData[0].package : [];
  const currentPackages =
    hoveredData?.find((pkg: any) => pkg?.name === hoveredPackage)?.package ||
    defaultPackage;

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      // Check if the page is scrolled down
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    // Add event listener
    window.addEventListener("scroll", handleScroll);
    // Cleanup event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add useEffect to update hoveredPackage whenever hoveredData changes
  useEffect(() => {
    if (hoveredData.length > 0) {
      setHoveredPackage(hoveredData[0].name);
      console.log(hoveredData);
    }
  }, [hoveredData]);

  useEffect(() => {
    gsap.to(".navbar", {
      backgroundColor: isScrolled ? "#1E1E1E" : "",
      duration: 0.5,
    });
  }, [isScrolled]);

  const NavLinks = [
    { id: 1, name: "Home", href: "/" },
    { id: 5, name: "Other Activities", href: "" },
    { id: 6, name: "Company", href: "" },
    { id: 7, name: "Training", href: "/training" },
    { id: 9, name: "Contact us", href: "/contact_us" },
  ];

  const [openNav, setOpenNav] = useState(false);

  const handleOpenNav = () => {
    if (!openNav) {
      gsap.to(".ham1", {
        rotate: "45deg",
        duration: "0.3",
        transformOrigin: "center",
      });
      gsap.to(".ham2", {
        top: "40%",
        rotate: "-45deg",
        duration: "0.3",
        transformOrigin: "center",
      });
      gsap.to(".sideNav", {
        translateX: 0,
        duration: "0.5",
        ease: "sine.out",
      });
      gsap.to(".side-nav-links", {
        delay: "0.2",
        opacity: 1,
        duration: "0.6",
        ease: "sine.out",
        stagger: 0.05,
      });
      document.body.style.overflowY = "hidden";
      setOpenNav(true);
    }
    if (openNav) {
      gsap.to(".ham1", {
        rotate: "0",
        duration: "0.3",
        transformOrigin: "center",
      });
      gsap.to(".ham2", {
        top: "80%",
        rotate: "0",
        duration: "0.3",
        transformOrigin: "center",
      });
      gsap.to(".sideNav", {
        delay: "0.5",
        translateX: "100%",
        duration: "0.5",
        ease: "sine.out",
      });
      gsap.to(".side-nav-links", {
        opacity: 0,
        duration: "0.6",
        ease: "sine.out",
        stagger: 0.05,
      });
      document.body.style.overflowY = "auto";
      setOpenNav(false);
    }
  };
  // const [openNavLink, setOpenNavLink] = useState(false);

  console.log("currentOpen", currentOpen);
  console.log("navData", navData);

  const [openNavLinkIndex, setOpenNavLinkIndex] = useState<number | null>(null);
  const [showClickedLinkNav, showOpenClickedLinkNav] = useState<any>([]);

  const handleOpenSmallNavLink = (index: number, link: string) => {
    setOpenNavLinkIndex((prevIndex) => (prevIndex === index ? null : index));
    switch (link) {
      case "Mountaineering":
        return showOpenClickedLinkNav(ExpeditionData);
      case "Company":
        return showOpenClickedLinkNav(CompanyLinks);
      case "Trekking":
        // Render trekking related content
        return showOpenClickedLinkNav(TrekkingData);
      case "Other Activities":
        return showOpenClickedLinkNav(other);
      case "Training":
        // Render training related content
        return showOpenClickedLinkNav(trainingData);

      case "Company":
        // Render training related content
        return showOpenClickedLinkNav(CompanyLinks);

      default:
        return null;
    }
  };

  useGSAP(() => {
    gsap.to(".customize-trip-btn", {
      y: "5px",
      repeat: -1,
      yoyo: true,
      duration: 1,
      ease: "sine.inOut",
      // ease: "bounce.inOut",
    });
  });
  console.log(showClickedLinkNav);

  // if (currentUser !== undefined) {
  //   router.push("/");
  // }
  return (
    <>
      <div
        onMouseLeave={() => {
          setOpenCompany(false);
          setOpenMenu(false);
          setNavhover(false);
        }}
        className={`navbar w-full ${
          navHover ||
          currentRoute.includes("/message_from_ceo") ||
          currentRoute.includes("/blogs/") ||
          currentRoute.includes("/profile/") ||
          currentRoute.includes("/book_trip") ||
          currentRoute.includes("/login") ||
          currentRoute.includes("/register") ||
          currentRoute.includes("/forgot-my-password") ||
          currentRoute.includes("/password-reset") ||
          currentRoute.includes("/payment-failure") ||
          currentRoute.includes("/payment-success") ||
          currentRoute.includes("/verify-email")
            ? "bg-[#1E1E1E]"
            : "bg-transparent"
        }  origin-top w-full flex fixed  top-0 left-0 z-[100] h-[4rem]`}
      >
        <div className="w-11/12 4xl:w-10/12 flex justify-between items-center mx-auto h-full">
          {openMenu && currentOpen && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onMouseLeave={() => {
                  setOpenMenu(false);
                  setPackageName(false);
                  setNavhover(false);
                  setCurrentOpen(null);
                }}
                className="absolute   border-zinc-700 border-opacity-[0.5] w-full mx-auto z-10 bg-[#1E1E1E] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] top-[100%] origin-top  left-0 text-zinc-50  "
              >
                <div className="w-11/12 4xl:w-10/12  mx-auto grid grid-cols-6">
                  {currentOpen && (
                    <motion.div
                      initial={{ opacity: 0, marginTop: "20px" }}
                      animate={{ opacity: 1, marginTop: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col justify-between h-full border-zinc-700 border-opacity-[0.5] py-5  gap-2"
                    >
                      {/* {hoveredData.name} */}
                      <div className="flex flex-col gap-2 ">
                        {currentOpen?.map((item: any, index: number) => (
                          <Link
                            key={index}
                            href={
                              `/expedition/` + currentCol + "?cat=" + item?._id
                            }
                            onMouseEnter={() => {
                              setOpenPackage(item.expeditions);
                              setPackageName(item.name);
                            }}
                            className={`text-left text-[15px] capitalize  cursor-pointer  ${
                              packageName === item.name
                                ? "text-yellow-500"
                                : "text-zinc-300"
                            }`}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                      {/* BUTTON  */}
                      <Link
                        href={
                          currentOpen.length > 0
                            ? `/expedition/${currentCol}?cat=${currentOpen[0]._id}`
                            : "#"
                        }
                      >
                        <button
                          type="button"
                          className="primary-button !w-10/12"
                        >
                          View all
                        </button>
                      </Link>
                    </motion.div>
                  )}
                  <div className="flex w-full col-span-5 flex-col gap-2 py-5 h-full">
                    <div className="grid grid-cols-4  gap-2">
                      {openPackage
                        ?.slice(0, 8)
                        .map((item: any, index: number) => {
                          console.log(item);
                          return (
                            <>
                              <motion.div
                                onClick={() => setOpenMenu(false)}
                                key={index}
                                initial={{ opacity: 0, marginTop: "20px" }}
                                animate={{ opacity: 1, marginTop: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col gap-2 min-w-full relative h-[25vh] group cursor-pointer"
                              >
                                <div className="absolute z-20 w-11/12 text-start text-[14px]  pointer-events-none font-semibold  bottom-[5%] left-[5%] mx-auto  group-hover:opacity-[1] text-zinc-100  duration-200">
                                  {item?.name}
                                </div>
                                <Link
                                  href={`/trip/${item?.slug}`}
                                  className="w-full h-full relative"
                                >
                                  <div className="absolute bottom-0 left-0  w-full h-[50%] group-hover:h-[100%] duration-200 z-10 bg-gradient-to-t from-[#1E1E1E] to-transparent"></div>

                                  <Image
                                    alt="package-img"
                                    src={item?.banner}
                                    width={1000}
                                    height={1000}
                                    className="object-cover object-center  duration-200 brightness-95 w-full h-full rounded-md"
                                  ></Image>
                                </Link>
                              </motion.div>
                            </>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {/* LOGO  */}
          <Link href="/" className=""></Link>
          {/* LINKS  */}
          <div className="gap-2 xl:gap-5 hidden lg:flex xl:absolute top-1/2 left-1/2 xl:-translate-x-1/2 xl:-translate-y-1/2 whitespace-nowrap  justify-center items-center">
            {NavLinks.slice(0, 1).map((link, index) => (
              <Link href={link.href} key={index} className="relative">
                <span
                  onMouseEnter={() => setOpenMenu(false)}
                  className={`nav-links ${
                    currentRoute === link.href
                      ? "text-yellow-500"
                      : "text-zinc-300"
                  }   font-semibold items-center text-[14px] xl:text-base   hover:text-yellow-500 cursor-pointer flex gap-1`}
                >
                  {link.name}
                  {link.name === "Home" ||
                  link.name === "Training" ||
                  link.name === "Contact us" ||
                  link.name === "Blogs" ? null : (
                    <Icon key={index} icon="iconamoon:arrow-down-2" />
                  )}
                </span>

                {link.name === "Company" && openCompany && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      onMouseLeave={() => setOpenCompany(false)}
                      className="absolute text-nowrap gap-3 bg-[#1E1E1E] flex flex-col   shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] justify-center items-start p-5 top-[100%] mt-[1.2rem] origin-top left-0 text-zinc-800"
                    >
                      {CompanyLinks.map((link, index) => (
                        <Link
                          key={index}
                          href={link.href}
                          className="text-left hover:text-yellow-500 text-zinc-100 text-[15px] cursor-pointer"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                )}
              </Link>
            ))}
            {navData?.slice(0, 2).map((item: any, index: number) => (
              <Link
                href={`/expedition/${item._id}?cat=${item.categories[0]._id}`}
                key={index}
                className="relative"
              >
                <span
                  onMouseEnter={() => {
                    handleHoverLink(item.name), setCurrentCol(item._id);
                    setCurrentOpen(item?.categories);
                    setPackageName(item?.categories[0]?.name);
                    setOpenPackage(item?.categories[0]?.expeditions);
                  }}
                  className={`nav-links ${
                    currentRoute === "/item.href"
                      ? "text-yellow-500"
                      : "text-zinc-300"
                  }   font-semibold items-center text-[14px] xl:text-base    hover:text-yellow-500 cursor-pointer flex gap-1`}
                >
                  {item.name}
                  <Icon key={index} icon="iconamoon:arrow-down-2" />
                </span>
              </Link>
            ))}
            {NavLinks.slice(1).map((link, index) => (
              <Link href={link.href} key={index} className="relative">
                <span
                  onMouseEnter={() => {
                    link.name == "Company"
                      ? (handleHoverLink(link.name), setCurrentName(link.name))
                      : setOpenMenu(false);
                    link.name == "Other Activities"
                      ? (setCurrentOpen(null),
                        handleHoverLink(link.name),
                        setCurrentName(link.name))
                      : setOpenMenu(false);
                  }}
                  className={`nav-links ${
                    currentRoute === link.href
                      ? "text-yellow-500"
                      : "text-zinc-300"
                  }   font-semibold items-center text-[14px] xl:text-base   hover:text-yellow-500 cursor-pointer flex gap-1`}
                >
                  {link.name}
                  {link.name === "Home" ||
                  link.name === "Training" ||
                  link.name === "Contact us" ||
                  link.name === "Blogs" ? null : (
                    <Icon key={index} icon="iconamoon:arrow-down-2" />
                  )}
                </span>
                {link.name === currentName && openCompany && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      onMouseLeave={() => setOpenCompany(false)}
                      className="absolute text-nowrap gap-3 bg-[#1E1E1E] flex flex-col   shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] justify-center items-start p-5 top-[100%] mt-[1.2rem] origin-top left-0 text-zinc-800"
                    >
                      {currentName == "Company"
                        ? CompanyLinks.map((link, index) => (
                            <Link
                              key={index}
                              href={link.href}
                              className="text-left hover:text-yellow-500 text-zinc-100 text-[15px] cursor-pointer"
                            >
                              {link.name}
                            </Link>
                          ))
                        : other?.map((item: any, index: number) => {
                            console.log(item);
                            return (
                              <Link
                                key={index}
                                href={"/other_activities/" + item.slug}
                                className="text-left hover:text-yellow-500 text-zinc-100 text-[15px] cursor-pointer"
                              >
                                {item.name}
                              </Link>
                            );
                          })}
                    </motion.div>
                  </AnimatePresence>
                )}
              </Link>
            ))}
          </div>
          <div className="flex gap-5 lg:gap-2 xl:gap-3  items-center justify-center">
            {/* BUTTON  */}
            <Link href="/customize_trip" className="hidden md:flex">
        
              <div className="relative z-30 inline-flex items-center justify-center w-auto px-3 lg:px-1 xl:px-3 py-2 overflow-hidden font-semibold text-white transition-all duration-300 bg-yellow-600 rounded-md cursor-pointer group  ring-[1px] hover:ring-[0.6px] ring-zinc-100  ease focus:outline-none">
                <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                <span className="relative z-20 flex items-center text-sm">
                  <svg
                    className="relative w-5 h-5 mr-2 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                  Customize trip
                </span>
              </div>
            </Link>

     
            <div
              onClick={handleOpenNav}
              className="flex lg:hidden relative justify-center hover:scale-110 duration-150 items-center w-[1.5rem] md:w-[2rem] cursor-pointer py-2 flex-col gap-1"
            >
              <span className="ham1 absolute top-[40%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-zinc-100 w-full h-[2px]"></span>
              <span className="ham2  absolute top-[70%] left-[50%] -translate-x-[50%] -translate-y-[50%]  bg-zinc-100 w-full h-[2px]"></span>
            </div>
          </div>
        </div>
      </div>

      {/* for mobile  */}
      <div className="fixed sideNav pt-[5rem] h-screen overflow-y-scroll top-0 lg:hidden left-0 w-full   translate-x-[100%] bg-[#1E1E1E] z-[50]">
        <div className="w-11/12 pr-3 overflow-y-scroll mx-auto text-zinc-200 h-full  flex flex-col  justify-center gap-5">
          {/* BUTTON  */}
          <Link href="/customize_trip">
   
            <div className="relative ml-1 z-30 inline-flex items-center justify-center w-auto px-3 py-2 overflow-hidden font-semibold text-white transition-all duration-300 bg-yellow-600 rounded-md cursor-pointer group  ring-[1px] hover:ring-[0.6px] ring-zinc-100  ease focus:outline-none">
              <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
              <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
              <span className="relative z-20 flex items-center text-sm">
                <svg
                  className="relative w-5 h-5 mr-2 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
                Customize trip
              </span>
            </div>
          </Link>
          {NavLinks.slice(0, 1).map((link, index) => (
            <div
              key={index}
              className="w-full flex-col side-nav-links pb-2 border-b border-zinc-800 opacity-0 flex justify-center items-center"
            >
              <div className="flex w-full justify-between">
                <Link
                  onClick={handleOpenNav}
                  href={link.href}
                  className={`${
                    currentRoute === link.href
                      ? "text-yellow-500"
                      : "text-zinc-200"
                  } text-xl font-medium`}
                >
                  {link.name}
                </Link>
                <div
                  onClick={() => handleOpenSmallNavLink(index, link.name)}
                  className={`w-8 h-8 p-1 items-center justify-center bg-yellow-500 border flex flex-col border-zinc-700 rounded-sm object-cover object-center ${
                    currentRoute === link.href
                      ? "text-zinc-800"
                      : "text-zinc-800"
                  } ${
                    link.name === "Home" ||
                    link.name === "Training" ||
                    link.name === "Contact us" ||
                    link.name === "Blogs" ||
                    link.name === "Training"
                      ? "hidden"
                      : "block"
                  }`}
                >
                  <Icon icon="solar:alt-arrow-down-bold-duotone" className="" />
                </div>
              </div>
              <AnimatePresence>
                {openNavLinkIndex === index && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className={`w-full origin-top overflow-hidden ${
                      link.name === "Home" ||
                      link.name === "Training" ||
                      link.name === "Contact us" ||
                      link.name === "Blogs" ||
                      link.name === "Training"
                        ? "hidden"
                        : "block"
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ opacity: { delay: 0.2, duration: 0.5 } }}
                      className="flex flex-col py-2 text-zinc-100 gap-2"
                    >
                      {showClickedLinkNav.length > 0 ? (
                        showClickedLinkNav.map((item: any, i: number) => (
                          <div key={i}>{item.name}</div>
                        ))
                      ) : (
                        <div>No data available</div>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          {navData?.map((item: any, index: number) => (
            <div
              key={index}
              className="w-full flex-col side-nav-links pb-2 border-b border-zinc-800 opacity-0 flex justify-center items-center"
            >
              <div className="flex w-full justify-between">
                <Link
                  onClick={handleOpenNav}
                  href={`/expedition/${item?._id}?cat=${
                    item.categories?.length > 0 && item?.categories[0]?._id
                  }`}
                  className={`${
                    currentRoute === "/expidition"
                      ? "text-yellow-500"
                      : "text-zinc-200"
                  } text-xl font-medium`}
                >
                  {item.name}
                </Link>
                <div
                  onClick={() => {
                    handleOpenSmallNavLink(index, item.name);
                    setCurrentOpen(item.categories);
                    setCurrentCol(item._id);
                  }}
                  className={`w-8 h-8 p-1 items-center justify-center bg-yellow-500 border flex flex-col border-zinc-700 rounded-sm object-cover object-center `}
                >
                  <Icon
                    icon="solar:alt-arrow-down-bold-duotone"
                    className="text-zinc-800"
                  />
                </div>
              </div>
              <AnimatePresence>
                {openNavLinkIndex === index && currentOpen !== null && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className={`w-full origin-top overflow-hidden ${
                      item.name === "Home" ||
                      item.name === "Training" ||
                      item.name === "Contact us" ||
                      item.name === "Blogs" ||
                      item.name === "Training"
                        ? "hidden"
                        : "block"
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ opacity: { delay: 0.2, duration: 0.5 } }}
                      className="flex flex-col py-2 text-zinc-100 gap-2"
                    >
                      {currentOpen.length > 0 ? (
                        currentOpen?.map((item: any, i: number) => (
                          <div
                            key={i}
                            className="cursor-pointer"
                            onClick={() => {
                              handleOpenNav();
                              router.push(
                                `/expedition/${currentCol}?cat=${item?._id}`,
                              );
                            }}
                          >
                            {item.name}
                          </div>
                        ))
                      ) : (
                        <div>No data available</div>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          {NavLinks.slice(1).map((link, index) => (
            <div
              key={index}
              className="w-full flex-col side-nav-links pb-2 border-b border-zinc-800 opacity-0 flex justify-center items-center"
            >
              <div className="flex w-full justify-between">
                <Link
                  onClick={handleOpenNav}
                  href={link.href}
                  className={`${
                    currentRoute === link.href
                      ? "text-yellow-500"
                      : "text-zinc-200"
                  } text-xl font-medium`}
                >
                  {link.name}
                </Link>
                <div
                  onClick={() => {
                    handleOpenSmallNavLink(index, link.name);
                    setCurrentOpen(null);
                  }}
                  className={`w-8 h-8 p-1 items-center justify-center bg-yellow-500 border flex flex-col border-zinc-700 rounded-sm object-cover object-center ${
                    currentRoute === link.href
                      ? "text-zinc-800"
                      : "text-zinc-800"
                  } ${
                    link.name === "Home" ||
                    link.name === "Training" ||
                    link.name === "Contact us" ||
                    link.name === "Blogs" ||
                    link.name === "Training"
                      ? "hidden"
                      : "block"
                  }`}
                >
                  <Icon icon="solar:alt-arrow-down-bold-duotone" />
                </div>
              </div>
              <AnimatePresence>
                {openNavLinkIndex === index && currentOpen == null && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className={`w-full origin-top overflow-hidden ${
                      link.name === "Home" ||
                      link.name === "Training" ||
                      link.name === "Blogs" ||
                      link.name === "Training"
                        ? "hidden"
                        : "block"
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ opacity: { delay: 0.2, duration: 0.5 } }}
                      className="flex flex-col py-2 text-zinc-100 gap-2"
                    >
                      {showClickedLinkNav.length > 0 ? (
                        showClickedLinkNav.map((item: any, i: number) => {
                          console.log(item);
                          return (
                            <div
                              className="cursor-pointer"
                              key={i}
                              onClick={() => {
                                handleOpenNav();
                                link?.name != "Other Activities"
                                  ? router.push(item.href)
                                  : router.push(
                                      `/other_activities/${item?.slug}`,
                                    );
                              }}
                            >
                              {item.name}
                            </div>
                          );
                        })
                      ) : (
                        <div>No data available</div>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const activitiesData = [
  {
    name: "Canyoning",
    package: [Paragliding1, Paragliding3, Paragliding4, Paragliding5],
  },
  {
    name: "Rafting",
    href: "/other_activities/rafting",
    package: [Paragliding1, Paragliding3, Paragliding4, Paragliding5],
  },
  {
    name: "Heritage Tour",
    package: [Paragliding1, Paragliding3, Paragliding4, Paragliding5],
  },
  {
    name: "Paragliding",
    href: "/other_activities/paragliding",
    package: [Paragliding1, Paragliding3],
  },
  {
    name: "Mountain Biking",
    href: "/other_activities/mountain_biking",
    package: [Paragliding4, Paragliding5],
  },
  {
    name: "Rock Climbing Trip",
    package: [Paragliding1, Paragliding3, Paragliding4, Paragliding5],
  },
  {
    name: "Pilgrimage Tour",
    package: [Paragliding1, Paragliding3],
  },
  {
    name: "Jungle Safari",
    package: [Paragliding1, Paragliding3, Paragliding4, Paragliding5],
  },
  {
    name: "Ice climbing",
    package: [Paragliding1, Paragliding5],
  },
];

const CompanyLinks = [
  {
    name: "About us",
    href: "/about_us",
  },
  {
    name: "Our team",
    href: "/our_team",
  },
  {
    name: "Message from CEO",
    href: "/message_from_ceo",
  },
  {
    name: "Certificates",
    href: "/certificates",
  },
];

const expeditionsData = [
  {
    name: "Above 8k",
    href: "/expedition/8000m",
    package: [BestSeller1, BestSeller2],
  },
  {
    name: "Above 7k",
    href: "/expedition/7000m",
    package: [BestSeller1, BestSeller2],
  },
  {
    name: "Above 6k",
    href: "/expedition/6000m",
    package: [BestSeller2, BestSeller3, BestSeller1, BestSeller2],
  },
  {
    name: "Above 5k",
    href: "/expedition/5000m",
    package: [BestSeller1, BestSeller2],
  },
  ,
];
const trainingData = [
  {
    name: "Basic Mountaineering course",
    href: "/training",
    package: [BestSeller1],
  },
  {
    name: "Preparation for 8000m peak climbing course",
    href: "/training",
    package: [BestSeller1, BestSeller2, BestSeller3],
  },
];

const trekkingData = [
  {
    name: "Annapurna Region",
    href: "/trek/annapurna_region",
    package: [BestSeller1, BestSeller2, BestSeller3, BestSeller5],
  },
  {
    name: "Everest Region",
    href: "/trek/annapurna_region",
    package: [BestSeller1, BestSeller2, BestSeller3],
  },
  { name: "Langtang Region", package: [BestSeller1, BestSeller2, BestSeller3] },
  { name: "Manaslu Region", package: [BestSeller1, BestSeller2, BestSeller3] },
  {
    name: "Other treks  Region",
    href: "/trek/annapurna_region",
    package: [BestSeller1],
  },
  {
    name: "Off beaten treks (Camping)",
    href: "/trek/annapurna_region",
    package: [BestSeller2, BestSeller3],
  },
  {
    name: "Short trek",
    href: "/trek/annapurna_region",
    package: [BestSeller1, BestSeller2, BestSeller3],
  },
  {
    name: "High passes treks ",
    href: "/trek/annapurna_region",
    package: [BestSeller1, BestSeller3],
  },
];
