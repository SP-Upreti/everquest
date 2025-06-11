"use client"
import React, { useRef, useState } from "react";
import CountUp from "react-countup";
import { useInView } from 'react-intersection-observer';


const Whyus = () => {
  const { ref, inView } = useInView({ triggerOnce: true });
  return (
    <main className="lg:w-11/12 w-11/12 3xl:w-8/12 mx-auto">

      <div className="grid lg:grid-cols-4 grid-cols-2 my-8 bg-zinc-200/50 h-[30vh] rounded-lg">
        {details.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-4"
          >
            <h2 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl title font-extrabold" ref={ref}>
              {" "}
              {inView && <CountUp start={0} end={item.num} duration={2} suffix={item.suffix} />}
            </h2>
            <p className="font-semibold text-primary2 md:text-lg text-xs text-center">{item.text}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Whyus;

const details = [
  {
    num: 99,
    suffix: "%",
    text: "Expedition Success Rate",
  },
  {
    num: 60,
    suffix: "+",
    text: "Climbers on Top of 8000m",
  },
  {
    num: 99,
    suffix: "%",
    text: "Climber Summit Rate",
  },
  {
    num: 70,
    suffix: "+",
    text: "Total Expedition",
  },
];
