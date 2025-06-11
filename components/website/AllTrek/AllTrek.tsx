import Image from "next/image";
import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import TrekData from "@/data/TrekData";
import CardButton from "@/components/ui/CardButton";

type Props = {};

function AllTrek({ region }: any) {
  if (!region) {
    // Handle case where activity data is not found
    return <div>Package not found</div>;
  }

  const data: any = TrekData.find((obj) => obj.route === region);

  if (!data) {
    return <div>Data not found</div>;
  }

  const { name, intro, package: packages, route } = data;

  return (
    <div className="lg:w-10/12 w-11/12 3xl:w-8/12 mx-auto gap-6  py-[4rem]">
      {/* tab  */}
      {/* <div className="col-span-2 mb-9 py-1 flex gap-10 sticky top-20 h-fit flex-col">
        {TrekData.map((item, index) => (
          <Link
            href={`/trek/${item.route}`}
            key={index}
            className={`${
              item.route === region ? "bg-primary2" : "bg-white"
            } px-10 py-2 whitespace-nowrap   shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] hover:scale-105 duration-300 cursor-pointer`}
          >
            <h1
              className={`text-lg relative tracking-wide title font-medium    ${
                item.route === region
                  ? "text-secondary-50"
                  : "text-secondary-500"
              }`}
            >
              {item.name}
            </h1>
          </Link>
        ))}
      </div> */}

      <div className="col-span-10">
        {/* TITLE  */}
        <h2   className="uppercase  font-extrabold title lg:text-[2.5em] leading-[1em] sm:text-[1.5em] text-2xl">
          {name}
        </h2>
        {/* desc  */}
        <p className="md:text-[16px] text-sm leading-relaxed md:py-6 py-2 text-secondary-400 font-medium">
          {intro}
        </p>

        {/* available treks */}
        <div className="w-full pb-[5rem] flex px-1 flex-col gap-3">
          <div className="w-full grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5 md:gap-5">
            {packages.map((item: any, index: number) => (
              <div
                key={index}
                className="group cursor-pointer w-full p-2 flex flex-col justify-start items-start gap-3 shadow-[rgba(50,50,105,0.15)_0px_2px_5px_0px,rgba(0,0,0,0.05)_0px_1px_1px_0px]"
              >
                {/* img */}
              <figure className="overflow-hidden rounded-md">
              <Image
                  width={1000}
                  height={1000}
                  src={item.packageImg}
                  alt="banner-image"
                  className="w-full h-full object-cover object-bottom group-hover:scale-105 ease-in-out duration-300"
                />
              </figure>

                {/* desc */}
                <div className="flex w-full flex-col gap-2">
                  {/* title */}
                  <span className="text-md title font-semibold tracking-wider">
                    {item.packageName}
                  </span>
                  {/* short intro */}
                  <p className="text-sm hidden md:block font-medium text-secondary-400">
                    {item.packageDesc.slice(0, 100)}...
                  </p>
                  {/* short intro */}
                  <p className="text-sm md:hidden block font-medium text-secondary-400">
                    {item.packageDesc.slice(0, 50)}...
                  </p>

                  <div className="flex justify-between my-4 gap-3 text-sm font-medium">
                    <div className="flex gap-1 items-center">
                      <Icon
                        icon="iconoir:trekking"
                        className="text-primary-600"
                      />
                      <span>Trek</span>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Icon
                        icon="simple-line-icons:calender"
                        className="text-primary-600"
                      />
                      <span>{item.packageDay}</span>
                    </div>
                  </div>
                </div>

                {/* buttons */}
                <div className="grid grid-cols-2 gap-2 w-full mt-2">
                      <Link
                        href="/package_detail"
                        className="group-hover:bg-white rounded-md group-hover:border-primary2  border"
                      >
                        <div>
                          <CardButton className="!w-full !bg-transparent !text-black  !shadow-none ">
                            View more
                          </CardButton>
                        </div>
                      </Link>

                      <Link href="/booking" className="">
                        <div>
                          <CardButton className="!w-full">Enquiry now</CardButton>
                        </div>
                      </Link>
                    </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllTrek;
