"use client";
import React, { useEffect, useState } from "react";
import { Link as ScrollLink, Element } from "react-scroll";
import { useExpedition } from "@/context/Expeditions";
import PackageCard from "@/components/Card";

// Define interfaces for our data structures
interface HeightCategory {
  id: string;
  name: string;
  minHeight: number;
}
interface Category {
  _id: string;
  name: string;
  image: any[];
  description: string;
  slug: string;
  collections: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface Collections {
  _id: string;
  name: string;
  image: any[];
  slug: string;
  description: string;
  showInHomePage: boolean;
  collectionId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Expedition {
  _id: string;
  name: string;
  subheading: string;
  tripcode: string;
  overview: string;
  season: string;
  category: Category;
  collections: Collections;
  banner: string;
  gearList: string;
  equipmentList: string;
  slug: string;
  maxElevation: string;
  coordinates: string;
  mountainRange: string;
  essentialInformation: string;
  duration: number;
  region: string;
  mealsIncluded: string;
  transportation: string;
  startPoint: string;
  endPoint: string;
  accomodation: string;
  groupSize: string;
  activity: string;
  physical: string;
  isUpcoming: boolean;
  isBestseller: boolean;
  showInHero: boolean;
  isPublished: boolean;
  isFromOldSite: boolean;
  expeditionId: string;
  addons: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface CategorizedExpeditions {
  [key: string]: Expedition[];
}

const Page = () => {
  // Type the context values
  const { expeditions } = useExpedition() as { expeditions: Expedition[] };
  const [activeSection, setActiveSection] = useState<string>("");
  const [categorizedExpeditions, setCategorizedExpeditions] =
    useState<CategorizedExpeditions>({});

  const [offset, setOffset] = useState(-40);

  console.log(categorizedExpeditions);

  useEffect(() => {
    const updateOffset = () => {
      if (window.innerWidth < 768) {
        setOffset(-150); // Offset for mobile screens
      } else {
        setOffset(-90); // Offset for larger screens
      }
    };

    updateOffset();
  }, []);

  // Filter and categorize expeditions based on their category
  useEffect(() => {
    const groupByCategory = () => {
      const data = expeditions?.filter(
        (expedition: any) => expedition?.collections?.slug === "trekking"
      );
      const grouped = data.reduce((acc: any, expedition: Expedition) => {
        const categoryName = expedition.category.name;
        if (!acc[categoryName]) {
          acc[categoryName] = [];
        }
        acc[categoryName].push(expedition);
        return acc;
      }, {});

      setCategorizedExpeditions(grouped);
    };

    if (expeditions?.length) {
      groupByCategory();
    }
  }, [expeditions]);

  useEffect(() => {
    // Scroll to section if URL has a hash
    if (window.location.hash) {
      const sectionId = window.location.hash.substring(1); // Remove "#" from hash
      const sectionElement = document.getElementById(sectionId);

      if (sectionElement) {
        window.scrollTo({
          top: sectionElement.offsetTop + offset, // Scroll to the element's top position with the offset
          behavior: "smooth",
        });
      }
    }
  }, [offset]);

  useEffect(() => {
    const updateOffset = () => {
      if (window.innerWidth < 768) {
        setOffset(-150); // Offset for mobile screens
      } else {
        setOffset(-90); // Offset for larger screens
      }
    };

    updateOffset(); // Set initial offset
    // window.addEventListener("resize", updateOffset);

    // return () => {
    //   window.removeEventListener("resize", updateOffset);
    // };
  }, []);
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

  return (
    <main className="grid md:grid-cols-11 md:mx-8 lg:py-32 py-20">
      <div className="mx-auto md:col-span-2 col-span-10 overflow-x-auto h-fit bg-white w-full  flex-col  gap-8 sticky z-[200]  top-[4rem]   md:top-[6rem] left-0  flex justify-start  font-medium ">
        <div className="md:grid flex overflow-x-auto   md:grid-cols-1  mx-auto md:gap-1 md:whitespace-normal whitespace-nowrap">
          {Object.entries(categorizedExpeditions).map((item, index) => (
            <ScrollLink
              key={index}
              activeClass="activemountaintrek"
              to={item[0]}
              smooth={true}
              duration={500}
              spy={true}
              offset={offset}
            >
              <button
                className={`w-full lg:w-46  px-6 py-4  text-left pl-2 hover:bg-zinc-100 ease-in-out duration-200 md:text-sm text-xs  title font-medium  tracking-wide`}
              >
                {item[0]}
              </button>
            </ScrollLink>
          ))}
        </div>
      </div>

      <div className="col-span-9  md:mt-0 mx-2  mt-10 grid grid-cols-1 gap-14">
        {Object.entries(categorizedExpeditions).map((item, index) => (
          <Element id={item[0]} name={item[0]} key={index}>
            <h2 className="title font-extrabold uppercase text-2xl">
              {item[0]} Region Trekking
            </h2>

            <div className="grid xl:grid-cols-4 lg:grid-cols-3  sm:grid-cols-2 grid-cols-1 gap-4  mt-8">
              {item[1].map((item: any, index: number) => (
                <PackageCard
                  key={`${item.category.id}-${index}`}
                  item={item}
                  className="hover:shadow-lg"
                  viewMoreLink={`/expedition/${item.slug}`}
                  enquiryLink={`/booking/${item.slug}`}
                  onViewMore={() => console.log("Viewed", item.name)}
                  onEnquiry={() => console.log("Enquiry clicked", item.name)}
                />
              ))}
            </div>
          </Element>
        ))}

        {/* mountains above 7000 */}
      </div>
    </main>
  );
};

export default Page;
