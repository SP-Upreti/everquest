"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface Activity {
  _id: string;
  name: string;
  price: number;
  previousPrice: number;
  slug: string;
  description: string;
  banner: string;
  images: string[];
  activityId: string;
  createdAt: string;
  updatedAt: string;
}

interface IterinaryData {
  _id: string;
  title: string;
  description: string;
  costIncludes: any[]; // Add proper type based on your data structure
}

interface Iterinaries {
  _id: string;
  title: string;
  description: string;
  day: string;
  shortDescription: string;
  data?: IterinaryData[]; // Add the fetched data to the itinerary
}

interface ActivityContextType {
  activities: Activity[];
  isLoading: boolean;
  fetchActivity: (slug: string) => void;
  activiti: Activity | undefined;
  error: Error | null;
  refetch: () => Promise<void>;
  iterinaries: Iterinaries[];
}

const ActivitiesContext = createContext<ActivityContextType | undefined>(
  undefined
);

export const ActivitiesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activiti, setActivity] = useState<Activity>();
  const [iterinaries, setIterinaries] = useState<Iterinaries[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchActivities = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      if (!backendUrl) {
        throw new Error("Backend URL is not configured");
      }

      const response = await fetch(`${backendUrl}/api/activities`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.data) {
        throw new Error("Invalid data format received from server");
      }

      setActivities(data.data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchActivity = async (slug: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      if (!backendUrl) {
        throw new Error("Backend URL is not configured");
      }

      const response = await fetch(`${backendUrl}/api/activities/${slug}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.data) {
        throw new Error("Invalid data format received from server");
      }

      setActivity(data.data);
      await fetchActivityIterinaries(data.data._id);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchIterinaryData = async (
    iterinaryId: string
  ): Promise<IterinaryData | null> => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      if (!backendUrl) {
        throw new Error("Backend URL is not configured");
      }

      const response = await fetch(
        `${backendUrl}/api/cost-includes/by-expiditionId/${iterinaryId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.data) {
        throw new Error("Invalid data format received from server");
      }

      return data.data;
    } catch (err) {
      console.error(`Error fetching itinerary data for ${iterinaryId}:`, err);
      return null;
    }
  };

  const fetchActivityIterinaries = async (activityId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      if (!backendUrl) {
        throw new Error("Backend URL is not configured");
      }

      const response = await fetch(
        `${backendUrl}/api/iternaries/by-activityId/${activityId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.data) {
        throw new Error("Invalid data format received from server");
      }

      // Fetch data for each itinerary
      const iterinariesWithData = await Promise.all(
        data.data.map(async (itinerary: Iterinaries) => {
          const iterinaryData = await fetchIterinaryData(itinerary._id);
          return {
            ...itinerary,
            data: iterinaryData,
          };
        })
      );

      setIterinaries(iterinariesWithData);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const value: ActivityContextType = {
    iterinaries,
    activities,
    fetchActivity,
    activiti,
    isLoading,
    error,
    refetch: fetchActivities,
  };

  return (
    <ActivitiesContext.Provider value={value}>
      {children}
    </ActivitiesContext.Provider>
  );
};

export const useActivities = (): ActivityContextType => {
  const context = useContext(ActivitiesContext);

  if (context === undefined) {
    throw new Error("useActivities must be used within an ActivitiesProvider");
  }

  return context;
};
