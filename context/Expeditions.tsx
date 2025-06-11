import { StaticImport } from "next/dist/shared/lib/get-img-props";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";

interface PromoCode {
  code?: string;
  expiration: string | null;
  percentage?: number;
}

interface Discounts {
  discountsA: any[];
  discountsC: any[];
}

interface Price {
  adult: {
    pricePerAdult: string;
    discountsA: any[];
  };
  children: {
    discountsC: any[];
  };
}

interface Category {
  _id: string;
  name: string;
  image: any[];
  description: string;
  slug: string;
  collections: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Collections {
  _id: string;
  name: string;
  image: any[];
  slug: string;
  description: string;
  showInHomePage: boolean;
  collectionId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Expedition {
  _id: string;
  name: string;
  subheading: string;
  tripcode: string;
  overview: string;
  season: string;
  category: Category;
  collections: Collections;
  banner: string | StaticImport;
  gearList: string;
  equipmentList: string;
  slug: string;
  maxElevation: string;
  coordinates: string;
  mountainRange: string;
  essentialInformation: string;
  duration: number;
  region: string;
  mealsIncluded: string;
  transportation: string;
  startPoint: string;
  endPoint: string;
  accomodation: string;
  groupSize: string;
  activity: string;
  physical: string;
  isUpcoming: boolean;
  isBestseller: boolean;
  showInHero: boolean;
  isPublished: boolean;
  isFromOldSite: boolean;
  expeditionId: string;
  addons: any[];
  promoCode: PromoCode;
  price: Price;
  createdAt: string;
  updatedAt: string;
  routeMap: string;
  tripBrochure: string;
  __v: number;
}

interface Attraction {
  id: string;
  title: string;
  description: string;
  order: number;
}

interface Itinerary {
  id: string;
  title: string;
  description: string;
  day: string;
  shortDescription: string;
  images: StaticImport[];
  hotel: string;
}

interface Media {
  media: StaticImport;
}
interface Cost {
  title: string;
  description: string;
  order: number;
}
interface Date {
  startDate: string;
  endDate: string;
  status: string;
  groupSize: string;
}

interface ExpeditionContextType {
  expeditions: Expedition[];
  heroExpeditions: Expedition[];
  attractions: Attraction[];
  fetchExpedition: (slug: string) => void;
  expedition: Expedition | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  itinerary: Itinerary[];
  costIncludes: Cost[];
  costExcludes: Cost[];
  medias: Media[];
  fixedDates: Date[];
}

const ExpeditionContext = createContext<ExpeditionContextType | undefined>(
  undefined,
);

export const ExpeditionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [expeditions, setExpeditions] = useState<Expedition[]>([]);
  const [expedition, setExpedition] = useState<Expedition>();

  const [costIncludes, setCostIncludes] = useState<Cost[]>([]);
  const [costExcludes, setCostExcludes] = useState<Cost[]>([]);

  const [medias, setMedias] = useState<Media[]>([]);

  const [itinerary, setItinerary] = useState<Itinerary[]>([]);

  const [fixedDates, setFixedDates] = useState<Date[]>([]);

  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchExpeditions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      if (!backendUrl) throw new Error("Backend URL is not configured");

      const response = await fetch(`${backendUrl}/api/expeditions`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setExpeditions(data.data ?? []);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred"),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAttractions = async (expeditionId: string) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const attractionResponse = await fetch(
      `${backendUrl}/api/tripAttraction/by-expiditionId/${expeditionId}`,
    );
    if (attractionResponse.ok) {
      const { data } = await attractionResponse.json();
      setAttractions(data ?? []);
    }
  };
  const fetchCostIncludes = async (expeditionId: string) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const cosstIncludesResponse = await fetch(
      `${backendUrl}/api/cost-includes/by-expiditionId/${expeditionId}`,
    );
    if (cosstIncludesResponse.ok) {
      const { data } = await cosstIncludesResponse.json();
      setCostIncludes(data ?? []);
    }
  };
  const fetchMedias = async (expeditionId: string) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const mediaResponse = await fetch(
      `${backendUrl}/api/medias/by-expiditionId/${expeditionId}`,
    );
    if (mediaResponse.ok) {
      const { data } = await mediaResponse.json();
      setMedias(data ?? []);
    }
  };
  const fetchCostExcludes = async (expeditionId: string) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const cosstIncludesResponse = await fetch(
      `${backendUrl}/api/cost-excludes/by-expiditionId/${expeditionId}`,
    );
    if (cosstIncludesResponse.ok) {
      const { data } = await cosstIncludesResponse.json();
      setCostExcludes(data ?? []);
    }
  };

  const fetchItinerary = async (expeditionId: string) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const itineraryResponse = await fetch(
      `${backendUrl}/api/iternaries/by-expeditionId/${expeditionId}`,
    );
    if (itineraryResponse.ok) {
      const { data } = await itineraryResponse.json();
      setItinerary(data ?? []);
    }
  };

  const fetchDates = async (expeditionId: string) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const fixedDatesResponse = await fetch(
      `${backendUrl}/api/fixed-dates/by-expeditionId/${expeditionId}`,
    );
    if (fixedDatesResponse.ok) {
      const { data } = await fixedDatesResponse.json();
      setFixedDates(data ?? []);
    }
  };

  const fetchExpedition = async (slug: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/expeditions/${slug}`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      const expeditionData = data.data;
      if (!expeditionData)
        throw new Error("Invalid data format received from server");

      setExpedition(expeditionData);
      await Promise.all([
        fetchAttractions(expeditionData._id),
        fetchItinerary(expeditionData._id),
        fetchCostIncludes(expeditionData._id),
        fetchCostExcludes(expeditionData._id),
        fetchMedias(expeditionData._id),
        fetchDates(expeditionData._id),
      ]);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred"),
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExpeditions();
  }, []);

  const heroExpeditions = useMemo(
    () => expeditions.filter((expedition) => expedition.showInHero),
    [expeditions],
  );

  const value: ExpeditionContextType = {
    medias,
    fixedDates,
    expeditions,
    costIncludes,
    costExcludes,
    heroExpeditions,
    attractions,
    itinerary,
    fetchExpedition,
    expedition,
    isLoading,
    error,
    refetch: fetchExpeditions,
  };

  return (
    <ExpeditionContext.Provider value={value}>
      {children}
    </ExpeditionContext.Provider>
  );
};

export const useExpedition = (): ExpeditionContextType => {
  const context = useContext(ExpeditionContext);
  if (!context) {
    throw new Error("useExpedition must be used within an ExpeditionProvider");
  }
  return context;
};
