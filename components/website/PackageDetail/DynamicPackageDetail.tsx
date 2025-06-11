import PackageDetailMain from "./PackageDetailMain";

// Server-side fetch function (replace with your actual API call)
async function fetchExpeditionData(slug: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expeditions/${slug}`
  );
  if (!response.ok) throw new Error("Failed to fetch expedition");
  return response.json();
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const expedition = await fetchExpeditionData(params.slug);

  return {
    title: `${expedition?.name || "Expedition"} - Adventure Awaits`,
    description:
      expedition?.subheading || "Explore amazing expeditions with us.",
    openGraph: {
      title: expedition?.name,
      description: expedition?.subheading,
      images: [expedition?.banner || "/default-image.jpg"],
    },
  };
}

export default async function ExpeditionPage({
  params,
}: {
  params: { slug: string };
}) {
  const expedition = await fetchExpeditionData(params.slug);
  return <PackageDetailMain slug={params.slug} />;
}
