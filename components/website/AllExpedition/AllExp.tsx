import Image from "next/image";
import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import ExpData from "@/data/ExpeditionData";
import CardButton from "@/components/ui/CardButton";

type Props = {};

function AllExp({ distance }: any) {
  if (!distance) {
    // Handle case where activity data is not found
    return <div>Activity not found</div>;
  }

  const data: any = ExpData.find((obj) => obj.route === distance);

  if (!data) {
    return <div>Data not found</div>;
  }

  const { intro, name, route, package: packages } = data;

  return (
    <div className="lg:w-10/12 w-11/12 3xl:w-8/12 mx-auto py-[3rem]">
      {/* <div className="col-span-2 mb-9 py-1 flex flex-col sticky h-fit top-20 justify-start overflow-visible items-center gap-10">
        {ExpData.map((item, index) => (
          <Link
            href={`/expedition/${item.route}`}
            key={index}
            className={`${
              item.route === route ? "bg-primary2" : "bg-white"
            } px-10 py-2  shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] hover:scale-105 duration-300 cursor-pointer`}
          >
            <h1
              className={`text-lg whitespace-nowrap relative tracking-wide title font-medium ${
                item.route === route
                  ? "text-secondary-50"
                  : "text-secondary-500"
              }`}
            >
              {item.route}
            </h1>
          </Link>
        ))}
      </div> */}

      {/* available treks */}
      <div className=" pb-[5rem] px-1 flex flex-col gap-3">
        {/* desc  */}
        <h2 className="uppercase  font-extrabold title lg:text-[2.5em] leading-[1em] sm:text-[1.5em] text-2xl">
          Above {distance}
        </h2>

        <p className="md:text-[16px] text-sm leading-relaxed md:py-6 py-2 text-secondary-400 font-medium">
          {intro}
        </p>
        <div className="w-full grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5">
          {packages.map((item: any, index: number) => (
            <div
              key={index}
              className="group cursor-pointer w-full p-2 flex flex-col justify-start items-start gap-3 border rounded-md shadow-sm"
            >
              {/* img */}
              <figure className="rounded-md overflow-hidden">
                <Image
                  width={1000}
                  height={1000}
                  src={item.packageImg}
                  alt="banner-image"
                  className="w-full h-full object-cover object-bottom group-hover:scale-105 ease-in-out duration-300"
                ></Image>
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
                    <Icon icon="la:mountain" className="text-primary-600" />
                    <span>Expedition</span>
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
  );
}

export default AllExp;
