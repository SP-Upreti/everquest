import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <main className="">
      <div className="w-full h-[50vh] bg-zinc-200 relative  flex justify-center items-center">
        <Image
          width={1000}
          height={1000}
          src="https://images.unsplash.com/photo-1504807959081-3dafd3871909?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="expedition-image"
          className="absolute top-0 left-0 w-full h-[50vh] object-cover object-center"
          loading="lazy"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-[0.5]"></div>
        <h1 className="uppercase text-center lg:text-5xl md:text-4xl sm:text-3xl text-2xl relative tracking-wide mt-10 title font-bold text-secondary-50">
          Terms & Conditions
        </h1>
      </div>

      <section className="pb-[5rem] lg:w-11/12 w-11/12 3xl:w-8/12 mx-auto  lg:mt-16 md:mt-12 mt-8">
        <div className="space-y-14">
          {termsconditions.map((item, index) => (
            <div key={index}>
              <h2 className="font-bold title lg:text-2xl md:text-xl text-md uppercase border-b-4 pb-1 mb-8 w-fit border-primary2/60  ">
                {item.title}
              </h2>
              {item.points.map((point, pointIndex) => (
                <div key={pointIndex} className="my-2">
                  <p className="text-secondary-400 md:text-lg sm:text-md text-sm leading-relaxed flex gap-4">
                    <span>• </span>
                    <span className="">{point.desc1}</span>
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default page;

const termsconditions = [
  {
    title: "Booking and Reservations",
    points: [
      {
        desc1:
          "All reservations are subject to availability and confirmation. Bookings are processed on a first-come, first-served basis, and we recommend early reservation to secure your preferred dates and services. Incomplete or incorrect booking information may result in reservation cancellation without prior notice.",
      },
      {
        desc1:
          "To secure your booking, a non-refundable deposit of 30% of the total trip cost is required at the time of reservation. This deposit demonstrates your commitment and helps us manage our planning and resource allocation. The deposit amount varies depending on the specific trip package and destination.",
      },
      {
        desc1:
          "Final payment must be made no later than 30 days before the travel date. Payment can be made via bank transfer, credit card, or other approved payment methods. Failure to complete the full payment by the specified deadline may result in automatic cancellation of your reservation without refund.",
      },
    ],
  },
  {
    title: "Cancellation Policy",
    points: [
      {
        desc1:
          "Cancellations made 30 days before departure are eligible for a partial refund. A cancellation fee of 20% of the total trip cost will be deducted from the refundable amount. Refunds are processed within 14 business days after the cancellation request and will be credited to the original payment method.",
      },
      {
        desc1:
          "Cancellations within 15 days of departure are non-refundable. This strict policy is due to the advanced commitments we make with local suppliers, accommodation providers, and tour operators. No exceptions will be made unless covered by specific travel insurance provisions.",
      },
      {
        desc1:
          "In case of no-show, no refunds will be issued. A no-show is defined as a failure to join the trip at the designated start point or not being present for scheduled activities without prior communication. This includes missing transportation connections or failing to complete necessary pre-trip requirements.",
      },
    ],
  },
  {
    title: "Travel Insurance",
    points: [
      {
        desc1:
          "We strongly recommend purchasing comprehensive travel insurance for unforeseen events. Our recommended insurance should provide coverage for trip cancellation, medical emergencies, trip interruption, lost luggage, and personal accident. The insurance should be valid for the entire duration of your trip and cover the specific regions you will be visiting.",
      },
      {
        desc1:
          "Travel insurance policies must cover cancellations, medical expenses, and personal liability. The minimum coverage should include medical treatment up to $100,000, emergency medical evacuation, trip cancellation for valid reasons, and personal liability coverage of at least $50,000. We reserve the right to request proof of insurance before your departure.",
      },
    ],
  },
  {
    title: "Health and Safety",
    points: [
      {
        desc1:
          "Travelers must disclose any pre-existing medical conditions at the time of booking. This includes physical limitations, chronic illnesses, mental health conditions, and ongoing treatments. Failure to disclose relevant health information may result in trip cancellation without refund and could potentially compromise your safety during the trip.",
      },
      {
        desc1:
          "It is your responsibility to ensure that you meet the fitness requirements for your chosen activity. We provide detailed fitness level descriptions for each trip, and you should honestly assess your physical capabilities. Some trips may require medical clearance or a fitness certification from a healthcare professional.",
      },
      {
        desc1:
          "Follow all safety guidelines and instructions provided by our guides during the trip. Our guides are trained professionals who prioritize your safety. Failure to comply with their instructions may result in your removal from the activity or trip without compensation. This includes adhering to safety protocols, wearing provided safety equipment, and maintaining group cohesion.",
      },
    ],
  },
  {
    title: "Pricing",
    points: [
      {
        desc1:
          "All prices are quoted in [currency] and include applicable taxes unless stated otherwise. Prices are transparent and include all mandatory charges. Optional extras, personal expenses, and additional services will be clearly itemized and communicated during the booking process.",
      },
      {
        desc1:
          "Prices are subject to change without notice, depending on exchange rates and supplier costs. While we strive to maintain quoted prices, significant fluctuations in currency exchange rates, fuel prices, or local taxes may necessitate price adjustments. Any price changes will be communicated promptly, and customers will have the option to cancel with a full refund if the change exceeds 10% of the original price.",
      },
    ],
  },
];
