import Link from 'next/link'
import React from 'react'

type PackageDetail = {
    trip: string;
    title: string;
    start: string;
    end: string;
    available: string;
    price: string;
    status: string;
  };

  interface CalendarCardProps {
    detail: PackageDetail;
  }

  const CalendarCard: React.FC<CalendarCardProps> = ({ detail }) => {
    return (
      <div className="grid sm:grid-cols-6 bg-white cursor-pointer border border-white hover:border-primary2 duration-200 ease-in-out rounded-md">
      <div className="bg-zinc-900 rounded-md sm:col-span-2 col-span-9 py-8 flex flex-col justify-center items-center text-white title ">
      <h2 className="text-4xl font-bold mt-2 ">
        {detail.trip}
      </h2>
      <h2>2025</h2>
    </div>
    <div className="col-span-4 sm:p-3 p-2 sm:space-y-3 title text-sm text-gray-500 font-semibold">
      <h2 className="md:text-xl sm:text-lg text-base title font-semibold text-zinc-900 border-b-[3px] border-primary2/50 w-fit">
        {detail.title}
      </h2>
      <div className="flex flex-wrap justify-between   gap-2 xs:text-sm text-xs font-semibold my-2">
        <h3 className="text-zinc-800">
          <span className="text-green-500 text-xs">Start :</span>
          {detail.start}
        </h3>
        <h3 className="text-zinc-800">
          <span className="text-red-500 text-xs">End :</span>
          {detail.end}
        </h3>
      </div>
      <div className="flex flex-wrap justify-between items-end gap-2 xs:text-sm text-xs font-semibold ">
      <div>
            <h1 className="text-xs text-green-500">
              Availability :
              <span className="text-zinc-900 xs:text-sm text-xs">
                5/12
              </span>
            </h1>
          </div>
          <div>
            <h1 className="text-xs text-red-500">
              Price :
              <span className="text-zinc-900 xs:text-xl title font-extrabold text-xs">
               $799
              </span>
            </h1>
          </div>
        
        </div>
      <div className="mt-4 grid xl:grid-cols-2 md:grid-cols-1 sm:grid-cols-2 gap-2 w-full">
        <Link href="/package_detail/mount-everest">
          <button className="px-8 py-3 w-full lg:whitespace-nowrap hover:bg-white rounded-md border-black border group-hover:bg-white text-black font-medium ease-in-out duration-200">
            View More
          </button>
        </Link>
        <Link href="/booking">
          <button className="px-8 py-3 w-full lg:whitespace-nowrap  rounded-md bg-primary2 text-white font-medium hover:bg-orange-800 ease-in-out duration-200">
            Book Now
          </button>
        </Link>
      </div>
    </div>
</div>
  )
}

export default CalendarCard