import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Training {
  _id: string;
  heading: string;
  title: string;
  thumbnail: string;
  description: string;
  slug: string[];
  trainingId: string;
  createdAt: string;
  updatedAt: string;
}

interface TrainingContextType {
  training: Training[];
  isLoading: boolean;
  trainings: Training | undefined;
  fetchTraining: (slug: string) => void;
  error: Error | null;
  refetch: () => Promise<void>;
}

const TrainingContext = createContext<TrainingContextType | undefined>(
  undefined
);

export const TrainingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [training, setTraining] = useState<Training[]>([]);
  const [trainings, setTrainings] = useState<Training>();
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

      const response = await fetch(`${backendUrl}/api/training`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.data) {
        throw new Error("Invalid data format received from server");
      }

      setTraining(data.data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTraining = async (slug: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      if (!backendUrl) {
        throw new Error("Backend URL is not configured");
      }

      const response = await fetch(`${backendUrl}/api/training/${slug}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.data) {
        throw new Error("Invalid data format received from server");
      }

      setTrainings(data.data);
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

  const value: TrainingContextType = {
    trainings,
    fetchTraining,
    training,
    isLoading,
    error,
    refetch: fetchActivities,
  };

  return (
    <TrainingContext.Provider value={value}>
      {children}
    </TrainingContext.Provider>
  );
};

export const useTraining = (): TrainingContextType => {
  const context = useContext(TrainingContext);

  if (context === undefined) {
    throw new Error("useActivities must be used within an ActivitiesProvider");
  }

  return context;
};
