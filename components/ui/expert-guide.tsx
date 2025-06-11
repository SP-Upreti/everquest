import Image from "next/image";
import React from "react";

const ExpertGuide = () => {
  return (
    <main className="p-2 border rounded-md my-2 bg-zinc-50 mt-4">
      <h2 className=" relative font-extrabold title xl:text-lg text-md text-center uppercase text-primary2 ">
        Contact our Expert
      </h2>

      <div className="my-2 p-4 flex flex-col items-center justify-center gap-4 ">
        <Image
          src="/Team/Guide.jpg"
          alt="expedition-image"
          width={1000}
          height={1000}
          className="  w-24 h-24 rounded-full"
        />

        <div className="flex flex-col items-center justify-center gap-1">
          <h2 className="font-bold title text-center text-md">Prem Gurung</h2>
          <p className="text-sm text-center italic">
            IFMGA Mountain Guide & Founder
          </p>
          <div className="flex  items-center justify-center  gap-2 mt-2">
            <Image
              src="/icons/whatsapp.png"
              alt="expedition-image"
              width={1000}
              height={1000}
              className="  w-6 h-6 rounded-full"
            />
            <p className="font-semibold text-sm ">+977-9856008848</p>
          </div>
          <div className="flex  items-center justify-center gap-2">
            <Image
              src="/icons/communication.png"
              alt="expedition-image"
              width={1000}
              height={1000}
              className="  w-6 h-6 rounded-full"
            />
            <p className="font-semibold text-sm">
              info@infinityadventurenepal.com
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ExpertGuide;
