import Title from "@/components/ui/Title";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

function RelatedActivities({ activity }: any) {
  return (
    <>
      <div className="w-11/12 md:w-10/12 3xl:w-8/12  py-[6rem] mx-auto">
        {/* TITLE  */}
        {/* <h1 className="text-2xl relative tracking-wide title font-semibold italic text-secondary-500">
          RELATED
        </h1> */}
        <Title text="Other Activities" fontSize="!text-xl" textalign="text-left" />
        {/* NAVIGATION  activities */}
        <div className="w-full mt-6">
          <div className="w-full overflow-x-scroll flex md:grid gap-3 grid-cols-4 md:place-content-center place-items-center">
            {RelatedActivitiesData.map((item) => (
              <Link
                href={item.path}
                key={item.id}
                className="min-w-[80%] md:w-full cursor-pointer group relative overflow-hidden flex justify-center items-center h-[30vh] bg-slate-300 rounded-md"
              >
                <div className="absolute top-0 left-0 w-full h-full group-hover:opacity-[0.7] bg-zinc-950 opacity-[0.2] z-10 duration-300 rounded-md"></div>
                <div className="absolute top-0 left-0 w-full h-full">
                  <Image
                    width={1000}
                    height={1000}
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover object-center rounded-md"
                  ></Image>
                </div>
                {/* name  */}
                <div className="w-full relative p-4 z-20 font-semibold text-[20px] text-zinc-50 h-full flex justify-start items-end">
                  {item.name}
                </div>
                {/* view  */}
                <div className="absolute font-semibold text-white text-sm top-[60%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-30 opacity-0 group-hover:opacity-[1] group-hover:top-[50%] duration-300 uppercase">
                  VIEW
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default RelatedActivities;

const RelatedActivitiesData = [
  {
    id: 1,
    name: "Jungle Safari",
    desc: "Experience the thrill of paragliding over scenic landscapes and enjoy a bird's eye view of nature.",
    img: "/OtherActivities/safari/safari1.jpg",
    path:"/other_activities/safari",
  },
  {
    id: 2,
    name: "Heritage Tour",
    desc: "Enjoy the excitement and adrenaline rush of white water rafting through challenging rapids.",
    img: "/tour/nepal.webp",
    path:"/other_activities/heritagetour",

  },
  {
    id: 3,
    name: "Pilgrims Tour",
    desc: "Ride through rugged trails and explore mountainous terrain on a mountain bike.",
    img:"https://images.unsplash.com/photo-1614939188731-79bbf44e18ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    path:"/other_activities/pilgrims",

  },
  {
    id: 4,
    name: "Heli Tour",
    desc: "Take a leisurely ride or a competitive race on a bicycle, enjoying the freedom of the open road.",
    img: "https://images.unsplash.com/photo-1534867758447-521fe739fb14?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    path:"/other_activities/heli_tour",

  },
];
