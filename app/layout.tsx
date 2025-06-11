import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import ClientLayout from "./client-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default:
      "Everest Quest - Best Mountaineering and Trekking Experience",
    template: "%s | InfinityAdventure Nepal",
  },
  description:
    "At Infinity Travel Pvt. Ltd., we specialize in crafting unforgettable Mountaineering and Trekking experiences in the capital of mountains. Join us for an adventure of a lifetime and create memories that will last a lifetime.",
  openGraph: {
    url: "https://infinityadventurenepal.com/",
    siteName: "InfinityAdventureNepal",
    images: [
      {
        url: "https://infinityadventurenepal.com/og/home.png",
        width: 1200,
        height: 630,
        alt: "About",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Everest Quest - Best Mountaineering and Trekking Experience",
    description:
      "At Everest Quest ., we specialize in crafting unforgettable Mountaineering and Trekking experiences in the capital of mountains. Join us for an adventure of a lifetime and create memories that will last a lifetime.",
    images: ["https://infinityadventurenepal.com/og/home.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className} >
      <body suppressHydrationWarning className="bg-[#121212]">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
