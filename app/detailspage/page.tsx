"use client";
import Title from "@/components/ui/Title";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import React, { useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Button from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  const sliderRef = useRef<Slider>(null);

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 4000,
    arrows: false,
    // pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <main className="bg-[url('/tour/nepal.webp')]  bg-cover bg-fixed bg-center bg-black/80 opacity-100 bg-blend-darken">
      <div className="grid lg:grid-cols-11 grid-cols-1 gap-6 py-32 lg:w-10/12 w-11/12 3xl:w-9/12 mx-auto text-white">
        <div className="lg:col-span-8 ">
          <h2 className="text-2xl title font-bold">
            Nepal Tour/ <span className="text-primary2">Pokhara Package</span>
          </h2>
          <p className="py-4 text-md leading-relaxed">
            Nestled beside the stunning Phewa Lake and surrounded by lush hills,
            Pokhara is a haven for nature lovers, adventure seekers, and those
            looking to relax amid breathtaking scenery. This tour package
            provides a blend of relaxation, adventure, and cultural exploration
            in one of Nepal’s most popular destinations.Embark on a peaceful
            boat ride on the calm waters of Phewa Lake. Soak in the scenic views
            of lush hills, tranquil waters, and the majestic Annapurna Range.
            You’ll also have the option to visit the Barahi Temple, a small yet
            famous Hindu shrine set on an island in the lake.ँ
          </p>

          <div className="w-full mt-8 mx-auto p-3 md:p-10   bg-zinc-800 bg-opacity-35 border  rounded-lg">
            {/* tile  */}
            <Title
              text="Itenary"
              fontSize=" !text-xl"
              textalign="text-left"
              color="text-white"
            />

            {ItineraryData.map((item, index) => (
              <div
                key={index}
                className=" shadow-sm  transition-all ease-in-out duration-300"
                style={{
                  maxHeight: activeIndex === index ? "800px" : "100px md:70px", // Define max height based on active state
                  overflow: "hidden",
                }}
              >
                <div
                  className="flex justify-between  items-center cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex items-center gap-4">
                    <h2 className="font-medium flex gap-2 items-end text-xl">
                      Day{" "}
                      <span className="cursor-pointer font-bold text-2xl px-2 rounded-md bg-primary2/80 text-black">
                        {item.day}
                      </span>
                    </h2>
                    <h2 className="text-xs md:text-lg font-medium py-6">
                      {item.title}
                    </h2>
                  </div>
                  <div className="text-3xl">
                    {activeIndex === index ? (
                      <Icon
                        icon="iconamoon:arrow-up-2-duotone"
                        style={{ color: "#fe8b03" }}
                      />
                    ) : (
                      <Icon
                        icon="iconamoon:arrow-down-2"
                        style={{ color: "#fe8b03" }}
                      />
                    )}
                  </div>
                </div>

                <div
                  className={`transition-all ease-in-out duration-500 ${
                    activeIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    maxHeight: activeIndex === index ? "800px" : "0px", // Dynamically set height
                  }}
                >
                  <div className="">
                    <p className="  font-medium md:text-sm text-xs text-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="my-8 w-full mx-auto p-3 md:p-10   bg-zinc-800 bg-opacity-35  border rounded-lg">
            <Title
              text="Major Attractions"
              fontSize=" !text-xl"
              textalign="text-left"
              color="text-white"
            />
            <div className="w-full h-full flex flex-col md:gap-6 mt-4">
              {attractions.map((item, index) => (
                <div
                  key={index}
                  className="w-full  py-4 md:py-2  overflow-hidden   flex justify-center  items-center"
                >
                  <div className=" w-full flex justify-start gap-5">
                    {/* day */}
                    <Image
                      src="/icons/photography.png"
                      alt="binoculars"
                      width={1000}
                      height={1000}
                      className="w-6 h-6 object-cover object-center"
                    />
                    {/* title */}
                    <div className="font-medium text-[15px]">
                      <span className="font-bold md:text-xl text-lg uppercase title">
                        {item.title}:
                      </span>{" "}
                      <span className="text-white font-semibold text-xs md:text-base">
                        {item.description}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="my-8 w-full mx-auto p-3 md:p-10  bg-zinc-800 bg-opacity-35  border rounded-lg">
            <Title
              text="Gallery"
              fontSize=" !text-xl"
              textalign="text-left"
              color="text-white"
            />
            <div className="my-6">
              <Slider {...settings} ref={sliderRef}>
                {galleryimg.map((item, index) => (
                  <div key={index} className="outline-none px-6">
                    <Image
                      src={item.img}
                      alt="img"
                      width={1000}
                      height={1000}
                      className="rounded-md h-[20vh] object-cover"
                    />
                  </div>
                ))}
              </Slider>
              {/* arrows */}
              <div className="flex text-2xl items-center justify-center gap-2 md:mt-4">
                <button
                  onClick={handlePrev}
                  className="cursor-pointer outline-none border rounded-full bg-black  hover:scale-95 ease-in-out duration-200 shadow-sm p-2"
                >
                  <Icon
                    icon="iconamoon:arrow-left-2"
                    style={{ color: "white" }}
                  />
                </button>
                <button
                  onClick={handleNext}
                  className="cursor-pointer outline-none border rounded-full bg-black  hover:scale-95  ease-in-out duration-200 shadow-sm p-2"
                >
                  <Icon
                    icon="iconamoon:arrow-right-2"
                    style={{ color: "white" }}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 w-full grid sm:grid-cols-2 gap-8 mx-auto p-3 md:p-10    bg-zinc-800 bg-opacity-35 border  rounded-lg">
            <div>
              <Title
                text="Cost Includes"
                fontSize="!text-xl"
                textalign="text-left"
                color="text-white"
              />
              <div className="mt-4 w-full h-full flex flex-col md:gap-2">
                {Inclusion.map((item, index) => (
                  <div
                    key={index}
                    className="w-full  md:py-2 py-1  overflow-hidden   flex justify-center items-center"
                  >
                    <div className=" w-full flex justify-start gap-2">
                      {/* day */}
                      <Image
                        src="/icons/greentick.png"
                        alt="tick"
                        width={1000}
                        height={1000}
                        className="w-6 h-6 object-cover object-center"
                      />
                      {/* title */}
                      <div className="font-medium text-[15px]">
                        <span className="font-semibold lg:text-xl text-md">
                          {item.title}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Title
                text="Cost Excludes"
                fontSize=" !text-xl"
                textalign="text-left"
                color="text-white"
              />
              <div className="mt-4 w-full h-full flex flex-col md:gap-2">
                {Exclusion.map((item, index) => (
                  <div
                    key={index}
                    className="w-full  md:py-2 py-1 overflow-hidden   flex justify-center items-center "
                  >
                    <div className=" w-full flex justify-start gap-4">
                      {/* day */}
                      <Image
                        src="/icons/cross.png"
                        alt="tick"
                        width={1000}
                        height={1000}
                        className="w-6 h-6 object-cover object-center"
                      />

                      {/* title */}
                      <div className="font-medium text-[15px]">
                        <span className="font-semibold lg:text-xl text-md">
                          {item.title}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* book now */}
        <div className="lg:col-span-3 md:sticky top-[5rem] h-fit  rounded-md text-white">
          <div className="md:col-span-3 col-span-9 sticky top-[5rem]">
            <div className="py-2 bg-zinc-100 rounded-md px-4">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h3 className="title font-bold text-sm text-black">
                  Starting from{" "}
                </h3>
                <h2 className="title lg:text-3xl md:text-2xl text-xl font-extrabold text-primary2">
                  $788/pax
                </h2>
              </div>
              <hr />
              <p className="md:text-md text-sm leading-none my-4 font-medium text-secondary-400">
                We only offer discounts based on your group size. We don’t add
                extra people to your group.
              </p>

              {/* table */}
              <table className="w-full my-2 bg-white text-black rounded-md">
                <thead className="">
                  <tr className="h-14 border-b">
                    <th>No. of persons</th>
                    <th>Price per Pax</th>
                  </tr>
                </thead>
                <tbody className="">
                  {pricingData.map((row, index) => (
                    <tr key={index} className="h-10">
                      <td className="text-center font-medium">{row.persons}</td>
                      <td className="text-center font-bold text-xl">
                        {row.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-center  cursor-pointer group  ease-in-out duration-200">
                <Link href="/booking" className="w-full my-2">
                  <Button className="w-full">Book Now</Button>
                </Link>{" "}
              </div>
            </div>

            <div className=" rounded-md py-8 mt-8 bg-zinc-100 text-black">
              <h2 className="title uppercase font-extrabold text-xl text-center">
                Meet our Expert
              </h2>
              <Image
                src="/Team/Guide.jpg"
                alt="hero"
                width={1000}
                height={1000}
                className="rounded-full h-[7em] w-[7em] mx-auto my-4"
              />
              <h2 className="font-bold text-lg text-center">Prem Gurung</h2>
              <div className="flex items-center justify-center gap-2">
                <Image src="/icons/phone-call.png" alt="phone" width={1000} height={1000} className="w-4 h-4" />
                <h2 className="font-bold text-sm text-center">9874561236</h2>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;

const ItineraryData = [
  {
    day: "01",

    title: "Travel To Pokhara From Kathmandu Valley In The West.",
    desc: " Embark on a scenic journey to Pokhara, enjoying the enchanting views of Trishuli and Marsyangdi rivers winding through lush mountains. Pokhara awaits with its serene lakes and majestic Himalayan backdrop, promising anunforgettable adventure in a tourist haven.",
    images: [
      "/ExpeditionPackage/Exp1.png",
      "/ExpeditionPackage/Exp2.png",
      "/ExpeditionPackage/Exp3.png",
    ],
  },
  {
    day: "02",
    title: "Explore the lakes and caves in Pokhara.",
    desc: " Embark on a scenic journey to Pokhara, enjoying the enchanting views of Trishuli and Marsyangdi rivers winding through lush mountains. Pokhara awaits with its serene lakes and majestic Himalayan backdrop, promising anunforgettable adventure in a tourist haven.",
    images: [
      "/ExpeditionPackage/Exp1.png",
      "/ExpeditionPackage/Exp2.png",
      "/ExpeditionPackage/Exp3.png",
    ],
  },
  {
    day: "03",
    title: "Visit the Peace Pagoda and enjoy the mountain views.",
    desc: " Embark on a scenic journey to Pokhara, enjoying the enchanting views of Trishuli and Marsyangdi rivers winding through lush mountains. Pokhara awaits with its serene lakes and majestic Himalayan backdrop, promising anunforgettable adventure in a tourist haven.",
    images: [
      "/ExpeditionPackage/Exp1.png",
      "/ExpeditionPackage/Exp2.png",
      "/ExpeditionPackage/Exp3.png",
    ],
    img: "/chart15.png",
  },
  {
    day: "04",
    title: "Hike to Sarangkot for sunrise.",
    desc: " Embark on a scenic journey to Pokhara, enjoying the enchanting views of Trishuli and Marsyangdi rivers winding through lush mountains. Pokhara awaits with its serene lakes and majestic Himalayan backdrop, promising anunforgettable adventure in a tourist haven.",
    images: [
      "/ExpeditionPackage/Exp1.png",
      "/ExpeditionPackage/Exp2.png",
      "/ExpeditionPackage/Exp3.png",
    ],
    img: "/chart15.png",
  },
  {
    day: "05",
    title: "Return to Kathmandu.",
    desc: " Embark on a scenic journey to Pokhara, enjoying the enchanting views of Trishuli and Marsyangdi rivers winding through lush mountains. Pokhara awaits with its serene lakes and majestic Himalayan backdrop, promising anunforgettable adventure in a tourist haven.",
    images: [
      "/ExpeditionPackage/Exp1.png",
      "/ExpeditionPackage/Exp2.png",
      "/ExpeditionPackage/Exp3.png",
    ],
    img: "/chart15.png",
  },
];
const attractions = [
  {
    id: 1,
    title: "Lukla Flight",
    description:
      " Lukla Flight: Your journey begins with a scenic flight from Ramechhap ( Manthali Airport ) to Lukla, one of themost thrilling and adventurous airports in the world. The flight offers breathtaking views of theHimalayas.",
  },
  {
    id: 2,
    title: "Namche Bazaar",
    description:
      " As you ascend, you'll reach Namche Bazaar, a vibrant Sherpa town and a hub for trekkers. It's an essential acclimatization stop, and the town offers a blend of modern and traditional elements. And of course Namche Bazaar is a gateway to the world most popular 8 thousand meter peak including Mt. Everest and other mountains.",
  },
  {
    id: 3,
    title: "Everest View Hotel",
    description:
      "Located in Syangboche, this hotel offers stunning views of Everest, Ama Dablam, and other peaks. It's a great spot for acclimatization and relaxation.",
  },
  {
    id: 4,
    title: "Everest Panoramic View Trek",
    description:
      "The primary highlight of the Everest Panoramic View Trek is, of course, the breathtaking views of Mount Everest and other iconic peaks such as Lhotse, Nuptse, Ama Dablam and Thamserku. Along the way, trekkers also have the opportunity to immerse themselves in the rich Sherpa culture, visiting monasteries, prayer flags, and traditional villages.",
  },
  {
    id: 5,
    title: "Flora & Fauna",
    description:
      "The trek takes you through diverse landscapes, from lush forests of rhododendron and pine to barren, high-altitude terrain. Keep an eye out for wildlife like the Himalayan Tahr, Himalaya Munal Yak &amp; Nak musk deer, and various bird species.",
  },
  {
    id: 6,
    title: "Yeti",
    description:
      "The mythical Yeti is part of the local folklore. While there's no scientific evidence of its existence, the legend adds an intriguing element to the trek.",
  },
];
const galleryimg = [
  {
    img: "/TrekkingPackage/EverestTrek/EverestPackage1.png",
  },
  {
    img: "/TrekkingPackage/EverestTrek/EverestPackage2.png",
  },
  {
    img: "/TrekkingPackage/EverestTrek/EverestPackage3.png",
  },
  {
    img: "/TrekkingPackage/EverestTrek/EverestPackage4.png",
  },
];
const Inclusion = [
  {
    id: 1,
    title: "Arrival and Departure",
    description:
      "Private vehicle transportation from the airport to the hotel and back.",
  },
  {
    id: 2,
    title: "Kathmandu Hotel Accommodation",
    description:
      "Four nights in a 4-star hotel in Kathmandu, with a single room and a bed and breakfast package.",
  },
  {
    id: 3,
    title: "Greetings for Dinner",
    description:
      "A welcome dinner at a typical tourist restaurant in Kathmandu with the office staff.",
  },
  {
    id: 4,
    title: "Customs Clearance",
    description:
      "Support for cargo clearance at Nepalese Customs, with charges applicable for the clearance service.",
  },
  {
    id: 5,
    title: "Permits",
    description:
      "Royalty for mountaineering expeditions and a permit fee imposed by the Nepalese government for climbing Mount Manaslu, and accessing conservation area.",
  },
  {
    id: 6,
    title: "Representative Officer",
    description:
      "One government liaison officer provided with complete equipment, salary, and accommodation.",
  },
  {
    id: 7,
    title: "Waste Management",
    description:
      "Fees for the transfer of human waste shipments and depositing garbage.",
  },
  {
    id: 8,
    title: "Insurance",
    description:
      "Insurance coverage for medical expenses and emergency rescue services for all Nepalese staff involved in the trek and expedition.",
  },
  {
    id: 9,
    title: "Map",
    description: "Map for Trekking and Climbing",
  },
];
const Exclusion = [
  {
    id: 1,
    title: "International Flight Airfare",
    description: "Air Travel Expenses to and from Kathmandu",
  },
  {
    id: 2,
    title: "Nepal Entry Visa Fee",
    description:
      "Charge for Nepalese Visa, priced at $125 USD for a duration of 90 days.",
  },
  {
    id: 3,
    title: "Meal Provision",
    description:
      "Lunch and Dinner arrangements while in Kathmandu, including instances of early return from Trekking or Expedition as per the scheduled itinerary.",
  },
  {
    id: 4,
    title: "Extended Stay in Kathmandu",
    description:
      "Additional accommodation nights in Kathmandu. Applicable in instances of early arrival, late departure, early return from Trekking or Expedition, or domestic flight cancellation beyond the scheduled itinerary.",
  },
  {
    id: 5,
    title: "Insurance Coverage",
    description:
      "Policy encompassing medical expenses and high-altitude evacuation costs, including trip cancellation, interruption, high-altitude rescue, air evacuation, medical treatment, repatriation, etc. *Compulsory",
  },
  {
    id: 6,
    title: "Individual Expenditures",
    description:
      "Costs for telephone calls, internet usage, toiletries, battery recharge, hot showers, laundry services, soft drinks, beers, and any alcoholic beverages. (*Note: Soft drinks will be available for members at the base camp).",
  },
  {
    id: 7,
    title: "Personal Climbing Gear",
    description:
      "Includes clothing, packing items, bags, personal medical kit, and all types of personal trekking and climbing equipment.",
  },
  {
    id: 8,
    title: "Toiletries",
    description:
      "Essential items such as soaps, shampoos, toilet paper, tissue paper, toothpaste, and other products used for personal hygiene and cleanliness.",
  },
];
const pricingData = [
  { persons: "1", price: "$788" },
  { persons: "2-3", price: "$650" },
  { persons: "3-5", price: "$600" },
  { persons: "6-8", price: "$550" },
  { persons: "10-12", price: "$500" },
];
