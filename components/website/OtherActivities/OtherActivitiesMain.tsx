"use client";
import React, { useEffect, useState } from "react";
import AcitvityDetail from "./ActivityDetail";
import Daypackages from "./Daypackages";
import { useActivities } from "@/context/Activities";
import { useCollections } from "@/context/Collections";
import Loading from "@/app/loading";

function OtherActivitiesMain({ activity }: { activity: string }) {
  const [isLoading, setIsLoading] = useState(true); // Loader state

  const { activiti, fetchActivity } = useActivities();
  const { fetchCollectionss, collectionss } = useCollections();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetchActivity(activity);
      await fetchCollectionss(activity);
      setIsLoading(false);
    };

    fetchData();
  }, [activity]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {(activiti || collectionss) && (
        <AcitvityDetail
          activity={activity}
          activiti={activiti || collectionss}
        />
      )}

      <div>
        <Daypackages activity={activity} />
      </div>
    </div>
  );
}

export default OtherActivitiesMain;
