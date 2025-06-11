import React from "react";
import AboutUsHero from "./AboutUsHero";
import AboutUs from "./AboutUs";
import WhatOffering from "./WhatOffering";
import Cta from "../Homepage/Cta";
import Whyus from "./Whyus";
import ServicesHome from "../Homepage/Services";

type Props = {};

function AboutUsMain({}: Props) {
  return (
    <div className="">
      <AboutUsHero />
      <div className="">
        <AboutUs />
        <Whyus />
        <ServicesHome />
        <WhatOffering />
        <div className="lg:w-9/12 w-11/12 mx-auto">
          <Cta />
        </div>
      </div>
    </div>
  );
}

export default AboutUsMain;
