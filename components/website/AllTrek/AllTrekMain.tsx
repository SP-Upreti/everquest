"use client";
import React from "react";
import AllTrekHero from "./AllTrekHero";
import AllTrek from "./AllTrek";
import Leaf from "./leaf";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type Props = {};

function AllTrekMain({ region }: any) {
  useGSAP(() => {
    gsap.from(".all-trek-main-container", {
      opacity: 0,
      duration: 1,
      ease: "linear",
    });
  });
  return (
    <div className="all-trek-main-container">

      {/* <div className="relative">
        <AllTrekHero region={region} />
      </div> */}
      <div className=" lg:mt-20 mt-8">
        <AllTrek region={region} />
      </div>
    </div>
  );
}

export default AllTrekMain;
