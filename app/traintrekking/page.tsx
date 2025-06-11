import Title from "@/components/ui/Title";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <main>
      <div className="w-full h-[50vh] bg-zinc-200 relative  flex justify-center items-center">
        <Image
          width={1000}
          height={1000}
          src="/trekking.jpg"
          alt="expedition-image"
          className="absolute top-0 left-0 w-full h-[50vh]  object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-[0.5]"></div>
        <h1 className="text-5xl uppercase relative tracking-wide mt-10 title font-extrabold text-secondary-50">
          #Trekking
        </h1>
      </div>

      {/* main content */}
      <div className="w-10/12 mx-auto my-12">
      <Title text="Trekking" fontSize="!text-[2vw]" textalign="text-left" />

        <p className="text-md font-medium text-secondary-400 mt-6">
          Trekking is a popular outdoor activity that involves walking, usually
          over long distances, in natural environments. It combines the
          enjoyment of nature with physical exercise and can be done on various
          terrains, from gentle hills to rugged mountains. Here’s an overview of
          trekking, focusing on notable regions:Trekking is a form of hiking
          that typically involves multi-day journeys through scenic landscapes.
          It often includes camping or staying in lodges along the way.
        </p>


        <div className="mt-8">
          <h2 className="font-bold text-xl ">
            Mandatory Requirements to Participate
          </h2>
          <div className="pt-4 text-md font-medium text-secondary-400 w-[50em]">
            {requirement.map((item, index) => (
              <div key={index} className="flex gap-2">
                <p>•</p>
                <p> {item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="font-bold text-xl ">Training Fees</h2>
          <div className="text-md font-medium text-secondary-400 w-[50em] space-y-4 mt-4">
            <p>
              Fees for Basic Mountaineering Training for Foreign Participants is
              USD 3,000.00 per participant.
            </p>
            <p className="flex gap-2">
              <span>•</span>
              For Nepalese Participants, NMA will subsidies most of the cost; so
              that only NRs. 15,000.(Fifteen thousands rupees) will be charged
              for Nepalese. This does not include insurance cost. Participant
              must ensure Accident (above 10,00,000), Medical (Minimum 2,00,000)
              and Evacuation (equal to 5,000 USD).
            </p>
            <p className="flex gap-2">
              <span>•</span>
              For Foreign Participants USD 3,000.00 (Three thousand US$). For
              itineraries, activities and facilities information for foreign
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="font-bold text-xl ">Time Credit</h2>
          <div className="text-md font-medium text-secondary-400 w-[50em] space-y-4 mt-4">
            <p className="flex gap-2">
              <span>•</span>
              180 hr. ( 30 days ) of core training
            </p>
            <p className="flex gap-2">
              <span>•</span>
              Total 35 days including travel, pre-test, major exam and result
              preparation.
            </p>
            <p className="flex gap-2">
              <span>•</span>
              Interviews starts: 8 June (for Nepalese)
            </p>
            <p className="flex gap-2">
              <span>•</span>
              Training starts: 12 June (for all)
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;

const requirement = [
  {
    desc:"Photo copy of Citizenship",
  },
  {
    
  desc:"Recommendation letter certifying 2 year experience from trekking agency registered at NMA since 2 year (for Nepalese) - only one participant from one trekking agency",
  },
  {
    desc:"Clear photo of successful ascent of any mountain or trekking pass or snowline",
  },
  {
    desc:"Basic First Aid Course ( 18 hours / 3 days)",
  }
]
