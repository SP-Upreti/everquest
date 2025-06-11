"use client";
import React from "react";
import AllExp from "./AllExp";
type Props = {};

function AllExpMain({ distance }: any) {
  return (
    <>
     
      <div className="">
        {/* <AllExpHero distance={distance} /> */}
        <div className=" lg:mt-20 mt-10">
          <AllExp distance={distance} />
        </div>
      </div>
    </>
  );
}

export default AllExpMain;
