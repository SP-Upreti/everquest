import React, { useEffect, useState } from "react";
import CalendarCard from "./CalendarCard";

// Define the type for PackageDetail
type PackageDetail = {
  trip: string;
  title: string;
  start: string;
  end: string;
  available: string;
  price: string;
  status: string;
};

// Define the type for the data prop
type SpringComponentProps = {
  data: { [key: string]: PackageDetail[] };
};

const MountaineeringComponenet: React.FC<SpringComponentProps> = ({ data }) => {
  const [loading, Setloading] = useState(true);
  console.log(data, "hehe");

  useEffect(() => {
    if (data) {
      Setloading(false);
    }
  }, [data]);

  return (
    <main>
      <div className="bg-zinc-100 p-4 rounded-xl">
        {loading ? (
          // Loader element
          <div className="flex justify-center items-center h-[50vh] ">
            <span className="loader"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4  ">
            {data &&
              Object.entries(data).map(([key, value], index) => {
                return (
                  <div key={index}>
                    {/* <h2
                className="title uppercase font-extrabold sm:text-3xl xs:text-xl text-sm"
                onClick={() => {
                  console.log("first", value);
                }}
              >
                {key}
              </h2> */}

                    <CalendarCard key={index} detail={value} index={index} />
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </main>
  );
};

export default MountaineeringComponenet;
