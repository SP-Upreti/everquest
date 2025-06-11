import Title from "@/components/ui/Title";
import React from "react";
import {nepalpackages} from "./Nepalpackagedata";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import CardButton from "@/components/ui/CardButton";
import Button from "@/components/ui/button";

const Nepalpackages = () => {
  return (
    <main className="md:w-10/12 w-11/12 3xl:w-8/12 mx-auto my-8">
      <Title
        text="Related Packages"
        fontSize="!text-xl"
        textalign="text-left"
      />

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6 my-6">
        {nepalpackages.map((item, index) => (
          <div key={index} className="cursor-pointer group">
            <div className="bg-white  group-hover:bg-zinc-100 rounded-md  md:w-full md:px-4 border md:p-4 p-2 flex flex-col justify-start items-start gap-3 ">
              {/* img */}
              <figure className="overflow-hidden rounded-md">
                <Image
                  width={1000}
                  height={1000}
                  src={item.img}
                  alt="banner-image"
                  className="w-full h-full object-cover object-bottom  group-hover:scale-110 ease-in-out duration-300 "
                ></Image>
              </figure>

              {/* desc */}
              <div className="flex w-full flex-col gap-2">
                {/* title */}
                <span className="text-md title font-semibold tracking-wider">
                  {item.title}
                </span>
                <p className="text-sm block font-medium h-14 text-secondary-400">
                  {item.desc.slice(0, 90)}...
                </p>
                <div className="flex my-2 justify-between gap-3 text-sm font-semibold">
                  <div className="flex  items-center">
                    <span className="text-2xl font-extrabold title text-primary2">
                      {item.price}
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <Icon
                      icon="mingcute:time-duration-line"
                      className="text-xl"
                    />
                    <span className="font-semibold title">{item.days}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 w-full mt-2">
                 <Link
                  href="/detailspage"
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
                    <CardButton className="!w-full">Book now</CardButton>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Nepalpackages;
