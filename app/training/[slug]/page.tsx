import PackageDetailMain from "@/components/website/Training/PackageDetailMain";

// Server-side fetch function (replace with your actual API call)
async function fetchExpeditionData(slug: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expeditions/${slug}`,
  );
  if (!response.ok) throw new Error("Failed to fetch expedition");
  return response.json();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await the params before using them
  const resolvedParams = await params;
  const expedition = await fetchExpeditionData(resolvedParams.slug);

  return {
    title: `${expedition?.data.name || "Expeditions"} - Adventure Awaits`,
    description:
      expedition?.data.subheading || "Explore amazing expeditions with us.",
    openGraph: {
      title: expedition?.name,
      description: expedition?.subheading,
      images: [expedition?.data.banner || "/og/home.jpg"],
    },
  };
}

export default async function ExpeditionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await the params before using them
  const resolvedParams = await params;
  const expedition = await fetchExpeditionData(resolvedParams.slug);
  return <PackageDetailMain slug={resolvedParams.slug} />;
}