import Image from "next/image";
import React from "react";
import OtherActivitiesData from "@/data/OtherActivitiesData";
import { Activity } from "@/context/Activities";

type Props = {
  activity: string;
  activiti: Activity;
};

function ActivityDetail({ activity, activiti }: Props) {
  if (!activity) {
    return <div>Activity not found</div>;
  }

  return (
    <div className="lg:w-11/12 w-11/12 mx-auto md:mt-20 mt-10">
      {/* <div className="col-span-2 w-full md:sticky top-20 mt-10 h-fit md:grid hidden justify-center items-center  text-zinc-50">
        <h2 className="text-xl font-semibold title text-secondary-500">
          Explore Activities
        </h2>
        <div className="grid md:grid-cols-1 gap-4 grid-cols-4  mt-8">
          {OtherActivitiesData.map((item, index) => (
            <Link
              href={`/other_activities/${item.route}`}
              key={index}
              className={`px-4 w-full title  tracking-wide text-lg py-2  shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] hover:scale-105  font-medium transition-colors duration-200 cursor-pointer ${
                item.route === route
                  ? "bg-primary2 text-secondary-50"
                  : "bg-white text-secondary-500 hover:bg-primary2 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div> */}

      <div className="mx-auto py-[4rem] px-2 text-zinc-50">
        <div className="grid lg:grid-cols-6 grid-cols-1 gap-4 place-items">
          <div className="col-span-3">
            {/* <Title
              text={name}
              fontSize="lg:text-[2.8vw] leading-[1em] text-[1.5em]"
              textalign="text-left"
            /> */}
            <h2 className="title font-extrabold lg:text-4xl md:text-3xl text-xl text-black uppercase">
              {activiti.name}
            </h2>

            <p
              className="md:text-[16px] leading-relaxed text-sm font-medium text-secondary-400 mt-6 desc"
              dangerouslySetInnerHTML={{ __html: activiti.description }}
            ></p>

            {/* <Link href="/booking" className="flex justify-start my-8">
              <Button>Book Now</Button>
            </Link> */}
          </div>
          <div className="col-span-3">
            <div className="grid grid-cols-2 gap-4">
              {activiti.images.slice(0, 3).map((image: any, i: number) => (
                <div
                  key={i}
                  className={`relative w-full overflow-hidden rounded-lg group h-[30vh] ${
                    i === 2 ? "col-span-2" : ""
                  }`}
                >
                  <Image
                    width={1000}
                    height={1000}
                    className="object-cover object-center w-full h-full transition-transform duration-500 transform group-hover:scale-105 rounded-lg"
                    src={image}
                    alt="activity-image"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-0 transition-opacity duration-300 rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityDetail;
