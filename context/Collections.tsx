import { StaticImageData } from "next/image";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Expedition {
  name: string;
  maxElevation?: string;
  banner?: StaticImageData;
  package?: Package[];
  expeditions?: Expedition[];
  categoryId?: string;
  slug?: string;
  description?: string;
  image?: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}
interface Package {
  packageName: string;
  packageImg: StaticImageData;
  packageDesc: string;
  packageDay: string;
}

interface Category {
  id: string;
  name: string;
  description?: string;
}

interface Collection {
  collectionId: string;
  categoryId: string;
  categories: Category[];
  name: string;
  slug: string;
  description: string;
  image: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  collections: { name: string; slug: string };
  expeditions: Expedition[];
  categoryData: {
    [key: string]: {
      expeditions: Expedition[];
    };
  };
}

interface CollectionData {
  name: string;
  slug: string;
  description: string;
  image: string;
}

interface CollectionContextType {
  collections: Collection[];
  collection: CollectionData[] | undefined; // Allow undefined
  loading: boolean;
  error: string | null;
  collectionss: Collection | undefined;
  fetchCollectionss: (slug: string) => void;
  refetch: () => void;
}

// Create the context
const CollectionContext = createContext<CollectionContextType | undefined>(
  undefined
);

// Create a provider component
export const CollectionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [collection, setCollection] = useState<CollectionData[]>([]);
  const [collectionss, setCollectionss] = useState<Collection>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCollections = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`
      ); // Adjust this URL to your API endpoint
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCollections(data.data);
    } catch (err) {
      setError("Failed to fetch collections and categories");
      console.error("Error fetching collections:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCollection = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/collections`
      ); // Adjust this URL to your API endpoint
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("data", data);
      setCollection(data.data);
    } catch (err) {
      setError("Failed to fetch collections and categories");
      console.error("Error fetching collections:", err);
    } finally {
      setLoading(false);
    }
  };
  const fetchCollectionss = async (slug: string) => {
    setLoading(true);
    setError(null);
    console.log("slug", slug);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/${slug}`
      ); // Adjust this URL to your API endpoint
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("pandeu", data);
      setCollectionss(data.data);
    } catch (err) {
      setError("Failed to fetch collections and categories");
      console.error("Error fetching collections:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
    fetchCollection();
  }, []);

  const value = {
    collections,
    loading,
    collection,
    error,
    collectionss,
    fetchCollectionss,
    refetch: fetchCollections,
  };

  return (
    <CollectionContext.Provider value={value}>
      {children}
    </CollectionContext.Provider>
  );
};

// Custom hook to use the collection context
export const useCollections = (): CollectionContextType => {
  const context = useContext(CollectionContext);
  if (context === undefined) {
    throw new Error("useCollections must be used within a CollectionProvider");
  }
  return context;
};
