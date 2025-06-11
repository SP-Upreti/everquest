import { Metadata } from "next";
import PackageDetailMain from "@/components/website/PackageDetail/PackageDetailMain";

// Optional: Mark this route as dynamic if needed
export const dynamicParams = true;

interface ExpeditionResponse {
  data: {
    name: string;
    subheading?: string;
    banner?: string;
  };
}

// ✅ Fetch function
async function fetchExpeditionData(slug: string): Promise<ExpeditionResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expeditions/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch expedition");
  }

  return res.json();
}

// ✅ Updated metadata generator to await params
export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  // Await the params before using them
  const params = await props.params;

  try {
    const expedition = await fetchExpeditionData(params.slug);

    return {
      title: `${expedition.data.name} - Adventure Awaits`,
      description: expedition.data.subheading ?? "Explore amazing expeditions with us.",
      openGraph: {
        title: expedition.data.name,
        description: expedition.data.subheading ?? "Join the journey.",
        images: [expedition.data.banner ?? "/og/home.jpg"],
      },
    };
  } catch (error) {
    console.error("Failed to generate metadata:", error);
    return {
      title: "Expedition Not Found - Adventure Awaits",
      description: "Explore amazing expeditions with us.",
    };
  }
}

// ✅ Updated page component to await params
export default async function ExpeditionPage(
  props: { params: Promise<{ slug: string }> }
) {
  // Await the params before using them
  const params = await props.params;
  return <PackageDetailMain slug={params.slug} />;
}