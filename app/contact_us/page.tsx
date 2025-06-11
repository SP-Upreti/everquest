import ContactUs from "@/components/website/ContactUs/ContactUs";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: {
    default: "Contact us - Best Mountaineering and Trekking Experience",
    template: "%s | InfinityAdventure Nepal",
  },
  description:
    "At Infinity, our passion for adventure and the great outdoors drives everything we do. Founded by a team of outdoor enthusiasts, we set out to create a platform that would inspire and empower fellow adventurers worldwide.",
  openGraph: {
    url: "https://infinityadventurenepal.com/contact_us",
    siteName: "InfinityAdventureNepal",
    images: [
      {
        url: "https://infinityadventurenepal.com/og/contact.png",
        width: 1200,
        height: 630,
        alt: "contact",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact us- Best Mountaineering and Trekking Experience",
    description:
      "At Infinity, our passion for adventure and the great outdoors drives everything we do. Founded by a team of outdoor enthusiasts, we set out to create a platform that would inspire and empower fellow adventurers worldwide.",
    images: ["https://infinityadventurenepal.com/og/contact.png"],
  },
};

function Page() {
  return (
    <main className="bg-white z-[20] relative">
      <div className="w-full h-[50vh] bg-zinc-200 relative  flex justify-center items-center">
        <Image
          width={1000}
          height={1000}
          src="/BestSellers/best6.jpg"
          alt="expedition-image"
          className="absolute top-0 left-0 w-full h-[50vh] object-cover object-center"
          loading="lazy"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-[0.6]"></div>
        <h1 className="uppercase text-center lg:text-5xl md:text-4xl sm:text-3xl text-2xl relative tracking-wide mt-10 title font-bold text-secondary-50">
          Get in Touch{" "}
        </h1>
      </div>
      <ContactUs />
    </main>
  );
}

export default Page;
