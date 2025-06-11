import React from "react";
import Image from "next/image";

// Define the package item type
type PackageItem = {
  banner: string;
  name: string;
  overview: string;
  duration: string | number;
  subheading: string;
  slug: string;
};

type PackageCardProps = {
  item: PackageItem;
  className?: string;
  onViewMore?: () => void;
  onEnquiry?: () => void;
  viewMoreLink?: string;
  enquiryLink?: string;
};

const PackageCard = ({ item }: PackageCardProps) => {
  return (
    <div className="bg-black relative overflow-hidden rounded-lg h-full w-full">
      <div className="absolute top-0 z-10 left-0 w-full h-full">
        <Image loading='lazy' quality={50} src={item?.banner} fill alt='slide' />
      </div>
      <div className="h-full w-full relative bg-black/30 z-50">
        <div className="absolute flex top-0 left-0 px-4 border-b w-full">
          <div className="border-r flex p-0 gap-2 w-fit pr-4 py-2">
            <h2 className='text-3xl'>{item.duration || "8848"}</h2>
            <span className='text-xl '>{item.overview || "M"}</span>
          </div>
          <div className="flex w-full  justify-between">
            <div className="px-4 p-2">
              <p className='text-lg'>{item.subheading || "Mount Everest"}</p>
              <p className='text-gray-300'>{item.name}</p>
            </div>
            <div className="flex py-4 gap-1">
              <div className="size-3 bg-white/20"></div>
              <div className="size-3 bg-white/40"></div>
              <div className="size-3 bg-white/60"></div>
              <div className="size-3 bg-white/80"></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 p-4">
          <h2 className='text-base text-white '>{item.name}</h2>
        </div>
      </div>
    </div>
  );
};


export default PackageCard;




