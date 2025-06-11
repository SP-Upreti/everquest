"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import CardButton from "../ui/CardButton";
import { mountains8000 } from "@/data/Mountainsdata";
import { useExpedition } from "@/context/Expeditions";
import PackageCard from "../Card";

// Interface definitions
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

// Helper function to get random indices
const getRandomIndices = (length: number, count: number): number[] => {
  const indices = Array.from({ length }, (_, i) => i);
  const randomIndices: number[] = [];
  while (randomIndices.length < count && indices.length > 0) {
    const randomIndex = Math.floor(Math.random() * indices.length);
    randomIndices.push(indices.splice(randomIndex, 1)[0]);
  }
  return randomIndices;
};

const RelatedExpedition = ({ name }: { name: string }) => {
  const { expeditions } = useExpedition() as { expeditions: Expedition[] };

  // Memoize the filtered and random expeditions selection
  const randomExpeditions = useMemo(() => {
    if (expeditions.length === 0) return [];

    // Filter expeditions that match the collection slug
    const filteredExpeditions = expeditions.filter(
      (expedition) =>
        expedition?.collections?.slug === name && expedition.slug !== name
    );

    if (filteredExpeditions.length === 0) return [];

    const sliceSize =
      filteredExpeditions.length >= 8
        ? Math.random() < 0.5
          ? 4
          : 8
        : filteredExpeditions.length;

    const indices = getRandomIndices(filteredExpeditions.length, sliceSize);
    return indices.map((i) => filteredExpeditions[i]);
  }, [expeditions, name]); // Recompute when expeditions or name changes

  // Don't render if there are no related expeditions
  if (randomExpeditions.length === 0) {
    return null;
  }

  return (
    <main>
      <h2 className="lg:text-3xl md:text-2xl text-xl relative tracking-wide title font-extrabold uppercase text-secondary-500">
        Recommended Expeditions
      </h2>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 my-8">
        {randomExpeditions
          .slice(0, 4)
          .map((expedition: Expedition, index: number) => {
            const category: any = expedition.category;
            return (
              <PackageCard
                key={`${expedition._id}-${index}`}
                item={expedition}
                className="hover:shadow-lg"
                viewMoreLink={`/expedition/${expedition.slug}`}
                enquiryLink={`/booking/${expedition.slug}`}
                onViewMore={() => console.log("Viewed", expedition.name)}
                onEnquiry={() =>
                  console.log("Enquiry clicked", expedition.name)
                }
              />
            );
          })}
      </div>
    </main>
  );
};

export default RelatedExpedition;
