"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Expedition {
  _id: string;
  name: string;
  subheading: string;
  banner: string;
  duration: number;
  maxElevation: string;
  price: {
    adult: {
      pricePerAdult: number;
      discountsA: any[];
    };
  };
  slug: string;
  // Add other expedition properties as needed
}

interface Calendar {
  _id: string;
  name: string;
  startDate?: string;
  endDate?: string;
  months?: string[];
  order?: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  expeditions?: string[];
  expeditionsData?: Expedition[]; // Add expeditionsData to store fetched expeditions
}

const Page = () => {
  const [selectedSeason, setSelectedSeason] = useState<string>("");
  const [selectedCalendarId, setSelectedCalendarId] = useState<string>("");
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingExpeditions, setLoadingExpeditions] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [departure, setDeparture] = useState<any>({
    trekking: {},
    expedition: {},
  });

  const fetchUsers = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groupDeparture`
    );

    if (!response.ok) {
      throw new Error("HTTP error! status: " + response.status);
    }
    const data = await response.json();

    const groupByCollectionAndSeason = (data: any[]) => {
      const groupedTrekkingData: any = {};
      const groupedExpeditionData: any = {};
      const groupedTrainingData: any = {};

      data.forEach((item: any) => {
        const collection = item.expedition?.collections;
        const seasons = item.expedition?.season
          .split(",")
          .map((season: string) => season.trim());

        seasons?.forEach((season: string) => {
          // Grouping for Trekking Collection
          if (collection.slug === "trekking") {
            if (!groupedTrekkingData[season]) {
              groupedTrekkingData[season] = {};
            }
            const category = item.expedition.category;
            const categoryName = category.name;

            if (!groupedTrekkingData[season][categoryName]) {
              groupedTrekkingData[season][categoryName] = [];
            }
            groupedTrekkingData[season][categoryName].push(item);
          }
          // Grouping for Mountaineering Collection
          else if (collection.slug === "mountaineering") {
            if (!groupedExpeditionData[season]) {
              groupedExpeditionData[season] = [];
            }
            groupedExpeditionData[season].push(item);
          }
          // Grouping for Training Collection
          else if (collection.slug === "training") {
            if (!groupedTrainingData[season]) {
              groupedTrainingData[season] = [];
            }
            groupedTrainingData[season].push(item);
          }
        });
      });

      setDeparture({
        trekking: groupedTrekkingData,
        expedition: groupedExpeditionData,
        training: groupedTrainingData, // Add training to the departure state
      });
    };

    groupByCollectionAndSeason(data?.data);
  };

  const fetchExpeditions = async (calendarId: string) => {
    try {
      setLoadingExpeditions(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/calendars/${calendarId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch expeditions");
      }
      const data = await response.json();

      // Update the calendar with expeditions data
      setCalendars((prevCalendars) =>
        prevCalendars.map((calendar) =>
          calendar._id === calendarId
            ? {
                ...calendar,
                expeditionsData: data.data?.expeditions || [],
              }
            : calendar
        )
      );
      return data.data?.expeditions || [];
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch expeditions"
      );
      console.error("Error fetching expeditions:", err);
      throw err; // Re-throw to be caught by the caller
    } finally {
      setLoadingExpeditions(false);
    }
  };

  const handleCalendarSelect = async (calendar: Calendar) => {
    setSelectedSeason(calendar.name);
    setSelectedCalendarId(calendar._id);
    setLoadingExpeditions(true);
    setError(null);

    try {
      // Always fetch expeditions when a calendar is selected
      await fetchExpeditions(calendar._id);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load expeditions"
      );
      console.error("Error in handleCalendarSelect:", err);
    } finally {
      setLoadingExpeditions(false);
    }
  };

  useEffect(() => {
    const fetchCalendars = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/calendars`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch calendars");
        }
        const data = await response.json();
        const calendarsWithExpeditions = data.data;
        setCalendars(calendarsWithExpeditions);
        if (calendarsWithExpeditions.length > 0) {
          setSelectedSeason(calendarsWithExpeditions[0].name);
          setSelectedCalendarId(calendarsWithExpeditions[0]._id);
          // Fetch expeditions for the first calendar
          if (calendarsWithExpeditions[0].expeditions?.length) {
            await fetchExpeditions(calendarsWithExpeditions[0]._id);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching calendars:", err);
      } finally {
        setLoading(false);
      }
    };

    const initialize = async () => {
      await fetchCalendars();
      await fetchUsers();
    };

    initialize();
  }, []);

  useEffect(() => {
    const ScrollPosition = window.innerWidth < 768 ? 300 : 400;

    if (typeof window !== "undefined") {
      window.scrollTo({ top: ScrollPosition, behavior: "smooth" });
    }
  }, [selectedSeason]);

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <div className="w-full h-[40vh] sm:h-[50vh] bg-zinc-200 relative flex justify-center items-center">
        <Image
          width={1920}
          height={1080}
          src="/BestSellers/best7.jpg"
          alt="expedition-image"
          className="absolute top-0 left-0 w-full h-full object-cover object-center"
          priority
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide leading-tight">
            Explore the Dates
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        {/* Calendar Picker */}
        <div className="sticky top-16 sm:top-20 z-20 bg-white py-4 sm:py-6 -mx-4 sm:mx-0 px-4 sm:px-0 shadow-sm sm:shadow-none">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
              {loading ? (
                <div className="col-span-full text-center py-4">
                  Loading calendars...
                </div>
              ) : error ? (
                <div className="col-span-full text-center text-red-500 py-4">
                  {error}
                </div>
              ) : calendars.length === 0 ? (
                <div className="col-span-full text-center py-4">
                  No calendars available
                </div>
              ) : (
                calendars.map((calendar) => (
                  <div
                    key={calendar._id}
                    onClick={() => handleCalendarSelect(calendar)}
                    className={`
              flex flex-col items-center justify-between
              p-2 sm:p-3 rounded-md cursor-pointer font-semibold
              transition-all duration-200 shadow-sm hover:shadow-md
              ${
                selectedSeason === calendar.name
                  ? "bg-primary2 text-white scale-[1.02] shadow-md"
                  : "bg-gray-50 hover:bg-gray-100"
              }
              min-h-[100px] sm:min-h-[120px] h-full
              border border-gray-100
            `}
                  >
                    <h2 className="text-xs xs:text-sm sm:text-base font-bold text-center line-clamp-2 w-full px-1">
                      {calendar.name}
                    </h2>
                    <p
                      className={`
                text-[10px] xs:text-xs sm:text-sm font-medium px-2 py-1 my-1 rounded-full 
                w-full text-center truncate
                ${
                  selectedSeason === calendar.name
                    ? "bg-white text-primary2/90"
                    : "bg-primary2/90 text-white"
                }
              `}
                    >
                      {calendar.startDate} - {calendar.endDate}
                    </p>
                    <p className="text-[9px] xs:text-[10px] sm:text-xs text-center line-clamp-2 w-full ">
                      (
                      {calendar?.months
                        ?.join(", ")
                        .replace(/, ([^,]*)$/, " and $1")}
                      )
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Expeditions Grid */}
        <div className="py-6 sm:py-10">
          <div className="w-full">
            {loadingExpeditions ? (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary2 border-r-transparent"></div>
                <p className="mt-2 text-gray-600">Loading expeditions...</p>
              </div>
            ) : calendars.find((c) => c._id === selectedCalendarId)
                ?.expeditionsData?.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No expeditions available for this season.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {calendars
                  .find((c) => c._id === selectedCalendarId)
                  ?.expeditionsData?.map((expedition) => {
                    const startDate = new Date().toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                    const endDate = new Date(
                      Date.now() + expedition.duration * 24 * 60 * 60 * 1000
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });

                    return (
                      <div
                        key={expedition._id}
                        className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-primary2/30"
                      >
                        <div className="col-span-12 sm:col-span-8 p-4 sm:p-6">
                          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                            {expedition.name}
                          </h2>
                          <p className="text-xs sm:text-sm text-gray-500 mb-4 line-clamp-2">
                            {expedition.subheading}
                          </p>

                          <div className="grid grid-cols-1 gap-3 mb-4">
                            <div className="bg-gray-50 rounded-lg p-2 sm:p-3 flex flex-row">
                              <p className="text-[10px] sm:text-xs text-gray-500 mb-1 w-1/2">
                                Start Date
                              </p>
                              <p className="text-sm font-medium text-gray-900">
                                {startDate}
                              </p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-2 sm:p-3 flex flex-row">
                              <p className="text-[10px] sm:text-xs text-gray-500 mb-1 w-1/2">
                                End Date
                              </p>
                              <p className="text-sm font-medium text-gray-900">
                                {endDate}
                              </p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-2 sm:p-3 flex flex-row">
                              <p className="text-[10px] sm:text-xs text-gray-500 mb-1 w-1/2">
                                Max Elevation
                              </p>
                              <p className="text-sm font-medium text-gray-900">
                                {expedition?.maxElevation}m
                              </p>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-2 sm:p-3 flex flex-row">
                              <p className="text-[10px] sm:text-xs text-gray-500 mb-1 w-1/2">
                                Duruation
                              </p>
                              <p className="text-sm font-medium text-gray-900">
                                {expedition.duration} Days
                              </p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-2 sm:p-3 flex flex-row">
                              <p className="text-[10px] sm:text-xs text-gray-500 mb-1 w-1/2">
                                Price
                              </p>
                              <p className="text-sm font-bold text-primary2">
                                $
                                {expedition?.price?.adult?.pricePerAdult?.toLocaleString()}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3 mt-4">
                            <Link
                              href={`/package_detail/${expedition?.slug}`}
                              className="flex-1"
                            >
                              <button className="w-full px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200">
                                View Details
                              </button>
                            </Link>
                            <Link
                              href={`/booking?expedition=${expedition?.slug}`}
                              className="flex-1"
                            >
                              <button className="w-full px-4 py-2.5 text-xs sm:text-sm font-medium text-white bg-primary2 rounded-md hover:bg-primary2/90 transition-colors duration-200">
                                Book Now
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}

            {/* Empty state */}
            {!loadingExpeditions &&
              calendars.find((c) => c._id === selectedCalendarId)
                ?.expeditionsData?.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    No expeditions found
                  </h3>
                  <p className="text-gray-500">
                    There are no expeditions available for this season.
                  </p>
                </div>
              )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
