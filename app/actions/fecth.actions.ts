import { StaticImageData } from "next/image";

export type HeroItem = {
  _id: string;
  name: string;
  overview: string;
  height: string;
  banner: StaticImageData | string; // Updated to allow string from fetched data
  expeditionId?: string;
  collections?: { slug: string }; // Added for slug access
  slug?: string; // Added for navigation
  maxElevation?: string; // Added to match fetched data
  duration?: number
};

export async function getHero(): Promise<HeroItem[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expeditions`,
      {
        next: { revalidate: 20 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch hero posts");
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching hero posts:", error);
    return [];
  }
}
