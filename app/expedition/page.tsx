"use client";
import React, { useEffect, useState } from "react";
import { Element } from "react-scroll";
import { Link as ScrollLink } from "react-scroll";
import PackageCard from "../../components/Card";
import { useExpedition } from "@/context/Expeditions";

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

// Define height categories
const heightCategories: HeightCategory[] = [
  { id: "8000m", name: "Above 8000m", minHeight: 8000 },
  { id: "7000m", name: "Above 7000m", minHeight: 7000 },
  { id: "6500m", name: "Above 6500m", minHeight: 6500 },
  { id: "6000m", name: "Above 6000m", minHeight: 6000 },
  { id: "5500m", name: "Above 5500m", minHeight: 5500 },
];

const ExpeditionPage: React.FC = () => {
  // Type the context values
  const { expeditions } = useExpedition() as { expeditions: Expedition[] };
  // const [activeSection, setActiveSection] = useState<string>("");
  const [categorizedExpeditions, setCategorizedExpeditions] =
    useState<CategorizedExpeditions>({});

  const [offset, setOffset] = useState(-40);

  useEffect(() => {
    const updateOffset = () => {
      if (window.innerWidth < 768) {
        setOffset(-140); // Offset for mobile screens
      } else {
        setOffset(-90); // Offset for larger screens
      }
    };

    updateOffset();
  }, []);

  // Filter and categorize expeditions based on their category
  useEffect(() => {
    const categorizeExpeditions = (): void => {
      const categorized = heightCategories.reduce<CategorizedExpeditions>(
        (acc, category) => {
          acc[category.id] = expeditions.filter(
            (expedition) => expedition.category?.name === category.id
          );
          return acc;
        },
        {}
      );
      setCategorizedExpeditions(categorized);
    };

    if (expeditions?.length) {
      categorizeExpeditions();
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

  return (
    <main className="grid w-11/12  mx-auto h-full md:grid-cols-11 grid-cols-1 lg:gap-0 gap-4 md:mx-8 lg:py-32 py-20">
      {/* Navigation Sidebar */}
      <div className="mx-auto md:col-span-2  col-span-10 h-fit bg-white w-full lg:w-40  flex-col gap-8 sticky z-[200]  top-[4rem]   md:top-[6rem] left-0  flex justify-start  font-medium ">
        <div className="grid grid-cols-5  md:grid-cols-1  mx-auto  w-full  ">
          {heightCategories.map((category) => (
            <ScrollLink
              key={category.id}
              to={category.id}
              smooth={true}
              duration={500}
              spy={true}
              offset={offset}
              activeClass="activemountaintrek"
            >
              <button
                className={`w-full   px-6 py-5  text-left pl-2 hover:bg-zinc-100 ease-in-out duration-200 md:text-sm text-xs  title font-semibold  tracking-wide`}
              >
                {category.id}
              </button>
            </ScrollLink>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="col-span-9 md:mt-0 mx-2 mt-4">
        {heightCategories.map((category) => (
          <Element
            key={category.id}
            id={category.id}
            name={category.id}
            className={category.id !== "8000m" ? "mt-16" : ""}
          >
            <h2 className="title font-extrabold uppercase text-2xl">
              {category.name}
            </h2>
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-6">
              {categorizedExpeditions[category.id]?.map((expedition, index) => (
                <PackageCard
                  key={`${category.id}-${index}`}
                  item={expedition}
                  className="hover:shadow-lg"
                  viewMoreLink={`/expedition/${expedition.slug}`}
                  enquiryLink={`/booking/${expedition.slug}`}
                  onViewMore={() => console.log("Viewed", expedition.name)}
                  onEnquiry={() =>
                    console.log("Enquiry clicked", expedition.name)
                  }
                />
              ))}
              {(!categorizedExpeditions[category.id] ||
                categorizedExpeditions[category.id].length === 0) && (
                  <div className="col-span-full text-center py-8 text-gray-500">
                    No expeditions available for this category
                  </div>
                )}
            </div>
          </Element>
        ))}
      </div>
    </main>
  );
};

export default ExpeditionPage;
