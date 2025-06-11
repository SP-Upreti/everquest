import AboutUsMain from "@/components/website/AboutUs/AboutUsMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "About Infinity - Best Mountaineering and Trekking Experience",
    template: "%s | InfinityAdventure Nepal",
  },
  description:
    "At Infinity, our passion for adventure and the great outdoors drives everything we do. Founded by a team of outdoor enthusiasts, we set out to create a platform that would inspire and empower fellow adventurers worldwide.",
  openGraph: {
    url: "https://infinityadventurenepal.com/about_us",
    siteName: "InfinityAdventureNepal",
    images: [
      {
        url: "https://infinityadventurenepal.com/og/about.png",
        width: 1200,
        height: 630,
        alt: "About",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Infinity - Best Mountaineering and Trekking Experience",
    description:
      "At Infinity, our passion for adventure and the great outdoors drives everything we do. Founded by a team of outdoor enthusiasts, we set out to create a platform that would inspire and empower fellow adventurers worldwide.",
    images: ["https://infinityadventurenepal.com/og/home.png"],
  },
};
export default function Home() {
  return (
    <>
      <main className="bg-white z-[20] relative">
        <AboutUsMain />
      </main>
    </>
  );
}
