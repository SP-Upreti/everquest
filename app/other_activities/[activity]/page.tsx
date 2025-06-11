"use client";
import OtherActivitiesMain from "@/components/website/OtherActivities/OtherActivitiesMain";
import { use } from "react";

function Page({ params }: { params: Promise<{ activity: string }> }) {
  // Unwrap the params Promise using React.use()
  const unwrappedParams = use(params);
  const { activity } = unwrappedParams;

  return (
    <main className="bg-white z-[20] relative">
      <OtherActivitiesMain activity={activity} />
    </main>
  );
}

export default Page;
