import HomeAbout from "./HomeAbout";
import Services from "./Services";
import Reviews from "./Reviews";
import NavHome from "./NavHome";
import Faq from "./Faq";
import ExpertGuides from "./ExpertGuides";
import Package from "./Package";
import Banner2 from "./Banner2";
import Cta from "./Cta";
import Slider from "./Hero";
import Donations from "./Donations";
import PartnerHome from "./PartnerHome";
import AboutSection from "./aboutSection";

const HomeMain = () => {
  return (
    <>
      <div className=" w-full ">
        <NavHome />
        <div className="hero-container relative h-screen  top-0 left-0 w-full">
          <Slider />
        </div>
        <PartnerHome />
        <AboutSection />
        <div className="w-full relative  content-main    z-20">

          <div className="relative z-50 w-full">
            <HomeAbout />
          </div>
          <ExpertGuides />
          <Services />

          <div className="">
            <Package />
          </div>
          <Banner2 />

          <div className=" ">
            <Faq />
          </div>

          <div className="">
            <Reviews />
          </div>

          <Cta />
          <Donations />

        </div>
      </div>
    </>
  );
};

export default HomeMain;
