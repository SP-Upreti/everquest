"use client";
import Button from "@/components/ui/button";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CardButton from "@/components/ui/CardButton";
import Title from "@/components/ui/Title";
import { useExpedition } from "@/context/Expeditions";
import { usePathname } from "next/navigation";

type Props = {
  activity: string;
};

type ItineraryItem = {
  title: string;
  description: string;
};

type Itinerary = {
  title: string;
  data?: ItineraryItem[];
};

const Daypackages: React.FC<Props> = ({ activity }) => {
  const route = usePathname();
  const { expeditions } = useExpedition();
  const [datas, setDatas] = useState<any>([]);
  console.log("Datas", datas);

  useEffect(() => {
    const datass = expeditions.filter(
      (expedition) =>
        expedition?.collections?.slug === "services" &&
        expedition?.category?.slug === activity
    );
    setDatas(datass);
  }, [expeditions]);

  if (!activity) return <div>Activity not found</div>;



  return (

    <main className="lg:w-11/12 w-11/12 3xl:w-8/12 mx-auto md:mt-20 mt-10">
      <Title
        text="Related Packages"
        fontSize="!text-xl"
        textalign="text-left"
      />

     
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-6 my-6">
          {datas?.map(
            (
              collection: {
                banner: any;
                name: string;
                slug: string;
                duration:number;
                overview: string;
                price: {
                  adult: {
                    pricePerAdult: string;
                  };
                };
              },
              index: React.Key | null | undefined
            ) => (
              <div key={index} className="cursor-pointer group">
                <div className="bg-white group-hover:bg-zinc-100 rounded-md md:w-full md:px-4 border md:p-4 p-2 flex flex-col justify-start items-start gap-3">
                  {/* Image */}
                  <figure className="overflow-hidden relative rounded-md w-full h-[28vh]">
                    <Image
                      fill
                      src={collection.banner || "/placeholder.jpg"}
                      alt={""}
                      className="w-full h-full object-cover object-bottom group-hover:scale-110 ease-in-out duration-300"
                    />
                  </figure>
                  {/* Description */}
                  <div className="flex w-full flex-col gap-2">
                    <span className="text-md title font-semibold tracking-wider">
                      {collection.name}
                    </span>
                    <p className="text-sm block font-medium h-14 text-secondary-400 " dangerouslySetInnerHTML={{ __html: collection.overview }} />
                    <div className="flex my-2 justify-between gap-3 text-sm font-semibold">
                      <div className="flex items-center">
                        <div className="flex gap-1 items-center">
                          <Icon
                            icon="la:mountain"
                            className="text-primary-600"
                          />
                          <span>City Tour</span>
                        </div>
                      </div>
                      <div className="flex gap-1 items-center">
                        <Icon
                          icon="simple-line-icons:calender"
                          className="text-primary-600"
                        />
                        <span className="font-semibold title">{collection.duration} Days</span>
                      </div>
                    </div>
                  </div>
                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-2 w-full mt-2">
                    <Link
                      href={`${route}/${collection.slug}`}
                      className="group-hover:bg-white rounded-md group-hover:border-primary2 border"
                    >
                      <CardButton className="!w-full !bg-transparent !text-black !shadow-none">
                        View more
                      </CardButton>
                    </Link>
                    <Link href="/booking">
                      <CardButton className="!w-full">Book now</CardButton>
                    </Link>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
    
    </main>
  );
};

export default Daypackages;
