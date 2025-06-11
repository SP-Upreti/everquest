"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, ReactNode, useMemo } from "react";

interface InfoItem {
  title: string;
  slug: string;
}

interface UsefulInfoData {
  info: InfoItem[];
}

interface UsefulInfoLayoutProps {
  children: ReactNode;
}

const UsefulInfoLayout = ({ children }: UsefulInfoLayoutProps) => {
  const pathname = usePathname();
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ;
  const [data, setData] = useState<UsefulInfoData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize the Banner component
  const Banner = useMemo(() => {
    return () => (
      <div className="w-full h-[40vh] bg-zinc-200 relative flex justify-center items-center">
        <Image
          width={1000}
          height={1000}
          src="https://images.unsplash.com/photo-1504807959081-3dafd3871909?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="expedition-image"
          className="absolute top-0 left-0 w-full h-[40vh] object-cover object-center"
          loading="lazy"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-[0.5]"></div>
        <h1 className="uppercase text-center lg:text-5xl md:text-4xl sm:text-3xl text-2xl relative tracking-wide mt-10 title font-bold text-secondary-50">
          Useful Information
        </h1>
      </div>
    );
  }, []);

  // Memoize the Sidebar component
  const Sidebar = useMemo(() => {
    if (!data) return null;
    return (
      <div className="xl:col-span-2 col-span-9 sticky xl:top-32 top-14 bg-white py-4 h-fit overflow-x-auto">
        <div className="flex flex-row xl:flex-col">
          {data.info.map((item, index) => {
            const itemPath = `/useful_info/${item.slug}`;
            const isActive = pathname === itemPath;

            return (
              <Link key={index} href={itemPath} prefetch={false}>
                <button
                  className={`xl:w-[20em] w-[15em] py-5 font-semibold text-start px-2 text-sm transition-colors duration-200 ${
                    isActive
                      ? "bg-primary2/10 text-primary2 border-l-4 border-primary2"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {item.title}
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }, [data, pathname]);

  // Fetch data effect
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${backendUrl}/api/useful-info`);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const result: UsefulInfoData = await response.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching useful info:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [backendUrl]);

  // Banner component is now memoized above

  // Skeleton for sidebar items
  const SkeletonSidebar = () => (
    <div className="flex flex-col space-y-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
      ))}
    </div>
  );

  // Skeleton for content
  const SkeletonContent = () => (
    <div className="space-y-4">
      <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse mt-6"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
    </div>
  );

  // Loading state with skeleton UI
  if (isLoading) {
    return (
      <main className="">
        <Banner />
        <div className="grid xl:grid-cols-8 w-11/12 gap-4 mx-auto my-20">
          {/* Skeleton Sidebar */}
          <div className="xl:col-span-2 col-span-9">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-6 animate-pulse"></div>
              <SkeletonSidebar />
            </div>
          </div>
          
          {/* Skeleton Content */}
          <div className="xl:col-span-6 col-span-9">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <SkeletonContent />
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (error || !data) {
    return (
      <main className="">
        <Banner />
        <div className="w-11/12 mx-auto my-20 text-center">
          <p className="text-xl text-red-600">
            {error || "Unable to load content. Please try again later."}
          </p>
        </div>
      </main>
    );
  }

  // No data state
  if (!data.info || data.info.length === 0) {
    return (
      <main className="">
        <Banner />
        <div className="w-11/12 mx-auto my-20 text-center">
          <p className="text-xl">No content available at this time.</p>
        </div>
      </main>
    );
  }

  // Sidebar component is now memoized above

  // Main content with data
  return (
    <main className="">
      {/* Top Banner */}
      <Banner />

      {/* Main Container */}
      <div className="grid xl:grid-cols-8 w-11/12 gap-4 mx-auto my-20">
        {/* Memoized Sidebar */}
        {Sidebar}

        {/* Dynamic Content */}
        <div className="xl:col-span-6 col-span-9 p-2">{children}</div>
      </div>
    </main>
  );
};

export default UsefulInfoLayout;
